"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Building2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Service,
  CreateAppointmentPayload,
  servicesApi,
  appointmentsApi,
} from "@/lib/api/appointments";
import {
  newAppointmentSchema,
  NewAppointmentFormData,
} from "@/lib/validations/schemas";
import { getSafeDateParam } from "@/lib/utils/security";

const DEFAULT_TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
];

function NewAppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, getToken } = useAuth();
  const { t, language } = useLanguage();

  const defaultDateStr = getSafeDateParam(searchParams.get("date"));

  const [services, setServices] = useState<Service[]>([]);

  const defaultServiceName =
    language === "pt"
      ? "Consultoria / Atendimento"
      : "Consulting / Appointment";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      scheduledDate: defaultDateStr,
      scheduledTime: "09:00",
      serviceName: defaultServiceName,
      serviceId: undefined,
      durationMinutes: 45,
      notes: "",
      privacyConsent: true,
    },
  });

  const selectedServiceId = watch("serviceId");
  const scheduledDate = watch("scheduledDate");
  const scheduledTime = watch("scheduledTime");
  const clientName = watch("clientName");
  const clientPhone = watch("clientPhone");
  const durationMinutes = watch("durationMinutes");
  const serviceName = watch("serviceName");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = await getToken();
        const res = await servicesApi.getAll(token || undefined);
        if (res && res.length > 0) {
          setServices(res);
          setValue("serviceId", res[0].id);
          setValue("serviceName", res[0].name);
          setValue("durationMinutes", res[0].durationMinutes);
        }
      } catch (err) {
        console.error("Error loading services:", err);
      }
    };
    if (isAuthenticated) {
      fetchServices();
    }
  }, [isAuthenticated, getToken, setValue]);

  const handleServiceChange = (id: string) => {
    setValue("serviceId", id);
    const found = services.find((s) => s.id === id);
    if (found) {
      setValue("serviceName", found.name);
      setValue("durationMinutes", found.durationMinutes);
    }
  };

  const onSubmit = async (data: NewAppointmentFormData) => {
    try {
      const [year, month, day] = data.scheduledDate.split("-").map(Number);
      const [hours, minutes] = data.scheduledTime.split(":").map(Number);
      const scheduledDateTime = new Date(year, month - 1, day, hours, minutes);

      const fallbackName =
        language === "pt"
          ? "Consultoria / Atendimento"
          : "Consulting / Appointment";

      const payload: CreateAppointmentPayload = {
        clientName: data.clientName.trim(),
        clientEmail:
          data.clientEmail.trim() ||
          `${data.clientName.toLowerCase().replace(/\s+/g, ".")}@client.com`,
        clientPhone: data.clientPhone.trim(),
        serviceId: data.serviceId || undefined,
        serviceName: data.serviceName.trim() || fallbackName,
        scheduledAt: scheduledDateTime.toISOString(),
        durationMinutes: data.durationMinutes,
        status: "CONFIRMED",
        notes: data.notes?.trim() || undefined,
      };

      const token = await getToken();
      await appointmentsApi.create(payload, token || undefined);

      toast.success(t.newAppointment.successToast, {
        description: `${payload.clientName} -> ${data.scheduledDate} ${t.demo.atTime} ${data.scheduledTime}.`,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(t.newAppointment.errorToast, {
        description: err instanceof Error ? err.message : undefined,
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header */}
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
            {t.newAppointment.breadcrumbNew}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
          {t.newAppointment.title}
        </h1>
        <p className="text-xs text-zinc-500 max-w-2xl">
          {t.newAppointment.subtitle}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Form Fields (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-zinc-700" />
              {t.newAppointment.serviceTypeLabel}
            </label>
            {services.length > 0 ? (
              <select
                value={selectedServiceId || ""}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-900 text-xs font-semibold focus:ring-2 focus:ring-zinc-900 focus:bg-white focus:outline-hidden cursor-pointer"
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.name} ({srv.durationMinutes} {t.common.minutes}) — {srv.category}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder={defaultServiceName}
                  {...register("serviceName")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-zinc-900 text-xs font-semibold focus:ring-2 focus:ring-zinc-900 focus:bg-white focus:outline-hidden"
                />
                <p className="text-[11px] text-zinc-500">
                  {t.newAppointment.noServicesRegistered}{" "}
                  <Link
                    href="/dashboard/services"
                    className="underline font-bold text-zinc-800 hover:text-black"
                  >
                    {t.newAppointment.registerServicesLink}
                  </Link>
                </p>
              </div>
            )}
            {errors.serviceName && (
              <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.serviceName.message}
              </p>
            )}
          </div>

          {/* Client Info */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              {t.newAppointment.clientDataTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <User className="w-3 h-3 text-zinc-700" /> {t.newAppointment.clientNameLabel}
                </label>
                <input
                  type="text"
                  placeholder={t.newAppointment.clientNamePlaceholder}
                  {...register("clientName")}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {errors.clientName && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.clientName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-zinc-700" /> {t.newAppointment.clientPhoneLabel}
                </label>
                <input
                  type="tel"
                  placeholder={t.newAppointment.clientPhonePlaceholder}
                  {...register("clientPhone")}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {errors.clientPhone && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.clientPhone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-zinc-700" /> {t.newAppointment.clientEmailLabel}
                </label>
                <input
                  type="email"
                  placeholder={t.newAppointment.clientEmailPlaceholder}
                  {...register("clientEmail")}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {errors.clientEmail && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.clientEmail.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Date & Time Slot Grid */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              {t.newAppointment.dateTimeTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-zinc-700" /> {t.newAppointment.selectedDateLabel}
                </label>
                <input
                  type="date"
                  {...register("scheduledDate")}
                  className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
                />
                {errors.scheduledDate && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.scheduledDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-700" /> {t.newAppointment.timeLabel}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {DEFAULT_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setValue("scheduledTime", slot)}
                      className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        scheduledTime === slot
                          ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs font-bold"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.scheduledTime && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.scheduledTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-zinc-700" /> {t.newAppointment.internalNotesLabel}
            </label>
            <textarea
              rows={3}
              placeholder={t.newAppointment.internalNotesPlaceholder}
              {...register("notes")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
            />
            {errors.notes && (
              <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>

        {/* Live Summary & Confirmation Ticket Card (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 shadow-md space-y-5 overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3.5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                  {t.newAppointment.summaryTitle}
                </span>
                <h3 className="text-base font-black text-zinc-950 mt-0.5">
                  {serviceName || defaultServiceName}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {t.newAppointment.newBadge}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-500 font-medium">{t.common.client}:</span>
                <span className="font-extrabold text-zinc-950">
                  {clientName || (language === "pt" ? "Nome do cliente" : "Client name")}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-500 font-medium">{t.common.phone}:</span>
                <span className="font-mono font-bold text-zinc-900">
                  {clientPhone || (language === "pt" ? "Não informado" : "Not provided")}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-500 font-medium">{t.common.date} & {t.common.time}:</span>
                <span className="font-mono font-extrabold text-zinc-950">
                  📅 {scheduledDate || (language === "pt" ? "Data" : "Date")} {t.demo.atTime} {scheduledTime}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="text-zinc-500 font-medium">{t.common.duration}:</span>
                <span className="font-mono font-bold text-zinc-900">
                  ⏱️ {durationMinutes || 45} {t.common.minutes}
                </span>
              </div>
            </div>

            {/* Google Sync Operational Note */}
            <div className="p-3.5 bg-gradient-to-br from-zinc-50 to-zinc-100/70 border border-zinc-200/80 rounded-2xl space-y-1.5 text-[11px] text-zinc-600 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-zinc-950">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.newAppointment.googleSyncNoteTitle}</span>
              </div>
              <p className="leading-relaxed">
                {t.newAppointment.googleSyncNoteDesc}
              </p>
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="space-y-1.5">
              <label className="flex items-start gap-2.5 p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-2xl cursor-pointer hover:bg-zinc-100/70 transition-colors">
                <input
                  type="checkbox"
                  {...register("privacyConsent")}
                  className="mt-0.5 rounded border-zinc-400 text-zinc-900 focus:ring-zinc-900 w-3.5 h-3.5"
                />
                <span className="text-[11px] text-zinc-600 leading-snug">
                  {t.newAppointment.consentCheckbox}{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-bold underline text-zinc-900 hover:text-black"
                  >
                    {t.footer.privacyPolicy}
                  </Link>
                  .
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.privacyConsent.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-zinc-950 hover:bg-black text-white text-xs font-bold py-2.5 h-11 gap-2 shadow-sm cursor-pointer rounded-xl transition-all hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{t.newAppointment.creating}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{t.newAppointment.confirmAndSave}</span>
                  </>
                )}
              </Button>

              <Link
                href="/dashboard"
                className="block w-full text-center py-2 text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                &larr; {t.newAppointment.cancelAndReturn}
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function NewAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-zinc-900 animate-spin" />
        </div>
      }
    >
      <NewAppointmentContent />
    </Suspense>
  );
}
