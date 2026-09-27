"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/api/appointments";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AppointmentTableViewProps {
  appointments: Appointment[];
  onSelectAppointment: (appointment: Appointment) => void;
  onRefresh: () => Promise<void>;
  token?: string;
}

export function AppointmentTableView({
  appointments,
  onSelectAppointment,
}: AppointmentTableViewProps) {
  const { t, language, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredAppointments = appointments.filter((app) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      app.clientName.toLowerCase().includes(term) ||
      (app.clientEmail && app.clientEmail.toLowerCase().includes(term)) ||
      app.clientPhone.includes(term) ||
      app.serviceName.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "ALL" ? true : app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (filteredAppointments.length === 0) {
      toast.info(t.tableView.exportEmpty);
      return;
    }

    const headers = [
      "ID",
      language === "pt" ? "Cliente" : "Client",
      "Email",
      language === "pt" ? "Telefone" : "Phone",
      language === "pt" ? "Servico" : "Service",
      language === "pt" ? "Duracao_Minutos" : "Duration_Minutes",
      language === "pt" ? "Agendado_Para" : "Scheduled_At",
      "Status",
    ];

    const rows = filteredAppointments.map((a) => [
      a.id,
      `"${a.clientName}"`,
      a.clientEmail,
      a.clientPhone,
      `"${a.serviceName}"`,
      a.durationMinutes,
      new Date(a.scheduledAt).toISOString(),
      a.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `r3uno-appointments-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(t.tableView.exportSuccess);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xs overflow-hidden space-y-4">
      {/* Table Controls */}
      <div className="p-5 sm:p-6 border-b border-zinc-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.tableView.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-zinc-200/90 bg-zinc-50/70 text-xs font-medium text-zinc-900 focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Tabs & Export */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-zinc-200/80 bg-zinc-100/70 p-1 text-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "ALL"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {t.tableView.allFilter} ({appointments.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("CONFIRMED")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "CONFIRMED"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {t.tableView.confirmedFilter}
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("COMPLETED")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "COMPLETED"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {t.tableView.completedFilter}
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("CANCELLED")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                statusFilter === "CANCELLED"
                  ? "bg-white text-zinc-950 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {t.tableView.cancelledFilter}
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs h-9 border-zinc-300/90 text-zinc-700 hover:bg-zinc-50 gap-1.5 cursor-pointer rounded-xl font-bold shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.tableView.exportCsv}</span>
          </Button>
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-700">
          <thead className="bg-zinc-50/90 text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider border-b border-zinc-200/80">
            <tr>
              <th className="py-3.5 px-6">{t.tableView.colClient}</th>
              <th className="py-3.5 px-4">{t.tableView.colService}</th>
              <th className="py-3.5 px-4">{t.tableView.colDuration}</th>
              <th className="py-3.5 px-4">{t.tableView.colDateTime}</th>
              <th className="py-3.5 px-4">{t.tableView.colStatus}</th>
              <th className="py-3.5 px-6 text-right">{t.tableView.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-medium">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-14 text-center text-zinc-500">
                  <div className="space-y-2 max-w-sm mx-auto">
                    <p className="text-sm font-bold text-zinc-800">
                      {t.tableView.emptyTitle}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {t.tableView.emptyDesc}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAppointments.map((app) => {
                const dateObj = new Date(app.scheduledAt);
                const dateFormatted = dateObj.toLocaleDateString(locale, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                const timeFormatted = dateObj.toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr
                    key={app.id}
                    onClick={() => onSelectAppointment(app)}
                    className="hover:bg-zinc-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Patient Name and Phone */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-zinc-950 text-white font-black flex items-center justify-center text-xs shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                          {app.clientName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-extrabold text-zinc-950 group-hover:underline text-sm">
                            {app.clientName}
                          </div>
                          <div className="text-[11px] text-zinc-500 flex items-center gap-1 font-medium">
                            <span>{app.clientPhone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Procedure */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-zinc-900 truncate max-w-[220px]">
                        {app.serviceName}
                      </div>
                      {app.clientEmail && (
                        <div className="text-[11px] text-zinc-500 truncate max-w-[220px]">
                          {app.clientEmail}
                        </div>
                      )}
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 font-mono">
                      <span className="bg-zinc-100 border border-zinc-200/80 px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-zinc-800">
                        {app.durationMinutes} {t.common.minutes}
                      </span>
                    </td>

                    {/* Scheduled Date */}
                    <td className="py-4 px-4 font-mono">
                      <div className="font-bold text-zinc-950">
                        {dateFormatted}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-semibold">
                        {timeFormatted}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                          app.status === "CONFIRMED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                            : app.status === "COMPLETED"
                            ? "bg-zinc-100 text-zinc-700 border-zinc-200/80"
                            : app.status === "NO_SHOW"
                            ? "bg-amber-50 text-amber-700 border-amber-200/80"
                            : "bg-rose-50 text-rose-600 border-rose-200/80 line-through"
                        }`}
                      >
                        {app.status === "CONFIRMED"
                          ? t.common.statusConfirmed
                          : app.status === "COMPLETED"
                          ? t.common.statusCompleted
                          : app.status === "NO_SHOW"
                          ? t.common.statusNoShow
                          : t.common.statusCancelled}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-4 px-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectAppointment(app)}
                        className="px-3 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 hover:text-black transition-all inline-flex items-center gap-1.5 font-bold text-xs shadow-2xs cursor-pointer group-hover:border-zinc-300"
                        title={t.tableView.viewDetails}
                      >
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{t.tableView.viewDetails}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
