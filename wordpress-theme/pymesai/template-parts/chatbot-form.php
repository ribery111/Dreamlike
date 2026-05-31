<?php
/**
 * Formulario de demo de chatbot (nombre / tipo / teléfono).
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<div class="glass-card" style="padding:1.5rem;text-align:left" data-form-wrap>
	<form data-pymes-form="chatbot" novalidate>
		<div class="field">
			<label for="c_nombre">Nombre <span class="req">*</span></label>
			<input class="input-glass" id="c_nombre" name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required data-required data-msg="El nombre es obligatorio">
		</div>
		<div class="field">
			<label for="c_tipo">Tipo de negocio <span class="req">*</span></label>
			<input class="input-glass" id="c_tipo" name="tipo_negocio" type="text" autocomplete="organization" placeholder="p.ej. Restaurante, Clínica..." required data-required data-msg="El tipo de negocio es obligatorio">
		</div>
		<div class="field">
			<label for="c_tel">Teléfono <span class="req">*</span></label>
			<input class="input-glass" id="c_tel" name="telefono" type="tel" autocomplete="tel" placeholder="+34 600 000 000" required data-required data-validate="tel" data-msg="El teléfono es obligatorio">
		</div>
		<button type="submit" class="btn btn-primary btn-block btn-sm">Quiero una demo gratuita →</button>
		<p class="form-note">Te mostramos cómo funcionaría en tu negocio. Sin compromiso.</p>
	</form>

	<div data-form-success style="display:none;text-align:center;padding:2rem 0">
		<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF5B14" stroke-width="2" style="margin:0 auto 1rem"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
		<h3 class="h3" style="margin-bottom:.5rem">¡Demo solicitada!</h3>
		<p class="muted" style="font-size:.875rem" data-success-msg>Nos ponemos en contacto contigo en menos de 24 horas para mostrarte el chatbot en acción.</p>
	</div>
</div>
