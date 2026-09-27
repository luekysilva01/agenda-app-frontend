"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Settings, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookie, setCookie, purgeLegacyLocalStorage } from "@/lib/utils/cookies";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = "r3uno_cookie_consent_v1";

export function CookieConsentBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    try {
      purgeLegacyLocalStorage();
      const stored = getCookie(COOKIE_CONSENT_KEY);
      if (!stored) {
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      setCookie(COOKIE_CONSENT_KEY, JSON.stringify(prefs), { days: 365, path: "/" });
    } catch (e) {
      console.error("Error saving cookie consent:", e);
    }
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectOptional = () => {
    saveConsent({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics,
      functional,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {isVisible && !isModalOpen && (
        <aside
          role="region"
          aria-label={t.cookieConsent.modalTitle}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-white rounded-2xl border border-zinc-300 p-5 sm:p-6 shadow-2xl space-y-4 text-zinc-900">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-zinc-900">
                    {t.cookieConsent.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-800 border border-zinc-200 px-1.5 py-0.5 rounded">
                    {t.cookieConsent.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {t.cookieConsent.desc}{" "}
                  <Link
                    href="/privacy"
                    className="font-bold underline text-zinc-900 hover:text-black"
                  >
                    {t.cookieConsent.privacyLink}
                  </Link>{" "}
                  &amp;{" "}
                  <Link
                    href="/terms"
                    className="font-bold underline text-zinc-900 hover:text-black"
                  >
                    {t.cookieConsent.termsLink}
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t.cookieConsent.preferences}</span>
              </button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectOptional}
                  className="text-xs h-8 px-3 border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                >
                  {t.cookieConsent.essentialOnly}
                </Button>

                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="text-xs h-8 px-4 bg-zinc-900 hover:bg-black text-white font-bold cursor-pointer"
                >
                  {t.cookieConsent.acceptAll}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-lg bg-white rounded-2xl border border-zinc-300 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-zinc-300" />
                <span className="text-sm font-semibold">
                  {t.cookieConsent.modalTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label={t.common.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <p className="text-zinc-600 leading-relaxed">
                {t.cookieConsent.modalDesc}
              </p>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-sm">
                    {t.cookieConsent.c1Title}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-700 bg-zinc-200 px-2 py-0.5 rounded">
                    {t.cookieConsent.c1Badge}
                  </span>
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  {t.cookieConsent.c1Desc}
                </p>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="chk-analytics" className="font-bold text-zinc-900 text-sm cursor-pointer">
                    {t.cookieConsent.c2Title}
                  </label>
                  <input
                    id="chk-analytics"
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
                  />
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  {t.cookieConsent.c2Desc}
                </p>
              </div>

              <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="chk-func" className="font-bold text-zinc-900 text-sm cursor-pointer">
                    {t.cookieConsent.c3Title}
                  </label>
                  <input
                    id="chk-func"
                    type="checkbox"
                    checked={functional}
                    onChange={(e) => setFunctional(e.target.checked)}
                    className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
                  />
                </div>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  {t.cookieConsent.c3Desc}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-50 border-t border-zinc-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectOptional}
                className="text-xs border-zinc-300 text-zinc-700"
              >
                {t.cookieConsent.rejectOptional}
              </Button>

              <Button
                size="sm"
                onClick={handleSaveCustom}
                className="text-xs bg-zinc-900 hover:bg-black text-white font-bold gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.cookieConsent.savePreferences}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
