"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, MessageSquare, ShoppingCart, Zap, PhoneCall, Star } from "lucide-react";

const CHATBOT_FUNCTIONS = [
  "Responde preguntas frecuentes de forma instantánea (horarios, precios, servicios, ubicación).",
  "Califica leads automáticamente antes de pasarlos al equipo humano.",
  "Recoge datos de contacto y los organiza para seguimiento.",
  "Recupera carritos abandonados en ecommerce con mensajes personalizados.",
  "Da información de producto o servicio en tiempo real, 24 horas al día.",
];

const USE_CASES = [
  { sector: "Restaurante", desc: "Gestiona reservas, responde sobre la carta y horarios, capta eventos privados.", icon: Star },
  { sector: "Clínica", desc: "Agenda citas, informa sobre servicios y precios, filtra el tipo de consulta.", icon: PhoneCall },
  { sector: "Ecommerce", desc: "Estado de pedidos, gestión de devoluciones, recomendaciones de producto.", icon: ShoppingCart },
  { sector: "Inmobiliaria", desc: "Califica compradores, responde sobre propiedades, agenda visitas.", icon: MessageSquare },
];

const STEPS = [
  { n: "01", title: "Lo configuramos", desc: "Analizamos tu negocio y definimos las preguntas y respuestas clave." },
  { n: "02", title: "Lo conectamos", desc: "Lo integramos en tu web, WhatsApp Business o ambos." },
  { n: "03", title: "Empieza a trabajar", desc: "En menos de 7 días tu chatbot ya está atendiendo clientes." },
];

function ChatbotForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", tipo_negocio: "", telefono: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.tipo_negocio.trim()) e.tipo_negocio = "El tipo de negocio es obligatorio";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    setErrors(e);
    return !Object.keys(e).length;
  };

  if (sent) {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle className="mx-auto mb-4 text-blue-400" size={40} />
        <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white text-lg mb-2">¡Demo solicitada!</h3>
        <p className="text-white/55 text-sm">Nos ponemos en contacto contigo en menos de 24 horas para mostrarte el chatbot en acción.</p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm min-h-[44px] input-glass";

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (validate()) setSent(true); }} className="space-y-4" noValidate>
      {[
        { id: "c_nombre", label: "Nombre", key: "nombre", type: "text", placeholder: "Tu nombre", autocomplete: "name" },
        { id: "c_tipo", label: "Tipo de negocio", key: "tipo_negocio", type: "text", placeholder: "p.ej. Restaurante, Clínica...", autocomplete: "organization" },
        { id: "c_tel", label: "Teléfono", key: "telefono", type: "tel", placeholder: "+34 600 000 000", autocomplete: "tel" },
      ].map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="block text-sm font-medium text-white/70 mb-1.5">
            {f.label} <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input id={f.id} type={f.type} autoComplete={f.autocomplete} placeholder={f.placeholder} className={inputCls}
            value={form[f.key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} aria-required="true" />
          {errors[f.key] && <p className="text-red-400 text-xs mt-1" role="alert">{errors[f.key]}</p>}
        </div>
      ))}
      <button type="submit" className="w-full bg-[#2563EB] hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all min-h-[44px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
        Quiero una demo gratuita <ArrowRight size={16} />
      </button>
      <p className="text-xs text-center text-white/25">Te mostramos cómo funcionaría en tu negocio. Sin compromiso.</p>
    </form>
  );
}

export default function Chatbots() {
  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" data-acf-field="hero_chatbots">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
            Chatbots para Pymes y Ecommerce
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-acf-field="chatbots_h1">
            Responde a tus clientes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">24/7 sin estar tú.</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Configuramos un asistente inteligente para tu negocio que atiende, informa y capta clientes mientras tú duermes.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm">
            {["Configurado en <7 días", "Sin conocimientos técnicos", "Funciona en WhatsApp y web"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/70">
                <CheckCircle size={15} className="text-blue-400" aria-hidden="true" />{t}
              </span>
            ))}
          </div>
          <Link href="#demo" className="bg-[#2563EB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 min-h-[52px] shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
            Quiero una demo gratuita <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="problema_chatbots">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <Clock size={24} className="text-amber-400" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-10">
            ¿Cuánto tiempo pierdes respondiendo siempre lo mismo?
          </h2>
          <div className="space-y-4 text-left">
            {[
              "Horas al día respondiendo WhatsApps con las mismas preguntas.",
              "Clientes que preguntan fuera de horario y no reciben respuesta.",
              "Carritos abandonados en tu tienda porque nadie resolvió la duda a tiempo.",
              "Leads que llegan pero tardan horas en recibir respuesta y se enfrían.",
            ].map((t) => (
              <div key={t} className="glass-card flex items-start gap-4 p-5 hover:border-amber-500/20 transition-all">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0" aria-hidden="true" />
                <p className="text-white/70 text-sm leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ HACE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="que_hace">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white text-center mb-10">Lo que hace el chatbot por ti</h2>
          <ol className="space-y-4">
            {CHATBOT_FUNCTIONS.map((f, i) => (
              <li key={i} className="glass-card flex items-start gap-4 p-5 hover:border-blue-500/20 transition-all">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  style={{ background: "rgba(37,99,235,0.7)", border: "1px solid rgba(37,99,235,0.4)" }}>
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm leading-relaxed">{f}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="casos_uso">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white text-center mb-10">Cómo funciona en tu negocio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USE_CASES.map((u) => (
              <article key={u.sector} className="glass-card p-6 hover:border-blue-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
                  <u.icon size={18} className="text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white mb-2">{u.sector}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="como_funciona_chatbot">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white text-center mb-12">Tres pasos y tu chatbot ya funciona</h2>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
                  <span className="text-blue-400 font-bold text-sm">{s.n}</span>
                </div>
                <div className={`flex-1 pb-6 ${i < STEPS.length - 1 ? "border-b border-white/8" : ""}`}>
                  <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="resultado">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
            <Zap size={24} className="text-blue-400" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white mb-3">
            Tu equipo deja de responder lo mismo 40 veces al día.
          </h2>
          <p className="font-[family-name:var(--font-poppins)] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-500 my-4">67%</p>
          <p className="text-white/50 text-sm">de las consultas frecuentes se pueden automatizar desde el primer día.</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="cta_chatbots">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-3">Quiero una demo gratuita.</h2>
          <p className="text-white/50 mb-10 text-sm">Te mostramos cómo funcionaría en tu negocio específico.</p>
          <div className="glass-card p-6 md:p-8 text-left"><ChatbotForm /></div>
        </div>
      </section>
    </>
  );
}
