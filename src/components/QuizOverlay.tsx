"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "¿Sabes exactamente quién es tu cliente ideal y dónde encontrarlo?",
  "¿Has invertido en marketing sin ver resultados claros?",
  "¿Te gustaría tener una lista de clientes potenciales reales antes de esta semana?",
];

interface QuizOverlayProps {
  onComplete: (qualify: boolean) => void;
}

export function QuizOverlay({ onComplete }: QuizOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onComplete(false);
  };

  const handleIntro = (yes: boolean) => {
    if (!yes) {
      setVisible(false);
      onComplete(false);
      return;
    }
    setStep(0);
  };

  const handleAnswer = (yes: boolean) => {
    const next = [...answers, yes];
    setAnswers(next);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const yesCount = next.filter(Boolean).length;
      setVisible(false);
      onComplete(yesCount >= 2);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cuestionario de cualificación"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-[#0F172A] border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-[slideUp_0.3s_ease]">
        <button
          onClick={handleClose}
          aria-label="Cerrar cuestionario"
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* Progress dots */}
        {step >= 0 && (
          <div className="flex gap-1.5 mb-5" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-200",
                  i <= step ? "bg-[#2563EB]" : "bg-slate-700"
                )}
              />
            ))}
          </div>
        )}

        {step === -1 && (
          <>
            <h2 className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white mb-2">
              Una pregunta rápida
            </h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              ¿Tu negocio podría tener más clientes de los que tiene ahora?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleIntro(true)}
                className="flex-1 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors min-h-[44px]"
              >
                Sí, creo que sí
              </button>
              <button
                onClick={() => handleIntro(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-lg transition-colors min-h-[44px]"
              >
                No
              </button>
            </div>
          </>
        )}

        {step >= 0 && (
          <>
            <p className="text-slate-400 text-xs mb-2">
              Pregunta {step + 1} de {QUESTIONS.length}
            </p>
            <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-6 leading-snug">
              {QUESTIONS[step]}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors min-h-[44px]"
              >
                Sí
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-lg transition-colors min-h-[44px]"
              >
                No del todo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
