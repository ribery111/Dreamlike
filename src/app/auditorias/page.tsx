"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, Target, Map, Zap } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { QuizOverlay } from "@/components/QuizOverlay";

const DELIVERABLES = [
  { icon: Target, title: "Perfil de cliente ideal", desc: "Quién es, dónde está, qué busca y cuándo compra." },
  { icon: Map, title: "Análisis de mercado", desc: "Competencia real, oportunidades sin explotar, puntos de entrada." },
  { icon: Zap, title: "Canales prioritarios", desc: "Dónde debes estar presente y dónde estás perdiendo el tiempo." },
  { icon: FileText, title: "Plan de acción", desc: "Los 3 primeros pasos para conseguir tus próximas ventas." },
];

const IDEA_STEPS = [
  { code: "I", name: "Intake", desc: "Rellenas un formulario de 3 minutos. Nos dices qué haces, a quién le vendes y cuál es tu mayor problema comercial ahora mismo." },
  { code: "D", name: "Diagnóstico", desc: "Analizamos tu negocio, tu mercado y a tu competencia con datos reales. Nuestro equipo trabaja mientras tú sigues con tu día." },
  { code: "E", name: "Entrega", desc: "En menos de 24 horas recibes tu informe completo. Un documento accionable, no una presentación bonita sin fondo." },
  { code: "A", name: "Acción", desc: "Te acompañamos en la implementación si quieres convertir el diagnóstico en resultados reales.", optional: true },
];

const OBJECIONES = [
  { q: "Ya probé marketing y no funcionó.", a: "El problema no fue el marketing. Fue no saber a quién dirigirlo. La auditoría resuelve eso primero, antes de gastar un euro más." },
  { q: "No sé si vale lo que cuesta.", a: "Una sola venta que salga del informe cubre con creces la inversión. Y si no ves valor real en el documento, no te cobramos." },
  { q: "No tengo tiempo para reuniones.", a: "No hay reuniones. Rellenas un formulario de 3 minutos. En menos de 24 horas tienes el informe en tu bandeja de entrada." },
];

const SECTORS = ["Restauración", "Clínicas", "Inmobiliarias", "Construcción", "Comercio local", "Ecommerce"];

export default function Auditorias() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <QuizOverlay onComplete={(q) => {
        if (q) setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }} />

      {/* HERO */}
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center" data-acf-field="hero_auditorias">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
            Auditoría Comercial
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-acf-field="auditorias_h1">
            Descubre dónde están tus próximos clientes.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">En menos de 24 horas.</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Analizamos tu negocio, identificamos a tu cliente ideal y te entregamos un informe accionable con datos reales. Sin teoría. Sin esperas.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm">
            {["Entrega en <24h", "Datos verificados", "Sin compromiso"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/70">
                <CheckCircle size={15} className="text-blue-400" aria-hidden="true" />{t}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#formulario"
              className="bg-[#2563EB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 min-h-[52px] justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
              Quiero mi auditoría <ArrowRight size={18} />
            </Link>
            <Link href="#como-funciona"
              className="px-8 py-4 rounded-xl font-medium min-h-[52px] flex items-center justify-center text-white/70 hover:text-white transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
              Ver cómo funciona
            </Link>
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="para_quien">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
            Esta auditoría es para ti si...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              "Tienes un buen negocio pero no sabes exactamente a quién dirigirte ni cómo encontrarlos.",
              "Ya has gastado dinero en marketing y los resultados no justificaron la inversión.",
              "Trabajas por recomendaciones o inercia, sin un sistema claro para conseguir clientes nuevos.",
              "Tienes una tienda online con tráfico pero no sabes por qué no convierte ni a quién atacar.",
            ].map((t, i) => (
              <div key={i} className="glass-card flex items-start gap-4 p-5 hover:border-blue-500/20 transition-all">
                <CheckCircle size={18} className="text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-white/70 text-sm leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {SECTORS.map((s) => (
              <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full text-blue-300"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="que_incluye">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-2">
              Un documento profesional.
            </h2>
            <p className="text-white/40">No un PDF genérico.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DELIVERABLES.map((d) => (
              <article key={d.title} className="glass-card p-6 hover:border-blue-500/20 transition-all">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
                  <d.icon size={18} className="text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white mb-2">{d.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO IDEA */}
      <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="metodo_idea">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-2">
              Tres pasos. Menos de 24 horas.
            </h2>
            <p className="text-white/40">Sin reuniones previas.</p>
          </div>
          <div className="space-y-4">
            {IDEA_STEPS.map((s, i) => (
              <div key={s.code} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-[family-name:var(--font-poppins)] font-bold text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                  style={{ background: "rgba(37,99,235,0.8)", border: "1px solid rgba(37,99,235,0.5)" }}>
                  {s.code}
                </div>
                <div className={`flex-1 pb-6 ${i < IDEA_STEPS.length - 1 ? "border-b border-white/8" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white">{i + 1}. {s.name}</h3>
                    {s.optional && <span className="text-xs text-white/30 border border-white/10 px-2 py-0.5 rounded-full">Opcional</span>}
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-acf-field="social_proof_auditorias">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-10">
            {[{ stat: "+10 años", label: "en el sector" }, { stat: "<24h", label: "entrega garantizada" }, { stat: "100%", label: "datos verificados" }].map((s) => (
              <div key={s.stat}>
                <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-500 mb-1">{s.stat}</div>
                <div className="text-white/40 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="glass-card p-6 text-center" data-acf-field="testimonios">
            <p className="text-white/20 text-xs">Espacio reservado para testimonios de clientes</p>
          </div>
        </div>
      </section>

      {/* OBJECIONES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="objeciones">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white text-center mb-10">
            Lo que seguramente estás pensando
          </h2>
          <div className="space-y-3">
            {OBJECIONES.map((o) => (
              <details key={o.q} className="glass-card group overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-[family-name:var(--font-poppins)] font-semibold text-white text-sm hover:text-blue-300 transition-colors select-none min-h-[56px]">
                  {o.q}
                  <span className="text-blue-400 ml-4 text-lg leading-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/8 pt-4">{o.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section ref={formRef} id="formulario" className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="formulario_section">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-3">
            Empieza aquí. Sin compromiso.
          </h2>
          <p className="text-white/50 mb-10">Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.</p>
          <AuditForm id="formulario" />
        </div>
      </section>
    </>
  );
}
