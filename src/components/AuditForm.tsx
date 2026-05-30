"use client";
import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES = [
  "Restauración / Hostelería",
  "Clínica / Salud",
  "Inmobiliaria",
  "Construcción",
  "Comercio local",
  "Ecommerce",
  "Servicios profesionales",
  "Otro",
];

interface AuditFormProps {
  id?: string;
  dark?: boolean;
}

export function AuditForm({ id = "formulario", dark = false }: AuditFormProps) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    tipo_negocio: "",
    ciudad: "",
    telefono: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputCls = cn(
    "w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-h-[44px]",
    dark
      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400"
      : "bg-white border-slate-200 text-[#0F172A] placeholder-slate-400"
  );

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.tipo_negocio) e.tipo_negocio = "Selecciona el tipo de negocio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.ciudad.trim()) e.ciudad = "La ciudad es obligatoria";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    else if (!/^[0-9+\s\-()]{7,15}$/.test(form.telefono.trim()))
      e.telefono = "Introduce un teléfono válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) setSent(true);
  };

  const labelCls = cn("block text-sm font-medium mb-1.5", dark ? "text-slate-200" : "text-[#0F172A]");
  const errorCls = "text-red-400 text-xs mt-1";

  if (sent) {
    return (
      <div
        className={cn(
          "rounded-2xl p-8 text-center",
          dark ? "bg-slate-800/60 border border-slate-700" : "bg-[#F1F5F9]"
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle className="mx-auto mb-4 text-[#2563EB]" size={48} aria-hidden="true" />
        <h3 className={cn("font-[family-name:var(--font-poppins)] text-xl font-bold mb-2", dark ? "text-white" : "text-[#0F172A]")}>
          Lo hemos recibido.
        </h3>
        <p className={cn("text-sm leading-relaxed", dark ? "text-slate-300" : "text-[#64748B]")}>
          Nuestro equipo ya está analizando tu caso. Recibirás tu auditoría en{" "}
          <strong>menos de 24 horas</strong> en el teléfono que nos has dejado.
        </p>
      </div>
    );
  }

  return (
    <div id={id} className={cn("rounded-2xl p-6 md:p-8", dark ? "bg-slate-800/60 border border-slate-700" : "bg-[#F1F5F9]")} data-acf-field="audit_form">
      {/* Progress bar */}
      <div className="mb-6" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2} aria-label={`Paso ${step} de 2`}>
        <div className="flex items-center justify-between mb-2">
          <span className={cn("text-xs font-medium", dark ? "text-slate-400" : "text-[#64748B]")}>
            Paso {step} de 2
          </span>
          <span className={cn("text-xs", dark ? "text-slate-500" : "text-slate-400")}>
            {step === 1 ? "Tu negocio" : "Cómo contactarte"}
          </span>
        </div>
        <div className={cn("h-1.5 rounded-full", dark ? "bg-slate-700" : "bg-slate-200")}>
          <div
            className="h-1.5 bg-[#2563EB] rounded-full transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="nombre" className={labelCls}>
                Nombre <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className={inputCls}
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                aria-required="true"
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
              />
              {errors.nombre && <p id="nombre-error" className={errorCls} role="alert">{errors.nombre}</p>}
            </div>

            <div>
              <label htmlFor="tipo_negocio" className={labelCls}>
                Tipo de negocio <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <select
                id="tipo_negocio"
                className={cn(inputCls, "cursor-pointer")}
                value={form.tipo_negocio}
                onChange={(e) => setForm({ ...form, tipo_negocio: e.target.value })}
                aria-required="true"
                aria-describedby={errors.tipo_negocio ? "tipo-error" : undefined}
              >
                <option value="">Selecciona tu sector</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.tipo_negocio && <p id="tipo-error" className={errorCls} role="alert">{errors.tipo_negocio}</p>}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 min-h-[44px]"
            >
              Continuar <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="ciudad" className={labelCls}>
                Ciudad / Zona <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="ciudad"
                type="text"
                autoComplete="address-level2"
                placeholder="p.ej. Madrid, Barcelona..."
                className={inputCls}
                value={form.ciudad}
                onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
                aria-required="true"
                aria-describedby={errors.ciudad ? "ciudad-error" : undefined}
              />
              {errors.ciudad && <p id="ciudad-error" className={errorCls} role="alert">{errors.ciudad}</p>}
            </div>

            <div>
              <label htmlFor="telefono" className={labelCls}>
                Teléfono <span className="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                id="telefono"
                type="tel"
                autoComplete="tel"
                placeholder="+34 600 000 000"
                className={inputCls}
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                aria-required="true"
                aria-describedby={errors.telefono ? "telefono-error" : undefined}
              />
              {errors.telefono && <p id="telefono-error" className={errorCls} role="alert">{errors.telefono}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium border transition-colors min-h-[44px]",
                  dark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-[#64748B] hover:bg-slate-100"
                )}
              >
                Atrás
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-150 min-h-[44px]"
              >
                Quiero mi auditoría gratuita →
              </button>
            </div>
          </div>
        )}
      </form>

      <p className={cn("text-xs text-center mt-4", dark ? "text-slate-500" : "text-slate-400")}>
        Sin spam. Sin compromiso. Recibirás tu informe en menos de 24 horas.
      </p>
    </div>
  );
}
