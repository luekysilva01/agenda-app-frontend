"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  CalendarDays, 
  Menu, 
  X, 
  ArrowRight, 
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.navbar.howItWorks, href: "#how-it-works" },
    { label: t.navbar.demo, href: "#demo" },
    { label: t.navbar.features, href: "#features" },
    { label: t.navbar.calendar, href: "#calendar" },
    { label: t.navbar.faq, href: "#faq" },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 bg-white transition-all duration-150 ${
        isScrolled ? "border-b border-zinc-300 shadow-2xs" : "border-b border-zinc-200"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-xs group-hover:bg-black transition-colors">
              <CalendarDays className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-zinc-900 flex items-center gap-0.5">
                R3uno<span className="text-zinc-950 font-black">.</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 ml-1">
                  {t.navbar.badge}
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs lg:text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector */}
            <LanguageSwitcher variant="pill" />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-black text-white px-4 py-2 text-xs font-bold transition-all shadow-2xs"
                >
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      width={18}
                      height={18}
                      className="w-4.5 h-4.5 rounded-full object-cover border border-zinc-700"
                      unoptimized
                    />
                  ) : (
                    <LayoutDashboard className="w-3.5 h-3.5 text-zinc-300" />
                  )}
                  <span>{t.navbar.dashboard}</span>
                </Link>

                <button
                  onClick={() => logout()}
                  className="p-2 text-zinc-400 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                  title={t.navbar.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-xs font-bold text-zinc-700 hover:text-zinc-900 px-3 py-2 transition-colors cursor-pointer"
                >
                  {t.navbar.login}
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-black px-4 py-2 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
                >
                  <span>{t.navbar.signupWithGoogle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu and Language */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="pill" />

            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-xs font-bold bg-zinc-900 text-white px-3 py-1.5 rounded-lg"
              >
                {t.navbar.dashboard}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold bg-zinc-900 text-white px-3 py-1.5 rounded-lg"
              >
                {t.navbar.login}
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label={isMobileMenuOpen ? t.navbar.closeMenu : t.navbar.openMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 text-white font-bold shadow-xs cursor-pointer text-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{t.navbar.dashboard} ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-zinc-600 hover:bg-zinc-50 text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.navbar.logout}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 text-white font-bold shadow-xs cursor-pointer text-xs"
                >
                  <span>{t.navbar.signupWithGoogle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-900"
                >
                  {t.auth.alreadyHaveAccount} {t.navbar.login}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
