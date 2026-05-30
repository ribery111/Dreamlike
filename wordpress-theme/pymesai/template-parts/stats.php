<?php
/**
 * Bloque de estadísticas con glow (estilo GlowingShadow).
 * Espera $args['field'] (nombre del repeater) y $args['default'] (array fallback).
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$field   = isset( $args['field'] ) ? $args['field'] : '';
$default = isset( $args['default'] ) ? $args['default'] : array();

$rows = array();
if ( $field && function_exists( 'have_rows' ) && have_rows( $field ) ) {
	while ( have_rows( $field ) ) {
		the_row();
		$rows[] = array( 'num' => get_sub_field( 'num' ), 'label' => get_sub_field( 'label' ) );
	}
}
if ( empty( $rows ) ) { $rows = $default; }
if ( empty( $rows ) ) { return; }
?>
<div class="stats-row">
	<?php foreach ( $rows as $r ) : ?>
		<div class="stat-card">
			<span class="stat-num"><?php echo esc_html( $r['num'] ); ?></span>
			<span class="stat-label"><?php echo esc_html( $r['label'] ); ?></span>
		</div>
	<?php endforeach; ?>
</div>
