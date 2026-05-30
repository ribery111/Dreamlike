"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Database } from "lucide-react";

const SECTORS = ["Restauración / Hostelería", "Clínicas / Salud", "Inmobiliarias", "Ecommerce", "Construcción", "Comercio local"];

const MOCK_TABLE = [
  { nombre: "Restaurante El Olivo", sector: "Restauración", zona: "Madrid Centro", contacto: "gerencia@...", estado: "Activo" },
  { nombre: "Clínica Bienestar", sector: "Salud", zona: "Barcelona, Eixample", contacto: "info@...", estado: "Activo" },
  { nombre: "Inmobiliaria Costa", sector: "Inmobiliaria", zona: "Valencia", contacto: "ventas@...", estado: "Nuevo" },
  { nombre: "Ferretería López", sector: "Comercio", zona: "Sevilla", contacto: "pedidos@...", estado: "Activo" },
];

const SECTOR_USES = [
  { sector: "Restauración", desc: "Proveedores, empresas de eventos, catering corporativo en tu zona." },
  { sector: "Clínicas", desc: "Pacientes potenciales por zona, edad y perfil demográfico." },
  { sector: "Inmobiliarias", desc: "Compradores activos y propietarios con intención de venta en tu área." },
  { sector: "Ecommerce", desc: "Compradores recurrentes de tu categoría de producto en toda España." },
];

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ sector: "", ciudad: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.sector) e.sector = "Selecciona un sector";
    if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Introduce un email válido";
    setErrors(e);
    return !Object.keys(e).length;
  };

  if (sent) {
    return (
      <div className="text-center py-8" role="status">
        <CheckCircle className="mx-auto mb-4 text-blue-400" size={40} />
        <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white text-lg mb-2">¡Listo!</h3>
        <p className="text-white/55 text-sm">Te enviamos una muestra real de tu sector en menos de 24 horas.</p>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm min-h-[44px] input-glass";

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (validate()) setSent(true); }} className="space-y-4" noValidate>
      <div>
        <label htmlFor="s_sector" className="block text-sm font-medium text-white/70 mb-1.5">Sector <span className="text-red-400">*</span></label>
        <select id="s_sector" className={inputCls} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}>
          <option value="" className="bg-[#04071c]">Selecciona tu sector</option>
          {SECTORS.map((s) => <option key={s} value={s} className="bg-[#04071c]">{s}</option>)}
        </select>
        {errors.sector && <p className="text-red-400 text-xs mt-1" role="alert">{errors.sector}</p>}
      </div>
      <div>
        <label htmlFor="s_ciudad" className="block text-sm font-medium text-white/70 mb-1.5">Ciudad <span className="text-red-400">*</span></label>
        <input id="s_ciudad" type="text" placeholder="p.ej. Madrid" className={inputCls}
          value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
        {errors.ciudad && <p className="text-red-400 text-xs mt-1" role="alert">{errors.ciudad}</p>}
      </div>
      <div>
        <label htmlFor="s_email" className="block text-sm font-medium text-white/70 mb-1.5">Email <span className="text-red-400">*</span></label>
        <input id="s_email" type="email" autoComplete="email" placeholder="tu@empresa.com" className={inputCls}
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <p className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
      </div>
      <button type="submit" className="w-full bg-[#2563EB] hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all min-h-[44px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
        Quiero ver mi muestra <ArrowRight size={16} />
      </button>
      <p className="text-xs text-center text-white/25">Muestra gratuita. Sin compromiso.</p>
    </form>
  );
}

export default function Clientes() {
  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-[80vh] flex items-center" data-acf-field="hero_clientes">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300 mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
            Listas de Clientes Potenciales
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-acf-field="clientes_h1">
            Tu próximo cliente ya existe.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Solo hay que encontrarlo.</span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            Te entregamos listas de clientes potenciales reales, filtradas por sector, zona y perfil. Datos verificados, listos para contactar.
          </p>
          <Link href="#muestra" className="bg-[#2563EB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 min-h-[52px] shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
            Quiero ver una muestra <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* QUÉ ES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="que_es">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)" }}>
            <Database size={24} className="text-blue-400" />
          </div>
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white mb-4">¿Qué es exactamente?</h2>
          <p className="text-white/55 leading-relaxed">
            Una lista de empresas o personas que encajan con tu cliente ideal, en tu zona y sector, con datos de contacto verificados y listos para usar.
          </p>
        </div>
      </section>

      {/* TABLA MOCKUP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-acf-field="tabla_ejemplo">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold text-white text-center mb-2">Así se ve una lista real de tu sector.</h2>
          <p className="text-white/30 text-sm text-center mb-8">Datos ficticios a modo de ejemplo.</p>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
            <table className="w-full text-sm" aria-label="Ejemplo de lista de clientes">
              <thead style={{ background: "rgba(37,99,235,0.2)" }}>
                <tr>
                  {["Nombre", "Sector", "Zona", "Contacto", "Estado"].map((h) => (
                    <th key={h} scope="col" className="text-left px-5 py-4 text-xs uppercase tracking-wide text-white/70 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ background: "rgba(255,255,255,0.03)" }}>
                {MOCK_TABLE.map((row, i) => (
                  <tr key={i} className="border-t border-white/6 hover:bg-white/4 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{row.nombre}</td>
                    <td className="px-5 py-4 text-white/55">{row.sector}</td>
                    <td className="px-5 py-4 text-white/55">{row.zona}</td>
                    <td className="px-5 py-4 text-white/40">{row.contacto}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-blue-300"
                        style={{ background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.25)" }}>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="para_que_sirve">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white text-center mb-10">Qué consigues según tu sector</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SECTOR_USES.map((s) => (
              <div key={s.sector} className="glass-card p-5 hover:border-blue-500/20 transition-all">
                <h3 className="font-[family-name:var(--font-poppins)] font-bold text-white mb-2">{s.sector}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIADOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-acf-field="diferenciador">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-8">
            No es una base de datos comprada.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Es una lista construida para ti.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Datos públicos verificados", "Filtrado por tu perfil de cliente", "Entrega en menos de 24h"].map((t) => (
              <div key={t} className="glass-card p-4 text-center hover:border-blue-500/20 transition-all">
                <CheckCircle size={20} className="text-blue-400 mx-auto mb-2" />
                <p className="text-white/70 text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="muestra" className="py-24 px-4 sm:px-6 lg:px-8 glass-section" data-acf-field="cta_clientes">
        <div className="max-w-md mx-auto text-center">
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-3">Quiero ver una muestra de mi sector.</h2>
          <p className="text-white/50 mb-8 text-sm">Sin compromiso. Recibirás datos reales en menos de 24 horas.</p>
          <div className="glass-card p-6 md:p-8 text-left"><LeadForm /></div>
        </div>
      </section>
    </>
  );
}
