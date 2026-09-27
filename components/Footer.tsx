"use client";

import React from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  ShieldCheck, 
  Globe, 
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-zinc-600 text-xs border-t border-zinc-200">
      <div className="px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-2xs">
                <CalendarDays className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-zinc-900">
                R3uno<span className="text-zinc-950 font-black">.</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 max-w-sm">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-zinc-600">
            <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">
              {t.footer.howItWorks}
            </a>
            <a href="#features" className="hover:text-zinc-900 transition-colors">
              {t.footer.features}
            </a>
            <a href="#calendar" className="hover:text-zinc-900 transition-colors">
              {t.footer.calendar}
            </a>
            <a href="#faq" className="hover:text-zinc-900 transition-colors">
              {t.footer.faq}
            </a>
            <Link href="/login" className="hover:text-zinc-900 transition-colors">
              {t.footer.login}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © {currentYear} {t.footer.rights}
          </div>
          <div className="flex flex-wrap items-center gap-4 font-medium">
            <LanguageSwitcher variant="minimal" />
            <span>•</span>
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>{t.footer.privacyPolicy}</span>
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">
              {t.footer.termsOfService}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-zinc-700" />
              <span>{t.footer.oauthBadge}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
