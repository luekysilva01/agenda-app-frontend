"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2,
  Star,
} from "lucide-react";
import { SimpleBookingDemo } from "./SimpleBookingDemo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="pt-10 pb-16 md:pt-16 md:pb-24 bg-white border-b border-zinc-200 relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs sm:text-sm font-semibold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t.hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]">
            {t.hero.title}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-sm shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg className="w-3 h-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 font-bold text-sm transition-all cursor-pointer"
            >
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Social Proof with Avatars */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Consultant"
                width={36}
                height={36}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80"
                alt="Doctor"
                width={36}
                height={36}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Psychologist"
                width={36}
                height={36}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              />
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=120&q=80"
                alt="Attorney"
                width={36}
                height={36}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              />
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 ring-2 ring-white text-[10px] font-bold text-white">
                +1.4k
              </div>
            </div>
            <div className="text-center sm:text-left text-xs font-semibold text-zinc-700">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="text-zinc-900 ml-1 font-extrabold">{t.hero.socialProof}</span>
              </div>
              <span className="text-zinc-500 text-[11px]">{t.hero.ratingText}</span>
            </div>
          </div>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-semibold text-zinc-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-900" />
              <span>{t.hero.badgeFlexible}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-900" />
              <span>{t.hero.badgeInstant}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-zinc-900" />
              <span>{t.hero.badgeNoApp}</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Booking Demo */}
        <div id="demo" className="mt-12 sm:mt-16 max-w-4xl mx-auto scroll-mt-24">
          <SimpleBookingDemo />
        </div>
      </div>
    </section>
  );
}
