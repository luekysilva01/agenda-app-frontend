"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Save,
  AlertCircle,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getCookie, setCookie, purgeLegacyLocalStorage } from "@/lib/utils/cookies";
import {
  availabilitySchema,
  AvailabilityFormData,
} from "@/lib/validations/schemas";

export interface AvailabilitySettings {
  workDays: string[];
  startTime: string;
  endTime: string;
  slotDuration: string;
  bufferTime: string;
}

const AVAILABILITY_COOKIE_KEY = "r3uno_availability_settings";

export default function AvailabilityPage() {
  const { t, language } = useLanguage();

  const daysOfWeek = useMemo(
    () => [
      { id: "Monday", label: t.common.days.Monday },
      { id: "Tuesday", label: t.common.days.Tuesday },
      { id: "Wednesday", label: t.common.days.Wednesday },
      { id: "Thursday", label: t.common.days.Thursday },
      { id: "Friday", label: t.common.days.Friday },
      { id: "Saturday", label: t.common.days.Saturday },
      { id: "Sunday", label: t.common.days.Sunday },
    ],
    [t]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      startTime: "08:00",
      endTime: "18:00",
      slotDuration: "45",
      bufferTime: "10",
    },
  });

  const selectedWorkDays = watch("workDays") || [];

  // Load saved settings from cookies
  useEffect(() => {
    if (typeof window !== "undefined") {
      purgeLegacyLocalStorage();
      const saved = getCookie(AVAILABILITY_COOKIE_KEY);
      if (saved) {
        try {
          const parsed: AvailabilitySettings = JSON.parse(saved);
          reset({
            workDays: Array.isArray(parsed.workDays)
              ? parsed.workDays
              : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            startTime: parsed.startTime || "08:00",
            endTime: parsed.endTime || "18:00",
            slotDuration: parsed.slotDuration || "45",
            bufferTime: parsed.bufferTime || "10",
          });
        } catch (e) {
          console.error("Error loading availability settings from cookie:", e);
        }
      }
    }
  }, [reset]);

  const toggleDay = (dayId: string) => {
    if (selectedWorkDays.includes(dayId)) {
      setValue(
        "workDays",
        selectedWorkDays.filter((d) => d !== dayId),
        { shouldValidate: true }
      );
    } else {
      setValue("workDays", [...selectedWorkDays, dayId], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: AvailabilityFormData) => {
    try {
      const settings: AvailabilitySettings = {
        workDays: data.workDays,
        startTime: data.startTime,
        endTime: data.endTime,
        slotDuration: data.slotDuration,
        bufferTime: data.bufferTime,
      };
      if (typeof window !== "undefined") {
        setCookie(
          AVAILABILITY_COOKIE_KEY,
          JSON.stringify(settings),
          { days: 30, path: "/" }
        );
      }
      toast.success(
        language === "pt"
          ? "Horários de atendimento e intervalos salvos com sucesso!"
          : "Working hours and buffer break rules saved successfully!"
      );
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt"
          ? "Erro ao salvar preferências de disponibilidade."
          : "Error saving availability settings."
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.navbar.dashboard}</span>
            </Link>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-bold text-zinc-900">
              {t.availability.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            {t.availability.title}
          </h1>
          <p className="text-xs text-zinc-500 max-w-2xl leading-relaxed">
            {t.availability.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.availability.googleConnected}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Days Selection Card */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-zinc-100 text-zinc-700">
                  <Calendar className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-semibold text-zinc-900 tracking-tight">
                  {t.availability.daysTitle}
                </h2>
              </div>
              <p className="text-xs text-zinc-500">
                {t.availability.daysDesc}
              </p>
            </div>

            <div className="flex items-center self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-50 border border-zinc-200/70 text-zinc-700 px-2.5 py-1 rounded-full">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    selectedWorkDays.length > 0 ? "bg-emerald-500" : "bg-zinc-400"
                  }`}
                />
                {selectedWorkDays.length}{" "}
                {selectedWorkDays.length === 1
                  ? t.availability.dayActive
                  : t.availability.daysActive}
              </span>
            </div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {daysOfWeek.map((day) => {
              const isSelected = selectedWorkDays.includes(day.id);
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => toggleDay(day.id)}
                  className={`group relative p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-between gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                    isSelected
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                      : "bg-white text-zinc-600 border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50/70"
                  }`}
                >
                  {/* Check Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-150 ${
                      isSelected
                        ? "bg-zinc-800 text-zinc-100"
                        : "border border-zinc-200 text-transparent group-hover:border-zinc-300"
                    }`}
                  >
                    <Check
                      className={`w-3 h-3 stroke-[2.5] ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Texts */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-xs font-medium tracking-tight ${
                        isSelected ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {day.label.split("-")[0]}
                    </span>
                    <span
                      className={`text-[11px] transition-colors ${
                        isSelected
                          ? "text-zinc-400 font-normal"
                          : "text-zinc-400 font-normal"
                      }`}
                    >
                      {isSelected
                        ? t.availability.activeStatus
                        : t.availability.closedStatus}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Error Message */}
          {errors.workDays && (
            <div className="flex items-center gap-1.5 pt-1 text-rose-600">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <p className="text-xs font-medium">{errors.workDays.message}</p>
            </div>
          )}
        </div>

        {/* Schedule & Break Intervals Card */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm sm:text-base font-black text-zinc-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-800" />
              {t.availability.hoursTitle}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t.availability.hoursDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <span>{t.availability.startHour}</span>
              </label>
              <input
                type="time"
                {...register("startTime")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-zinc-50/70 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden shadow-2xs"
              />
              {errors.startTime && (
                <p className="text-[11px] font-semibold text-rose-600">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <span>{t.availability.endHour}</span>
              </label>
              <input
                type="time"
                {...register("endTime")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-zinc-50/70 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden shadow-2xs"
              />
              {errors.endTime && (
                <p className="text-[11px] font-semibold text-rose-600">
                  {errors.endTime.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                {t.availability.sessionDuration}
              </label>
              <select
                {...register("slotDuration")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-zinc-50/70 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer shadow-2xs"
              >
                <option value="15">15 {t.common.minutes}</option>
                <option value="30">30 {t.common.minutes}</option>
                <option value="45">45 {t.common.minutes}</option>
                <option value="60">60 {t.common.minutes} (1h)</option>
                <option value="90">90 {t.common.minutes}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                {t.availability.breakInterval}
              </label>
              <select
                {...register("bufferTime")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300/90 bg-zinc-50/70 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer shadow-2xs"
              >
                <option value="0">{t.availability.noBreak}</option>
                <option value="10">10 {t.availability.breakMinutes}</option>
                <option value="15">15 {t.availability.breakMinutes}</option>
                <option value="20">20 {t.availability.breakMinutes}</option>
                <option value="30">30 {t.availability.breakMinutes}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Operational Rules */}
        <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm sm:text-base font-black text-zinc-950">
              {t.availability.rulesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.availability.rule1Title}</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {t.availability.rule1Desc}
              </p>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.availability.rule2Title}</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                {t.availability.rule2Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            &larr; {t.common.backToDashboard}
          </Link>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-zinc-950 hover:bg-black text-white text-xs font-bold gap-2 px-6 h-10 shadow-sm cursor-pointer rounded-xl transition-all hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Save className="w-4 h-4 text-white" />
            )}
            <span>{t.availability.saveButton}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
