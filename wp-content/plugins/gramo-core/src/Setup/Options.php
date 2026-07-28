<?php
/**
 * Configuration authority.
 *
 * Single source of truth for every editable setting. All modules read config
 * through the static accessors here — never `get_option()` directly — so the
 * schema, defaults, and secret-resolution rules live in one place.
 *
 * Secrets (Twilio auth token, Stripe keys) may be supplied via PHP constants /
 * environment for production hygiene; constants always win over stored values.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Setup;

use Gramo\Core\Contracts\Bootable;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Options implements Bootable {

	public const BUSINESS = 'gramo_business_info';
	public const PICKUP   = 'gramo_pickup';
	public const SMS      = 'gramo_sms';
	public const SEO      = 'gramo_seo';
	public const SITE     = 'gramo_site_settings';

	public function boot(): void {
		add_action( 'init', array( $this, 'register_settings' ) );
	}

	/**
	 * Register settings so they are sanitised and exposed to the REST/Site Editor.
	 */
	public function register_settings(): void {
		$groups = array(
			self::BUSINESS => array( $this, 'sanitize_business' ),
			self::PICKUP   => array( $this, 'sanitize_pickup' ),
			self::SMS      => array( $this, 'sanitize_sms' ),
			self::SEO      => array( $this, 'sanitize_seo' ),
			self::SITE     => array( $this, 'sanitize_site' ),
		);
		foreach ( $groups as $name => $sanitizer ) {
			register_setting(
				'gramo',
				$name,
				array(
					'type'              => 'object',
					'sanitize_callback' => $sanitizer,
					'show_in_rest'      => false, // Contains operational config; not public.
					'default'           => array(),
				)
			);
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Defaults                                                               */
	/* ---------------------------------------------------------------------- */

	/** @return array<string,mixed> */
	public static function defaults(): array {
		return array(
			// STARTER: replace every value with the real business facts. Keys are
			// the schema — patterns and SEO read them via Options::business().
			self::BUSINESS => array(
				'name'             => 'Gramo',
				'tagline'          => '',
				'phone'            => '',
				'phone_link'       => '',
				'whatsapp'         => '',
				'email'            => 'hola@example.com',
				'address'          => '',
				'address_short'    => '',
				'street'           => '',
				'locality'         => '',
				'region'           => '',
				'postal_code'      => '',
				'country'          => 'MX',
				'hours_summary'    => '',
				'hours_closed'     => '',
				'instagram'        => '',
				'instagram_handle' => '',
				'maps_url'         => '',
				'latitude'         => '',
				'longitude'        => '',
			),
			self::PICKUP   => array(
				'open_days'       => array( 3, 4, 5, 6, 0 ), // Wed–Sun (0=Sun … 6=Sat).
				'open_time'       => '09:00',
				'close_time'      => '15:00',
				'last_pickup'     => '14:30',
				'lead_time_hours' => 24,
				'slot_minutes'    => 30,
				'slot_capacity'   => 8,
				'max_days_ahead'  => 21,
				'blackout_dates'  => array(),
				'timezone'        => 'America/Mexico_City',
				'instructions'    => 'Recoge tu pedido en el mostrador y menciona tu número de pedido.',
			),
			self::SMS      => array(
				'enabled'               => false,
				'provider'              => 'twilio',
				'channel'               => 'sms',
				'dry_run'               => false,
				'twilio_sid'            => '',
				'twilio_account_sid'    => '',
				'twilio_token'          => '',
				'twilio_from'           => '',
				'messaging_service_sid' => '',
				'staff_numbers'         => array(),
				'notify_customer'       => true,
				'notify_staff'          => true,
				'reply_map'             => array(
					'1' => 'preparing',
					'2' => 'ready',
					'3' => 'completed',
					'4' => 'cancelled',
				),
			),
			self::SEO      => array(
				'default_og_image'  => 0,
				'twitter_handle'    => '',
				'organization_logo' => 0,
				'price_range'       => '$$',
			),
			self::SITE     => array(
				// Navigation and footer links: one per line, "Etiqueta ES | Label EN | /ruta".
				'nav_lines'            => '',
				'footer_lines'         => '',
				'footer_note_es'       => '',
				'footer_note_en'       => '',
				'announcement_enabled' => false,
				'announcement_es'      => '',
				'announcement_en'      => '',
				'announcement_url'     => '',
				'social_instagram'     => '',
				'social_facebook'      => '',
				'social_spotify'       => '',
				'social_linktree'      => '',
				'whatsapp_community'   => '',
				// Local delivery pricing for the pay-on-delivery checkout.
				'delivery_fee'         => 0,
				'delivery_free_over'   => 0,
			),
		);
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Accessors                                                              */
	/* ---------------------------------------------------------------------- */

	/** @return array<string,mixed> */
	public static function group( string $name ): array {
		$defaults = self::defaults()[ $name ] ?? array();
		$stored   = get_option( $name, array() );
		$stored   = is_array( $stored ) ? $stored : array();
		return array_merge( $defaults, $stored );
	}

	/** @return array<string,mixed> */
	public static function business(): array {
		return self::group( self::BUSINESS );
	}

	/** @return array<string,mixed> */
	public static function pickup(): array {
		return self::group( self::PICKUP );
	}

	/** @return array<string,mixed> */
	public static function seo(): array {
		return self::group( self::SEO );
	}

	/** @return array<string,mixed> */
	public static function site(): array {
		return self::group( self::SITE );
	}

	/**
	 * Parse "Etiqueta ES | Label EN | /ruta" lines into structured link items.
	 *
	 * Lines missing a path are skipped; a missing EN label falls back to ES.
	 *
	 * @return array<int,array{label_es:string,label_en:string,path:string}>
	 */
	public static function parse_link_lines( string $lines ): array {
		$items = array();
		$split = preg_split( '/\r\n|\r|\n/', $lines );
		$split = false !== $split ? $split : array();
		foreach ( $split as $line ) {
			$parts = array_map( 'trim', explode( '|', $line ) );
			if ( count( $parts ) < 2 ) {
				continue;
			}
			$label_es = $parts[0];
			$label_en = 3 === count( $parts ) ? $parts[1] : $parts[0];
			$path     = 3 === count( $parts ) ? $parts[2] : $parts[1];
			if ( '' === $label_es || '' === $path ) {
				continue;
			}
			$items[] = array(
				'label_es' => $label_es,
				'label_en' => '' !== $label_en ? $label_en : $label_es,
				'path'     => $path,
			);
		}
		return $items;
	}

	/**
	 * SMS config with constant/env overrides applied to secrets.
	 *
	 * @return array<string,mixed>
	 */
	public static function sms(): array {
		$sms = self::group( self::SMS );

		$const_map = array(
			'twilio_sid'            => 'GRAMO_TWILIO_SID',
			'twilio_account_sid'    => 'GRAMO_TWILIO_ACCOUNT_SID',
			'twilio_token'          => 'GRAMO_TWILIO_AUTH_TOKEN',
			'twilio_from'           => 'GRAMO_TWILIO_FROM',
			'channel'               => 'GRAMO_TWILIO_CHANNEL',
			'dry_run'               => 'GRAMO_SMS_DRY_RUN',
			'messaging_service_sid' => 'GRAMO_TWILIO_MESSAGING_SID',
		);
		foreach ( $const_map as $key => $const ) {
			if ( defined( $const ) && '' !== (string) constant( $const ) ) {
				$sms[ $key ] = (string) constant( $const );
			}
		}
		return $sms;
	}

	/** Convenience single-value getter. */
	public static function get( string $group, string $key, mixed $fallback = null ): mixed {
		$data = self::group( $group );
		return $data[ $key ] ?? $fallback;
	}

	/** The site's configured pickup timezone as a DateTimeZone. */
	public static function timezone(): \DateTimeZone {
		$tz = (string) self::get( self::PICKUP, 'timezone', 'America/Mexico_City' );
		try {
			return new \DateTimeZone( $tz );
		} catch ( \Exception $e ) {
			return new \DateTimeZone( 'America/Mexico_City' );
		}
	}

	/**
	 * Install any missing defaults without clobbering existing values.
	 */
	public static function install_defaults(): void {
		foreach ( self::defaults() as $name => $default ) {
			$existing = get_option( $name, null );
			if ( null === $existing ) {
				add_option( $name, $default );
			} elseif ( is_array( $existing ) ) {
				update_option( $name, array_merge( $default, $existing ) );
			}
		}
	}

	/*
	---------------------------------------------------------------------- */
	/*
	Sanitizers                                                             */
	/* ---------------------------------------------------------------------- */

	/**
	 * @param mixed $value
	 * @return array<string,string>
	 */
	public function sanitize_business( mixed $value ): array {
		$value = is_array( $value ) ? $value : array();
		$clean = array();
		foreach ( self::defaults()[ self::BUSINESS ] as $key => $default ) {
			if ( ! isset( $value[ $key ] ) ) {
				continue;
			}
			$raw           = (string) $value[ $key ];
			$clean[ $key ] = in_array( $key, array( 'instagram', 'whatsapp', 'maps_url' ), true )
				? esc_url_raw( $raw )
				: ( 'email' === $key ? sanitize_email( $raw ) : sanitize_text_field( $raw ) );
		}
		return $clean;
	}

	/**
	 * @param mixed $value
	 * @return array<string,mixed>
	 */
	public function sanitize_pickup( mixed $value ): array {
		$value                  = is_array( $value ) ? $value : array();
		$out                    = array();
		$out['open_days']       = array_values( array_unique( array_map( 'intval', (array) ( $value['open_days'] ?? array() ) ) ) );
		$out['open_time']       = preg_match( '/^\d{2}:\d{2}$/', (string) ( $value['open_time'] ?? '' ) ) ? $value['open_time'] : '09:00';
		$out['close_time']      = preg_match( '/^\d{2}:\d{2}$/', (string) ( $value['close_time'] ?? '' ) ) ? $value['close_time'] : '15:00';
		$out['last_pickup']     = preg_match( '/^\d{2}:\d{2}$/', (string) ( $value['last_pickup'] ?? '' ) ) ? $value['last_pickup'] : '14:30';
		$out['lead_time_hours'] = max( 0, (int) ( $value['lead_time_hours'] ?? 24 ) );
		$out['slot_minutes']    = max( 5, (int) ( $value['slot_minutes'] ?? 30 ) );
		$out['slot_capacity']   = max( 1, (int) ( $value['slot_capacity'] ?? 8 ) );
		$out['max_days_ahead']  = max( 1, (int) ( $value['max_days_ahead'] ?? 21 ) );
		$out['timezone']        = sanitize_text_field( (string) ( $value['timezone'] ?? 'America/Mexico_City' ) );
		$out['instructions']    = sanitize_textarea_field( (string) ( $value['instructions'] ?? '' ) );
		$dates                  = array_filter( array_map( 'sanitize_text_field', (array) ( $value['blackout_dates'] ?? array() ) ), static fn( $d ) => (bool) preg_match( '/^\d{4}-\d{2}-\d{2}$/', $d ) );
		$out['blackout_dates']  = array_values( $dates );
		return $out;
	}

	/**
	 * @param mixed $value
	 * @return array<string,mixed>
	 */
	public function sanitize_sms( mixed $value ): array {
		$value                        = is_array( $value ) ? $value : array();
		$out                          = array();
		$out['enabled']               = ! empty( $value['enabled'] );
		$out['provider']              = 'twilio';
		$out['twilio_sid']            = sanitize_text_field( (string) ( $value['twilio_sid'] ?? '' ) );
		$out['twilio_account_sid']    = sanitize_text_field( (string) ( $value['twilio_account_sid'] ?? '' ) );
		$out['twilio_token']          = sanitize_text_field( (string) ( $value['twilio_token'] ?? '' ) );
		$out['twilio_from']           = sanitize_text_field( (string) ( $value['twilio_from'] ?? '' ) );
		$out['dry_run']               = ! empty( $value['dry_run'] );
		$out['channel']               = in_array( (string) ( $value['channel'] ?? 'sms' ), array( 'sms', 'whatsapp' ), true ) ? (string) $value['channel'] : 'sms';
		$out['messaging_service_sid'] = sanitize_text_field( (string) ( $value['messaging_service_sid'] ?? '' ) );
		$out['notify_customer']       = ! empty( $value['notify_customer'] );
		$out['notify_staff']          = ! empty( $value['notify_staff'] );

		$numbers = (array) ( $value['staff_numbers'] ?? array() );
		if ( 1 === count( $numbers ) && is_string( reset( $numbers ) ) && str_contains( (string) reset( $numbers ), ',' ) ) {
			$numbers = explode( ',', (string) reset( $numbers ) );
		}
		$out['staff_numbers'] = array_values(
			array_filter(
				array_map(
					static fn( $n ) => preg_replace( '/[^\d+]/', '', (string) $n ),
					$numbers
				)
			)
		);

		$reply = array();
		foreach ( (array) ( $value['reply_map'] ?? self::defaults()[ self::SMS ]['reply_map'] ) as $k => $status ) {
			$reply[ preg_replace( '/[^\w]/', '', (string) $k ) ] = sanitize_key( (string) $status );
		}
		$out['reply_map'] = $reply;
		return $out;
	}

	/**
	 * @param mixed $value
	 * @return array<string,mixed>
	 */
	public function sanitize_seo( mixed $value ): array {
		$value = is_array( $value ) ? $value : array();
		return array(
			'default_og_image'  => (int) ( $value['default_og_image'] ?? 0 ),
			'twitter_handle'    => sanitize_text_field( (string) ( $value['twitter_handle'] ?? '' ) ),
			'organization_logo' => (int) ( $value['organization_logo'] ?? 0 ),
			'price_range'       => sanitize_text_field( (string) ( $value['price_range'] ?? '$$' ) ),
		);
	}

	/**
	 * @param mixed $value
	 * @return array<string,mixed>
	 */
	public function sanitize_site( mixed $value ): array {
		$value = is_array( $value ) ? $value : array();
		return array(
			'nav_lines'            => sanitize_textarea_field( (string) ( $value['nav_lines'] ?? '' ) ),
			'footer_lines'         => sanitize_textarea_field( (string) ( $value['footer_lines'] ?? '' ) ),
			'footer_note_es'       => sanitize_text_field( (string) ( $value['footer_note_es'] ?? '' ) ),
			'footer_note_en'       => sanitize_text_field( (string) ( $value['footer_note_en'] ?? '' ) ),
			'announcement_enabled' => ! empty( $value['announcement_enabled'] ),
			'announcement_es'      => sanitize_text_field( (string) ( $value['announcement_es'] ?? '' ) ),
			'announcement_en'      => sanitize_text_field( (string) ( $value['announcement_en'] ?? '' ) ),
			'announcement_url'     => esc_url_raw( (string) ( $value['announcement_url'] ?? '' ) ),
			'social_instagram'     => esc_url_raw( (string) ( $value['social_instagram'] ?? '' ) ),
			'social_facebook'      => esc_url_raw( (string) ( $value['social_facebook'] ?? '' ) ),
			'social_spotify'       => esc_url_raw( (string) ( $value['social_spotify'] ?? '' ) ),
			'social_linktree'      => esc_url_raw( (string) ( $value['social_linktree'] ?? '' ) ),
			'whatsapp_community'   => esc_url_raw( (string) ( $value['whatsapp_community'] ?? '' ) ),
			'delivery_fee'         => max( 0, (float) ( $value['delivery_fee'] ?? 0 ) ),
			'delivery_free_over'   => max( 0, (float) ( $value['delivery_free_over'] ?? 0 ) ),
		);
	}
}
