<?php
/**
 * Bootable service contract.
 *
 * @package Gramo\Core
 */

declare( strict_types=1 );

namespace Gramo\Core\Contracts;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

interface Bootable {

	/**
	 * Register the service's hooks. Called once, on `plugins_loaded` (priority 20).
	 */
	public function boot(): void;
}
