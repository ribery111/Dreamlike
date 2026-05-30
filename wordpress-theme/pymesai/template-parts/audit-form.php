<?php
/**
 * Formulario de auditoría — 2 pasos con barra de progreso.
 * @package PymesAI
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$form_id = isset( $args['id'] ) ? $args['id'] : 'formulario';
?>
<div class="glass-card" style="padding:1.5rem" data-form-wrap>
	<form data-pymes-form="auditoria" id="<?php echo esc_attr( $form_id ); ?>" novalidate>
		<div style="margin-bottom:1.5rem">
			<div class="progress-head">
				<span>Paso <span data-step-now>1</span> de 2</span>
				<span data-step-label>Tu negocio</span>
			</div>
			<div class="progress-track"><div class="progress-bar" style="width:50%"></div></div>
		</div>

		<div data-step="1">
			<div class="field">
				<label for="<?php echo esc_attr( $form_id ); ?>_nombre">Nombre <span class="req">*</span></label>
				<input class="input-glass" id="<?php echo esc_attr( $form_id ); ?>_nombre" name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required data-required data-msg="El nombre es obligatorio">
			</div>
			<div class="field">
				<label for="<?php echo esc_attr( $form_id ); ?>_tipo">Tipo de negocio <span class="req">*</span></label>
				<select class="input-glass" id="<?php echo esc_attr( $form_id ); ?>_tipo" name="tipo_negocio" required data-required data-msg="Selecciona el tipo de negocio" style="cursor:pointer">
					<option value="" style="background:#0a0f2e">Selecciona tu sector</option>
					<?php foreach ( array( 'Restauración / Hostelería', 'Clínica / Salud', 'Inmobiliaria', 'Construcción', 'Comercio local', 'Ecommerce', 'Servicios profesionales', 'Otro' ) as $t ) : ?>
						<option value="<?php echo esc_attr( $t ); ?>" style="background:#0a0f2e"><?php echo esc_html( $t ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
			<button type="button" class="btn btn-primary btn-block btn-sm" data-next data-next-label="Cómo contactarte">
				Continuar
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
			</button>
		</div>

		<div data-step="2" style="display:none">
			<div class="field">
				<label for="<?php echo esc_attr( $form_id ); ?>_ciudad">Ciudad / Zona <span class="req">*</span></label>
				<input class="input-glass" id="<?php echo esc_attr( $form_id ); ?>_ciudad" name="ciudad" type="text" autocomplete="address-level2" placeholder="p.ej. Madrid, Barcelona..." required data-required data-msg="La ciudad es obligatoria">
			</div>
			<div class="field">
				<label for="<?php echo esc_attr( $form_id ); ?>_tel">Teléfono <span class="req">*</span></label>
				<input class="input-glass" id="<?php echo esc_attr( $form_id ); ?>_tel" name="telefono" type="tel" autocomplete="tel" placeholder="+34 600 000 000" required data-required data-validate="tel" data-msg="El teléfono es obligatorio">
			</div>
			<div style="display:flex;gap:.75rem">
				<button type="button" class="btn btn-ghost btn-sm" data-prev data-prev-label="Tu negocio" style="min-height:44px;padding:0 1rem">Atrás</button>
				<button type="submit" class="btn btn-primary btn-sm" style="flex:1">Quiero mi auditoría gratuita →</button>
			</div>
		</div>
	</form>

	<p class="form-note">Sin spam. Sin compromiso. Recibirás tu informe en menos de 24 horas.</p>

	<div data-form-success style="display:none;text-align:center;padding:2rem 0">
		<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" style="margin:0 auto 1rem"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
		<h3 class="h3" style="margin-bottom:.5rem">Lo hemos recibido.</h3>
		<p class="muted" style="font-size:.875rem" data-success-msg>Nuestro equipo ya está analizando tu caso. Recibirás tu auditoría en menos de 24 horas.</p>
	</div>
</div>
