<?php
/**
 * PymesAI — functions.php
 * Setup del tema, encolado de assets, menús, campos ACF y handler de leads.
 *
 * @package PymesAI
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

define( 'PYMESAI_VERSION', '1.0.2' );

/* ------------------------------------------------------------------
 * 1. Soporte del tema
 * ------------------------------------------------------------------ */
function pymesai_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo' );
	register_nav_menus( array(
		'primary' => __( 'Menú principal', 'pymesai' ),
		'footer'  => __( 'Menú legal (footer)', 'pymesai' ),
	) );
}
add_action( 'after_setup_theme', 'pymesai_setup' );

/* ------------------------------------------------------------------
 * 2. Encolado de estilos y scripts
 * ------------------------------------------------------------------ */
function pymesai_assets() {
	// Fuentes Google: Poppins + Inter
	wp_enqueue_style(
		'pymesai-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'pymesai-main', get_template_directory_uri() . '/assets/css/main.css', array(), PYMESAI_VERSION );

	wp_enqueue_script( 'pymesai-shader-bg', get_template_directory_uri() . '/assets/js/shader-bg.js', array(), PYMESAI_VERSION, true );
	wp_enqueue_script( 'pymesai-main', get_template_directory_uri() . '/assets/js/main.js', array(), PYMESAI_VERSION, true );
	wp_localize_script( 'pymesai-main', 'PymesAI', array(
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
		'nonce'   => wp_create_nonce( 'pymes_lead' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'pymesai_assets' );

/* Variables de fuente como CSS custom props */
function pymesai_font_vars() {
	echo '<style id="pymesai-fontvars">:root{--font-heading:"Poppins",system-ui,sans-serif;--font-body:"Inter",system-ui,sans-serif;}</style>' . "\n";
}
add_action( 'wp_head', 'pymesai_font_vars', 1 );

/* ------------------------------------------------------------------
 * 3. Helper: render seguro de un campo ACF con fallback
 * ------------------------------------------------------------------ */
function pymesai_field( $name, $fallback = '', $post_id = false ) {
	if ( function_exists( 'get_field' ) ) {
		$val = get_field( $name, $post_id );
		if ( $val !== null && $val !== '' && $val !== false ) {
			return $val;
		}
	}
	return $fallback;
}
function pymesai_the_field( $name, $fallback = '', $post_id = false ) {
	echo esc_html( pymesai_field( $name, $fallback, $post_id ) );
}

/* ------------------------------------------------------------------
 * 4. Handler AJAX de leads (formularios)
 *    Guarda como CPT 'lead' + envía email al admin
 * ------------------------------------------------------------------ */
function pymesai_register_lead_cpt() {
	register_post_type( 'lead', array(
		'labels' => array(
			'name'          => __( 'Leads', 'pymesai' ),
			'singular_name' => __( 'Lead', 'pymesai' ),
		),
		'public'       => false,
		'show_ui'      => true,
		'menu_icon'    => 'dashicons-email-alt',
		'supports'     => array( 'title' ),
		'capability_type' => 'post',
	) );
}
add_action( 'init', 'pymesai_register_lead_cpt' );

function pymesai_handle_lead() {
	$type   = isset( $_POST['lead_type'] ) ? sanitize_text_field( wp_unslash( $_POST['lead_type'] ) ) : 'general';
	$fields = array();
	foreach ( $_POST as $key => $value ) {
		if ( in_array( $key, array( 'action', 'lead_type', 'nonce' ), true ) ) { continue; }
		$fields[ sanitize_key( $key ) ] = sanitize_text_field( wp_unslash( $value ) );
	}

	$name  = isset( $fields['nombre'] ) ? $fields['nombre'] : ( isset( $fields['email'] ) ? $fields['email'] : 'Lead' );
	$title = sprintf( '[%s] %s — %s', strtoupper( $type ), $name, current_time( 'd/m/Y H:i' ) );

	$post_id = wp_insert_post( array(
		'post_type'   => 'lead',
		'post_status' => 'publish',
		'post_title'  => $title,
	) );

	if ( $post_id && ! is_wp_error( $post_id ) ) {
		foreach ( $fields as $k => $v ) {
			update_post_meta( $post_id, $k, $v );
		}
		update_post_meta( $post_id, 'lead_type', $type );

		// Email al admin
		$admin_email = get_option( 'admin_email' );
		$body = "Nuevo lead desde la web ({$type}):\n\n";
		foreach ( $fields as $k => $v ) { $body .= ucfirst( $k ) . ": {$v}\n"; }
		wp_mail( $admin_email, "Nuevo lead PymesAI — {$type}", $body );
	}

	wp_send_json_success( array( 'message' => __( 'Lo hemos recibido. Te contactamos en menos de 24 horas.', 'pymesai' ) ) );
}
add_action( 'wp_ajax_pymes_lead', 'pymesai_handle_lead' );
add_action( 'wp_ajax_nopriv_pymes_lead', 'pymesai_handle_lead' );

/* ------------------------------------------------------------------
 * 5. Campos ACF (registrados por código → aparecen sin configurar nada)
 *    Requiere el plugin Advanced Custom Fields (ACF Pro para repeaters).
 * ------------------------------------------------------------------ */
require get_template_directory() . '/inc/acf-fields.php';

/* Aviso si ACF no está activo */
function pymesai_acf_notice() {
	if ( ! function_exists( 'get_field' ) && current_user_can( 'activate_plugins' ) ) {
		echo '<div class="notice notice-warning"><p><strong>PymesAI:</strong> instala y activa <em>Advanced Custom Fields (ACF Pro)</em> para editar todos los textos e imágenes de la web desde el panel.</p></div>';
	}
}
add_action( 'admin_notices', 'pymesai_acf_notice' );

/* ------------------------------------------------------------------
 * 6. Crear páginas automáticamente al activar el tema
 * ------------------------------------------------------------------ */
function pymesai_create_pages() {
	$pages = array(
		'home'       => array( 'title' => 'Inicio',    'template' => '' ),
		'auditorias' => array( 'title' => 'Auditorías','template' => 'page-auditorias.php' ),
		'clientes'   => array( 'title' => 'Clientes',  'template' => 'page-clientes.php' ),
		'chatbots'   => array( 'title' => 'Chatbots',  'template' => 'page-chatbots.php' ),
	);
	$home_id = 0;
	foreach ( $pages as $slug => $data ) {
		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			if ( 'home' === $slug ) { $home_id = $existing->ID; }
			elseif ( $data['template'] ) { update_post_meta( $existing->ID, '_wp_page_template', $data['template'] ); }
			continue;
		}
		$id = wp_insert_post( array(
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_title'  => $data['title'],
			'post_name'   => $slug,
		) );
		if ( $id && ! is_wp_error( $id ) ) {
			if ( $data['template'] ) { update_post_meta( $id, '_wp_page_template', $data['template'] ); }
			if ( 'home' === $slug ) { $home_id = $id; }
		}
	}
	if ( $home_id ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home_id );
	}
	// Refrescar reglas de reescritura para que /auditorias, /clientes... no den 404.
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'pymesai_create_pages' );

/* Auto-reparación: si faltan las páginas (p.ej. al re-subir el ZIP sobre
 * el tema ya activo, donde 'after_switch_theme' no se dispara), las crea
 * y asigna las plantillas en la siguiente carga del admin. */
function pymesai_ensure_pages() {
	if ( ! is_admin() ) { return; }
	$needed = array( 'home', 'auditorias', 'clientes', 'chatbots' );
	foreach ( $needed as $slug ) {
		$page = get_page_by_path( $slug );
		$tpl_ok = true;
		if ( $page && 'home' !== $slug ) {
			$tpl  = get_post_meta( $page->ID, '_wp_page_template', true );
			$tpl_ok = ( 'page-' . $slug . '.php' === $tpl );
		}
		if ( ! $page || ! $tpl_ok ) {
			pymesai_create_pages();
			return;
		}
	}
}
add_action( 'admin_init', 'pymesai_ensure_pages' );

/* ------------------------------------------------------------------
 * 6b. Evitar que LiteSpeed Cache aplace/combine/minifique el JS del tema
 *     (rompía la inicialización → secciones invisibles, sin animaciones).
 * ------------------------------------------------------------------ */
function pymesai_litespeed_exclude_js( $list ) {
	$list   = is_array( $list ) ? $list : array();
	$list[] = 'assets/js/main.js';
	$list[] = 'assets/js/shader-bg.js';
	return $list;
}
add_filter( 'litespeed_optm_js_defer_exc', 'pymesai_litespeed_exclude_js' );
add_filter( 'litespeed_optm_js_comb_exc', 'pymesai_litespeed_exclude_js' );
add_filter( 'litespeed_optimize_js_excludes', 'pymesai_litespeed_exclude_js' );

/* ------------------------------------------------------------------
 * 7. Body classes / limpieza
 * ------------------------------------------------------------------ */
function pymesai_body_class( $classes ) {
	$classes[] = 'pymesai';
	return $classes;
}
add_filter( 'body_class', 'pymesai_body_class' );
