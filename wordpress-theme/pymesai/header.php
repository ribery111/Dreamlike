<?php
/**
 * Header: fondo animado + navbar.
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Fondo shader WebGL global (MeshGradient — @paper-design/shaders) -->
<div class="mesh-bg" aria-hidden="true">
	<div id="pymes-mesh-base" class="mesh-layer"></div>
	<div id="pymes-mesh-wire" class="mesh-layer mesh-wire"></div>
</div>
<div class="bg-overlay" aria-hidden="true"></div>

<div class="site-content">

	<!-- Navbar -->
	<header class="navbar">
		<div class="navbar-inner">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand" aria-label="PymesAI">
				<span class="b1">Pymes</span><span class="b2">AI</span>
			</a>

			<nav class="nav-links" aria-label="Principal">
				<?php
				$nav_items = array(
					'/auditorias' => 'Auditorías',
					'/clientes'   => 'Clientes',
					'/chatbots'   => 'Chatbots',
				);
				$current = trailingslashit( wp_parse_url( home_url( add_query_arg( array() ) ), PHP_URL_PATH ) );
				foreach ( $nav_items as $path => $label ) {
					$active = ( trailingslashit( $path ) === $current ) ? ' active' : '';
					echo '<a class="' . esc_attr( trim( $active ) ) . '" href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a>';
				}
				?>
			</nav>

			<div class="nav-cta">
				<a href="<?php echo esc_url( home_url( '/auditorias/#formulario' ) ); ?>" class="btn btn-primary btn-sm">Solicitar auditoría</a>
			</div>

			<div class="nav-mobile-actions">
				<a href="<?php echo esc_url( home_url( '/auditorias/#formulario' ) ); ?>" class="btn btn-primary btn-sm" style="min-height:auto;padding:.5rem .75rem;font-size:.75rem">Auditoría gratis</a>
				<button class="burger" aria-label="Abrir menú" aria-expanded="false">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
				</button>
			</div>
		</div>

		<div class="mobile-menu">
			<nav aria-label="Menú móvil">
				<?php foreach ( $nav_items as $path => $label ) {
					echo '<a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a>';
				} ?>
			</nav>
		</div>
	</header>

	<main>
