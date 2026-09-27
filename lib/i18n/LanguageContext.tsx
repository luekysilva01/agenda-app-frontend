"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Language, Translations, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  locale: string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "r3uno_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default language is 'en' (100% English by default) with cookie/storage synchronization
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored === "en" || stored === "pt") return stored;
        const match = document.cookie.match(
          new RegExp("(^| )" + LANGUAGE_STORAGE_KEY + "=([^;]+)")
        );
        if (match && (match[2] === "en" || match[2] === "pt")) {
          return match[2] as Language;
        }
      } catch {
        // ignore
      }
    }
    return "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.cookie = `${LANGUAGE_STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    }
  }, [language]);

  const t = useMemo(() => translations[language], [language]);
  const locale = useMemo(() => (language === "pt" ? "pt-BR" : "en-US"), [language]);

  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) return "";
      const defaultOptions: Intl.DateTimeFormatOptions = options || {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      return d.toLocaleDateString(locale, defaultOptions);
    },
    [locale]
  );

  const formatTime = useCallback(
    (date: Date | string) => {
      const d = typeof date === "string" ? new Date(date) : date;
      if (isNaN(d.getTime())) return "";
      return d.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      locale,
      formatDate,
      formatTime,
    }),
    [language, setLanguage, t, locale, formatDate, formatTime]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return English fallback if rendered outside provider
    return {
      language: "en",
      setLanguage: () => {},
      t: translations.en,
      locale: "en-US",
      formatDate: (d: Date | string) => (typeof d === "string" ? d : d.toDateString()),
      formatTime: (d: Date | string) => (typeof d === "string" ? d : d.toTimeString()),
    };
  }
  return context;
}
