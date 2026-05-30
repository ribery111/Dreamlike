"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CheckCircle, Clock, MessageSquare,
  ShoppingCart, Zap, PhoneCall, Star,
} from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

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
  {
    n: "01",
    title: "Lo configuramos",
    desc: "Analizamos tu negocio y definimos las preguntas y respuestas clave.",
  },
  {
    n: "02",
    title: "Lo conectamos",
    desc: "Lo integramos en tu web, WhatsApp Business o ambos.",
  },
  {
    n: "03",
    title: "Empieza a trabajar",
    desc: "En menos de 7 días tu chatbot ya está atendiendo clientes.",
  },
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
    return Object.keys(e).length === 0;
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="mx-auto mb-4 text-[#2563EB]" size={40} />
        <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white text-lg mb-2">
          ¡Demo solicitada!
        </h3>
        <p className="text-slate-400 text-sm">
          Nos ponemos en contacto contigo en menos de 24 horas para mostrarte el chatbot en acción.
        </p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[44px]";

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (validate()) setSent(true); }} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nombre_chat" className="block text-sm font-medium text-slate-200 mb-1.5">
          Nombre <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="nombre_chat"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          className={inputCls}
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          aria-required="true"
        />
        {errors.nombre && <p className="text-red-400 text-xs mt-1" role="alert">{errors.nombre}</p>}
      </div>

      <div>
        <label htmlFor="tipo_chat" className="block text-sm font-medium text-slate-200 mb-1.5">
          Tipo de negocio <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="tipo_chat"
          type="text"
          placeholder="p.ej. Restaurante, Clínica, Tienda online..."
          className={inputCls}
          value={form.tipo_negocio}
          onChange={(e) => setForm({ ...form, tipo_negocio: e.target.value })}
          aria-required="true"
        />
        {errors.tipo_negocio && <p className="text-red-400 text-xs mt-1" role="alert">{errors.tipo_negocio}</p>}
      </div>

      <div>
        <label htmlFor="telefono_chat" className="block text-sm font-medium text-slate-200 mb-1.5">
          Teléfono <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <input
          id="telefono_chat"
          type="tel"
          autoComplete="tel"
          placeholder="+34 600 000 000"
          className={inputCls}
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          aria-required="true"
        />
        {errors.telefono && <p className="text-red-400 text-xs mt-1" role="alert">{errors.telefono}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px] flex items-center justify-center gap-2"
      >
        Quiero una demo gratuita <ArrowRight size={16} />
      </button>
      <p className="text-xs text-center text-slate-500">
        Te mostramos cómo funcionaría en tu negocio específico. Sin compromiso.
      </p>
    </form>
  );
}

export default function Chatbots() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16" data-acf-field="hero_chatbots">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(15, 23, 42)"
          gradientBackgroundEnd="rgb(15, 23, 42)"
          firstColor="37, 99, 235"
          secondColor="29, 78, 216"
          thirdColor="30, 58, 138"
          fourthColor="15, 23, 42"
          fifthColor="55, 65, 81"
          pointerColor="96, 165, 250"
          containerClassName="min-h-[75vh] h-auto py-24"
        >
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <span className="bg-[#2563EB]/20 text-[#93C5FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#2563EB]/30">
              Chatbots para Pymes y Ecommerce
            </span>
            <h1
              className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              data-acf-field="chatbots_h1"
            >
              Responde a tus clientes{" "}
              <span className="text-[#2563EB]">24/7 sin estar tú.</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Configuramos un asistente inteligente para tu negocio que atiende, informa y capta clientes mientras tú duermes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-slate-300">
              {["Configurado en <7 días", "Sin conocimientos técnicos", "Funciona en WhatsApp y web"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-[#2563EB]" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="#demo"
              className="bg-[#2563EB] hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center gap-2 min-h-[48px]"
            >
              Quiero una demo gratuita <ArrowRight size={18} />
            </Link>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* PROBLEMA */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="problema_chatbots">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock size={26} className="text-amber-500" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] mb-10">
            ¿Cuánto tiempo pierdes respondiendo siempre lo mismo?
          </h2>
          <div className="space-y-4 text-left">
            {[
              "Horas al día respondiendo WhatsApps con las mismas preguntas.",
              "Clientes que preguntan fuera de horario y no reciben respuesta.",
              "Carritos abandonados en tu tienda porque nadie resolvió la duda a tiempo.",
              "Leads que llegan pero tardan horas en recibir respuesta y se enfrían.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-4 bg-[#F1F5F9] rounded-xl p-5">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0" aria-hidden="true" />
                <p className="text-[#0F172A] text-sm leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ HACE */}
      <section className="bg-[#F1F5F9] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="que_hace">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0F172A] text-center mb-10">
            Lo que hace el chatbot por ti
          </h2>
          <ol className="space-y-4" aria-label="Funciones del chatbot">
            {CHATBOT_FUNCTIONS.map((f, i) => (
              <li key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-slate-100">
                <span className="w-7 h-7 bg-[#2563EB] rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <p className="text-[#0F172A] text-sm leading-relaxed">{f}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="casos_uso">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0F172A] text-center mb-10">
            Cómo funciona en tu tipo de negocio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {USE_CASES.map((u) => (
              <article key={u.sector} className="bg-[#F1F5F9] rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                  <u.icon size={20} className="text-[#2563EB]" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#0F172A] mb-2">{u.sector}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="como_funciona_chatbot">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white text-center mb-12">
            Tres pasos y tu chatbot ya funciona
          </h2>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#2563EB]/20 border border-[#2563EB]/40 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-[#2563EB] font-bold text-sm">{s.n}</span>
                </div>
                <div className={`flex-1 pb-6 ${i < STEPS.length - 1 ? "border-b border-slate-800" : ""}`}>
                  <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADO */}
      <section className="bg-[#EFF6FF] py-14 px-4 sm:px-6 lg:px-8" data-acf-field="resultado">
        <div className="max-w-2xl mx-auto text-center">
          <Zap size={36} className="text-[#2563EB] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0F172A] mb-3">
            Tu equipo deja de responder lo mismo 40 veces al día.
          </h2>
          <p className="text-[#2563EB] text-4xl font-bold font-[family-name:var(--font-poppins)] my-4">67%</p>
          <p className="text-[#64748B] text-sm">
            de las consultas frecuentes se pueden automatizar desde el primer día.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="demo" className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="cta_chatbots">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-3">
            Quiero una demo gratuita.
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Te mostramos cómo funcionaría en tu negocio específico.
          </p>
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 md:p-8 text-left">
            <ChatbotForm />
          </div>
        </div>
      </section>
    </>
  );
}
