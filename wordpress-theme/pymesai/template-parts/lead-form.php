<?php
/**
 * Formulario de lista de clientes (sector / ciudad / email).
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<div class="glass-card" style="padding:1.5rem;text-align:left" data-form-wrap>
	<form data-pymes-form="clientes" novalidate>
		<div class="field">
			<label for="s_sector">Sector <span class="req">*</span></label>
			<select class="input-glass" id="s_sector" name="sector" required data-required data-msg="Selecciona un sector" style="cursor:pointer">
				<option value="" style="background:#04071c">Selecciona tu sector</option>
				<?php foreach ( array( 'Restauración / Hostelería', 'Clínicas / Salud', 'Inmobiliarias', 'Ecommerce', 'Construcción', 'Comercio local' ) as $s ) : ?>
					<option value="<?php echo esc_attr( $s ); ?>" style="background:#04071c"><?php echo esc_html( $s ); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
		<div class="field">
			<label for="s_ciudad">Ciudad <span class="req">*</span></label>
			<input class="input-glass" id="s_ciudad" name="ciudad" type="text" placeholder="p.ej. Madrid" required data-required data-msg="La ciudad es obligatoria">
		</div>
		<div class="field">
			<label for="s_email">Email <span class="req">*</span></label>
			<input class="input-glass" id="s_email" name="email" type="email" autocomplete="email" placeholder="tu@empresa.com" required data-required data-validate="email" data-msg="Introduce un email válido">
		</div>
		<button type="submit" class="btn btn-primary btn-block btn-sm">Quiero ver mi muestra →</button>
		<p class="form-note">Muestra gratuita. Sin compromiso.</p>
	</form>

	<div data-form-success style="display:none;text-align:center;padding:2rem 0">
		<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" style="margin:0 auto 1rem"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
		<h3 class="h3" style="margin-bottom:.5rem">¡Listo!</h3>
		<p class="muted" style="font-size:.875rem" data-success-msg>Te enviamos una muestra real de tu sector en menos de 24 horas.</p>
	</div>
</div>
