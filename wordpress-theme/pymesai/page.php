<?php
/**
 * Página genérica (para páginas legales: privacidad, aviso legal...).
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header(); ?>

<section class="section" style="padding-top:8rem">
	<div class="container-narrow">
		<?php while ( have_posts() ) : the_post(); ?>
			<article class="glass-card" style="padding:2rem">
				<h1 class="h2" style="margin-bottom:1.5rem"><?php the_title(); ?></h1>
				<div class="muted" style="line-height:1.7"><?php the_content(); ?></div>
			</article>
		<?php endwhile; ?>
	</div>
</section>

<?php get_footer();
