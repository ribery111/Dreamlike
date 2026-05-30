"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, Target, Map, Zap } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AuditForm } from "@/components/AuditForm";
import { QuizOverlay } from "@/components/QuizOverlay";

const SECTORS = [
  "Restauración", "Clínicas", "Inmobiliarias",
  "Construcción", "Comercio local", "Ecommerce",
];

const DELIVERABLES = [
  {
    icon: Target,
    title: "Perfil de cliente ideal",
    desc: "Quién es, dónde está, qué busca y cuándo compra.",
  },
  {
    icon: Map,
    title: "Análisis de mercado",
    desc: "Competencia real, oportunidades sin explotar, puntos de entrada.",
  },
  {
    icon: Zap,
    title: "Canales prioritarios",
    desc: "Dónde debes estar presente y dónde estás perdiendo el tiempo.",
  },
  {
    icon: FileText,
    title: "Plan de acción",
    desc: "Los 3 primeros pasos para conseguir tus próximas ventas.",
  },
];

const IDEA_STEPS = [
  {
    code: "I",
    name: "Intake",
    desc: "Rellenas un formulario de 3 minutos. Nos dices qué haces, a quién le vendes y cuál es tu mayor problema comercial ahora mismo.",
  },
  {
    code: "D",
    name: "Diagnóstico",
    desc: "Analizamos tu negocio, tu mercado y a tu competencia con datos reales. Nuestro equipo trabaja mientras tú sigues con tu día.",
  },
  {
    code: "E",
    name: "Entrega",
    desc: "En menos de 24 horas recibes tu informe completo. Un documento accionable, no una presentación bonita sin fondo.",
  },
  {
    code: "A",
    name: "Acción",
    desc: "Te acompañamos en la implementación si quieres convertir el diagnóstico en resultados reales.",
    optional: true,
  },
];

const OBJECIONES = [
  {
    q: "Ya probé marketing y no funcionó.",
    a: "El problema no fue el marketing. Fue no saber a quién dirigirlo. La auditoría resuelve eso primero, antes de gastar un euro más.",
  },
  {
    q: "No sé si vale lo que cuesta.",
    a: "Una sola venta que salga del informe cubre con creces la inversión. Y si no ves valor real en el documento, no te cobramos.",
  },
  {
    q: "No tengo tiempo para reuniones.",
    a: "No hay reuniones. Rellenas un formulario de 3 minutos. En menos de 24 horas tienes el informe en tu bandeja de entrada.",
  },
];

export default function Auditorias() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleQuizComplete = (qualify: boolean) => {
    if (qualify) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  return (
    <>
      <QuizOverlay onComplete={handleQuizComplete} />

      {/* HERO */}
      <section data-acf-field="hero_auditorias" className="pt-16">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(15, 23, 42)"
          gradientBackgroundEnd="rgb(8, 15, 35)"
          firstColor="37, 99, 235"
          secondColor="29, 78, 216"
          thirdColor="15, 23, 42"
          fourthColor="30, 58, 138"
          fifthColor="15, 23, 42"
          pointerColor="96, 165, 250"
          containerClassName="min-h-[85vh] h-auto py-24"
          interactive={true}
        >
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <span className="bg-[#2563EB]/20 text-[#93C5FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#2563EB]/30">
              Auditoría Comercial
            </span>
            <h1
              className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              data-acf-field="auditorias_h1"
            >
              Descubre dónde están tus próximos clientes.{" "}
              <span className="text-[#2563EB]">En menos de 24 horas.</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl" data-acf-field="auditorias_subtitle">
              Analizamos tu negocio, identificamos a tu cliente ideal y te entregamos un informe accionable con datos reales. Sin teoría. Sin esperas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-slate-300">
              {["Entrega en <24h", "Datos verificados", "Sin compromiso"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-[#2563EB]" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#formulario"
                className="bg-[#2563EB] hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center gap-2 min-h-[48px] justify-center"
              >
                Quiero mi auditoría <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="#como-funciona"
                className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-lg transition-colors min-h-[48px] flex items-center justify-center"
              >
                Ver cómo funciona
              </Link>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="para_quien">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] mb-10 text-center">
            Esta auditoría es para ti si...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              "Tienes un buen negocio pero no sabes exactamente a quién dirigirte ni cómo encontrarlos.",
              "Ya has gastado dinero en marketing y los resultados no justificaron la inversión.",
              "Trabajas por recomendaciones o inercia, sin un sistema claro para conseguir clientes nuevos.",
              "Tienes una tienda online con tráfico pero no sabes por qué no convierte ni a quién atacar.",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#F1F5F9] rounded-xl p-5">
                <CheckCircle size={20} className="text-[#2563EB] mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-[#0F172A] text-sm leading-relaxed">{t}</p>
              </div>
            ))}
          </div>

          {/* Sector tags */}
          <div className="flex flex-wrap justify-center gap-2" aria-label="Sectores">
            {SECTORS.map((s) => (
              <span
                key={s}
                className="bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#BFDBFE]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="bg-[#F1F5F9] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="que_incluye">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
              Un documento profesional.
            </h2>
            <p className="text-[#64748B]">No un PDF genérico.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DELIVERABLES.map((d) => (
              <article key={d.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                  <d.icon size={20} className="text-[#2563EB]" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#0F172A] mb-2">{d.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTODO IDEA */}
      <section id="como-funciona" className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="metodo_idea">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-3">
              Tres pasos. Menos de 24 horas.
            </h2>
            <p className="text-slate-400">Sin reuniones previas.</p>
          </div>
          <div className="space-y-4">
            {IDEA_STEPS.map((s, i) => (
              <div key={s.code} className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shrink-0 font-[family-name:var(--font-poppins)] font-bold text-white">
                  {s.code}
                </div>
                <div className="flex-1 pb-6 border-b border-slate-800 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white">
                      {i + 1}. {s.name}
                    </h3>
                    {s.optional && (
                      <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">
                        Opcional
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="bg-white py-14 px-4 sm:px-6 lg:px-8" data-acf-field="social_proof_auditorias">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-10">
            {[
              { stat: "+10 años", label: "en el sector" },
              { stat: "<24h", label: "entrega garantizada" },
              { stat: "100%", label: "datos verificados" },
            ].map((s) => (
              <div key={s.stat}>
                <div className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#2563EB] mb-1">{s.stat}</div>
                <div className="text-[#64748B] text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center" data-acf-field="testimonios">
            <p className="text-slate-400 text-xs">Espacio reservado para testimonios de clientes</p>
          </div>
        </div>
      </section>

      {/* OBJECIONES */}
      <section className="bg-[#F1F5F9] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="objeciones">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] text-center mb-10">
            Lo que seguramente estás pensando
          </h2>
          <div className="space-y-4">
            {OBJECIONES.map((o) => (
              <details
                key={o.q}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-[family-name:var(--font-poppins)] font-semibold text-[#0F172A] text-sm hover:text-[#2563EB] transition-colors select-none min-h-[56px]">
                  {o.q}
                  <span className="text-[#2563EB] ml-4 text-lg leading-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-5 text-[#64748B] text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {o.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section ref={formRef} id="formulario" className="bg-[#0F172A] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="formulario_section">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-3">
            Empieza aquí. Sin compromiso.
          </h2>
          <p className="text-slate-400 mb-8">
            Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.
          </p>
          <AuditForm id="formulario" dark={true} />
        </div>
      </section>
    </>
  );
}
