<?php
/**
 * Front page — Home.
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

/* Defaults (si ACF no está activo) */
$problems = array();
if ( function_exists( 'have_rows' ) && have_rows( 'h_problems' ) ) {
	while ( have_rows( 'h_problems' ) ) { the_row(); $problems[] = get_sub_field( 'text' ); }
}
if ( empty( $problems ) ) {
	$problems = array(
		'Llevas tiempo buscando clientes sin un método claro.',
		'Has gastado en marketing y no sabes por qué no funcionó.',
		'Tu negocio depende de recomendaciones y no tienes control sobre las ventas.',
	);
}

$solutions = array();
if ( function_exists( 'have_rows' ) && have_rows( 'h_solutions' ) ) {
	while ( have_rows( 'h_solutions' ) ) {
		the_row();
		$solutions[] = array( 'title' => get_sub_field( 'title' ), 'desc' => get_sub_field( 'desc' ), 'cta' => get_sub_field( 'cta' ), 'url' => get_sub_field( 'url' ) );
	}
}
if ( empty( $solutions ) ) {
	$solutions = array(
		array( 'title' => 'Auditoría Comercial', 'desc' => 'Descubre dónde están tus próximos clientes.', 'cta' => 'Solicitar auditoría', 'url' => '/auditorias' ),
		array( 'title' => 'Lista de Clientes', 'desc' => 'Tu próximo cliente ya existe. Hay que encontrarlo.', 'cta' => 'Ver listas', 'url' => '/clientes' ),
		array( 'title' => 'Chatbots', 'desc' => 'Responde a tus clientes 24/7 sin estar tú.', 'cta' => 'Ver chatbots', 'url' => '/chatbots' ),
	);
}
$icons = array(
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
	'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
);
?>

<!-- HERO -->
<section class="hero">
	<div class="container hero-inner">
		<span class="eyebrow"><span class="dot"></span><?php pymesai_the_field( 'h_eyebrow', 'Inteligencia. Datos. Resultados.' ); ?></span>
		<h1 class="h1">
			<span data-text-effect><?php pymesai_the_field( 'h_title_1', 'Más clientes para tu negocio.' ); ?></span>
			<span class="gradient-text" data-text-effect data-delay="0.4"><?php pymesai_the_field( 'h_title_2', 'Con datos reales.' ); ?></span>
		</h1>
		<p class="lead"><?php pymesai_the_field( 'h_subtitle', 'Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él. En menos de 24 horas.' ); ?></p>
		<div class="badges" style="margin-bottom:3rem">
			<?php foreach ( array( 'Entrega en <24h', 'Sin compromiso', 'Datos verificados' ) as $b ) : ?>
				<span class="badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><?php echo esc_html( $b ); ?></span>
			<?php endforeach; ?>
		</div>
		<div class="hero-cta">
			<a href="<?php echo esc_url( home_url( '/auditorias/#formulario' ) ); ?>" class="btn btn-primary"><?php pymesai_the_field( 'h_cta_primary', 'Quiero mi auditoría gratuita' ); ?> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
			<a href="<?php echo esc_url( home_url( '/auditorias/' ) ); ?>" class="btn btn-ghost"><?php pymesai_the_field( 'h_cta_secondary', 'Ver cómo funciona' ); ?></a>
		</div>
	</div>
</section>

<!-- PROBLEMA -->
<section class="section glass-section">
	<div class="container-narrow text-center">
		<h2 class="h2" style="margin-bottom:3rem"><?php pymesai_the_field( 'h_problem_title', 'Si te reconoces en esto, es para ti.' ); ?></h2>
		<ul class="check-list" style="text-align:left">
			<?php foreach ( $problems as $p ) : ?>
				<li class="glass-card check-item reveal">
					<span style="width:8px;height:8px;border-radius:999px;background:#fb923c;margin-top:.6rem;flex-shrink:0;box-shadow:0 0 6px rgba(251,146,60,.8)"></span>
					<p style="font-size:1rem;color:rgba(255,255,255,.75)"><?php echo esc_html( $p ); ?></p>
				</li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>

<!-- SOLUCIONES -->
<section class="section">
	<div class="container">
		<h2 class="h2 text-center" style="margin-bottom:3.5rem"><?php pymesai_the_field( 'h_sol_title', 'Tres formas de conseguir más clientes' ); ?></h2>
		<div class="grid grid-3">
			<?php foreach ( $solutions as $i => $s ) : $primary = ( 0 === $i ); ?>
				<article class="glass-card reveal" style="padding:1.75rem;display:flex;flex-direction:column;gap:1rem">
					<div class="icon-box"><?php echo $icons[ $i % 3 ]; // phpcs:ignore ?></div>
					<h3 class="h3"><?php echo esc_html( $s['title'] ); ?></h3>
					<p class="muted" style="font-size:.875rem;flex:1"><?php echo esc_html( $s['desc'] ); ?></p>
					<a href="<?php echo esc_url( home_url( $s['url'] ) ); ?>" class="btn btn-sm <?php echo $primary ? 'btn-primary' : 'btn-ghost'; ?>" style="align-self:flex-start"><?php echo esc_html( $s['cta'] ); ?> →</a>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- PRUEBA SOCIAL -->
<section class="section-sm glass-section">
	<div class="container-mid">
		<?php get_template_part( 'template-parts/stats', null, array(
			'field'   => 'h_stats',
			'default' => array(
				array( 'num' => '+10 años', 'label' => 'de experiencia en captación comercial' ),
				array( 'num' => '<24h', 'label' => 'entrega garantizada' ),
				array( 'num' => '100%', 'label' => 'datos verificados' ),
			),
		) ); ?>
		<div class="glass-card text-center" style="padding:1.5rem;margin-top:3rem">
			<p style="color:rgba(255,255,255,.2);font-size:.75rem;margin:0">Espacio reservado para logos de clientes</p>
		</div>
	</div>
</section>

<!-- CTA FINAL -->
<section class="section">
	<div class="container-narrow text-center" style="max-width:36rem">
		<h2 class="h2" style="margin-bottom:.75rem"><?php pymesai_the_field( 'h_cta_title', 'Empieza hoy. Sin compromiso.' ); ?></h2>
		<p class="muted" style="margin-bottom:2.5rem"><?php pymesai_the_field( 'h_cta_sub', 'Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.' ); ?></p>
		<?php get_template_part( 'template-parts/audit-form', null, array( 'id' => 'cta-home' ) ); ?>
	</div>
</section>

<?php get_footer();
