"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp 
} from "lucide-react";

interface RoiCalculatorProps {
  onOpenTrialModal: (plan?: string) => void;
}

export function RoiCalculator({ onOpenTrialModal }: RoiCalculatorProps) {
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState<number>(100);
  const [averageTicket, setAverageTicket] = useState<number>(250);
  const [currentNoShowRate, setCurrentNoShowRate] = useState<number>(20);

  // Calculations
  const totalPotentialRevenue = appointmentsPerMonth * averageTicket;
  const currentLostRevenue = totalPotentialRevenue * (currentNoShowRate / 100);
  // R3uno reduces no-shows by ~85%
  const recoveredRevenue = currentLostRevenue * 0.85;
  // Each manual booking takes around 12 minutes in chat
  const hoursSavedPerMonth = Math.round((appointmentsPerMonth * 12) / 60);
  // ROI against Pro plan (R$ 129/mês)
  const proPlanCost = 129;
  const roiMultiplier = Math.max(1, Math.round(recoveredRevenue / proPlanCost));

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white relative border-t border-slate-200">
      <div className=" px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Calculadora Interativa de Retorno (ROI)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quanto faturamento sua empresa está perdendo com faltas todos os meses?
          </h2>

          <p className="text-base text-slate-600">
            Ajuste os controles deslizantes abaixo com a realidade da sua agenda e descubra quanto tempo e dinheiro você economizará com o R3uno.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className=" bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Sliders Area (Left) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 bg-white">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                1. Métricas da Sua Agenda
              </h3>

              {/* Slider 1: Consultas por mês */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">
                    Atendimentos / Agendamentos por mês:
                  </span>
                  <span className="font-extrabold text-base text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                    {appointmentsPerMonth} agendamentos
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="400"
                  step="10"
                  value={appointmentsPerMonth}
                  onChange={(e) => setAppointmentsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>20</span>
                  <span>200</span>
                  <span>400+</span>
                </div>
              </div>

              {/* Slider 2: Ticket Médio */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">
                    Valor médio por serviço/atendimento (R$):
                  </span>
                  <span className="font-extrabold text-base text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    R$ {averageTicket.toLocaleString("pt-BR")}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={averageTicket}
                  onChange={(e) => setAverageTicket(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>R$ 50</span>
                  <span>R$ 500</span>
                  <span>R$ 1.000</span>
                </div>
              </div>

              {/* Slider 3: Taxa de No-Show Atual */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-slate-700">
                    Taxa estimada atual de faltas (no-show):
                  </span>
                  <span className="font-extrabold text-base text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                    {currentNoShowRate}% de faltas
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={currentNoShowRate}
                  onChange={(e) => setCurrentNoShowRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>5% (Mínimo)</span>
                  <span>20% (Média de Mercado)</span>
                  <span>40% (Crítico)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed">
                  Atualmente você perde cerca de <strong>R$ {currentLostRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> todos os meses com pessoas que agendam e não comparecem.
                </p>
              </div>
            </div>

            {/* Results Card (Right) - Solid Indigo */}
            <div className="lg:col-span-5 bg-indigo-900 text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-indigo-950">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-indigo-300">
                    Impacto Financeiro Projetado
                  </span>
                  <h4 className="text-xl font-black text-white mt-1">
                    Retorno com o R3uno
                  </h4>
                </div>

                {/* Big Metric 1: Money Recovered */}
                <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
                  <div className="text-xs text-indigo-200 font-medium">
                    💰 Faturamento recuperado por mês:
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-300">
                    +R$ {recoveredRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                    <span className="text-xs text-indigo-200 font-normal"> /mês</span>
                  </div>
                  <div className="text-[11px] text-emerald-200 font-medium">
                    Equivalente a +R$ {(recoveredRevenue * 12).toLocaleString("pt-BR", { minimumFractionDigits: 0 })} a mais por ano no seu faturamento.
                  </div>
                </div>

                {/* Mini metrics: Hours Saved & ROI Multiplier */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                    <div className="text-[11px] text-indigo-200 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-sky-300" /> Horas Salvas:
                    </div>
                    <div className="text-xl font-black text-white mt-1">
                      ~{hoursSavedPerMonth}h /mês
                    </div>
                    <div className="text-[10px] text-indigo-200 mt-0.5">
                      Menos agendamento manual
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                    <div className="text-[11px] text-indigo-200 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3 h-3 text-amber-300" /> Retorno (ROI):
                    </div>
                    <div className="text-xl font-black text-amber-300 mt-1">
                      {roiMultiplier}x
                    </div>
                    <div className="text-[10px] text-indigo-200 mt-0.5">
                      Retorno sobre o plano Pro
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenTrialModal()}
                  className="w-full py-4 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Recuperar Este Faturamento Agora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-indigo-200 mt-2 font-medium">
                  Teste grátis de 14 dias • Sem necessidade de cartão de crédito
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
