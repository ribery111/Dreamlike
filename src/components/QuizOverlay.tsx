"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "¿Sabes exactamente quién es tu cliente ideal y dónde encontrarlo?",
  "¿Has invertido en marketing sin ver resultados claros?",
  "¿Te gustaría tener una lista de clientes potenciales reales antes de esta semana?",
];

export function QuizOverlay({ onComplete }: { onComplete: (qualify: boolean) => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const close = () => { setVisible(false); onComplete(false); };

  const handleIntro = (yes: boolean) => {
    if (!yes) { close(); return; }
    setStep(0);
  };

  const handleAnswer = (yes: boolean) => {
    const next = [...answers, yes];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setVisible(false);
      onComplete(next.filter(Boolean).length >= 2);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl animate-[slideUp_0.3s_ease]"
        style={{ background: "rgba(4,7,28,0.85)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <button onClick={close} aria-label="Cerrar"
          className="absolute top-4 right-4 text-white/40 hover:text-white p-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors">
          <X size={18} />
        </button>

        {step >= 0 && (
          <div className="flex gap-1.5 mb-5" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300",
                i <= step ? "bg-[#2563EB] shadow-[0_0_6px_rgba(37,99,235,0.6)]" : "bg-white/10")} />
            ))}
          </div>
        )}

        {step === -1 && (
          <>
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white mb-2">Una pregunta rápida</h2>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">¿Tu negocio podría tener más clientes de los que tiene ahora?</p>
            <div className="flex gap-3">
              <button onClick={() => handleIntro(true)}
                className="flex-1 bg-[#2563EB] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors min-h-[44px] shadow-[0_0_16px_rgba(37,99,235,0.3)]">
                Sí, creo que sí
              </button>
              <button onClick={() => handleIntro(false)}
                className="flex-1 bg-white/8 hover:bg-white/12 text-white/70 font-medium py-3 rounded-xl transition-colors min-h-[44px] border border-white/10">
                No
              </button>
            </div>
          </>
        )}

        {step >= 0 && (
          <>
            <p className="text-white/30 text-xs mb-2">Pregunta {step + 1} de {QUESTIONS.length}</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-6 leading-snug">{QUESTIONS[step]}</h2>
            <div className="flex gap-3">
              <button onClick={() => handleAnswer(true)}
                className="flex-1 bg-[#2563EB] hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors min-h-[44px] shadow-[0_0_16px_rgba(37,99,235,0.3)]">
                Sí
              </button>
              <button onClick={() => handleAnswer(false)}
                className="flex-1 bg-white/8 hover:bg-white/12 text-white/70 font-medium py-3 rounded-xl transition-colors min-h-[44px] border border-white/10">
                No del todo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
