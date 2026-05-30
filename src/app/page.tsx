import Link from "next/link";
import { ArrowRight, CheckCircle, BarChart2, Users, MessageSquare } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { GlowingShadow } from "@/components/ui/glowing-shadow";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center" data-acf-field="hero_home">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold text-blue-300 border border-blue-500/20"
            style={{ background: "rgba(37,99,235,0.12)", backdropFilter: "blur(8px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            Inteligencia. Datos. Resultados.
          </div>

          <h1 className="font-[family-name:var(--font-poppins)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-5xl" data-acf-field="hero_h1">
            Más clientes para tu negocio.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
              Con datos reales.
            </span>
          </h1>

          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl" data-acf-field="hero_subtitle">
            Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él.{" "}
            <strong className="text-white/90">En menos de 24 horas.</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-5 mb-12 text-sm">
            {["Entrega en <24h", "Sin compromiso", "Datos verificados"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-white/70">
                <CheckCircle size={15} className="text-blue-400" aria-hidden="true" />{t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auditorias#formulario"
              className="bg-[#2563EB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 min-h-[52px] justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
              Quiero mi auditoría gratuita <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/auditorias"
              className="px-8 py-4 rounded-xl font-medium min-h-[52px] flex items-center justify-center transition-all text-white/70 hover:text-white"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
              Ver cómo funciona
            </Link>
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
              <li key={t} className="glass-card flex items-start gap-4 p-5 transition-all hover:border-blue-500/20">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2.5 shrink-0 shadow-[0_0_6px_rgba(96,165,250,0.8)]" aria-hidden="true" />
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
              <article key={s.title} className="glass-card p-7 flex flex-col gap-4 hover:border-blue-500/30 transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
                  <s.icon size={22} className="text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed flex-1">{s.desc}</p>
                <Link href={s.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm py-2.5 px-5 rounded-xl transition-all min-h-[44px] ${
                    s.primary
                      ? "bg-[#2563EB] hover:bg-blue-500 text-white shadow-[0_0_16px_rgba(37,99,235,0.3)]"
                      : "border border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
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
          {/* Stats con GlowingShadow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {[
              { stat: "+10 años", label: "de experiencia en captación comercial" },
              { stat: "<24h", label: "entrega garantizada" },
              { stat: "100%", label: "datos verificados" },
            ].map((s) => (
              <GlowingShadow key={s.stat}>
                <div className="flex flex-col items-center justify-center text-center px-2">
                  <span className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white leading-none mb-1">
                    {s.stat}
                  </span>
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
