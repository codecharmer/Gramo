<?php
/**
 * Headless pay-on-delivery checkout endpoint.
 *
 * `POST gramo/v1/order` receives the static frontend's cart:
 *
 *   {
 *     items:       [ { productId, qty } ],
 *     customer:    { name, phone, email },
 *     fulfillment: { type: 'pickup'|'delivery', locationId?, address?, notes? },
 *     locale:      'es'|'en',
 *     _gramo_hp, _gramo_t                       // Guard fields
 *   }
 *
 * The server is the only pricing authority: products are re-validated and
 * re-priced from the database (client prices are never trusted), a delivery
 * fee from site settings is applied when relevant, and the order is created
 * with the COD payment method in `processing` — which fires the engine's
 * existing staff SMS and WooCommerce emails. Returns the order number.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Rest;

use Gramo\Core\Contracts\Bootable;
use Gramo\Core\Setup\Options;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class OrderController implements Bootable {

	private const NS = 'gramo/v1';

	/** Sanity caps against abusive carts. */
	private const MAX_LINES = 20;
	private const MAX_QTY   = 24;

	public function boot(): void {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes(): void {
		register_rest_route(
			self::NS,
			'/order',
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'handle' ),
				// Public storefront endpoint; abuse is filtered by Guard.
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Validate, price, and create the order.
	 */
	public function handle( \WP_REST_Request $request ): \WP_REST_Response|\WP_Error {
		if ( ! function_exists( 'wc_create_order' ) ) {
			return new \WP_Error( 'gramo_unavailable', __( 'La tienda no está disponible.', 'gramo-core' ), array( 'status' => 503 ) );
		}

		$body = (array) $request->get_json_params();

		$guard_error = Guard::check( $body, 'order' );
		if ( null !== $guard_error ) {
			return $guard_error;
		}

		// ---- Customer. -----------------------------------------------------
		$customer = (array) ( $body['customer'] ?? array() );
		$name     = sanitize_text_field( (string) ( $customer['name'] ?? '' ) );
		$phone    = sanitize_text_field( (string) ( $customer['phone'] ?? '' ) );
		$email    = sanitize_email( (string) ( $customer['email'] ?? '' ) );

		if ( '' === $name || '' === $phone ) {
			return new \WP_Error( 'gramo_invalid', __( 'Nombre y teléfono son obligatorios.', 'gramo-core' ), array( 'status' => 400 ) );
		}
		if ( '' !== (string) ( $customer['email'] ?? '' ) && '' === $email ) {
			return new \WP_Error( 'gramo_invalid', __( 'El correo electrónico no es válido.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		// ---- Fulfillment. --------------------------------------------------
		$fulfillment = (array) ( $body['fulfillment'] ?? array() );
		$type        = 'delivery' === ( $fulfillment['type'] ?? '' ) ? 'delivery' : 'pickup';
		$address     = sanitize_text_field( (string) ( $fulfillment['address'] ?? '' ) );
		$location_id = (int) ( $fulfillment['locationId'] ?? 0 );
		$notes       = sanitize_textarea_field( (string) ( $fulfillment['notes'] ?? '' ) );

		if ( 'delivery' === $type && '' === $address ) {
			return new \WP_Error( 'gramo_invalid', __( 'La dirección de entrega es obligatoria.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		// ---- Items (server-side pricing). ----------------------------------
		$items = (array) ( $body['items'] ?? array() );
		if ( array() === $items || count( $items ) > self::MAX_LINES ) {
			return new \WP_Error( 'gramo_invalid', __( 'El carrito está vacío o no es válido.', 'gramo-core' ), array( 'status' => 400 ) );
		}

		$lines = array();
		foreach ( $items as $item ) {
			$item       = (array) $item;
			$product_id = (int) ( $item['productId'] ?? 0 );
			$qty        = (int) ( $item['qty'] ?? 0 );

			if ( $product_id <= 0 || $qty <= 0 || $qty > self::MAX_QTY ) {
				return new \WP_Error( 'gramo_invalid', __( 'Uno de los artículos no es válido.', 'gramo-core' ), array( 'status' => 400 ) );
			}

			$product = wc_get_product( $product_id );
			if ( ! $product instanceof \WC_Product || ! $product->is_purchasable() || ! $product->is_in_stock() ) {
				return new \WP_Error(
					'gramo_unavailable_item',
					sprintf(
						/* translators: %d: product ID. */
						__( 'Un artículo ya no está disponible (#%d). Actualiza tu carrito.', 'gramo-core' ),
						$product_id
					),
					array( 'status' => 409 )
				);
			}

			$lines[] = array(
				'product' => $product,
				'qty'     => $qty,
			);
		}

		// ---- Create the order. ---------------------------------------------
		$order = wc_create_order();
		if ( is_wp_error( $order ) ) {
			return new \WP_Error( 'gramo_failed', __( 'No se pudo crear el pedido.', 'gramo-core' ), array( 'status' => 500 ) );
		}

		foreach ( $lines as $line ) {
			$order->add_product( $line['product'], $line['qty'] ); // Prices come from the product, never the client.
		}

		$name_parts = explode( ' ', $name, 2 );
		$order->set_billing_first_name( $name_parts[0] );
		$order->set_billing_last_name( $name_parts[1] ?? '' );
		$order->set_billing_phone( $phone );
		if ( '' !== $email ) {
			$order->set_billing_email( $email );
		}

		if ( 'delivery' === $type ) {
			$order->set_billing_address_1( $address );
			$order->set_shipping_address_1( $address );
			$this->maybe_add_delivery_fee( $order );
		}

		if ( '' !== $notes ) {
			$order->set_customer_note( $notes );
		}

		$order->update_meta_data( '_gramo_fulfillment', $type );
		if ( $location_id > 0 ) {
			$order->update_meta_data( '_gramo_location_id', $location_id );
		}
		$locale = 'en' === ( $body['locale'] ?? '' ) ? 'en' : 'es';
		$order->update_meta_data( '_gramo_order_locale', $locale );
		$order->update_meta_data( '_gramo_channel', 'web' );

		$order->set_payment_method( 'cod' );
		$order->set_payment_method_title( __( 'Pago contra entrega', 'gramo-core' ) );
		$order->set_created_via( 'gramo-frontend' );

		$order->calculate_totals();
		$order->set_status( 'processing', __( 'Pedido recibido desde gramo.cafe.', 'gramo-core' ) );
		$order->save();

		return new \WP_REST_Response(
			array(
				'ok'          => true,
				'orderNumber' => $order->get_order_number(),
				'total'       => (float) $order->get_total(),
				'currency'    => $order->get_currency(),
				'fulfillment' => $type,
			),
			201
		);
	}

	/**
	 * Add the flat local-delivery fee from site settings, honoring the
	 * free-delivery threshold when configured.
	 */
	private function maybe_add_delivery_fee( \WC_Order $order ): void {
		$site      = Options::site();
		$fee       = (float) ( $site['delivery_fee'] ?? 0 );
		$free_over = (float) ( $site['delivery_free_over'] ?? 0 );

		if ( $fee <= 0 ) {
			return;
		}

		$subtotal = 0.0;
		foreach ( $order->get_items() as $item ) {
			$subtotal += (float) $item->get_total();
		}
		if ( $free_over > 0 && $subtotal >= $free_over ) {
			return;
		}

		$fee_item = new \WC_Order_Item_Fee();
		$fee_item->set_name( __( 'Envío local', 'gramo-core' ) );
		$fee_item->set_amount( (string) $fee );
		$fee_item->set_total( (string) $fee );
		$order->add_item( $fee_item );
	}
}
