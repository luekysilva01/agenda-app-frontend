"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/api/appointments";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AppointmentCalendarViewProps {
  appointments: Appointment[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onNewAppointment: (date: Date) => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

export function AppointmentCalendarView({
  appointments,
  selectedDate,
  onSelectDate,
  onNewAppointment,
  onSelectAppointment,
}: AppointmentCalendarViewProps) {
  const { t, language, locale } = useLanguage();

  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const weekdays = [
    t.common.daysShort.Sun,
    t.common.daysShort.Mon,
    t.common.daysShort.Tue,
    t.common.daysShort.Wed,
    t.common.daysShort.Thu,
    t.common.daysShort.Fri,
    t.common.daysShort.Sat,
  ];

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelectDate(today);
  };

  // Get start day of month and total days
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create grid cells
  const calendarCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(new Date(year, month, day));
  }

  // Helper to check if two dates are same calendar day
  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const today = new Date();

  // Filter appointments for the selected date and sort by time
  const dayAppointments = appointments
    .filter((a) => {
      const appDate = new Date(a.scheduledAt);
      return isSameDay(appDate, selectedDate);
    })
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return t.common.statusConfirmed;
      case "COMPLETED":
        return t.common.statusCompleted;
      case "CANCELLED":
        return t.common.statusCancelled;
      case "PENDING":
        return language === "pt" ? "Pendente" : "Pending";
      case "NO_SHOW":
        return t.common.statusNoShow;
      default:
        return status;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Monthly Grid (Left 7 Cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-7 shadow-2xs space-y-5">
        {/* Calendar Navigation Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-zinc-950 capitalize tracking-tight flex items-center gap-2">
              <span>{t.common.months[month]}</span>
              <span className="text-zinc-400 font-light text-base">{year}</span>
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="text-[11px] h-7 px-2.5 rounded-lg border-zinc-300/80 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 font-bold cursor-pointer shadow-2xs"
            >
              {t.calendarView.today}
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-black transition-colors cursor-pointer shadow-2xs"
              aria-label={t.calendarView.prevMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 hover:text-black transition-colors cursor-pointer shadow-2xs"
              aria-label={t.calendarView.nextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center text-xs font-extrabold text-zinc-400 pb-1">
          {weekdays.map((d) => (
            <div key={d} className="py-1 uppercase text-[10px] tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Cells Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarCells.map((cellDate, idx) => {
            if (!cellDate) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="h-16 sm:h-20 rounded-2xl bg-zinc-50/40 border border-transparent"
                />
              );
            }

            const isSelected = isSameDay(cellDate, selectedDate);
            const isCurrentToday = isSameDay(cellDate, today);

            // Count appointments on this day
            const dayApps = appointments.filter((a) =>
              isSameDay(new Date(a.scheduledAt), cellDate)
            );

            return (
              <button
                key={cellDate.toISOString()}
                type="button"
                onClick={() => onSelectDate(cellDate)}
                className={`h-16 sm:h-20 p-2 rounded-2xl border flex flex-col justify-between items-start transition-all duration-200 cursor-pointer text-left relative group ${
                  isSelected
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-md scale-[1.02] ring-2 ring-zinc-950 ring-offset-2"
                    : isCurrentToday
                    ? "bg-emerald-50/50 border-emerald-300 text-zinc-950 font-bold hover:bg-emerald-50"
                    : "bg-white border-zinc-200/90 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50/80 shadow-2xs"
                }`}
              >
                <div className="w-full flex items-center justify-between text-xs">
                  <span
                    className={`font-bold text-xs sm:text-sm ${
                      isCurrentToday && !isSelected
                        ? "text-emerald-700 font-black"
                        : isSelected
                        ? "text-white"
                        : "text-zinc-800"
                    }`}
                  >
                    {cellDate.getDate()}
                  </span>
                  {dayApps.length > 0 && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? "bg-white text-zinc-950"
                          : "bg-zinc-900 text-white"
                      }`}
                    >
                      {dayApps.length}
                    </span>
                  )}
                </div>

                {/* Status indicator bars / dots */}
                <div className="w-full">
                  {dayApps.length > 0 ? (
                    <div className="flex gap-1 items-center w-full">
                      {dayApps.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-emerald-400" : "bg-emerald-500"
                          }`}
                        />
                      ))}
                      {dayApps.length > 3 && (
                        <span
                          className={`text-[9px] font-bold leading-none ${
                            isSelected ? "text-white" : "text-zinc-500"
                          }`}
                        >
                          +{dayApps.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="h-1.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda Feed (Right 5 Cols) */}
      <div className="lg:col-span-5 bg-white rounded-3xl border border-zinc-200/90 p-5 sm:p-7 shadow-2xs flex flex-col space-y-4">
        {/* Header of selected day */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                {language === "pt" ? "Agenda do Dia" : "Day Schedule"}
              </span>
              <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-800 px-2 py-0.2 rounded-md">
                {dayAppointments.length}{" "}
                {dayAppointments.length !== 1
                  ? t.calendarView.appointmentsCount
                  : language === "pt"
                  ? "agendamento"
                  : "appointment"}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-zinc-950 capitalize mt-0.5">
              {selectedDate.toLocaleDateString(locale, {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h3>
          </div>

          <Button
            size="sm"
            onClick={() => onNewAppointment(selectedDate)}
            className="text-xs h-8.5 px-3 gap-1.5 bg-zinc-950 hover:bg-black text-white font-bold cursor-pointer shadow-xs rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.calendarView.newBooking}</span>
          </Button>
        </div>

        {/* Day's appointments timeline */}
        <div className="flex-1 overflow-y-auto space-y-3 max-h-[480px] pr-1 scrollbar-none">
          {dayAppointments.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-zinc-200 rounded-3xl space-y-3 bg-zinc-50/50">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-800">
                  {t.calendarView.emptyDayTitle}
                </p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                  {t.calendarView.emptyDayDesc}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNewAppointment(selectedDate)}
                className="text-xs border-zinc-300 text-zinc-800 hover:bg-zinc-100 gap-1.5 rounded-xl font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.calendarView.scheduleThisDay}</span>
              </Button>
            </div>
          ) : (
            dayAppointments.map((app) => {
              const timeStr = new Date(app.scheduledAt).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={app.id}
                  onClick={() => onSelectAppointment(app)}
                  className="p-4 rounded-2xl border border-zinc-200/90 hover:border-zinc-900 bg-white hover:shadow-md transition-all cursor-pointer space-y-3 group shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-zinc-950 text-white font-black flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                        {app.clientName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-black text-zinc-950 group-hover:underline block text-sm">
                          {app.clientName}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {app.clientPhone}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs font-extrabold text-zinc-950 bg-zinc-100 border border-zinc-200/80 px-2.5 py-1 rounded-lg">
                      {timeStr}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-700 flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    <span className="font-semibold text-zinc-900 truncate">
                      {app.serviceName}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 font-bold shrink-0 ml-2">
                      ⏱️ {app.durationMinutes} {t.common.minutes}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-100 text-zinc-500">
                    <span
                      className={`font-bold flex items-center gap-1.5 ${
                        app.status === "CONFIRMED"
                          ? "text-emerald-700"
                          : app.status === "COMPLETED"
                          ? "text-zinc-700"
                          : "text-zinc-500"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {getStatusLabel(app.status)}
                    </span>

                    <span className="text-[10px] font-extrabold text-zinc-500 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all">
                      {t.calendarView.viewDetails} &rarr;
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
