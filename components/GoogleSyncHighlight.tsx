"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function GoogleSyncHighlight() {
  const { t } = useLanguage();

  return (
    <section id="calendar" className="py-16 sm:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Text & Bullets (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-zinc-900" />
              <span>{t.googleSync.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight">
              {t.googleSync.title}
            </h2>

            <p className="text-sm text-zinc-600 leading-relaxed">
              {t.googleSync.subtitle}
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-zinc-900 block">{t.googleSync.bullet1Title}</span>
                  <span className="text-zinc-500">{t.googleSync.bullet1Desc}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-zinc-900 block">{t.googleSync.bullet2Title}</span>
                  <span className="text-zinc-500">{t.googleSync.bullet2Desc}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-zinc-900 block">{t.googleSync.bullet3Title}</span>
                  <span className="text-zinc-500">{t.googleSync.bullet3Desc}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>{t.googleSync.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Mockup of Live Schedule (6 cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-zinc-300 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-800">
                    <Calendar className="w-4 h-4 text-zinc-900" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900">{t.googleSync.cardTitle}</div>
                    <div className="text-[10px] text-zinc-500">{t.googleSync.cardSubtitle}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.googleSync.liveBadge}
                </span>
              </div>

              {/* Timeline events */}
              <div className="space-y-2.5 text-xs font-medium">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                    <div>
                      <div className="font-bold text-zinc-900">{t.googleSync.event1Title}</div>
                      <div className="text-[11px] text-zinc-500">{t.googleSync.event1Subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-zinc-200 text-zinc-700">
                    {t.common.online}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-100/70 border border-zinc-200 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                    <div>
                      <div className="font-bold text-zinc-700">{t.googleSync.event2Title}</div>
                      <div className="text-[11px] text-zinc-500">{t.googleSync.event2Subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-zinc-200 text-zinc-600">
                    {t.googleSync.pauseLabel}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                    <div>
                      <div className="font-bold text-zinc-900">{t.googleSync.event3Title}</div>
                      <div className="text-[11px] text-zinc-500">{t.googleSync.event3Subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-zinc-200 text-zinc-700">
                    {t.common.inPerson}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                  {t.googleSync.complianceBadge}
                </span>
                <span className="font-bold text-zinc-900">{t.googleSync.zeroConflicts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
