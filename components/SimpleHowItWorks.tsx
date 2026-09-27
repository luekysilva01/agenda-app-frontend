"use client";

import React from "react";
import { 
  Calendar, 
  Clock, 
  Share2, 
  CheckCircle2, 
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function SimpleHowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      highlight: t.howItWorks.step1Highlight,
    },
    {
      number: "02",
      icon: Clock,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      highlight: t.howItWorks.step2Highlight,
    },
    {
      number: "03",
      icon: Share2,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      highlight: t.howItWorks.step3Highlight,
    },
  ];

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="px-4 sm:px-6 max-w-6xl mx-auto lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider">
            <span>{t.howItWorks.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {t.howItWorks.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-zinc-300">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center border border-zinc-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900">
                    {step.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
