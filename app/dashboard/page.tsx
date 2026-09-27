"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ShieldCheck,
  RefreshCw,
  Building2,
  Plus,
  Table as TableIcon,
  Clock,
  ArrowRight,
  Copy,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Appointment,
  AppointmentStats,
  Service,
  appointmentsApi,
  servicesApi,
} from "@/lib/api/appointments";
import { AppointmentCalendarView } from "@/components/dashboard/AppointmentCalendarView";
import { AppointmentTableView } from "@/components/dashboard/AppointmentTableView";
import { AvailabilityConfigModal } from "@/components/dashboard/AvailabilityConfigModal";

type ActiveTab = "agenda" | "tabela" | "servicos";

// Helper image mapping for service categories
function getServiceImage(category?: string) {
  const cat = (category || "").toLowerCase();
  if (cat.includes("saude") || cat.includes("med") || cat.includes("odonto") || cat.includes("health")) {
    return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80";
  }
  if (cat.includes("psi") || cat.includes("tera") || cat.includes("ment") || cat.includes("psych")) {
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80";
  }
  if (cat.includes("adv") || cat.includes("jur") || cat.includes("lei") || cat.includes("law") || cat.includes("legal")) {
    return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80";
  }
  if (cat.includes("arq") || cat.includes("design")) {
    return "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80";
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, getToken } = useAuth();
  const { t, language, locale } = useLanguage();

  // Tab navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>("agenda");

  // Modals state
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<AppointmentStats>({
    todayCount: 0,
    totalScheduled: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
    attendanceRate: 100,
  });
  const [services, setServices] = useState<Service[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Selected date for calendar view
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Backend token
  const [backendToken, setBackendToken] = useState<string | undefined>(
    undefined,
  );

  // Initial load
  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          if (isMounted) setIsDataLoading(true);
          const token = await getToken();
          if (token && isMounted) setBackendToken(token);

          const [fetchedAppointments, fetchedServices, fetchedStats] =
            await Promise.allSettled([
              appointmentsApi.getAll(token || undefined),
              servicesApi.getAll(token || undefined),
              appointmentsApi.getStats(token || undefined),
            ]);

          if (isMounted) {
            if (fetchedAppointments.status === "fulfilled") {
              setAppointments(fetchedAppointments.value || []);
            }

            if (fetchedServices.status === "fulfilled") {
              setServices(fetchedServices.value || []);
            }

            if (fetchedStats.status === "fulfilled") {
              setStats(fetchedStats.value);
            }
          }
        } catch (err) {
          console.error("Dashboard load error:", err);
        } finally {
          if (isMounted) setIsDataLoading(false);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, getToken]);

  const refreshData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const token = await getToken();
      const [fetchedAppointments, fetchedServices, fetchedStats] =
        await Promise.allSettled([
          appointmentsApi.getAll(token || undefined),
          servicesApi.getAll(token || undefined),
          appointmentsApi.getStats(token || undefined),
        ]);

      if (fetchedAppointments.status === "fulfilled") {
        setAppointments(fetchedAppointments.value || []);
      }
      if (fetchedServices.status === "fulfilled") {
        setServices(fetchedServices.value || []);
      }
      if (fetchedStats.status === "fulfilled") {
        setStats(fetchedStats.value);
      }
      toast.success(t.dashboard.syncSuccessToast);
    } catch (err) {
      console.error(err);
      toast.error(t.dashboard.syncErrorToast);
    } finally {
      setIsDataLoading(false);
    }
  }, [getToken, t]);

  const handleOpenAppointment = (app: Appointment) => {
    router.push(`/dashboard/appointments/${app.id}`);
  };

  const handleNewAppointment = (date?: Date) => {
    if (date) {
      router.push(
        `/dashboard/appointments/new?date=${date.toISOString().split("T")[0]}`,
      );
    } else {
      router.push("/dashboard/appointments/new");
    }
  };

  // Find upcoming next appointment
  const nextAppointment = useMemo(() => {
    const now = new Date().getTime();
    const futureApps = appointments
      .filter(
        (a) =>
          a.status !== "CANCELLED" &&
          new Date(a.scheduledAt).getTime() >= now - 1000 * 60 * 60,
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
      );
    return futureApps[0] || null;
  }, [appointments]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t.dashboard.greetingMorning;
    if (hour < 18) return t.dashboard.greetingAfternoon;
    return t.dashboard.greetingEvening;
  }, [t]);

  const publicUrl = useMemo(() => {
    const slug = user?.slug || "agenda";
    return `https://r3uno.app/${slug}`;
  }, [user]);

  const copyPublicLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(publicUrl);
      toast.success(t.dashboard.copyLinkSuccess, {
        description: t.dashboard.copyLinkDesc,
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7">
      {/* 1. Personalized Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6 sm:p-8 shadow-md border border-zinc-800 relative overflow-hidden">
        {/* Subtle background ambient decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 rounded-full bg-amber-500/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                {greeting}, {user?.name || t.dashboard.specialistDefault}!
              </span>
              <span className="text-zinc-400 font-normal">|</span>
              <span className="text-zinc-300 font-medium">
                {t.dashboard.connectedBadge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {stats.todayCount > 0 ? (
                <>
                  {t.dashboard.hasAppointmentsHeading}{" "}
                  <span className="text-amber-400">
                    {stats.todayCount}{" "}
                    {language === "pt"
                      ? stats.todayCount > 1
                        ? "atendimentos"
                        : "atendimento"
                      : stats.todayCount > 1
                      ? "appointments"
                      : "appointment"}
                  </span>{" "}
                  {language === "pt" ? "na agenda hoje." : "scheduled today."}
                </>
              ) : (
                <>{t.dashboard.noAppointmentsHeading}</>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              {t.dashboard.bannerDesc}
            </p>
          </div>

          {/* Quick Action Pill for Public Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl">
              <div className="px-3 py-1.5 text-xs font-mono font-medium text-zinc-200 truncate max-w-[200px]">
                r3uno.app/{user?.slug || "agenda"}
              </div>
              <button
                type="button"
                onClick={copyPublicLink}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-extrabold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t.common.copy}</span>
              </button>
            </div>

            <Button
              onClick={() => handleNewAppointment()}
              className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold text-xs h-10 px-4 rounded-2xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.dashboard.navNewAppointment}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-zinc-800" />
                {t.dashboard.nextAppointmentTitle}
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {t.dashboard.confirmedSlot}
              </span>
            </div>

            {nextAppointment ? (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200 shadow-2xs">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt={nextAppointment.clientName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-xs text-white text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                    {nextAppointment.durationMinutes}m
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg text-zinc-950 truncate">
                      {nextAppointment.clientName}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-zinc-600 truncate flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                    {nextAppointment.serviceName}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 pt-1">
                    <span className="font-extrabold text-zinc-900 bg-zinc-100 border border-zinc-200/80 px-2.5 py-0.5 rounded-lg font-mono">
                      📅{" "}
                      {new Date(nextAppointment.scheduledAt).toLocaleDateString(
                        locale,
                        {
                          day: "2-digit",
                          month: "short",
                        },
                      )}{" "}
                      {language === "pt" ? "às" : "at"}{" "}
                      {new Date(nextAppointment.scheduledAt).toLocaleTimeString(
                        locale,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                    {nextAppointment.clientPhone && (
                      <span className="text-[11px] text-zinc-600 font-medium">
                        📱 {nextAppointment.clientPhone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 shadow-2xs">
                  <Image
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=300&q=80"
                    alt="Schedule clear"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-900">
                    {t.dashboard.freeScheduleTitle}
                  </h4>
                  <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
                    {t.dashboard.freeScheduleDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2 border-t border-zinc-100">
            {nextAppointment ? (
              <Button
                onClick={() => handleOpenAppointment(nextAppointment)}
                className="bg-zinc-900 hover:bg-black text-white text-xs font-bold gap-1.5 h-9 rounded-xl flex-1 cursor-pointer shadow-xs"
              >
                <span>{t.dashboard.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                onClick={() => handleNewAppointment()}
                className="bg-zinc-900 hover:bg-black text-white text-xs font-bold gap-1.5 h-9 rounded-xl flex-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.dashboard.manualBooking}</span>
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-zinc-800 shadow-md bg-zinc-950 text-white min-h-[220px] flex flex-col justify-between p-6">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Office workspace"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {t.dashboard.tipBadge}
            </span>

            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {t.dashboard.tipTitle}
            </h3>

            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              {t.dashboard.tipDesc}
            </p>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between">
            <Link
              href="/dashboard/availability"
              className="text-xs font-bold text-white hover:text-zinc-200 underline underline-offset-4 flex items-center gap-1"
            >
              <span>{t.dashboard.tipAction}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <span className="text-[11px] font-mono text-zinc-400 font-semibold">
              {t.dashboard.tipAutomated}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all space-y-3 group">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
              {t.dashboard.statToday}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 tracking-tight">
            {stats.todayCount}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-between pt-1 border-t border-zinc-100">
            <span>{stats.todayCount} {t.dashboard.statTodayActive}</span>
            <span className="text-amber-700 font-extrabold bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md text-[10px]">
              {t.common.active}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all space-y-3 group">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
              {t.dashboard.statTotal}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 tracking-tight">
            {stats.totalScheduled}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-between pt-1 border-t border-zinc-100">
            <span>{t.dashboard.statSynced}</span>
            <span className="text-indigo-700 font-extrabold bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md text-[10px]">
              {t.common.synced}
            </span>
          </div>
        </div>

        {/* Card 3: Attendance Rate */}
        <div className="bg-white p-5 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all space-y-3 group">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
              {t.dashboard.statAttendance}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 tracking-tight flex items-baseline gap-1.5">
            <span>{stats.attendanceRate}%</span>
            <span className="text-xs font-semibold text-zinc-500">
              {t.dashboard.statEffectiveness}
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-between pt-1 border-t border-zinc-100">
            <span>{stats.completed} {t.dashboard.statCompleted}</span>
            <span className="text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md text-[10px]">
              {t.dashboard.statHighRate}
            </span>
          </div>
        </div>

        {/* Card 4: Active Services */}
        <div className="bg-white p-5 rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all space-y-3 group">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
              {t.dashboard.statServices}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-950 tracking-tight">
            {services.length}
          </div>
          <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-between pt-1 border-t border-zinc-100">
            <span>{language === "pt" ? "No catálogo público" : "In public catalog"}</span>
            <Link
              href="/dashboard/services"
              className="text-zinc-950 font-bold hover:underline text-[10px] flex items-center gap-0.5"
            >
              <span>{t.dashboard.statManage}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Visual Navigation Tabs & Refresh Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200/80 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-200/60 border border-zinc-200/80 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("agenda")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "agenda"
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.dashboard.tabCalendar}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tabela")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "tabela"
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>{t.dashboard.tabTable}</span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                activeTab === "tabela"
                  ? "bg-zinc-800 text-zinc-100"
                  : "bg-zinc-300/80 text-zinc-800"
              }`}
            >
              {appointments.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("servicos")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === "servicos"
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.dashboard.tabServices}</span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                activeTab === "servicos"
                  ? "bg-zinc-800 text-zinc-100"
                  : "bg-zinc-300/80 text-zinc-800"
              }`}
            >
              {services.length}
            </span>
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshData()}
          disabled={isDataLoading}
          className="text-xs h-9 px-3.5 border-zinc-300/90 bg-white hover:bg-zinc-50 text-zinc-800 font-bold gap-1.5 cursor-pointer shrink-0 self-end sm:self-auto rounded-xl shadow-2xs"
          title={t.dashboard.syncData}
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${
              isDataLoading ? "animate-spin text-zinc-950" : "text-zinc-500"
            }`}
          />
          <span>{t.dashboard.syncData}</span>
        </Button>
      </div>

      {/* 5. Main View Tab Content */}
      {activeTab === "agenda" && (
        <div className="space-y-6">
          <AppointmentCalendarView
            appointments={appointments}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onNewAppointment={handleNewAppointment}
            onSelectAppointment={handleOpenAppointment}
          />
        </div>
      )}

      {activeTab === "tabela" && (
        <div className="space-y-6">
          <AppointmentTableView
            appointments={appointments}
            onSelectAppointment={handleOpenAppointment}
            onRefresh={refreshData}
            token={backendToken}
          />
        </div>
      )}

      {activeTab === "servicos" && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                <span>{language === "pt" ? "Catálogo de Serviços & Consultas" : "Service & Offerings Catalog"}</span>
                <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded-full">
                  {services.length} {language === "pt" ? "ativos" : "active"}
                </span>
              </h2>
              <p className="text-xs text-zinc-500">
                {language === "pt"
                  ? "Cada serviço é exibido na sua página pública com duração, orientações e agendamento instantâneo."
                  : "Each service is showcased on your public page with duration, instructions, and instant booking."}
              </p>
            </div>
            <Link
              href="/dashboard/services"
              className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 hover:bg-black text-white font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === "pt" ? "Gerenciar Catálogo" : "Manage Catalog"}</span>
            </Link>
          </div>

          {services.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-zinc-200 rounded-3xl space-y-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto bg-zinc-100">
                <Image
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80"
                  alt="Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-900">
                  {language === "pt" ? "Nenhum serviço cadastrado ainda." : "No services registered yet."}
                </p>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  {language === "pt"
                    ? "Cadastre suas ofertas de atendimento (ex: Consulta Inicial, Terapia, Reunião Estratégica) para liberar o link público de reservas."
                    : "Add your offerings (e.g., Initial Consultation, Therapy, Strategy Session) to enable your public booking link."}
                </p>
              </div>
              <Link
                href="/dashboard/services"
                className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === "pt" ? "Cadastrar Primeiro Serviço" : "Add First Service"}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="rounded-2xl border border-zinc-200/90 overflow-hidden bg-white hover:border-zinc-400 hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {/* Category Image Header from Unsplash */}
                  <div className="relative h-36 w-full overflow-hidden bg-zinc-100">
                    <Image
                      src={getServiceImage(srv.category || srv.name)}
                      alt={srv.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-xs">
                        {srv.category || (language === "pt" ? "Atendimento" : "Appointment")}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-bold drop-shadow-sm">
                      <span className="font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                        ⏱️ {srv.durationMinutes} {t.common.minutes}
                      </span>
                      <span className="bg-emerald-600/90 backdrop-blur-xs px-2 py-0.5 rounded text-white font-bold text-[10px]">
                        {srv.isActive ? t.common.active : t.common.paused}
                      </span>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-zinc-950 text-sm group-hover:text-black">
                        {srv.name}
                      </h3>
                      {srv.description && (
                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === "pt" ? "Disponível no link" : "Available on link"}
                      </span>
                      <Link
                        href="/dashboard/services"
                        className="text-zinc-900 font-bold hover:underline"
                      >
                        {t.common.edit} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. Professional Inspiration & Showcase Banner */}
      <div className="rounded-3xl bg-zinc-50 border border-zinc-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-zinc-300">
            <Image
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=200&q=80"
              alt="Showcase"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-extrabold text-zinc-950">
              {t.dashboard.inspirationTitle}
            </h4>
            <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">
              {t.dashboard.inspirationDesc}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/availability"
          className="shrink-0 px-4 py-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <span>{t.dashboard.inspirationAction}</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
        </Link>
      </div>

      {/* Quick Modals */}
      <AvailabilityConfigModal
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
      />
    </div>
  );
}
