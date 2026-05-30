<?php
/**
 * Fallback genérico.
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header(); ?>

<section class="section" style="padding-top:8rem">
	<div class="container-narrow">
		<?php
		if ( have_posts() ) :
			while ( have_posts() ) : the_post(); ?>
				<article class="glass-card" style="padding:2rem;margin-bottom:1.5rem">
					<h1 class="h2" style="margin-bottom:1rem"><?php the_title(); ?></h1>
					<div class="muted" style="line-height:1.7"><?php the_content(); ?></div>
				</article>
			<?php endwhile;
		else : ?>
			<div class="glass-card text-center" style="padding:3rem">
				<h1 class="h2">Nada por aquí</h1>
				<p class="muted">No se encontró contenido.</p>
			</div>
		<?php endif; ?>
	</div>
</section>

<?php get_footer();
