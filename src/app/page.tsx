"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BarChart2, Users, MessageSquare } from "lucide-react";
import { PulsingBorder } from "@paper-design/shaders-react";
import { AuditForm } from "@/components/AuditForm";
import { GlowingShadow } from "@/components/ui/glowing-shadow";

export default function Home() {
  return (
    <>
      {/* HERO — full-screen, bottom-left layout */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 pt-24">
        {/* SVG filtros */}
        <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
          <defs>
            <filter id="glass-fx" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix type="matrix"
                values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0" />
            </filter>
            <filter id="text-glow-h" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <div className="max-w-2xl" data-acf-field="hero_home">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10 relative"
            style={{ filter: "url(#glass-fx)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-white/90 text-sm font-medium tracking-wide">
              ✦ Inteligencia. Datos. Resultados.
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-[family-name:var(--font-poppins)] font-bold text-white leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem,7vw,5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-acf-field="hero_h1"
          >
            <span
              className="block font-light mb-1"
              style={{
                fontSize: "clamp(1.6rem,4vw,2.8rem)",
                background: "linear-gradient(135deg,#fff 0%,#FF5B14 40%,#FFBA08 70%,#fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#text-glow-h)",
              }}
            >
              Más clientes para tu negocio.
            </span>
            <span className="block font-black text-white drop-shadow-2xl">Con datos</span>
            <span className="block font-light text-white/80 italic">reales.</span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-base font-light text-white/65 mb-8 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            data-acf-field="hero_subtitle"
          >
            Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él.{" "}
            <strong className="text-white/85 font-medium">En menos de 24 horas.</strong>
          </motion.p>

          {/* Badges trust */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {["Entrega en <24h", "Sin compromiso", "Datos verificados"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/60">
                <CheckCircle size={14} className="text-orange-400" aria-hidden="true" />{t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link href="/auditorias"
              className="px-8 py-3.5 rounded-full bg-transparent border border-white/30 text-white font-medium text-sm hover:bg-white/10 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 min-h-[48px]">
              Ver cómo funciona
            </Link>
            <Link href="/auditorias#formulario"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5B14] to-[#FFBA08] text-white font-semibold text-sm hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center gap-2 min-h-[48px]">
              Quiero mi auditoría gratis <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* PulsingBorder — bottom right */}
        <div className="absolute bottom-8 right-6 sm:right-8 z-10">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <PulsingBorder
              colors={["#FF5B14", "#FFBA08", "#E8185C", "#ffffff", "#FF5B14"]}
              colorBack="#00000000"
              speed={1.5}
              roundness={1}
              thickness={0.1}
              softness={0.2}
              intensity={5}
              spotsPerColor={5}
              spotSize={0.1}
              pulse={0.1}
              smoke={0.5}
              smokeSize={4}
              scale={0.65}
              rotation={0}
              style={{ width: "60px", height: "60px", borderRadius: "50%" }}
            />
            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transform: "scale(1.6)" }}
            >
              <defs>
                <path id="hcircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="Inter,sans-serif">
                <textPath href="#hcircle" startOffset="0%">
                  PymesAI • Datos Reales • 24h • PymesAI •
                </textPath>
              </text>
            </motion.svg>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="problema_section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-12">
            Si te reconoces en esto, es para ti.
          </h2>
          <ul className="space-y-4 text-left" aria-label="Situaciones comunes">
            {[
              "Llevas tiempo buscando clientes sin un método claro.",
              "Has gastado en marketing y no sabes por qué no funcionó.",
              "Tu negocio depende de recomendaciones y no tienes control sobre las ventas.",
            ].map((t) => (
              <li key={t} className="glass-card flex items-start gap-4 p-5 transition-all hover:border-orange-500/20">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shrink-0 shadow-[0_0_6px_rgba(255,91,20,0.8)]" aria-hidden="true" />
                <p className="text-white/75 text-base leading-relaxed">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="soluciones_section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white text-center mb-14">
            Tres formas de conseguir más clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BarChart2, title: "Auditoría Comercial", desc: "Descubre dónde están tus próximos clientes.", cta: "Solicitar auditoría", href: "/auditorias", primary: true },
              { icon: Users, title: "Lista de Clientes", desc: "Tu próximo cliente ya existe. Hay que encontrarlo.", cta: "Ver listas", href: "/clientes", primary: false },
              { icon: MessageSquare, title: "Chatbots", desc: "Responde a tus clientes 24/7 sin estar tú.", cta: "Ver chatbots", href: "/chatbots", primary: false },
            ].map((s) => (
              <article key={s.title} className="glass-card p-7 flex flex-col gap-4 hover:border-orange-500/30 transition-all duration-200">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,91,20,0.15)", border: "1px solid rgba(255,91,20,0.25)" }}>
                  <s.icon size={22} className="text-orange-400" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed flex-1">{s.desc}</p>
                <Link href={s.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm py-2.5 px-5 rounded-xl transition-all min-h-[44px] ${
                    s.primary
                      ? "bg-gradient-to-r from-[#FF5B14] to-[#FFBA08] text-white shadow-[0_0_16px_rgba(255,91,20,0.3)]"
                      : "border border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  }`}>
                  {s.cta} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="social_proof">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {[
              { stat: "+10 años", label: "de experiencia en captación comercial" },
              { stat: "<24h", label: "entrega garantizada" },
              { stat: "100%", label: "datos verificados" },
            ].map((s) => (
              <GlowingShadow key={s.stat}>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white leading-none mb-1">{s.stat}</span>
                  <span className="text-white/50 text-xs leading-tight max-w-[120px]">{s.label}</span>
                </div>
              </GlowingShadow>
            ))}
          </div>
          <div className="glass-card p-6 text-center" data-acf-field="client_logos">
            <p className="text-white/20 text-xs">Espacio reservado para logos de clientes</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-acf-field="cta_final_home">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-3">
            Empieza hoy. Sin compromiso.
          </h2>
          <p className="text-white/50 mb-10">Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.</p>
          <AuditForm id="cta-home" />
        </div>
      </section>
    </>
  );
}
