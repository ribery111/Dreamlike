import Link from "next/link";
import { ArrowRight, CheckCircle, BarChart2, Users, MessageSquare } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { AuditForm } from "@/components/AuditForm";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section data-acf-field="hero_home" className="pt-16">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(15, 23, 42)"
          gradientBackgroundEnd="rgb(15, 23, 42)"
          firstColor="37, 99, 235"
          secondColor="29, 78, 216"
          thirdColor="30, 58, 138"
          fourthColor="15, 23, 42"
          fifthColor="55, 65, 81"
          pointerColor="96, 165, 250"
          containerClassName="min-h-[90vh] h-auto py-24"
          interactive={true}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <h1
              className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl"
              data-acf-field="hero_h1"
            >
              Más clientes para tu negocio.{" "}
              <span className="text-[#2563EB]">Con datos reales.</span>
            </h1>

            <p
              className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
              data-acf-field="hero_subtitle"
            >
              Analizamos tu mercado, identificamos a tu cliente ideal y te decimos exactamente cómo llegar a él.{" "}
              <strong className="text-white">En menos de 24 horas.</strong>
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-slate-300">
              {["Entrega en <24h", "Sin compromiso", "Datos verificados"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={15} className="text-[#2563EB]" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auditorias#formulario"
                className="bg-[#2563EB] hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-150 flex items-center gap-2 min-h-[48px] justify-center"
              >
                Quiero mi auditoría gratuita <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/auditorias"
                className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-lg transition-colors duration-150 min-h-[48px] flex items-center justify-center"
              >
                Ver cómo funciona
              </Link>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* PROBLEMA */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="problema_section">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] mb-12">
            Si te reconoces en esto, es para ti.
          </h2>
          <ul className="space-y-5 text-left" aria-label="Situaciones comunes">
            {[
              "Llevas tiempo buscando clientes sin un método claro.",
              "Has gastado en marketing y no sabes por qué no funcionó.",
              "Tu negocio depende de recomendaciones y no tienes control sobre las ventas.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-4 bg-[#F1F5F9] rounded-xl p-5">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-2.5 shrink-0" aria-hidden="true" />
                <p className="text-[#0F172A] text-base leading-relaxed">{t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SOLUCIONES */}
      <section className="bg-[#F1F5F9] py-20 px-4 sm:px-6 lg:px-8" data-acf-field="soluciones_section">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] text-center mb-12">
            Tres formas de conseguir más clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart2,
                title: "Auditoría Comercial",
                desc: "Descubre dónde están tus próximos clientes.",
                cta: "Solicitar auditoría",
                href: "/auditorias",
                primary: true,
              },
              {
                icon: Users,
                title: "Lista de Clientes",
                desc: "Tu próximo cliente ya existe. Hay que encontrarlo.",
                cta: "Ver listas",
                href: "/clientes",
                primary: false,
              },
              {
                icon: MessageSquare,
                title: "Chatbots",
                desc: "Responde a tus clientes 24/7 sin estar tú.",
                cta: "Ver chatbots",
                href: "/chatbots",
                primary: false,
              },
            ].map((s) => (
              <article
                key={s.title}
                className="bg-white rounded-2xl p-7 flex flex-col gap-4 border border-slate-100 hover:border-[#2563EB]/30 hover:shadow-lg transition-all duration-200"
                data-acf-field="solucion_card"
              >
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center">
                  <s.icon size={24} className="text-[#2563EB]" aria-hidden="true" />
                </div>
                <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-[#0F172A]">
                  {s.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed flex-1">{s.desc}</p>
                <Link
                  href={s.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors min-h-[44px] ${
                    s.primary
                      ? "bg-[#2563EB] text-white hover:bg-blue-600"
                      : "border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF]"
                  }`}
                >
                  {s.cta} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="bg-[#0F172A] py-16 px-4 sm:px-6 lg:px-8" data-acf-field="social_proof">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: "+10 años", label: "de experiencia en captación comercial" },
              { stat: "<24h", label: "entrega garantizada" },
              { stat: "100%", label: "datos verificados" },
            ].map((s) => (
              <div key={s.stat} data-acf-field="stat_item">
                <div className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-[#2563EB] mb-2">
                  {s.stat}
                </div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div
            className="mt-12 border border-dashed border-slate-700 rounded-xl p-6 text-center"
            data-acf-field="client_logos"
          >
            <p className="text-slate-600 text-xs">
              Espacio reservado para logos de clientes
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="cta_final_home">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">
            Empieza hoy. Sin compromiso.
          </h2>
          <p className="text-[#64748B] mb-8">
            Cuéntanos lo básico. Tendrás la auditoría en menos de 24 horas.
          </p>
          <AuditForm id="cta-home" />
        </div>
      </section>
    </>
  );
}
