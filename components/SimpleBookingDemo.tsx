"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Check,
  RotateCcw,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  demoBookingSchema,
  DemoBookingFormData,
} from "@/lib/validations/schemas";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function SimpleBookingDemo() {
  const { t, language } = useLanguage();
  const [selectedDay, setSelectedDay] = useState<number>(28);
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30");
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookedData, setBookedData] = useState<DemoBookingFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoBookingFormData>({
    resolver: zodResolver(demoBookingSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "client.sample@email.com",
      clientPhone: "",
    },
  });

  const days = [
    { dayNumber: 27, dayWeek: t.common.today, available: true },
    { dayNumber: 28, dayWeek: t.common.daysShort.Fri, available: true },
    { dayNumber: 29, dayWeek: t.common.daysShort.Sat, available: true },
    { dayNumber: 30, dayWeek: t.common.daysShort.Sun, available: false },
    { dayNumber: 31, dayWeek: t.common.daysShort.Mon, available: true },
    { dayNumber: 1, dayWeek: t.common.daysShort.Tue, available: true },
    { dayNumber: 2, dayWeek: t.common.daysShort.Wed, available: true },
  ];

  const slots = ["09:00", "10:30", "11:15", "14:00", "15:30", "16:45"];

  const onSubmit = (data: DemoBookingFormData) => {
    setBookedData(data);
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setSelectedSlot("10:30");
    reset();
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-zinc-300 shadow-xl overflow-hidden text-zinc-900 transition-all">
      {/* Top Browser / Window Bar */}
      <div className="bg-zinc-100 border-b border-zinc-300 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 ml-3 bg-white px-3 py-1 rounded-md border border-zinc-200 text-[11px] font-mono text-zinc-600">
            <Globe className="w-3 h-3 text-zinc-400" />
            <span>{t.demo.browserUrl}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{t.demo.liveAvailability}</span>
        </div>
      </div>

      {!isBooked ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
          {/* Left Column: Professional & Service Info (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 space-y-5 bg-zinc-50/50">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white font-bold text-base flex items-center justify-center shadow-xs">
                R3
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-900">{t.demo.businessTitle}</h3>
                <p className="text-xs text-zinc-500">{t.demo.businessCategory}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
                  {t.demo.selectedService}
                </span>
                <div className="text-sm font-bold text-zinc-900">
                  {t.demo.serviceName}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-600 pt-1 border-t border-zinc-200">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{t.demo.serviceDuration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-medium">
                  <Globe className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{t.demo.serviceMode}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed pt-1">
                {t.demo.serviceDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Date, Slot Picker & Direct Action (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 space-y-5">
            {/* 1. Date Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-zinc-700" />
                <span>{t.demo.step1Date}</span>
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((d) => (
                  <button
                    key={d.dayNumber + d.dayWeek}
                    type="button"
                    disabled={!d.available}
                    onClick={() => setSelectedDay(d.dayNumber)}
                    className={`py-2 px-1 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                      !d.available
                        ? "opacity-30 cursor-not-allowed bg-zinc-100 border-zinc-200 text-zinc-400"
                        : selectedDay === d.dayNumber
                        ? "bg-zinc-900 border-zinc-900 text-white font-bold shadow-xs scale-105"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase">{d.dayWeek}</span>
                    <span className="text-xs sm:text-sm font-bold mt-0.5">{d.dayNumber}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Slot Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-700" />
                <span>{t.demo.step2Slot}</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-zinc-900 border-zinc-900 text-white shadow-xs"
                          : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Fast Booking Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2 border-t border-zinc-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700">{t.demo.nameLabel}</label>
                  <input
                    type="text"
                    placeholder={t.demo.namePlaceholder}
                    {...register("clientName")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                  />
                  {errors.clientName && (
                    <p className="text-[10px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.clientName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700">{t.demo.phoneLabel}</label>
                  <input
                    type="tel"
                    placeholder={t.demo.phonePlaceholder}
                    {...register("clientPhone")}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 bg-zinc-50 focus:bg-white text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900"
                  />
                  {errors.clientPhone && (
                    <p className="text-[10px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.clientPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs cursor-pointer gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.demo.submitButton}</span>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        /* Confirmed State */
        <div className="p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
              {t.demo.confirmedTitle}
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {t.demo.confirmedDesc}
            </p>
          </div>

          <div className="max-w-md mx-auto bg-zinc-50 rounded-2xl border border-zinc-200 p-4 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="text-zinc-500 font-medium">{t.demo.clientLabel}</span>
              <span className="font-bold text-zinc-900">{bookedData?.clientName || "Client"}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-200 pb-2">
              <span className="text-zinc-500 font-medium">{t.demo.dateLabel}</span>
              <span className="font-bold text-zinc-900">
                {language === "pt" ? `Dia ${selectedDay} às ${selectedSlot}` : `Day ${selectedDay} at ${selectedSlot}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium">{t.demo.businessTitle}:</span>
              <span className="font-bold text-zinc-900">{t.demo.businessCategory}</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="text-xs border-zinc-300 text-zinc-700 hover:bg-zinc-100 gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.demo.resetButton}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
