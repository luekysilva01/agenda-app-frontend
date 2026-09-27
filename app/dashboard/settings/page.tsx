"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  User as UserIcon,
  ShieldCheck,
  Bell,
  Lock,
  FileText,
  CheckCircle2,
  Loader2,
  LogOut,
  Save,
  Download,
  Trash2,
  Scale,
  AlertCircle,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { authApi } from "@/lib/api/auth";
import {
  profileSettingsSchema,
  ProfileSettingsFormData,
} from "@/lib/validations/schemas";

type SettingsTab =
  | "perfil"
  | "google"
  | "notificacoes"
  | "seguranca"
  | "lgpd"
  | "idioma";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, getToken, updateUserProfile } =
    useAuth();
  const { t, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<SettingsTab>("perfil");
  const [isExporting, setIsExporting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: isSaving },
  } = useForm<ProfileSettingsFormData>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      title: user?.title || "",
      companyName: user?.companyName || "",
      emailNotifications: user?.emailNotifications ?? true,
    },
  });

  const emailNotifications = watch("emailNotifications");

  // Sync state when user object loads
  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      const loadProfile = async () => {
        try {
          const token = await getToken();
          const res = await authApi.getMe(token || undefined);
          if (isMounted && res && res.user) {
            const u = res.user;
            reset({
              name: u.name || "",
              title: u.title || "",
              companyName: u.companyName || "",
              emailNotifications: u.emailNotifications ?? true,
            });
            updateUserProfile(u);
          }
        } catch (err) {
          console.error("Error loading account settings:", err);
        }
      };
      loadProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, getToken, updateUserProfile, reset]);

  const onSave = async (data: ProfileSettingsFormData) => {
    try {
      const token = await getToken();
      const payload = {
        name: data.name.trim(),
        title: data.title?.trim() || undefined,
        companyName: data.companyName?.trim() || undefined,
        emailNotifications: data.emailNotifications,
      };

      const res = await authApi.updateProfile(payload, token || undefined);
      if (res?.user) {
        updateUserProfile(res.user);
      } else {
        updateUserProfile(payload);
      }
      toast.success(t.settings.saveSuccess);
    } catch (err) {
      console.error(err);
      toast.error(
        language === "pt"
          ? "Erro ao salvar alterações."
          : "Error saving changes.",
        {
          description: err instanceof Error ? err.message : undefined,
        }
      );
    }
  };

  const handleExportLgpdData = async () => {
    setIsExporting(true);
    try {
      const token = await getToken();
      const res = await authApi.exportLgpdData(token || undefined);
      if (res?.dossie) {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(res.dossie, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute(
          "download",
          `r3uno-personal-data-${new Date().toISOString().split("T")[0]}.json`
        );
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        toast.success(
          language === "pt"
            ? "Dossiê de dados exportado com sucesso."
            : "Data dossier exported successfully."
        );
      }
    } catch {
      toast.error(
        language === "pt"
          ? "Erro ao gerar dossiê de exportação de dados."
          : "Error generating data dossier export."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccountLgpd = async () => {
    const confirmation = prompt(t.settings.deletePrompt);
    if (confirmation !== "DELETE" && confirmation !== "EXCLUIR") {
      if (confirmation !== null) {
        toast.error(
          language === "pt"
            ? "Exclusão de conta cancelada (confirmação não confere)."
            : "Account deletion canceled (confirmation mismatch)."
        );
      }
      return;
    }

    setIsDeletingAccount(true);
    try {
      const token = await getToken();
      await authApi.deleteAccount(token || undefined);
      toast.success(
        language === "pt"
          ? "Conta e dados associados excluídos com sucesso."
          : "Account and associated data deleted successfully."
      );
      await logout();
      router.push("/login");
    } catch {
      toast.error(
        language === "pt"
          ? "Erro ao processar solicitação de exclusão."
          : "Error processing deletion request."
      );
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.error(e);
      toast.error(t.dashboard.syncErrorToast);
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
            {t.dashboard.navSettings}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
          {t.dashboard.navSettings}
        </h1>
        <p className="text-xs text-zinc-500 max-w-2xl">
          {language === "pt"
            ? "Gerencie seu perfil profissional, preferências de idioma, conexões de login único, notificações e privacidade."
            : "Manage your professional profile, language preference, Single Sign-On connections, notifications, and privacy."}
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-200/60 border border-zinc-200/80 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("perfil")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "perfil"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <UserIcon className="w-3.5 h-3.5" />
          <span>{t.settings.tabProfile}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("idioma")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "idioma"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{t.settings.tabLanguage}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("google")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "google"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.settings.tabGoogle}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notificacoes")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "notificacoes"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{t.settings.tabNotifications}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seguranca")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "seguranca"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{t.settings.tabSecurity}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lgpd")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === "lgpd"
              ? "bg-zinc-950 text-white shadow-xs"
              : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>{t.settings.tabLgpd}</span>
        </button>
      </div>

      {/* Tab Form */}
      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        {/* Tab 1: Professional Profile */}
        {activeTab === "perfil" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Profile Avatar & Public URL Card */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 text-white font-black text-xl flex items-center justify-center shadow-md ring-2 ring-zinc-200">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-zinc-950">
                      {user?.name || t.dashboard.specialistDefault}
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {t.common.verified}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">
                    {user?.email}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {language === "pt"
                      ? "Sincronizado automaticamente via Google Workspace SSO"
                      : "Synchronized automatically via Google Workspace SSO"}
                  </p>
                </div>
              </div>

              {/* Public Booking URL */}
              <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 block">
                  {t.settings.publicUrlTitle}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-900">
                    r3uno.app/{user?.slug || "agenda"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://r3uno.app/${user?.slug || "agenda"}`
                      );
                      toast.success(t.dashboard.copyLinkSuccess);
                    }}
                    className="p-1 px-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-[10px] font-bold text-zinc-800 shadow-2xs cursor-pointer transition-colors"
                  >
                    {t.common.copy}
                  </button>
                </div>
              </div>
            </div>

            {/* Language Preference embedded */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-4">
              <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-sm sm:text-base font-black text-zinc-950 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-800" />
                  {t.settings.languagePreferenceTitle}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {t.settings.languagePreferenceDesc}
                </p>
              </div>
              <LanguageSwitcher variant="settings" />
            </div>

            {/* Profile Form Details */}
            <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-7 shadow-2xs space-y-5">
              <div className="border-b border-zinc-100 pb-3">
                <h2 className="text-sm sm:text-base font-black text-zinc-950 flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-zinc-800" />
                  {t.settings.profileSectionTitle}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {t.settings.profileSectionDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-700">
                    {t.settings.fullName} *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {errors.name && (
                    <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-700">
                    {t.settings.corporateEmail}
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-100 text-xs font-medium text-zinc-500 cursor-not-allowed"
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-[11px] font-extrabold text-zinc-700">
                    {t.settings.roleSpecialty}
                  </label>
                  <input
                    type="text"
                    placeholder={t.settings.rolePlaceholder}
                    {...register("title")}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                  />
                  {errors.title && (
                    <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-extrabold text-zinc-700">
                  {t.settings.organization}
                </label>
                <input
                  type="text"
                  placeholder={t.settings.organizationPlaceholder}
                  {...register("companyName")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-zinc-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-zinc-900 focus:outline-hidden"
                />
                {errors.companyName && (
                  <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Language Preference Dedicated */}
        {activeTab === "idioma" && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-sm sm:text-base font-black text-zinc-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-zinc-800" />
                {t.settings.languagePreferenceTitle}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t.settings.languagePreferenceDesc}
              </p>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
              <LanguageSwitcher variant="settings" />
            </div>
          </div>
        )}

        {/* Tab 2: Google Workspace SSO */}
        {activeTab === "google" && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-5 animate-in fade-in duration-150">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                {t.settings.googleConnectionTitle}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t.settings.googleConnectionDesc}
              </p>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-medium">
                  {t.settings.idProvider}
                </span>
                <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
                  Google OAuth 2.0 Single Sign-On
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-zinc-200 pt-2.5">
                <span className="text-zinc-600 font-medium">
                  {t.settings.googleAccount}
                </span>
                <span className="font-mono font-bold text-zinc-900">
                  {user?.email}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-zinc-200 pt-2.5">
                <span className="text-zinc-600 font-medium">
                  {t.settings.verificationStatus}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-900 bg-white border border-zinc-300 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                  {t.settings.officiallyVerified}
                </span>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2 text-xs text-zinc-600">
              <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-700" />
                <span>{t.settings.dataProtectionTitle}</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                {t.settings.dataProtectionDesc}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === "notificacoes" && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-5 animate-in fade-in duration-150">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-zinc-700" />
                {t.settings.notificationsTitle}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t.settings.notificationsDesc}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <label className="flex items-center justify-between p-4 bg-zinc-50 border border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-100/70 transition-colors">
                <div className="space-y-0.5 pr-4">
                  <div className="text-xs font-bold text-zinc-900">
                    {t.settings.emailAlertsLabel}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {t.settings.emailAlertsDesc} ({user?.email})
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) =>
                    setValue("emailNotifications", e.target.checked)
                  }
                  className="rounded border-zinc-400 text-zinc-900 focus:ring-zinc-900 w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Sessions */}
        {activeTab === "seguranca" && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-5 animate-in fade-in duration-150">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-zinc-700" />
                {t.settings.sessionsTitle}
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t.settings.sessionsDesc}
              </p>
            </div>

            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-zinc-900">
                    {t.settings.currentSessionTitle}
                  </div>
                  <div className="text-zinc-500 text-[11px]">
                    {t.settings.currentSessionDesc}
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-zinc-900 text-white font-bold px-2 py-0.5 rounded">
                  {t.common.active}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
                className="text-xs border-zinc-300 text-zinc-700 hover:text-rose-600 hover:bg-zinc-50 gap-2 h-9"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.settings.signOutAll}</span>
              </Button>
            </div>
          </div>
        )}

        {/* Tab 5: Privacy & LGPD */}
        {activeTab === "lgpd" && (
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-7 shadow-2xs space-y-6 animate-in fade-in duration-150">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-zinc-800" />
                  {t.settings.lgpdTitle}
                </h2>
                <span className="text-[10px] font-bold bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 rounded">
                  GDPR & Privacy Compliance
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {t.settings.lgpdDesc}
              </p>
            </div>

            {/* Portability Card */}
            <div className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-zinc-800" />
                    {t.settings.portabilityTitle}
                  </span>
                  <p className="text-[11px] text-zinc-500">
                    {t.settings.portabilityDesc}
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleExportLgpdData}
                  disabled={isExporting}
                  className="text-xs bg-zinc-900 hover:bg-black text-white font-bold gap-1.5 h-9 px-4 shrink-0 cursor-pointer"
                >
                  {isExporting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>{t.settings.exportButton}</span>
                </Button>
              </div>
            </div>

            {/* Consent status & Legal documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800" />
                  {t.settings.consentTitle}
                </div>
                <p className="text-zinc-500 text-[11px]">
                  {t.settings.consentDesc}
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-zinc-900 font-bold underline hover:text-black text-[11px]"
                  >
                    {t.footer.privacyPolicy}
                  </Link>
                  <span className="text-zinc-300">•</span>
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-zinc-900 font-bold underline hover:text-black text-[11px]"
                  >
                    {t.footer.termsOfService}
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2 text-xs">
                <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-800" />
                  {t.settings.dpoTitle}
                </div>
                <p className="text-zinc-500 text-[11px]">
                  {t.settings.dpoDesc}
                </p>
                <div className="font-mono text-zinc-800 text-[11px] font-bold bg-white p-2 rounded-lg border border-zinc-200">
                  {t.settings.dpoEmail}
                </div>
              </div>
            </div>

            {/* Account Deletion / Anonymization */}
            <div className="p-5 bg-rose-50/60 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <Trash2 className="w-4 h-4 text-rose-700" />
                    {t.settings.deletionTitle}
                  </span>
                  <p className="text-[11px] text-rose-800/80">
                    {t.settings.deletionDesc}
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleDeleteAccountLgpd}
                  disabled={isDeletingAccount}
                  variant="outline"
                  className="text-xs border-rose-300 text-rose-700 hover:bg-rose-100 hover:text-rose-900 font-bold gap-1.5 h-9 px-4 shrink-0 cursor-pointer"
                >
                  {isDeletingAccount ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>{t.settings.deleteAccountButton}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex items-center justify-between pt-2">
          <Link
            href="/dashboard"
            className="text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            &larr; {t.common.backToDashboard}
          </Link>

          <Button
            type="submit"
            disabled={isSaving}
            className="bg-zinc-950 hover:bg-black text-white text-xs font-bold gap-2 px-6 h-10 shadow-sm cursor-pointer rounded-xl transition-all hover:scale-[1.02]"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{t.common.saving}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-white" />
                <span>{t.settings.saveChanges}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
