"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Plus,
  Trash2,
  CheckCircle2,
  Loader2,
  Edit2,
  X,
  Search,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Service, servicesApi } from "@/lib/api/appointments";
import { serviceSchema, ServiceFormData } from "@/lib/validations/schemas";

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

const CATEGORY_SUGGESTIONS_PT = [
  "Consultoria & Negócios",
  "Jurídico & Compliance",
  "Saúde & Bem-Estar",
  "Mentoria & Coaching",
  "Tecnologia & Suporte",
  "Geral",
];

const CATEGORY_SUGGESTIONS_EN = [
  "Consulting & Business",
  "Legal & Compliance",
  "Healthcare & Wellness",
  "Mentoring & Coaching",
  "Technology & Support",
  "General",
];

export default function ServicesPage() {
  const { isAuthenticated, getToken } = useAuth();
  const { t, language } = useLanguage();

  const [services, setServices] = useState<Service[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const defaultCategory =
    language === "pt" ? "Consultoria & Negócios" : "Consulting & Business";

  // Create Form using React Hook Form + Zod
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    reset: resetCreate,
    setValue: setCreateValue,
    formState: { errors: createErrors, isSubmitting: isCreatingSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      durationMinutes: 45,
      category: defaultCategory,
      isActive: true,
    },
  });

  // Edit Form using React Hook Form + Zod
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: editErrors, isSubmitting: isUpdatingSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      durationMinutes: 45,
      category: language === "pt" ? "Geral" : "General",
      isActive: true,
    },
  });

  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      const fetchServices = async () => {
        try {
          if (isMounted) setIsDataLoading(true);
          const token = await getToken();
          const res = await servicesApi.getAll(token || undefined);
          if (isMounted && res && res.length > 0) {
            setServices(res);
          }
        } catch (err) {
          console.error("Error loading services:", err);
        } finally {
          if (isMounted) setIsDataLoading(false);
        }
      };
      fetchServices();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, getToken]);

  const refreshServices = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const token = await getToken();
      const res = await servicesApi.getAll(token || undefined);
      if (res && res.length > 0) {
        setServices(res);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setIsDataLoading(false);
    }
  }, [getToken]);

  const handleCreate = async (data: ServiceFormData) => {
    try {
      const token = await getToken();
      await servicesApi.create(
        {
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
          durationMinutes: Number(data.durationMinutes),
          category: data.category.trim() || (language === "pt" ? "Geral" : "General"),
          isActive: true,
        },
        token || undefined
      );

      toast.success(t.services.createSuccess);
      resetCreate();
      setIsCreating(false);
      await refreshServices();
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt" ? "Erro ao criar serviço." : "Error creating service."
      );
    }
  };

  const handleStartEdit = (srv: Service) => {
    setEditingService(srv);
    resetEdit({
      name: srv.name,
      description: srv.description || "",
      durationMinutes: srv.durationMinutes || 45,
      category: srv.category || (language === "pt" ? "Geral" : "General"),
      isActive: srv.isActive !== false,
    });
  };

  const handleSaveEdit = async (data: ServiceFormData) => {
    if (!editingService) return;

    try {
      const token = await getToken();
      await servicesApi.update(
        editingService.id,
        {
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
          durationMinutes: Number(data.durationMinutes),
          category: data.category.trim() || (language === "pt" ? "Geral" : "General"),
          isActive: data.isActive,
        },
        token || undefined
      );

      toast.success(t.services.updateSuccess);
      setEditingService(null);
      await refreshServices();
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt" ? "Erro ao atualizar serviço." : "Error updating service."
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.services.confirmDelete))
      return;
    try {
      const token = await getToken();
      await servicesApi.delete(id, token || undefined);
      toast.info(t.services.deleteSuccess);
      await refreshServices();
    } catch {
      toast.error(
        language === "pt" ? "Erro ao excluir serviço." : "Error deleting service."
      );
    }
  };

  const filteredServices = services.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      (s.category && s.category.toLowerCase().includes(term)) ||
      (s.description && s.description.toLowerCase().includes(term))
    );
  });

  const categorySuggestions =
    language === "pt" ? CATEGORY_SUGGESTIONS_PT : CATEGORY_SUGGESTIONS_EN;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
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
              {t.dashboard.navServices}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            {t.services.title}
          </h1>
          <p className="text-xs text-zinc-500 max-w-2xl">
            {t.services.subtitle}
          </p>
        </div>

        {!isCreating && (
          <Button
            size="sm"
            onClick={() => setIsCreating(true)}
            className="bg-zinc-900 hover:bg-black text-white text-xs font-bold gap-1.5 h-9 px-4 rounded-xl shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.services.newService}</span>
          </Button>
        )}
      </div>

      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.services.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-200 bg-white text-xs font-medium text-zinc-900 focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
          />
        </div>

        <div className="text-xs text-zinc-500 font-semibold self-end sm:self-auto">
          {t.services.totalItems}: <strong className="text-zinc-900">{services.length}</strong>
        </div>
      </div>

      {/* Creation Form Panel */}
      {isCreating && (
        <form
          onSubmit={handleSubmitCreate(handleCreate)}
          className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-5 animate-in fade-in duration-150"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-zinc-900" />
              <h2 className="text-sm font-bold text-zinc-900">
                {t.services.createTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-xs text-zinc-500 hover:text-zinc-900 font-semibold cursor-pointer"
            >
              {t.common.cancel}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-700">
                {t.services.nameLabel}
              </label>
              <input
                type="text"
                placeholder={t.services.namePlaceholder}
                {...registerCreate("name")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
              />
              {createErrors.name && (
                <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {createErrors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-700">
                {t.services.categoryLabel}
              </label>
              <input
                type="text"
                placeholder={t.services.categoryPlaceholder}
                {...registerCreate("category")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {categorySuggestions.slice(0, 4).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCreateValue("category", cat)}
                    className="text-[10px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-md cursor-pointer transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-700">
                {t.services.durationLabel}
              </label>
              <select
                {...registerCreate("durationMinutes", { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
              >
                <option value={15}>15 {t.common.minutes}</option>
                <option value={30}>30 {t.common.minutes}</option>
                <option value={45}>45 {t.common.minutes}</option>
                <option value={60}>60 {t.common.minutes} (1h)</option>
                <option value={90}>90 {t.common.minutes}</option>
                <option value={120}>120 {t.common.minutes} (2h)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-700">
                {t.services.instructionsLabel}
              </label>
              <input
                type="text"
                placeholder={t.services.instructionsPlaceholder}
                {...registerCreate("description")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
              />
              {createErrors.description && (
                <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {createErrors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreating(false)}
              className="text-xs border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isCreatingSubmitting}
              className="text-xs bg-zinc-900 hover:bg-black text-white font-bold gap-1.5 px-5"
            >
              {isCreatingSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              )}
              <span>{t.services.saveService}</span>
            </Button>
          </div>
        </form>
      )}

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-zinc-300" />
                <span className="text-sm font-semibold">{t.services.editServiceTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label={t.common.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitEdit(handleSaveEdit)} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  {t.services.nameLabel}
                </label>
                <input
                  type="text"
                  {...registerEdit("name")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {editErrors.name && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {editErrors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.services.categoryLabel}
                  </label>
                  <input
                    type="text"
                    {...registerEdit("category")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-700">
                    {t.services.durationLabel}
                  </label>
                  <select
                    {...registerEdit("durationMinutes", { valueAsNumber: true })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-semibold focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value={15}>15 {t.common.minutes}</option>
                    <option value={30}>30 {t.common.minutes}</option>
                    <option value={45}>45 {t.common.minutes}</option>
                    <option value={60}>60 {t.common.minutes}</option>
                    <option value={90}>90 {t.common.minutes}</option>
                    <option value={120}>120 {t.common.minutes}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-700">
                  {t.services.instructionsLabel}
                </label>
                <textarea
                  rows={3}
                  {...registerEdit("description")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {editErrors.description && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {editErrors.description.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingService(null)}
                  className="text-xs border-zinc-300 text-zinc-700"
                >
                  {t.common.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdatingSubmitting}
                  className="text-xs bg-zinc-900 hover:bg-black text-white font-bold gap-1.5"
                >
                  {isUpdatingSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>{t.common.save}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isDataLoading ? (
          <div className="col-span-full bg-white rounded-3xl border border-zinc-200 p-12 text-center space-y-3 shadow-2xs">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-500 mx-auto" />
            <p className="text-xs text-zinc-500 font-medium">
              {language === "pt" ? "Carregando serviços..." : "Loading services..."}
            </p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl border border-zinc-200 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-zinc-800">
              {t.services.emptyTitle}
            </p>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
              {t.services.emptyDesc}
            </p>
            <Button
              size="sm"
              onClick={() => setIsCreating(true)}
              className="text-xs bg-zinc-950 hover:bg-black text-white font-bold gap-1.5 rounded-xl shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.services.createFirst}</span>
            </Button>
          </div>
        ) : (
          filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl border border-zinc-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-900 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                    {srv.category || (language === "pt" ? "Geral" : "General")}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleStartEdit(srv)}
                    className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title={t.common.edit}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(srv.id)}
                    className="w-7 h-7 rounded-full bg-white/90 hover:bg-rose-50 text-zinc-800 hover:text-rose-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title={t.common.delete}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold drop-shadow-sm">
                  <span className="font-mono bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[11px] font-bold">
                    ⏱️ {srv.durationMinutes} {t.common.minutes}
                  </span>
                  <span className="bg-emerald-600/90 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-white font-extrabold text-[10px]">
                    {srv.isActive !== false ? t.common.active : t.common.paused}
                  </span>
                </div>
              </div>

              {/* Service Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-black text-zinc-950 text-base group-hover:text-black">
                    {srv.name}
                  </h3>

                  {srv.description && (
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {srv.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t.services.publicPageNotice}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStartEdit(srv)}
                    className="text-xs font-bold text-zinc-900 hover:underline cursor-pointer"
                  >
                    {t.services.configureAction} &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
