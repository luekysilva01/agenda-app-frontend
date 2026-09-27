"use client";

import React from "react";
import {
  Calendar,
  Clock,
  ShieldCheck,
  Building2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function SimpleFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Calendar,
      title: t.features.f1Title,
      desc: t.features.f1Desc,
    },
    {
      icon: Clock,
      title: t.features.f2Title,
      desc: t.features.f2Desc,
    },
    {
      icon: Sliders,
      title: t.features.f3Title,
      desc: t.features.f3Desc,
    },
    {
      icon: Building2,
      title: t.features.f4Title,
      desc: t.features.f4Desc,
    },
    {
      icon: Calendar,
      title: t.features.f5Title,
      desc: t.features.f5Desc,
    },
    {
      icon: ShieldCheck,
      title: t.features.f6Title,
      desc: t.features.f6Desc,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-zinc-900" />
            <span>{t.features.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
            {t.features.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600">
            {t.features.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-50/70 p-6 rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:bg-white transition-all space-y-3 shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-zinc-300 text-zinc-900 flex items-center justify-center shadow-xs group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-base text-zinc-900">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
