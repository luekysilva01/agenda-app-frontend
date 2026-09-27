"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider border border-zinc-700">
            <span>{t.cta.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
            {t.cta.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>{t.cta.button}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              <span>{t.cta.badgeGoogle}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-zinc-300" />
              <span>{t.cta.badgeSetup}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-300" />
              <span>{t.cta.badgeActive}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
