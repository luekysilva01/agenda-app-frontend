"use client";

import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Clock
} from "lucide-react";

interface CtaBannerProps {
  onOpenTrialModal: (plan?: string) => void;
}

export function CtaBanner({ onOpenTrialModal }: CtaBannerProps) {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-indigo-600 text-white p-8 sm:p-14 lg:p-16 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Experimente Grátis por 14 Dias</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Agenda cheia, clientes pontuais e zero tempo perdido com marcação manual.
            </h2>

            <p className="text-base sm:text-lg text-indigo-100 font-normal leading-relaxed max-w-2xl mx-auto">
              Configure sua conta em menos de 3 minutos e revolucione o fluxo de agendamentos hoje mesmo.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onOpenTrialModal()}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-white text-indigo-950 hover:bg-slate-50 font-black text-base shadow-lg hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Criar Minha Conta Grátis Agora</span>
                <ArrowRight className="w-5 h-5 text-indigo-950" />
              </button>
            </div>

            {/* Reassurance pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs text-indigo-100 font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Sem necessidade de cartão de crédito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Ativação em 3 minutos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-300" />
                <span>Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
