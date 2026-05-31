"use client";
import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";

const BUSINESS_TYPES = [
  "Restauración / Hostelería", "Clínica / Salud", "Inmobiliaria",
  "Construcción", "Comercio local", "Ecommerce", "Servicios profesionales", "Otro",
];

export function AuditForm({ id = "formulario" }: { id?: string }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: "", tipo_negocio: "", ciudad: "", telefono: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const v1 = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.tipo_negocio) e.tipo_negocio = "Selecciona el tipo de negocio";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const v2 = () => {
    const e: Record<string, string> = {};
    if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    else if (!/^[0-9+\s\-()]{7,15}$/.test(form.telefono.trim())) e.telefono = "Introduce un teléfono válido";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm min-h-[44px] transition-all input-glass";

  if (sent) {
    return (
      <div className="glass-card p-8 text-center" role="status" aria-live="polite">
        <CheckCircle className="mx-auto mb-4 text-[#FF5B14]" size={48} aria-hidden="true" />
        <h3 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white mb-2">Lo hemos recibido.</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          Nuestro equipo ya está analizando tu caso. Recibirás tu auditoría en{" "}
          <strong className="text-white">menos de 24 horas</strong> en el teléfono que nos has dejado.
        </p>
      </div>
    );
  }

  return (
    <div id={id} className="glass-card p-6 md:p-8" data-acf-field="audit_form">
      {/* Barra de progreso */}
      <div className="mb-6" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2}>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-white/50">Paso {step} de 2</span>
          <span className="text-xs text-white/30">{step === 1 ? "Tu negocio" : "Cómo contactarte"}</span>
        </div>
        <div className="h-1 rounded-full bg-white/10">
          <div className="h-1 bg-[#FF5B14] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,91,20,0.6)]" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); if (v2()) setSent(true); }} noValidate>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-white/80 mb-1.5">
                Nombre <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input id="nombre" type="text" autoComplete="name" placeholder="Tu nombre" className={inputCls}
                value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} aria-required="true" />
              {errors.nombre && <p className="text-red-400 text-xs mt-1" role="alert">{errors.nombre}</p>}
            </div>
            <div>
              <label htmlFor="tipo_negocio" className="block text-sm font-medium text-white/80 mb-1.5">
                Tipo de negocio <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <select id="tipo_negocio" className={`${inputCls} cursor-pointer`}
                value={form.tipo_negocio} onChange={(e) => setForm({ ...form, tipo_negocio: e.target.value })} aria-required="true">
                <option value="" className="bg-black">Selecciona tu sector</option>
                {BUSINESS_TYPES.map((t) => <option key={t} value={t} className="bg-black">{t}</option>)}
              </select>
              {errors.tipo_negocio && <p className="text-red-400 text-xs mt-1" role="alert">{errors.tipo_negocio}</p>}
            </div>
            <button type="button" onClick={() => { if (v1()) setStep(2); }}
              className="w-full bg-[#FF5B14] hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors min-h-[44px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,91,20,0.3)]">
              Continuar <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="ciudad" className="block text-sm font-medium text-white/80 mb-1.5">
                Ciudad / Zona <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input id="ciudad" type="text" autoComplete="address-level2" placeholder="p.ej. Madrid, Barcelona..." className={inputCls}
                value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} aria-required="true" />
              {errors.ciudad && <p className="text-red-400 text-xs mt-1" role="alert">{errors.ciudad}</p>}
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-white/80 mb-1.5">
                Teléfono <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input id="telefono" type="tel" autoComplete="tel" placeholder="+34 600 000 000" className={inputCls}
                value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} aria-required="true" />
              {errors.telefono && <p className="text-red-400 text-xs mt-1" role="alert">{errors.telefono}</p>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl text-sm font-medium border border-white/15 text-white/60 hover:text-white hover:bg-white/5 transition-colors min-h-[44px]">
                Atrás
              </button>
              <button type="submit"
                className="flex-1 bg-[#FF5B14] hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-colors min-h-[44px] shadow-[0_0_20px_rgba(255,91,20,0.3)]">
                Quiero mi auditoría gratuita →
              </button>
            </div>
          </div>
        )}
      </form>

      <p className="text-xs text-center mt-4 text-white/30">
        Sin spam. Sin compromiso. Recibirás tu informe en menos de 24 horas.
      </p>
    </div>
  );
}
