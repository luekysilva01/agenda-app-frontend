"use client";

import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Calendar,
  CheckCircle2,
  Sliders,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCookie, setCookie, purgeLegacyLocalStorage } from "@/lib/utils/cookies";
import {
  availabilitySchema,
  AvailabilityFormData,
} from "@/lib/validations/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AvailabilityConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABILITY_COOKIE_KEY = "r3uno_availability_settings";

export function AvailabilityConfigModal({
  isOpen,
  onClose,
}: AvailabilityConfigModalProps) {
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
    formState: { errors },
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

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      purgeLegacyLocalStorage();
      const saved = getCookie(AVAILABILITY_COOKIE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          reset({
            workDays: Array.isArray(parsed.workDays)
              ? parsed.workDays
              : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            startTime: parsed.startTime || "08:00",
            endTime: parsed.endTime || "18:00",
            slotDuration: parsed.slotDuration || "45",
            bufferTime: parsed.bufferTime || "10",
          });
        } catch {
          // ignore
        }
      }
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

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

  const onSubmit = (data: AvailabilityFormData) => {
    try {
      const settings = {
        workDays: data.workDays,
        startTime: data.startTime,
        endTime: data.endTime,
        slotDuration: data.slotDuration,
        bufferTime: data.bufferTime,
      };
      if (typeof window !== "undefined") {
        setCookie(AVAILABILITY_COOKIE_KEY, JSON.stringify(settings), {
          days: 30,
          path: "/",
        });
      }
      toast.success(
        language === "pt"
          ? "Regras de disponibilidade e intervalos salvas com sucesso!"
          : "Availability and buffer break settings saved successfully!"
      );
      onClose();
    } catch {
      toast.error(
        language === "pt" ? "Erro ao salvar regras." : "Error saving settings."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-150 text-zinc-900">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-zinc-950 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-white">
              <Sliders className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">
                {language === "pt"
                  ? "Configuração Rápida de Horários"
                  : "Quick Availability Settings"}
              </span>
              <span className="text-[10px] text-zinc-400">
                {language === "pt"
                  ? "Disponibilidade semanal e regras de intervalo"
                  : "Weekly schedule and buffer break rules"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6"
        >
          {/* Days of week */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black uppercase tracking-wider text-zinc-700">
                {language === "pt"
                  ? "Dias de Atendimento Ativos:"
                  : "Active Working Days:"}
              </label>
              <span className="text-[11px] font-mono font-bold text-zinc-500">
                {selectedWorkDays.length}{" "}
                {language === "pt" ? "selecionados" : "selected"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {daysOfWeek.map((day) => {
                const isSelected = selectedWorkDays.includes(day.id);
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                        : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <span>{isSelected ? "✓" : ""}</span>
                    <span>{day.label.split("-")[0]}</span>
                  </button>
                );
              })}
            </div>
            {errors.workDays && (
              <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.workDays.message}
              </p>
            )}
          </div>

          {/* Operating hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                {t.availability.startHour}
              </label>
              <input
                type="time"
                {...register("startTime")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
              />
              {errors.startTime && (
                <p className="text-[11px] font-semibold text-rose-600">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
                {t.availability.endHour}
              </label>
              <input
                type="time"
                {...register("endTime")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
              >
                <option value="0">{t.availability.noBreak}</option>
                <option value="10">10 {t.availability.breakMinutes}</option>
                <option value="15">15 {t.availability.breakMinutes}</option>
                <option value="20">20 {t.availability.breakMinutes}</option>
                <option value="30">30 {t.availability.breakMinutes}</option>
              </select>
            </div>
          </div>

          {/* Conflict Protection */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-1.5">
            <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>
                {t.availability.rule1Title}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              {t.availability.rule1Desc}
            </p>
          </div>

          {/* Save button */}
          <div className="flex justify-end gap-3 pt-2 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-xl"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              className="text-xs bg-zinc-950 hover:bg-black text-white font-bold gap-1.5 rounded-xl cursor-pointer shadow-xs px-5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.common.save}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
