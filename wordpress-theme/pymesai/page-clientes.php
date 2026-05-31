<?php
/**
 * Template Name: Clientes
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$uses = array();
if ( function_exists( 'have_rows' ) && have_rows( 'c_uses' ) ) { while ( have_rows( 'c_uses' ) ) { the_row(); $uses[] = array( 'sector' => get_sub_field( 'sector' ), 'desc' => get_sub_field( 'desc' ) ); } }
if ( empty( $uses ) ) { $uses = array(
	array( 'sector' => 'Restauración', 'desc' => 'Proveedores, empresas de eventos, catering corporativo en tu zona.' ),
	array( 'sector' => 'Clínicas', 'desc' => 'Pacientes potenciales por zona, edad y perfil demográfico.' ),
	array( 'sector' => 'Inmobiliarias', 'desc' => 'Compradores activos y propietarios con intención de venta en tu área.' ),
	array( 'sector' => 'Ecommerce', 'desc' => 'Compradores recurrentes de tu categoría de producto en toda España.' ),
); }

$mock = array(
	array( 'Restaurante El Olivo', 'Restauración', 'Madrid Centro', 'gerencia@...', 'Activo' ),
	array( 'Clínica Bienestar', 'Salud', 'Barcelona, Eixample', 'info@...', 'Activo' ),
	array( 'Inmobiliaria Costa', 'Inmobiliaria', 'Valencia', 'ventas@...', 'Nuevo' ),
	array( 'Ferretería López', 'Comercio', 'Sevilla', 'pedidos@...', 'Activo' ),
);
?>

<!-- HERO -->
<section class="hero" style="min-height:80vh">
	<div class="container-mid hero-inner">
		<span class="eyebrow"><?php pymesai_the_field( 'c_eyebrow', 'Listas de Clientes Potenciales' ); ?></span>
		<h1 class="h1" style="font-size:clamp(2.25rem,5vw,3.75rem)">
			<span data-text-effect><?php pymesai_the_field( 'c_title_1', 'Tu próximo cliente ya existe.' ); ?></span>
			<span class="gradient-text" style="opacity:0;animation:fadeIn .6s ease .5s forwards"><?php pymesai_the_field( 'c_title_2', 'Solo hay que encontrarlo.' ); ?></span>
		</h1>
		<p class="lead"><?php pymesai_the_field( 'c_subtitle', 'Te entregamos listas de clientes potenciales reales, filtradas por sector, zona y perfil. Datos verificados, listos para contactar.' ); ?></p>
		<a href="#muestra" class="btn btn-primary" style="margin-top:2.5rem">Quiero ver una muestra <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
	</div>
</section>

<!-- QUÉ ES -->
<section class="section-sm glass-section">
	<div class="container-narrow text-center" style="max-width:42rem">
		<div class="icon-box" style="width:3.5rem;height:3.5rem;border-radius:1rem;margin:0 auto 1.5rem"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
		<h2 class="h2" style="font-size:1.5rem;margin-bottom:1rem"><?php pymesai_the_field( 'c_what_title', '¿Qué es exactamente?' ); ?></h2>
		<p class="muted" style="line-height:1.7"><?php pymesai_the_field( 'c_what_text', 'Una lista de empresas o personas que encajan con tu cliente ideal, en tu zona y sector, con datos de contacto verificados y listos para usar.' ); ?></p>
	</div>
</section>

<!-- TABLA -->
<section class="section-sm">
	<div class="container-mid">
		<h2 class="h2 text-center" style="font-size:1.5rem;margin-bottom:.5rem">Así se ve una lista real de tu sector.</h2>
		<p class="text-center" style="color:rgba(255,255,255,.3);font-size:.875rem;margin-bottom:2rem">Datos ficticios a modo de ejemplo.</p>
		<div class="table-wrap">
			<table class="lead-table" aria-label="Ejemplo de lista de clientes">
				<thead><tr><?php foreach ( array( 'Nombre', 'Sector', 'Zona', 'Contacto', 'Estado' ) as $h ) : ?><th><?php echo esc_html( $h ); ?></th><?php endforeach; ?></tr></thead>
				<tbody>
					<?php foreach ( $mock as $row ) : ?>
						<tr>
							<td class="name"><?php echo esc_html( $row[0] ); ?></td>
							<td><?php echo esc_html( $row[1] ); ?></td>
							<td><?php echo esc_html( $row[2] ); ?></td>
							<td style="color:rgba(255,255,255,.4)"><?php echo esc_html( $row[3] ); ?></td>
							<td><span class="pill"><?php echo esc_html( $row[4] ); ?></span></td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
</section>

<!-- PARA QUÉ SIRVE -->
<section class="section-sm glass-section">
	<div class="container-mid">
		<h2 class="h2 text-center" style="margin-bottom:2.5rem">Qué consigues según tu sector</h2>
		<div class="grid grid-2">
			<?php foreach ( $uses as $u ) : ?>
				<div class="glass-card reveal" style="padding:1.25rem">
					<h3 class="h3" style="margin-bottom:.5rem"><?php echo esc_html( $u['sector'] ); ?></h3>
					<p class="muted" style="font-size:.875rem"><?php echo esc_html( $u['desc'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- DIFERENCIADOR -->
<section class="section-sm">
	<div class="container-narrow text-center">
		<h2 class="h2" style="margin-bottom:2rem">No es una base de datos comprada.<br><span class="gradient-text">Es una lista construida para ti.</span></h2>
		<div class="grid grid-3">
			<?php foreach ( array( 'Datos públicos verificados', 'Filtrado por tu perfil de cliente', 'Entrega en menos de 24h' ) as $t ) : ?>
				<div class="glass-card text-center reveal" style="padding:1rem">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" style="margin:0 auto .5rem"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
					<p style="color:rgba(255,255,255,.7);font-size:.875rem;font-weight:500;margin:0"><?php echo esc_html( $t ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- CTA -->
<section id="muestra" class="section glass-section">
	<div class="container-narrow text-center" style="max-width:28rem">
		<h2 class="h2" style="margin-bottom:.75rem"><?php pymesai_the_field( 'c_form_title', 'Quiero ver una muestra de mi sector.' ); ?></h2>
		<p class="muted" style="font-size:.875rem;margin-bottom:2rem"><?php pymesai_the_field( 'c_form_sub', 'Sin compromiso. Recibirás datos reales en menos de 24 horas.' ); ?></p>
		<?php get_template_part( 'template-parts/lead-form' ); ?>
	</div>
</section>

<?php get_footer();
