<?php
/**
 * Registro de campos ACF por código.
 * Aparecen automáticamente al activar ACF (Pro para repeaters).
 *
 * @package PymesAI
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action( 'acf/init', 'pymesai_register_acf_fields' );
function pymesai_register_acf_fields() {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) { return; }

	/* Helpers cortos */
	$txt   = function ( $key, $label, $default = '' ) {
		return array( 'key' => $key, 'label' => $label, 'name' => substr( $key, 6 ), 'type' => 'text', 'default_value' => $default );
	};
	$area  = function ( $key, $label, $default = '' ) {
		return array( 'key' => $key, 'label' => $label, 'name' => substr( $key, 6 ), 'type' => 'textarea', 'rows' => 3, 'default_value' => $default );
	};

	/* =====================================================
	 * HOME (front page)
	 * ===================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_home',
		'title'    => 'Inicio — Contenido',
		'fields'   => array(
			array( 'key' => 'field_h_eyebrow', 'label' => 'Etiqueta superior', 'name' => 'h_eyebrow', 'type' => 'text', 'default_value' => 'Inteligencia. Datos. Resultados.' ),
			array( 'key' => 'field_h_title_1', 'label' => 'Título (1ª parte)', 'name' => 'h_title_1', 'type' => 'text', 'default_value' => 'Más clientes para tu negocio.' ),
			array( 'key' => 'field_h_title_2', 'label' => 'Título (parte azul)', 'name' => 'h_title_2', 'type' => 'text', 'default_value' => 'Con datos reales.' ),
			array( 'key' => 'field_h_subtitle', 'label' => 'Subtítulo', 'name' => 'h_subtitle', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él. En menos de 24 horas.' ),
			array( 'key' => 'field_h_cta_primary', 'label' => 'Botón principal (texto)', 'name' => 'h_cta_primary', 'type' => 'text', 'default_value' => 'Quiero mi auditoría gratuita' ),
			array( 'key' => 'field_h_cta_secondary', 'label' => 'Botón secundario (texto)', 'name' => 'h_cta_secondary', 'type' => 'text', 'default_value' => 'Ver cómo funciona' ),

			array( 'key' => 'field_h_problem_title', 'label' => 'Problema — título', 'name' => 'h_problem_title', 'type' => 'text', 'default_value' => 'Si te reconoces en esto, es para ti.' ),
			array( 'key' => 'field_h_problems', 'label' => 'Problema — lista', 'name' => 'h_problems', 'type' => 'repeater', 'button_label' => 'Añadir punto', 'sub_fields' => array(
				array( 'key' => 'field_h_problem_text', 'label' => 'Texto', 'name' => 'text', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_h_sol_title', 'label' => 'Soluciones — título', 'name' => 'h_sol_title', 'type' => 'text', 'default_value' => 'Tres formas de conseguir más clientes' ),
			array( 'key' => 'field_h_solutions', 'label' => 'Soluciones (3)', 'name' => 'h_solutions', 'type' => 'repeater', 'button_label' => 'Añadir solución', 'sub_fields' => array(
				array( 'key' => 'field_h_sol_t', 'label' => 'Título', 'name' => 'title', 'type' => 'text' ),
				array( 'key' => 'field_h_sol_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
				array( 'key' => 'field_h_sol_c', 'label' => 'Botón (texto)', 'name' => 'cta', 'type' => 'text' ),
				array( 'key' => 'field_h_sol_l', 'label' => 'Enlace (URL)', 'name' => 'url', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_h_stats', 'label' => 'Estadísticas (3)', 'name' => 'h_stats', 'type' => 'repeater', 'button_label' => 'Añadir stat', 'sub_fields' => array(
				array( 'key' => 'field_h_stat_n', 'label' => 'Número', 'name' => 'num', 'type' => 'text' ),
				array( 'key' => 'field_h_stat_l', 'label' => 'Etiqueta', 'name' => 'label', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_h_cta_title', 'label' => 'CTA final — título', 'name' => 'h_cta_title', 'type' => 'text', 'default_value' => 'Empieza hoy. Sin compromiso.' ),
			array( 'key' => 'field_h_cta_sub', 'label' => 'CTA final — subtítulo', 'name' => 'h_cta_sub', 'type' => 'text', 'default_value' => 'Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.' ),
		),
		'location' => array( array( array( 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ) ) ),
	) );

	/* =====================================================
	 * AUDITORÍAS
	 * ===================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_auditorias',
		'title'    => 'Auditorías — Contenido',
		'fields'   => array(
			array( 'key' => 'field_a_eyebrow', 'label' => 'Etiqueta', 'name' => 'a_eyebrow', 'type' => 'text', 'default_value' => 'Auditoría Comercial' ),
			array( 'key' => 'field_a_title_1', 'label' => 'Título (1ª parte)', 'name' => 'a_title_1', 'type' => 'text', 'default_value' => 'Descubre dónde están tus próximos clientes.' ),
			array( 'key' => 'field_a_title_2', 'label' => 'Título (parte azul)', 'name' => 'a_title_2', 'type' => 'text', 'default_value' => 'En menos de 24 horas.' ),
			array( 'key' => 'field_a_subtitle', 'label' => 'Subtítulo', 'name' => 'a_subtitle', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Analizamos tu negocio, identificamos a tu cliente ideal y te entregamos un informe accionable con datos reales. Sin teoría. Sin esperas.' ),

			array( 'key' => 'field_a_forwho_title', 'label' => 'Para quién — título', 'name' => 'a_forwho_title', 'type' => 'text', 'default_value' => 'Esta auditoría es para ti si...' ),
			array( 'key' => 'field_a_forwho', 'label' => 'Para quién — lista', 'name' => 'a_forwho', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_a_fw_t', 'label' => 'Texto', 'name' => 'text', 'type' => 'text' ),
			) ),
			array( 'key' => 'field_a_sectors', 'label' => 'Sectores (pills)', 'name' => 'a_sectors', 'type' => 'repeater', 'button_label' => 'Añadir sector', 'sub_fields' => array(
				array( 'key' => 'field_a_sec_t', 'label' => 'Sector', 'name' => 'text', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_a_deliver_title', 'label' => 'Qué incluye — título', 'name' => 'a_deliver_title', 'type' => 'text', 'default_value' => 'Un documento profesional.' ),
			array( 'key' => 'field_a_deliverables', 'label' => 'Entregables', 'name' => 'a_deliverables', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_a_del_t', 'label' => 'Título', 'name' => 'title', 'type' => 'text' ),
				array( 'key' => 'field_a_del_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
			) ),

			array( 'key' => 'field_a_idea_title', 'label' => 'Método — título', 'name' => 'a_idea_title', 'type' => 'text', 'default_value' => 'Tres pasos. Menos de 24 horas.' ),
			array( 'key' => 'field_a_steps', 'label' => 'Pasos del método', 'name' => 'a_steps', 'type' => 'repeater', 'button_label' => 'Añadir paso', 'sub_fields' => array(
				array( 'key' => 'field_a_step_n', 'label' => 'Nombre', 'name' => 'name', 'type' => 'text' ),
				array( 'key' => 'field_a_step_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
				array( 'key' => 'field_a_step_o', 'label' => 'Opcional', 'name' => 'optional', 'type' => 'true_false', 'ui' => 1 ),
			) ),

			array( 'key' => 'field_a_stats', 'label' => 'Estadísticas', 'name' => 'a_stats', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_a_stat_n', 'label' => 'Número', 'name' => 'num', 'type' => 'text' ),
				array( 'key' => 'field_a_stat_l', 'label' => 'Etiqueta', 'name' => 'label', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_a_obj_title', 'label' => 'Objeciones — título', 'name' => 'a_obj_title', 'type' => 'text', 'default_value' => 'Lo que seguramente estás pensando' ),
			array( 'key' => 'field_a_objections', 'label' => 'Objeciones', 'name' => 'a_objections', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_a_obj_q', 'label' => 'Pregunta', 'name' => 'q', 'type' => 'text' ),
				array( 'key' => 'field_a_obj_a', 'label' => 'Respuesta', 'name' => 'a', 'type' => 'textarea', 'rows' => 2 ),
			) ),

			array( 'key' => 'field_a_form_title', 'label' => 'Formulario — título', 'name' => 'a_form_title', 'type' => 'text', 'default_value' => 'Empieza aquí. Sin compromiso.' ),
			array( 'key' => 'field_a_form_sub', 'label' => 'Formulario — subtítulo', 'name' => 'a_form_sub', 'type' => 'text', 'default_value' => 'Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.' ),
		),
		'location' => array( array( array( 'param' => 'page_template', 'operator' => '==', 'value' => 'page-auditorias.php' ) ) ),
	) );

	/* =====================================================
	 * CLIENTES
	 * ===================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_clientes',
		'title'    => 'Clientes — Contenido',
		'fields'   => array(
			array( 'key' => 'field_c_eyebrow', 'label' => 'Etiqueta', 'name' => 'c_eyebrow', 'type' => 'text', 'default_value' => 'Listas de Clientes Potenciales' ),
			array( 'key' => 'field_c_title_1', 'label' => 'Título (1ª parte)', 'name' => 'c_title_1', 'type' => 'text', 'default_value' => 'Tu próximo cliente ya existe.' ),
			array( 'key' => 'field_c_title_2', 'label' => 'Título (parte azul)', 'name' => 'c_title_2', 'type' => 'text', 'default_value' => 'Solo hay que encontrarlo.' ),
			array( 'key' => 'field_c_subtitle', 'label' => 'Subtítulo', 'name' => 'c_subtitle', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Te entregamos listas de clientes potenciales reales, filtradas por sector, zona y perfil. Datos verificados, listos para contactar.' ),

			array( 'key' => 'field_c_what_title', 'label' => 'Qué es — título', 'name' => 'c_what_title', 'type' => 'text', 'default_value' => '¿Qué es exactamente?' ),
			array( 'key' => 'field_c_what_text', 'label' => 'Qué es — texto', 'name' => 'c_what_text', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Una lista de empresas o personas que encajan con tu cliente ideal, en tu zona y sector, con datos de contacto verificados y listos para usar.' ),

			array( 'key' => 'field_c_uses', 'label' => 'Usos por sector', 'name' => 'c_uses', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_c_use_s', 'label' => 'Sector', 'name' => 'sector', 'type' => 'text' ),
				array( 'key' => 'field_c_use_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
			) ),

			array( 'key' => 'field_c_form_title', 'label' => 'CTA — título', 'name' => 'c_form_title', 'type' => 'text', 'default_value' => 'Quiero ver una muestra de mi sector.' ),
			array( 'key' => 'field_c_form_sub', 'label' => 'CTA — subtítulo', 'name' => 'c_form_sub', 'type' => 'text', 'default_value' => 'Sin compromiso. Recibirás datos reales en menos de 24 horas.' ),
		),
		'location' => array( array( array( 'param' => 'page_template', 'operator' => '==', 'value' => 'page-clientes.php' ) ) ),
	) );

	/* =====================================================
	 * CHATBOTS
	 * ===================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_chatbots',
		'title'    => 'Chatbots — Contenido',
		'fields'   => array(
			array( 'key' => 'field_cb_eyebrow', 'label' => 'Etiqueta', 'name' => 'cb_eyebrow', 'type' => 'text', 'default_value' => 'Chatbots para Pymes y Ecommerce' ),
			array( 'key' => 'field_cb_title_1', 'label' => 'Título (1ª parte)', 'name' => 'cb_title_1', 'type' => 'text', 'default_value' => 'Responde a tus clientes' ),
			array( 'key' => 'field_cb_title_2', 'label' => 'Título (parte azul)', 'name' => 'cb_title_2', 'type' => 'text', 'default_value' => '24/7 sin estar tú.' ),
			array( 'key' => 'field_cb_subtitle', 'label' => 'Subtítulo', 'name' => 'cb_subtitle', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Configuramos un asistente inteligente para tu negocio que atiende, informa y capta clientes mientras tú duermes.' ),

			array( 'key' => 'field_cb_problem_title', 'label' => 'Problema — título', 'name' => 'cb_problem_title', 'type' => 'text', 'default_value' => '¿Cuánto tiempo pierdes respondiendo siempre lo mismo?' ),
			array( 'key' => 'field_cb_problems', 'label' => 'Problema — lista', 'name' => 'cb_problems', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_cb_prob_t', 'label' => 'Texto', 'name' => 'text', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_cb_functions', 'label' => 'Funciones del chatbot', 'name' => 'cb_functions', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_cb_fn_t', 'label' => 'Texto', 'name' => 'text', 'type' => 'text' ),
			) ),

			array( 'key' => 'field_cb_cases', 'label' => 'Casos de uso', 'name' => 'cb_cases', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_cb_case_s', 'label' => 'Sector', 'name' => 'sector', 'type' => 'text' ),
				array( 'key' => 'field_cb_case_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
			) ),

			array( 'key' => 'field_cb_steps', 'label' => 'Cómo funciona (pasos)', 'name' => 'cb_steps', 'type' => 'repeater', 'button_label' => 'Añadir', 'sub_fields' => array(
				array( 'key' => 'field_cb_step_t', 'label' => 'Título', 'name' => 'title', 'type' => 'text' ),
				array( 'key' => 'field_cb_step_d', 'label' => 'Descripción', 'name' => 'desc', 'type' => 'textarea', 'rows' => 2 ),
			) ),

			array( 'key' => 'field_cb_result_stat', 'label' => 'Resultado — % grande', 'name' => 'cb_result_stat', 'type' => 'text', 'default_value' => '67%' ),
			array( 'key' => 'field_cb_result_text', 'label' => 'Resultado — texto', 'name' => 'cb_result_text', 'type' => 'text', 'default_value' => 'de las consultas frecuentes se pueden automatizar desde el primer día.' ),

			array( 'key' => 'field_cb_form_title', 'label' => 'CTA — título', 'name' => 'cb_form_title', 'type' => 'text', 'default_value' => 'Quiero una demo gratuita.' ),
			array( 'key' => 'field_cb_form_sub', 'label' => 'CTA — subtítulo', 'name' => 'cb_form_sub', 'type' => 'text', 'default_value' => 'Te mostramos cómo funcionaría en tu negocio específico.' ),
		),
		'location' => array( array( array( 'param' => 'page_template', 'operator' => '==', 'value' => 'page-chatbots.php' ) ) ),
	) );
}
