<?php
/**
 * Template Name: Auditorías
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();

$forwho = array();
if ( function_exists( 'have_rows' ) && have_rows( 'a_forwho' ) ) { while ( have_rows( 'a_forwho' ) ) { the_row(); $forwho[] = get_sub_field( 'text' ); } }
if ( empty( $forwho ) ) { $forwho = array(
	'Tienes un buen negocio pero no sabes exactamente a quién dirigirte ni cómo encontrarlos.',
	'Ya has gastado dinero en marketing y los resultados no justificaron la inversión.',
	'Trabajas por recomendaciones o inercia, sin un sistema claro para conseguir clientes nuevos.',
	'Tienes una tienda online con tráfico pero no sabes por qué no convierte ni a quién atacar.',
); }

$sectors = array();
if ( function_exists( 'have_rows' ) && have_rows( 'a_sectors' ) ) { while ( have_rows( 'a_sectors' ) ) { the_row(); $sectors[] = get_sub_field( 'text' ); } }
if ( empty( $sectors ) ) { $sectors = array( 'Restauración', 'Clínicas', 'Inmobiliarias', 'Construcción', 'Comercio local', 'Ecommerce' ); }

$deliverables = array();
if ( function_exists( 'have_rows' ) && have_rows( 'a_deliverables' ) ) { while ( have_rows( 'a_deliverables' ) ) { the_row(); $deliverables[] = array( 'title' => get_sub_field( 'title' ), 'desc' => get_sub_field( 'desc' ) ); } }
if ( empty( $deliverables ) ) { $deliverables = array(
	array( 'title' => 'Perfil de cliente ideal', 'desc' => 'Quién es, dónde está, qué busca y cuándo compra.' ),
	array( 'title' => 'Análisis de mercado', 'desc' => 'Competencia real, oportunidades sin explotar, puntos de entrada.' ),
	array( 'title' => 'Canales prioritarios', 'desc' => 'Dónde debes estar presente y dónde estás perdiendo el tiempo.' ),
	array( 'title' => 'Plan de acción', 'desc' => 'Los 3 primeros pasos para conseguir tus próximas ventas.' ),
); }

$steps = array();
if ( function_exists( 'have_rows' ) && have_rows( 'a_steps' ) ) { while ( have_rows( 'a_steps' ) ) { the_row(); $steps[] = array( 'name' => get_sub_field( 'name' ), 'desc' => get_sub_field( 'desc' ), 'optional' => get_sub_field( 'optional' ) ); } }
if ( empty( $steps ) ) { $steps = array(
	array( 'name' => 'Intake', 'desc' => 'Rellenas un formulario de 3 minutos. Nos dices qué haces, a quién le vendes y cuál es tu mayor problema comercial ahora mismo.', 'optional' => false ),
	array( 'name' => 'Diagnóstico', 'desc' => 'Analizamos tu negocio, tu mercado y a tu competencia con datos reales. Nuestro equipo trabaja mientras tú sigues con tu día.', 'optional' => false ),
	array( 'name' => 'Entrega', 'desc' => 'En menos de 24 horas recibes tu informe completo. Un documento accionable, no una presentación bonita sin fondo.', 'optional' => false ),
	array( 'name' => 'Acción', 'desc' => 'Te acompañamos en la implementación si quieres convertir el diagnóstico en resultados reales.', 'optional' => true ),
); }

$objections = array();
if ( function_exists( 'have_rows' ) && have_rows( 'a_objections' ) ) { while ( have_rows( 'a_objections' ) ) { the_row(); $objections[] = array( 'q' => get_sub_field( 'q' ), 'a' => get_sub_field( 'a' ) ); } }
if ( empty( $objections ) ) { $objections = array(
	array( 'q' => 'Ya probé marketing y no funcionó.', 'a' => 'El problema no fue el marketing. Fue no saber a quién dirigirlo. La auditoría resuelve eso primero, antes de gastar un euro más.' ),
	array( 'q' => 'No sé si vale lo que cuesta.', 'a' => 'Una sola venta que salga del informe cubre con creces la inversión. Y si no ves valor real en el documento, no te cobramos.' ),
	array( 'q' => 'No tengo tiempo para reuniones.', 'a' => 'No hay reuniones. Rellenas un formulario de 3 minutos. En menos de 24 horas tienes el informe en tu bandeja de entrada.' ),
); }
?>

<!-- QUIZ OVERLAY -->
<div class="quiz-overlay" data-quiz data-delay="2000" data-target="#formulario" style="display:none">
	<div class="quiz-backdrop" data-quiz-close></div>
	<div class="quiz-modal">
		<button class="quiz-close" data-quiz-close aria-label="Cerrar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
		<div class="quiz-dots"><span class="quiz-dot"></span><span class="quiz-dot"></span><span class="quiz-dot"></span></div>

		<div data-q-intro>
			<h2 class="h3" style="margin-bottom:.5rem">Una pregunta rápida</h2>
			<p class="muted" style="font-size:.875rem;margin-bottom:1.5rem">¿Tu negocio podría tener más clientes de los que tiene ahora?</p>
			<div class="quiz-actions">
				<button class="quiz-yes" data-intro-yes>Sí, creo que sí</button>
				<button class="quiz-no" data-intro-no>No</button>
			</div>
		</div>

		<?php
		$questions = array(
			'¿Sabes exactamente quién es tu cliente ideal y dónde encontrarlo?',
			'¿Has invertido en marketing sin ver resultados claros?',
			'¿Te gustaría tener una lista de clientes potenciales reales antes de esta semana?',
		);
		foreach ( $questions as $qi => $q ) : ?>
			<div data-q style="display:none">
				<p class="muted" style="font-size:.75rem;margin-bottom:.5rem">Pregunta <?php echo (int) ( $qi + 1 ); ?> de 3</p>
				<h2 class="h3" style="font-size:1.125rem;margin-bottom:1.5rem"><?php echo esc_html( $q ); ?></h2>
				<div class="quiz-actions">
					<button class="quiz-yes" data-ans-yes>Sí</button>
					<button class="quiz-no" data-ans-no>No del todo</button>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>

<!-- HERO -->
<section class="hero">
	<div class="container-mid hero-inner">
		<span class="eyebrow"><?php pymesai_the_field( 'a_eyebrow', 'Auditoría Comercial' ); ?></span>
		<h1 class="h1" style="font-size:clamp(2.25rem,5vw,3.75rem)">
			<span data-text-effect><?php pymesai_the_field( 'a_title_1', 'Descubre dónde están tus próximos clientes.' ); ?></span>
			<span class="gradient-text" style="opacity:0;animation:fadeIn .6s ease .5s forwards"><?php pymesai_the_field( 'a_title_2', 'En menos de 24 horas.' ); ?></span>
		</h1>
		<p class="lead"><?php pymesai_the_field( 'a_subtitle', 'Analizamos tu negocio, identificamos a tu cliente ideal y te entregamos un informe accionable con datos reales. Sin teoría. Sin esperas.' ); ?></p>
		<div class="badges" style="margin-bottom:3rem">
			<?php foreach ( array( 'Entrega en <24h', 'Datos verificados', 'Sin compromiso' ) as $b ) : ?>
				<span class="badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><?php echo esc_html( $b ); ?></span>
			<?php endforeach; ?>
		</div>
		<div class="hero-cta">
			<a href="#formulario" class="btn btn-primary">Quiero mi auditoría <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
			<a href="#como-funciona" class="btn btn-ghost">Ver cómo funciona</a>
		</div>
	</div>
</section>

<!-- PARA QUIÉN -->
<section class="section glass-section">
	<div class="container-mid">
		<h2 class="h2 text-center" style="margin-bottom:2.5rem"><?php pymesai_the_field( 'a_forwho_title', 'Esta auditoría es para ti si...' ); ?></h2>
		<div class="grid grid-2" style="margin-bottom:2.5rem">
			<?php foreach ( $forwho as $t ) : ?>
				<div class="glass-card check-item reveal">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
					<p><?php echo esc_html( $t ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="pills"><?php foreach ( $sectors as $s ) : ?><span class="pill"><?php echo esc_html( $s ); ?></span><?php endforeach; ?></div>
	</div>
</section>

<!-- QUÉ INCLUYE -->
<section class="section">
	<div class="container-mid">
		<div class="text-center" style="margin-bottom:3rem">
			<h2 class="h2" style="margin-bottom:.5rem"><?php pymesai_the_field( 'a_deliver_title', 'Un documento profesional.' ); ?></h2>
			<p style="color:rgba(255,255,255,.4)">No un PDF genérico.</p>
		</div>
		<div class="grid grid-2">
			<?php foreach ( $deliverables as $d ) : ?>
				<article class="glass-card reveal" style="padding:1.5rem">
					<div class="icon-box" style="width:2.5rem;height:2.5rem;margin-bottom:1rem"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
					<h3 class="h3" style="margin-bottom:.5rem"><?php echo esc_html( $d['title'] ); ?></h3>
					<p class="muted" style="font-size:.875rem"><?php echo esc_html( $d['desc'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- MÉTODO -->
<section id="como-funciona" class="section glass-section">
	<div class="container-narrow">
		<div class="text-center" style="margin-bottom:3rem">
			<h2 class="h2" style="margin-bottom:.5rem"><?php pymesai_the_field( 'a_idea_title', 'Tres pasos. Menos de 24 horas.' ); ?></h2>
			<p style="color:rgba(255,255,255,.4)">Sin reuniones previas.</p>
		</div>
		<div class="steps">
			<?php $codes = array( 'I', 'D', 'E', 'A' ); foreach ( $steps as $i => $s ) : ?>
				<div class="step reveal">
					<div class="step-num"><?php echo esc_html( isset( $codes[ $i ] ) ? $codes[ $i ] : ( $i + 1 ) ); ?></div>
					<div class="step-body">
						<h3><?php echo esc_html( ( $i + 1 ) . '. ' . $s['name'] ); ?><?php if ( ! empty( $s['optional'] ) ) : ?><span class="tag-opt">Opcional</span><?php endif; ?></h3>
						<p><?php echo esc_html( $s['desc'] ); ?></p>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- PRUEBA SOCIAL -->
<section class="section-sm">
	<div class="container-mid">
		<?php get_template_part( 'template-parts/stats', null, array(
			'field'   => 'a_stats',
			'default' => array(
				array( 'num' => '+10 años', 'label' => 'en el sector' ),
				array( 'num' => '<24h', 'label' => 'entrega garantizada' ),
				array( 'num' => '100%', 'label' => 'datos verificados' ),
			),
		) ); ?>
		<div class="glass-card text-center" style="padding:1.5rem;margin-top:2.5rem">
			<p style="color:rgba(255,255,255,.2);font-size:.75rem;margin:0">Espacio reservado para testimonios de clientes</p>
		</div>
	</div>
</section>

<!-- OBJECIONES -->
<section class="section glass-section">
	<div class="container-narrow">
		<h2 class="h2 text-center" style="margin-bottom:2.5rem"><?php pymesai_the_field( 'a_obj_title', 'Lo que seguramente estás pensando' ); ?></h2>
		<div class="accordion">
			<?php foreach ( $objections as $o ) : ?>
				<details class="glass-card acc">
					<summary><?php echo esc_html( $o['q'] ); ?><span class="plus">+</span></summary>
					<div class="acc-body"><?php echo esc_html( $o['a'] ); ?></div>
				</details>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- FORMULARIO -->
<section id="formulario" class="section">
	<div class="container-narrow text-center" style="max-width:32rem">
		<h2 class="h2" style="margin-bottom:.75rem"><?php pymesai_the_field( 'a_form_title', 'Empieza aquí. Sin compromiso.' ); ?></h2>
		<p class="muted" style="margin-bottom:2.5rem"><?php pymesai_the_field( 'a_form_sub', 'Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.' ); ?></p>
		<?php get_template_part( 'template-parts/audit-form', null, array( 'id' => 'formulario' ) ); ?>
	</div>
</section>

<?php get_footer();
