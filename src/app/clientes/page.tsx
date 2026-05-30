"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Database } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const SECTORS = [
  "Restauración / Hostelería",
  "Clínicas / Salud",
  "Inmobiliarias",
  "Ecommerce",
  "Construcción",
  "Comercio local",
];

const SECTOR_USES = [
  {
    sector: "Restauración",
    desc: "Proveedores, empresas de eventos, catering corporativo en tu zona.",
  },
  {
    sector: "Clínicas",
    desc: "Pacientes potenciales por zona, edad y perfil demográfico.",
  },
  {
    sector: "Inmobiliarias",
    desc: "Compradores activos y propietarios con intención de venta en tu área.",
  },
  {
    sector: "Ecommerce",
    desc: "Compradores recurrentes de tu categoría de producto en toda España.",
  },
];

const MOCK_TABLE = [
  { nombre: "Restaurante El Olivo", sector: "Restauración", zona: "Madrid Centro", contacto: "gerencia@...", estado: "Activo" },
  { nombre: "Clínica Bienestar", sector: "Salud", zona: "Barcelona, Eixample", contacto: "info@...", estado: "Activo" },
  { nombre: "Inmobiliaria Costa", sector: "Inmobiliaria", zona: "Valencia", contacto: "ventas@...", estado: "Nuevo" },
  { nombre: "Ferretería López", sector: "Comercio", zona: "Sevilla", contacto: "pedidos@...", estado: "Activo" },
];

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ sector: "", ciudad: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.sector) e.sector = "Selecciona un sector";
    if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Introduce un email válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-[#F1F5F9] rounded-2xl p-8 text-center">
        <CheckCircle className="mx-auto mb-4 text-[#2563EB]" size={40} />
        <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#0F172A] text-lg mb-2">
          ¡Listo! Recibirás tu muestra.
        </h3>
        <p className="text-[#64748B] text-sm">
          Te enviamos una muestra real de tu sector en menos de 24 horas.
        </p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-[#0F172A] min-h-[44px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="sector_lead" className="block text-sm font-medium text-[#0F172A] mb-1.5">
          Sector <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="sector_lead"
          className={inputCls}
          value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value })}
          aria-required="true"
        >
          <option value="">Selecciona tu sector</option>
          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.sector && <p className="text-red-500 text-xs mt-1" role="alert">{errors.sector}</p>}
      </div>

      <div>
        <label htmlFor="ciudad_lead" className="block text-sm font-medium text-[#0F172A] mb-1.5">
          Ciudad <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="ciudad_lead"
          type="text"
          placeholder="p.ej. Madrid"
          className={inputCls}
          value={form.ciudad}
          onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
          aria-required="true"
        />
        {errors.ciudad && <p className="text-red-500 text-xs mt-1" role="alert">{errors.ciudad}</p>}
      </div>

      <div>
        <label htmlFor="email_lead" className="block text-sm font-medium text-[#0F172A] mb-1.5">
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email_lead"
          type="email"
          autoComplete="email"
          placeholder="tu@empresa.com"
          className={inputCls}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-required="true"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors min-h-[44px] flex items-center justify-center gap-2"
      >
        Quiero ver mi muestra <ArrowRight size={16} />
      </button>
      <p className="text-xs text-center text-slate-400">Muestra gratuita. Sin compromiso.</p>
    </form>
  );
}

export default function Clientes() {
  return (
    <>
      {/* HERO */}
      <section className="pt-16" data-acf-field="hero_clientes">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(15, 23, 42)"
          gradientBackgroundEnd="rgb(15, 23, 42)"
          firstColor="37, 99, 235"
          secondColor="29, 78, 216"
          thirdColor="30, 58, 138"
          fourthColor="15, 23, 42"
          fifthColor="55, 65, 81"
          pointerColor="96, 165, 250"
          containerClassName="min-h-[70vh] h-auto py-24"
        >
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
            <span className="bg-[#2563EB]/20 text-[#93C5FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-[#2563EB]/30">
              Listas de Clientes Potenciales
            </span>
            <h1
              className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              data-acf-field="clientes_h1"
            >
              Tu próximo cliente ya existe.{" "}
              <span className="text-[#2563EB]">Solo hay que encontrarlo.</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              Te entregamos listas de clientes potenciales reales, filtradas por sector, zona y perfil. Datos verificados, listos para contactar.
            </p>
            <Link
              href="#muestra"
              className="bg-[#2563EB] hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center gap-2 min-h-[48px]"
            >
              Quiero ver una muestra <ArrowRight size={18} />
            </Link>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* QUÉ ES */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" data-acf-field="que_es">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Database size={26} className="text-[#2563EB]" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0F172A] mb-4">
            ¿Qué es exactamente?
          </h2>
          <p className="text-[#64748B] leading-relaxed">
            Una lista de empresas o personas que encajan con tu cliente ideal, en tu zona y sector, con datos de contacto verificados y listos para usar.
          </p>
        </div>
      </section>

      {/* MOCKUP TABLA */}
      <section className="bg-[#F1F5F9] py-16 px-4 sm:px-6 lg:px-8" data-acf-field="tabla_ejemplo">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-[#0F172A] text-center mb-2">
            Así se ve una lista real de tu sector.
          </h2>
          <p className="text-[#64748B] text-sm text-center mb-8">Datos ficticios a modo de ejemplo.</p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm" aria-label="Ejemplo de lista de clientes">
              <thead className="bg-[#0F172A] text-white">
                <tr>
                  {["Nombre", "Sector", "Zona", "Contacto", "Estado"].map((h) => (
                    <th key={h} scope="col" className="text-left px-5 py-4 font-semibold text-xs uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {MOCK_TABLE.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC]">
                    <td className="px-5 py-4 font-medium text-[#0F172A]">{row.nombre}</td>
                    <td className="px-5 py-4 text-[#64748B]">{row.sector}</td>
                    <td className="px-5 py-4 text-[#64748B]">{row.zona}</td>
                    <td className="px-5 py-4 text-[#64748B]">{row.contacto}</td>
                    <td className="px-5 py-4">
                      <span className="bg-[#EFF6FF] text-[#2563EB] text-xs font-semibold px-2.5 py-1 rounded-full">
                        {row.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PARA QUÉ SIRVE */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8" data-acf-field="para_que_sirve">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0F172A] text-center mb-10">
            Qué consigues según tu sector
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SECTOR_USES.map((s) => (
              <div key={s.sector} className="bg-[#F1F5F9] rounded-xl p-5 border border-slate-100">
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-[#0F172A] mb-2">{s.sector}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIADOR */}
      <section className="bg-[#0F172A] py-16 px-4 sm:px-6 lg:px-8" data-acf-field="diferenciador">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-8">
            No es una base de datos comprada.
            <br />
            <span className="text-[#2563EB]">Es una lista construida para ti.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "Datos públicos verificados",
              "Filtrado por tu perfil de cliente",
              "Entrega en menos de 24h",
            ].map((t) => (
              <div key={t} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
                <CheckCircle size={20} className="text-[#2563EB] mx-auto mb-2" />
                <p className="text-slate-300 text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="muestra" className="bg-white py-20 px-4 sm:px-6 lg:px-8" data-acf-field="cta_clientes">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-[#0F172A] mb-3">
            Quiero ver una muestra de mi sector.
          </h2>
          <p className="text-[#64748B] mb-8 text-sm">Sin compromiso. Recibirás datos reales en menos de 24 horas.</p>
          <div className="bg-[#F1F5F9] rounded-2xl p-6 md:p-8 text-left">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
