"use client";

import React from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "pill" | "dropdown" | "settings" | "minimal";
  className?: string;
}

export function LanguageSwitcher({
  variant = "pill",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  if (variant === "settings") {
    return (
      <div className={`p-4 bg-zinc-50 border border-zinc-200/90 rounded-2xl space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-zinc-800" />
            <span className="font-bold text-zinc-900 text-xs sm:text-sm">
              {t.settings.languagePreferenceTitle}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-zinc-200/80 text-zinc-800 px-2 py-0.5 rounded">
            {language === "en" ? "English (Default)" : "Português"}
          </span>
        </div>

        <p className="text-zinc-500 text-[11px] leading-relaxed">
          {t.settings.languagePreferenceDesc}
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
              language === "en"
                ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇺🇸</span>
              <span>English (US)</span>
            </span>
            {language === "en" && <Check className="w-4 h-4 text-white" />}
          </button>

          <button
            type="button"
            onClick={() => setLanguage("pt")}
            className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
              language === "pt"
                ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm">🇧🇷</span>
              <span>Português (BR)</span>
            </span>
            {language === "pt" && <Check className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
            language === "en"
              ? "bg-zinc-900 text-white font-bold"
              : "hover:text-zinc-950"
          }`}
          title="Switch to English"
        >
          EN
        </button>
        <span className="text-zinc-300">/</span>
        <button
          type="button"
          onClick={() => setLanguage("pt")}
          className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
            language === "pt"
              ? "bg-zinc-900 text-white font-bold"
              : "hover:text-zinc-950"
          }`}
          title="Mudar para Português"
        >
          PT
        </button>
      </div>
    );
  }

  // Default: "pill" toggle
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-zinc-100 border border-zinc-200/90 text-xs shadow-2xs ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "en"
            ? "bg-white text-zinc-950 shadow-2xs font-extrabold"
            : "text-zinc-600 hover:text-zinc-950"
        }`}
        title="Switch to English (US)"
      >
        <span className="text-xs">🇺🇸</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("pt")}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "pt"
            ? "bg-white text-zinc-950 shadow-2xs font-extrabold"
            : "text-zinc-600 hover:text-zinc-950"
        }`}
        title="Mudar para Português (BR)"
      >
        <span className="text-xs">🇧🇷</span>
        <span>PT</span>
      </button>
    </div>
  );
}
