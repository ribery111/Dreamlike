<?php
/**
 * Footer.
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
	</main>

	<footer class="site-footer glass-dark">
		<div class="footer-inner">
			<div class="footer-top">
				<div>
					<div class="brand" style="font-size:1.125rem;margin-bottom:.25rem"><span class="b1">Pymes</span><span class="b2">AI</span></div>
					<p class="muted" style="font-size:.875rem;margin:0">Inteligencia. Datos. Resultados.</p>
				</div>
				<nav class="footer-legal" aria-label="Enlaces legales">
					<?php
					if ( has_nav_menu( 'footer' ) ) {
						wp_nav_menu( array( 'theme_location' => 'footer', 'container' => false, 'items_wrap' => '%3$s', 'depth' => 1, 'fallback_cb' => false ) );
					} else {
						foreach ( array( 'Política de privacidad', 'Aviso legal', 'Cookies' ) as $l ) {
							echo '<a href="#">' . esc_html( $l ) . '</a>';
						}
					}
					?>
				</nav>
			</div>
			<div class="footer-copy">
				&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> PymesAI. Todos los derechos reservados.
			</div>
		</div>
	</footer>

</div><!-- /.site-content -->

<?php wp_footer(); ?>
</body>
</html>
