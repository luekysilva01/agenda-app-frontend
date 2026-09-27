"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  LayoutDashboard,
  Clock,
  Building2,
  Settings,
  Plus,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface DashboardSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  servicesCount?: number;
  appointmentsCount?: number;
}

export function DashboardSidebar({
  mobileOpen,
  onCloseMobile,
  servicesCount = 0,
  appointmentsCount = 0,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  const navItems = [
    {
      label: t.dashboard.navOverview,
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
      badge: appointmentsCount > 0 ? String(appointmentsCount) : undefined,
      description: language === "pt" ? "Painel & agenda de hoje" : "Dashboard & today's schedule",
    },
    {
      label: t.dashboard.navServices,
      href: "/dashboard/services",
      icon: Building2,
      badge: servicesCount > 0 ? String(servicesCount) : undefined,
      description: language === "pt" ? "Catálogo de ofertas & serviços" : "Offerings & service catalog",
    },
    {
      label: t.dashboard.navAvailability,
      href: "/dashboard/availability",
      icon: Clock,
      description: language === "pt" ? "Horários & regras de atendimento" : "Hours & scheduling rules",
    },
    {
      label: t.dashboard.navSettings,
      href: "/dashboard/settings",
      icon: Settings,
      description: language === "pt" ? "Perfil e privacidade de dados" : "Profile & data privacy",
    },
  ];

  const isActive = (itemHref: string, exact?: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  const handleLogout = async () => {
    await logout();
    toast.info(t.dashboard.signedOutToast);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-zinc-200/80 text-zinc-900 select-none">
      {/* Brand Header */}
      <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group focus:outline-hidden"
          onClick={onCloseMobile}
        >
          <div className="w-10 h-10 rounded-2xl bg-zinc-950 flex items-center justify-center text-white shadow-md shadow-zinc-900/10 group-hover:scale-105 transition-all duration-200 ring-1 ring-zinc-800">
            <CalendarDays className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-zinc-950">
                R3uno<span className="text-zinc-400 font-light">.app</span>
              </span>
              <span className="text-[9px] font-extrabold bg-zinc-900 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-semibold text-zinc-500 tracking-wide uppercase">
              {t.dashboard.proPanel}
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
          aria-label={t.navbar.closeMenu}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action Button */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/dashboard/appointments/new"
          onClick={onCloseMobile}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black hover:from-black hover:to-zinc-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer group"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          <span>{t.dashboard.navNewAppointment}</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-5">
        <div>
          <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
            {t.dashboard.mainMenu}
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all group relative ${
                    active
                      ? "bg-zinc-900 text-white font-bold shadow-xs"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/90 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1 rounded-lg transition-colors ${
                      active ? "text-white" : "text-zinc-400 group-hover:text-zinc-900 group-hover:bg-white"
                    }`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                          active
                            ? "bg-zinc-800 text-zinc-100"
                            : "bg-zinc-200/80 text-zinc-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform opacity-0 group-hover:opacity-100 ${
                        active ? "opacity-100 text-zinc-400" : "text-zinc-400"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Public Booking Link Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100/80 border border-zinc-200/90 space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.dashboard.publicPage}
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
              {t.common.online}
            </span>
          </div>

          <p className="text-[11px] text-zinc-600 font-medium leading-tight line-clamp-1">
            r3uno.app/{user?.slug || "agenda"}
          </p>

          <div className="flex items-center gap-1.5 pt-0.5">
            <button
              type="button"
              onClick={() => {
                const url = `https://r3uno.app/${user?.slug || "agenda"}`;
                navigator.clipboard.writeText(url);
                toast.success(t.dashboard.copyLinkSuccess, {
                  description: t.dashboard.copyLinkDesc,
                });
              }}
              className="flex-1 py-1.5 px-2 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-800 hover:text-zinc-950 font-bold text-[10px] flex items-center justify-center gap-1 shadow-2xs transition-all cursor-pointer"
            >
              <span>{t.dashboard.copyLink}</span>
            </button>
            <Link
              href="/dashboard/settings"
              className="p-1.5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-600 hover:text-zinc-950 shadow-2xs transition-all"
              title={language === "pt" ? "Configurações do perfil" : "Profile settings"}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Google Workspace Sync Indicator */}
        <div className="px-3 py-2 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
            <div className="text-[11px]">
              <span className="font-bold text-zinc-800 block leading-none">{t.dashboard.googleCalendar}</span>
              <span className="text-[10px] text-zinc-500 leading-none">{t.common.synced}</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 font-medium">{t.dashboard.realTimeSync}</span>
        </div>

        {/* Compact Language Selector inside Sidebar */}
        <div className="px-1 pt-1">
          <div className="flex items-center justify-between px-2 py-1 text-[10px] text-zinc-400 uppercase tracking-wider font-extrabold">
            <span>{t.common.language}</span>
          </div>
          <LanguageSwitcher variant="minimal" />
        </div>
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3.5 border-t border-zinc-100 bg-zinc-50/80 flex items-center justify-between gap-2.5">
        <Link
          href="/dashboard/settings"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 min-w-0 flex-1 group p-1 rounded-xl hover:bg-white transition-all"
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name || "Avatar"}
              width={34}
              height={34}
              className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-zinc-300 group-hover:ring-2 group-hover:ring-zinc-900 transition-all"
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 group-hover:ring-2 group-hover:ring-zinc-900 transition-all shadow-2xs">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-zinc-900 truncate group-hover:underline">
              {user?.name || (language === "pt" ? "Minha Conta" : "My Account")}
            </div>
            <div className="text-[10px] text-zinc-500 truncate flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {user?.title || user?.email || (language === "pt" ? "Profissional" : "Professional")}
            </div>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
          title={t.dashboard.signOut}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-screen sticky top-0 z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity duration-200"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
