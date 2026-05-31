<?php
/**
 * Template Name: Chatbots
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$problems = array();
if ( function_exists( 'have_rows' ) && have_rows( 'cb_problems' ) ) { while ( have_rows( 'cb_problems' ) ) { the_row(); $problems[] = get_sub_field( 'text' ); } }
if ( empty( $problems ) ) { $problems = array(
	'Horas al día respondiendo WhatsApps con las mismas preguntas.',
	'Clientes que preguntan fuera de horario y no reciben respuesta.',
	'Carritos abandonados en tu tienda porque nadie resolvió la duda a tiempo.',
	'Leads que llegan pero tardan horas en recibir respuesta y se enfrían.',
); }

$functions_list = array();
if ( function_exists( 'have_rows' ) && have_rows( 'cb_functions' ) ) { while ( have_rows( 'cb_functions' ) ) { the_row(); $functions_list[] = get_sub_field( 'text' ); } }
if ( empty( $functions_list ) ) { $functions_list = array(
	'Responde preguntas frecuentes de forma instantánea (horarios, precios, servicios, ubicación).',
	'Califica leads automáticamente antes de pasarlos al equipo humano.',
	'Recoge datos de contacto y los organiza para seguimiento.',
	'Recupera carritos abandonados en ecommerce con mensajes personalizados.',
	'Da información de producto o servicio en tiempo real, 24 horas al día.',
); }

$cases = array();
if ( function_exists( 'have_rows' ) && have_rows( 'cb_cases' ) ) { while ( have_rows( 'cb_cases' ) ) { the_row(); $cases[] = array( 'sector' => get_sub_field( 'sector' ), 'desc' => get_sub_field( 'desc' ) ); } }
if ( empty( $cases ) ) { $cases = array(
	array( 'sector' => 'Restaurante', 'desc' => 'Gestiona reservas, responde sobre la carta y horarios, capta eventos privados.' ),
	array( 'sector' => 'Clínica', 'desc' => 'Agenda citas, informa sobre servicios y precios, filtra el tipo de consulta.' ),
	array( 'sector' => 'Ecommerce', 'desc' => 'Estado de pedidos, gestión de devoluciones, recomendaciones de producto.' ),
	array( 'sector' => 'Inmobiliaria', 'desc' => 'Califica compradores, responde sobre propiedades, agenda visitas.' ),
); }

$steps = array();
if ( function_exists( 'have_rows' ) && have_rows( 'cb_steps' ) ) { while ( have_rows( 'cb_steps' ) ) { the_row(); $steps[] = array( 'title' => get_sub_field( 'title' ), 'desc' => get_sub_field( 'desc' ) ); } }
if ( empty( $steps ) ) { $steps = array(
	array( 'title' => 'Lo configuramos', 'desc' => 'Analizamos tu negocio y definimos las preguntas y respuestas clave.' ),
	array( 'title' => 'Lo conectamos', 'desc' => 'Lo integramos en tu web, WhatsApp Business o ambos.' ),
	array( 'title' => 'Empieza a trabajar', 'desc' => 'En menos de 7 días tu chatbot ya está atendiendo clientes.' ),
); }
?>

<!-- HERO -->
<section class="hero" style="min-height:80vh">
	<div class="container-mid hero-inner">
		<span class="eyebrow"><?php pymesai_the_field( 'cb_eyebrow', 'Chatbots para Pymes y Ecommerce' ); ?></span>
		<h1 class="h1" style="font-size:clamp(2.25rem,5vw,3.75rem)">
			<span data-text-effect><?php pymesai_the_field( 'cb_title_1', 'Responde a tus clientes' ); ?></span>
			<span class="gradient-text" style="opacity:0;animation:fadeIn .6s ease .5s forwards"><?php pymesai_the_field( 'cb_title_2', '24/7 sin estar tú.' ); ?></span>
		</h1>
		<p class="lead"><?php pymesai_the_field( 'cb_subtitle', 'Configuramos un asistente inteligente para tu negocio que atiende, informa y capta clientes mientras tú duermes.' ); ?></p>
		<div class="badges" style="margin-bottom:3rem">
			<?php foreach ( array( 'Configurado en <7 días', 'Sin conocimientos técnicos', 'Funciona en WhatsApp y web' ) as $b ) : ?>
				<span class="badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><?php echo esc_html( $b ); ?></span>
			<?php endforeach; ?>
		</div>
		<a href="#demo" class="btn btn-primary">Quiero una demo gratuita <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
	</div>
</section>

<!-- PROBLEMA -->
<section class="section glass-section">
	<div class="container-narrow text-center">
		<div class="icon-box" style="width:3.5rem;height:3.5rem;border-radius:1rem;margin:0 auto 1.5rem;background:rgba(251,191,36,.1);border-color:rgba(251,191,36,.2);color:#fbbf24"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
		<h2 class="h2" style="margin-bottom:2.5rem"><?php pymesai_the_field( 'cb_problem_title', '¿Cuánto tiempo pierdes respondiendo siempre lo mismo?' ); ?></h2>
		<div class="check-list" style="text-align:left">
			<?php foreach ( $problems as $t ) : ?>
				<div class="glass-card check-item reveal">
					<span style="width:8px;height:8px;border-radius:999px;background:#fbbf24;margin-top:.6rem;flex-shrink:0"></span>
					<p><?php echo esc_html( $t ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- QUÉ HACE -->
<section class="section">
	<div class="container-narrow">
		<h2 class="h2 text-center" style="font-size:1.75rem;margin-bottom:2.5rem">Lo que hace el chatbot por ti</h2>
		<ol class="check-list" style="counter-reset:n">
			<?php foreach ( $functions_list as $i => $f ) : ?>
				<li class="glass-card check-item reveal">
					<span class="step-num" style="width:1.75rem;height:1.75rem;border-radius:.5rem;font-size:.75rem"><?php echo (int) ( $i + 1 ); ?></span>
					<p><?php echo esc_html( $f ); ?></p>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>

<!-- CASOS DE USO -->
<section class="section glass-section">
	<div class="container-mid">
		<h2 class="h2 text-center" style="font-size:1.75rem;margin-bottom:2.5rem">Cómo funciona en tu negocio</h2>
		<div class="grid grid-2">
			<?php foreach ( $cases as $u ) : ?>
				<article class="glass-card reveal" style="padding:1.5rem">
					<div class="icon-box" style="width:2.5rem;height:2.5rem;margin-bottom:1rem"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
					<h3 class="h3" style="margin-bottom:.5rem"><?php echo esc_html( $u['sector'] ); ?></h3>
					<p class="muted" style="font-size:.875rem"><?php echo esc_html( $u['desc'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- CÓMO FUNCIONA -->
<section class="section">
	<div class="container-narrow">
		<h2 class="h2 text-center" style="font-size:1.75rem;margin-bottom:3rem">Tres pasos y tu chatbot ya funciona</h2>
		<div class="steps">
			<?php foreach ( $steps as $i => $s ) : ?>
				<div class="step reveal">
					<div class="step-num" style="background:rgba(255,91,20,.15);border-color:rgba(255,91,20,.25);color:#fb923c;box-shadow:none"><?php echo esc_html( sprintf( '%02d', $i + 1 ) ); ?></div>
					<div class="step-body">
						<h3><?php echo esc_html( $s['title'] ); ?></h3>
						<p><?php echo esc_html( $s['desc'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- RESULTADO -->
<section class="section-sm glass-section">
	<div class="container-narrow text-center" style="max-width:36rem">
		<div class="icon-box" style="width:3.5rem;height:3.5rem;border-radius:1rem;margin:0 auto 1rem"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
		<h2 class="h2" style="font-size:1.5rem;margin-bottom:.75rem">Tu equipo deja de responder lo mismo 40 veces al día.</h2>
		<p class="big-stat"><?php pymesai_the_field( 'cb_result_stat', '67%' ); ?></p>
		<p class="muted" style="font-size:.875rem"><?php pymesai_the_field( 'cb_result_text', 'de las consultas frecuentes se pueden automatizar desde el primer día.' ); ?></p>
	</div>
</section>

<!-- CTA -->
<section id="demo" class="section">
	<div class="container-narrow text-center" style="max-width:32rem">
		<h2 class="h2" style="font-size:1.75rem;margin-bottom:.75rem"><?php pymesai_the_field( 'cb_form_title', 'Quiero una demo gratuita.' ); ?></h2>
		<p class="muted" style="font-size:.875rem;margin-bottom:2.5rem"><?php pymesai_the_field( 'cb_form_sub', 'Te mostramos cómo funcionaría en tu negocio específico.' ); ?></p>
		<?php get_template_part( 'template-parts/chatbot-form' ); ?>
	</div>
</section>

<?php get_footer();
