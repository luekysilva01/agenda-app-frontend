"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Loader2,
  Trash2,
  ShieldCheck,
  Edit2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { authApi } from "@/lib/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Appointment,
  appointmentsApi,
  UpdateAppointmentPayload,
  Service,
  servicesApi,
} from "@/lib/api/appointments";
import {
  newAppointmentSchema,
  NewAppointmentFormData,
} from "@/lib/validations/schemas";
import { isValidUUID } from "@/lib/utils/security";

interface AppointmentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AppointmentDetailPage({
  params,
}: AppointmentDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated, getToken } = useAuth();
  const { t, language, locale } = useLanguage();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit Modal States
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
    formState: { errors: editErrors },
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      serviceName: "",
      durationMinutes: 45,
      scheduledDate: "",
      scheduledTime: "09:00",
      notes: "",
      privacyConsent: true,
    },
  });

  useEffect(() => {
    const fetchAppointmentAndServices = async () => {
      if (!isValidUUID(id)) {
        setIsDataLoading(false);
        setAppointment(null);
        return;
      }

      try {
        setIsDataLoading(true);
        const token = await getToken();
        const [appRes, srvRes] = await Promise.allSettled([
          appointmentsApi.getById(id, token || undefined),
          servicesApi.getAll(token || undefined),
        ]);

        if (appRes.status === "fulfilled" && appRes.value) {
          setAppointment(appRes.value);
        } else {
          setAppointment(null);
        }
        if (
          srvRes.status === "fulfilled" &&
          srvRes.value &&
          srvRes.value.length > 0
        ) {
          setServices(srvRes.value);
        }
      } catch (err) {
        console.error("Error fetching appointment:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (isAuthenticated && id) {
      fetchAppointmentAndServices();
    }
  }, [isAuthenticated, id, getToken]);

  const handleOpenEdit = () => {
    if (!appointment) return;
    const dateObj = new Date(appointment.scheduledAt);
    const dateStr = dateObj.toISOString().split("T")[0];
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const mins = String(dateObj.getMinutes()).padStart(2, "0");

    resetEdit({
      clientName: appointment.clientName,
      clientPhone: appointment.clientPhone,
      clientEmail: appointment.clientEmail || "",
      serviceName: appointment.serviceName,
      serviceId: appointment.serviceId || undefined,
      durationMinutes: appointment.durationMinutes,
      scheduledDate: dateStr,
      scheduledTime: `${hours}:${mins}`,
      notes: appointment.notes || "",
      privacyConsent: true,
    });
    setIsEditing(true);
  };

  const onSaveEdit = async (data: NewAppointmentFormData) => {
    if (!appointment) return;
    setIsUpdating(true);
    try {
      const [year, month, day] = data.scheduledDate.split("-").map(Number);
      const [hours, minutes] = data.scheduledTime.split(":").map(Number);
      const scheduledDateTime = new Date(year, month - 1, day, hours, minutes);

      const updates: UpdateAppointmentPayload = {
        clientName: data.clientName.trim(),
        clientPhone: data.clientPhone.trim(),
        clientEmail: data.clientEmail.trim(),
        serviceName: data.serviceName.trim(),
        durationMinutes: Number(data.durationMinutes),
        scheduledAt: scheduledDateTime.toISOString(),
        notes: data.notes?.trim() || undefined,
      };

      const token = await getToken();
      const updated = await appointmentsApi.update(
        appointment.id,
        updates,
        token || undefined
      );

      setAppointment(updated);
      setIsEditing(false);
      toast.success(
        language === "pt"
          ? "Agendamento atualizado com sucesso!"
          : "Appointment updated successfully!"
      );
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt"
          ? "Erro ao salvar alterações no agendamento."
          : "Error saving appointment updates."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdate = async (updates: UpdateAppointmentPayload) => {
    if (!appointment) return;
    setIsUpdating(true);
    try {
      const token = await getToken();
      const updated = await appointmentsApi.update(
        appointment.id,
        updates,
        token || undefined
      );
      setAppointment(updated);
      toast.success(
        language === "pt"
          ? "Agendamento atualizado com sucesso!"
          : "Appointment updated successfully!"
      );
    } catch {
      setAppointment((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success(
        language === "pt" ? "Status atualizado!" : "Status updated!"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkComplete = async () => {
    await handleUpdate({ status: "COMPLETED" });
    toast.success(
      language === "pt"
        ? "Atendimento marcado como concluído."
        : "Appointment marked as completed."
    );
  };

  const handleCancelAppointment = async () => {
    if (!confirm(t.appointmentDetail.confirmCancel)) {
      return;
    }
    await handleUpdate({ status: "CANCELLED" });
    toast.info(
      language === "pt"
        ? "Agendamento cancelado."
        : "Appointment canceled."
    );
  };

  const handleDeletePermanent = async () => {
    if (!appointment) return;
    if (!confirm(t.appointmentDetail.confirmDelete)) {
      return;
    }
    setIsUpdating(true);
    try {
      const token = await getToken();
      await appointmentsApi.delete(appointment.id, token || undefined);
      toast.info(t.appointmentDetail.deleteSuccess);
      router.push("/dashboard");
    } catch {
      toast.error(
        language === "pt"
          ? "Erro ao excluir agendamento."
          : "Error deleting appointment."
      );
      setIsUpdating(false);
    }
  };

  const handleAnonymizeClientLgpd = async () => {
    if (!appointment) return;
    if (!confirm(t.appointmentDetail.confirmAnonymize)) {
      return;
    }
    setIsUpdating(true);
    try {
      const token = await getToken();
      await authApi.anonymizeAppointment(appointment.id, token || undefined);
      setAppointment((prev) =>
        prev
          ? {
              ...prev,
              clientName: language === "pt" ? "Cliente Anonimizado" : "Anonymized Client",
              clientEmail: "anonymized@privacy.local",
              clientPhone: "(00) 00000-0000",
              notes: null,
            }
          : null
      );
      toast.success(t.appointmentDetail.anonymizeSuccess);
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt"
          ? "Erro ao anonimizar dados do cliente."
          : "Error anonymizing client data."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-zinc-900 animate-spin" />
        <span className="text-xs font-semibold text-zinc-500">
          {t.appointmentDetail.loading}
        </span>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-4">
        <p className="text-sm font-semibold text-zinc-600">
          {t.appointmentDetail.notFound}
        </p>
        <Link
          href="/dashboard"
          className="text-xs font-bold bg-zinc-900 text-white px-4 py-2 rounded-xl"
        >
          {t.common.backToDashboard}
        </Link>
      </div>
    );
  }

  const dateObj = new Date(appointment.scheduledAt);
  const formattedDate = dateObj.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const cleanPhone = appointment.clientPhone.replace(/\D/g, "");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7">
      {/* Top Breadcrumb & Action bar */}
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
              {language === "pt" ? "Agendamento" : "Appointment"} #{appointment.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            {appointment.serviceName}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenEdit}
            className="text-xs h-9 gap-1.5 border-zinc-300 text-zinc-800 hover:bg-zinc-100 cursor-pointer rounded-xl font-bold shadow-2xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t.appointmentDetail.editReschedule}</span>
          </Button>

          {appointment.status !== "COMPLETED" && (
            <Button
              size="sm"
              onClick={handleMarkComplete}
              disabled={isUpdating}
              className="text-xs h-9 bg-zinc-950 hover:bg-black text-white font-bold gap-1.5 cursor-pointer rounded-xl shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.appointmentDetail.complete}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Banner Summary */}
      <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-800 px-2.5 py-0.5 rounded-full font-bold">
              {t.appointmentDetail.recordBadge}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Google Meet / Calendar
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 pt-1 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-zinc-700" />
              <strong className="capitalize text-zinc-950 text-sm">{formattedDate}</strong>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-4 h-4 text-zinc-700" />
              <strong className="text-zinc-950">{formattedTime}</strong> ({appointment.durationMinutes} {t.common.minutes})
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <span
            className={`text-xs font-extrabold px-3.5 py-1.5 rounded-xl border uppercase tracking-wider ${
              appointment.status === "CONFIRMED"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                : appointment.status === "COMPLETED"
                ? "bg-zinc-100 text-zinc-800 border-zinc-300"
                : appointment.status === "NO_SHOW"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-rose-50 text-rose-600 border-rose-200 line-through"
            }`}
          >
            {appointment.status === "CONFIRMED"
              ? t.common.statusConfirmed
              : appointment.status === "COMPLETED"
              ? t.common.statusCompleted
              : appointment.status === "NO_SHOW"
              ? t.common.statusNoShow
              : t.common.statusCancelled}
          </span>

          <span className="text-[11px] text-zinc-500 font-mono">
            {t.appointmentDetail.createdOn} {new Date(appointment.createdAt).toLocaleDateString(locale)}
          </span>
        </div>
      </div>

      {/* 2-Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Client Card */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {appointment.clientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-black text-zinc-950">
                    {appointment.clientName}
                  </h2>
                  <p className="text-xs text-zinc-500 font-medium">
                    {t.appointmentDetail.clientFile}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenEdit}
                className="text-xs text-zinc-600 hover:text-zinc-950 font-bold flex items-center gap-1 cursor-pointer p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{t.common.edit}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                <span className="text-zinc-500 font-medium">{t.common.phone}:</span>
                <div className="font-extrabold text-zinc-950 text-sm">
                  {appointment.clientPhone}
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1">
                <span className="text-zinc-500 font-medium">{t.common.email}:</span>
                <div className="font-bold text-zinc-950 text-sm truncate">
                  {appointment.clientEmail || (language === "pt" ? "Não informado" : "Not provided")}
                </div>
                {appointment.clientEmail && (
                  <a
                    href={`mailto:${appointment.clientEmail}`}
                    className="text-[11px] text-zinc-700 font-bold hover:underline inline-flex items-center gap-1 pt-0.5"
                  >
                    {t.appointmentDetail.sendEmail} &rarr;
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-800" />
                {t.appointmentDetail.notesTitle}
              </h2>
              <button
                type="button"
                onClick={handleOpenEdit}
                className="text-xs text-zinc-600 hover:text-zinc-950 font-bold flex items-center gap-1 cursor-pointer p-1 rounded-lg hover:bg-zinc-100"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{t.common.edit}</span>
              </button>
            </div>
            <p className="p-4 bg-zinc-50 border border-zinc-200/80 rounded-2xl text-xs text-zinc-800 leading-relaxed min-h-[70px]">
              {appointment.notes || t.appointmentDetail.emptyNotes}
            </p>
          </div>
        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Status Manager Card */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
              {t.appointmentDetail.quickStatusTitle}
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdate({ status: "CONFIRMED" })}
                disabled={isUpdating}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  appointment.status === "CONFIRMED"
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {t.common.statusConfirmed}
              </button>

              <button
                type="button"
                onClick={() => handleUpdate({ status: "COMPLETED" })}
                disabled={isUpdating}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  appointment.status === "COMPLETED"
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {t.common.statusCompleted}
              </button>

              <button
                type="button"
                onClick={() => handleUpdate({ status: "NO_SHOW" })}
                disabled={isUpdating}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  appointment.status === "NO_SHOW"
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-xs"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                }`}
              >
                {t.common.statusNoShow}
              </button>

              <button
                type="button"
                onClick={handleCancelAppointment}
                disabled={isUpdating}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  appointment.status === "CANCELLED"
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-zinc-50 text-rose-700 border-zinc-200 hover:border-rose-300"
                }`}
              >
                {t.common.cancel}
              </button>
            </div>
          </div>

          {/* Operational Actions */}
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              {t.appointmentDetail.actionsTitle}
            </h2>

            <div className="space-y-2">
              <Button
                onClick={handleOpenEdit}
                variant="outline"
                className="w-full border-zinc-300 text-zinc-900 hover:bg-zinc-100 text-xs font-bold gap-2 h-9 cursor-pointer rounded-xl"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{t.appointmentDetail.editReschedule}</span>
              </Button>

              {appointment.status !== "COMPLETED" && (
                <Button
                  onClick={handleMarkComplete}
                  disabled={isUpdating}
                  className="w-full bg-zinc-900 hover:bg-black text-white text-xs font-bold gap-2 h-9 cursor-pointer rounded-xl"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.appointmentDetail.complete}</span>
                </Button>
              )}

              {appointment.status !== "CANCELLED" && (
                <Button
                  variant="outline"
                  onClick={handleCancelAppointment}
                  disabled={isUpdating}
                  className="w-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs h-9 cursor-pointer rounded-xl"
                >
                  {t.common.cancel}
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleAnonymizeClientLgpd}
                disabled={isUpdating}
                className="w-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs h-9 gap-1.5 cursor-pointer rounded-xl"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.appointmentDetail.anonymizeLgpd}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleDeletePermanent}
                disabled={isUpdating}
                className="w-full border-zinc-300 text-zinc-500 hover:text-rose-600 hover:bg-zinc-50 text-xs h-9 gap-1.5 cursor-pointer rounded-xl"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.appointmentDetail.deletePermanent}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-xl bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-zinc-300" />
                <span className="text-sm font-semibold">
                  {t.appointmentDetail.editModalTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label={t.common.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmitEdit(onSaveEdit)}
              className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  {t.newAppointment.serviceTypeLabel}
                </label>
                {services.length > 0 ? (
                  <select
                    {...registerEdit("serviceName")}
                    onChange={(e) => {
                      const sel = services.find((s) => s.name === e.target.value);
                      setEditValue("serviceName", e.target.value);
                      if (sel) {
                        setEditValue("durationMinutes", sel.durationMinutes);
                        setEditValue("serviceId", sel.id);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.durationMinutes} {t.common.minutes})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    {...registerEdit("serviceName")}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                )}
                {editErrors.serviceName && (
                  <p className="text-[11px] font-semibold text-rose-600">
                    {editErrors.serviceName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.newAppointment.clientNameLabel}
                  </label>
                  <input
                    type="text"
                    {...registerEdit("clientName")}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {editErrors.clientName && (
                    <p className="text-[11px] font-semibold text-rose-600">
                      {editErrors.clientName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.newAppointment.clientPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    {...registerEdit("clientPhone")}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {editErrors.clientPhone && (
                    <p className="text-[11px] font-semibold text-rose-600">
                      {editErrors.clientPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  {t.newAppointment.clientEmailLabel}
                </label>
                <input
                  type="email"
                  {...registerEdit("clientEmail")}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {editErrors.clientEmail && (
                  <p className="text-[11px] font-semibold text-rose-600">
                    {editErrors.clientEmail.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.newAppointment.selectedDateLabel}
                  </label>
                  <input
                    type="date"
                    {...registerEdit("scheduledDate")}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {editErrors.scheduledDate && (
                    <p className="text-[11px] font-semibold text-rose-600">
                      {editErrors.scheduledDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.newAppointment.timeLabel}
                  </label>
                  <input
                    type="time"
                    {...registerEdit("scheduledTime")}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {editErrors.scheduledTime && (
                    <p className="text-[11px] font-semibold text-rose-600">
                      {editErrors.scheduledTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  {t.newAppointment.internalNotesLabel}
                </label>
                <textarea
                  rows={3}
                  {...registerEdit("notes")}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="text-xs border-zinc-300 rounded-xl"
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-zinc-950 hover:bg-black text-white text-xs font-bold rounded-xl"
                >
                  {t.common.save}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
