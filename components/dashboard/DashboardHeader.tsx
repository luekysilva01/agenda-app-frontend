"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Plus,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface DashboardHeaderProps {
  onOpenMobile: () => void;
}

export function DashboardHeader({ onOpenMobile }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t, language, locale } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.info(t.dashboard.signedOutToast);
  };

  // Determine section breadcrumbs based on pathname and active language
  const getBreadcrumb = () => {
    if (pathname === "/dashboard") {
      return {
        title: language === "pt" ? "Visão Geral" : "Overview",
        parent: language === "pt" ? "Painel Principal" : "Main Dashboard",
      };
    }
    if (pathname.startsWith("/dashboard/services")) {
      return {
        title: language === "pt" ? "Catálogo de Serviços" : "Service Catalog",
        parent: language === "pt" ? "Serviços & Ofertas" : "Services & Offerings",
      };
    }
    if (pathname.startsWith("/dashboard/availability")) {
      return {
        title: language === "pt" ? "Horários de Atendimento" : "Working Hours",
        parent: language === "pt" ? "Disponibilidade" : "Availability",
      };
    }
    if (pathname.startsWith("/dashboard/settings")) {
      return {
        title: language === "pt" ? "Configurações da Conta" : "Account Settings",
        parent: language === "pt" ? "Conta & Privacidade" : "Account & Privacy",
      };
    }
    if (pathname.startsWith("/dashboard/appointments/new")) {
      return {
        title: language === "pt" ? "Novo Agendamento" : "New Appointment",
        parent: language === "pt" ? "Agenda" : "Schedule",
      };
    }
    if (pathname.startsWith("/dashboard/appointments")) {
      return {
        title: language === "pt" ? "Detalhes do Agendamento" : "Appointment Details",
        parent: language === "pt" ? "Agendamentos" : "Appointments",
      };
    }
    return {
      title: language === "pt" ? "Painel" : "Dashboard",
      parent: "R3uno",
    };
  };

  const breadcrumb = getBreadcrumb();

  // Current formatted date according to active locale
  const todayFormatted = new Date().toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const copyPublicLink = () => {
    const url = `https://r3uno.app/${user?.slug || "agenda"}`;
    navigator.clipboard.writeText(url);
    toast.success(t.dashboard.copyLinkSuccess, {
      description: t.dashboard.copyLinkDesc,
    });
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 px-4 sm:px-6 lg:px-8 py-3 transition-all shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-black transition-colors shrink-0 shadow-2xs"
            aria-label={t.navbar.openMenu}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 truncate">
              <span>{breadcrumb.parent}</span>
              <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
              <span className="text-zinc-900 font-bold">{breadcrumb.title}</span>
            </div>
            <div className="flex items-center gap-2.5 mt-0.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-zinc-950 truncate">
                {breadcrumb.title}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold bg-zinc-100/90 text-zinc-700 border border-zinc-200/80 px-2.5 py-0.5 rounded-lg capitalize shadow-2xs">
                <Calendar className="w-3 h-3 text-zinc-500" />
                {todayFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher variant="pill" />

          {/* Public Page Quick Link */}
          <button
            type="button"
            onClick={copyPublicLink}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/90 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title={language === "pt" ? "Copiar link público para agendamento" : "Copy public booking link"}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{t.dashboard.publicLinkTitle}</span>
          </button>

          {/* Primary Action: New Appointment */}
          <Link
            href="/dashboard/appointments/new"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black hover:from-black hover:to-zinc-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer h-9"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.dashboard.navNewAppointment}</span>
            <span className="sm:hidden">{language === "pt" ? "Novo" : "New"}</span>
          </Link>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-900 font-extrabold text-xs flex items-center justify-center transition-all cursor-pointer shadow-2xs ring-1 ring-zinc-200"
              title={language === "pt" ? "Menu do Usuário" : "User Menu"}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </button>

            {isUserMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-zinc-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 border-b border-zinc-100">
                    <p className="text-xs font-extrabold text-zinc-950 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-medium truncate">
                      {user?.email}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {t.availability.googleConnected}
                    </div>
                  </div>

                  <div className="py-1.5 text-xs font-medium">
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-zinc-400" />
                      <span>{t.dashboard.navSettings}</span>
                    </Link>
                  </div>

                  <div className="border-t border-zinc-100 pt-1 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.dashboard.signOut}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
