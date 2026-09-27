"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarDays,
  Loader2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getSafeRedirectUrl } from "@/lib/utils/security";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = getSafeRedirectUrl(searchParams.get("redirect"), "/dashboard");

  const { loginWithGoogle, isAuthenticated, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [isLoading, isAuthenticated, router, redirectUrl]);

  const onGoogleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (isSubmitting || isLoading) return;

    try {
      setIsSubmitting(true);
      toast.info(t.auth.authenticating);
      await loginWithGoogle(redirectUrl);
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Could not connect to Google authentication.";
      toast.error("Authentication Failed", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <div className="bg-white rounded-2xl border border-zinc-300 shadow-sm overflow-hidden text-zinc-900">
        <form onSubmit={onGoogleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Top Row with Brand & Language Toggle */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform hover:opacity-90"
              title={t.common.backToHome}
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900">
                R3uno<span className="text-zinc-950">.</span>
              </span>
            </Link>

            <LanguageSwitcher variant="pill" />
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
              {t.auth.loginTitle}
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.auth.loginSubtitle}
            </p>
          </div>

          {/* Google SSO Button */}
          <div className="space-y-3 pt-1">
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-12 py-2.5 px-4 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs sm:text-sm rounded-xl border border-zinc-300 hover:border-zinc-900 shadow-xs cursor-pointer transition-all duration-150 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
            >
              {isSubmitting || isLoading ? (
                <span className="flex items-center gap-2 text-zinc-700">
                  <Loader2 className="w-4 h-4 text-zinc-900 animate-spin" />
                  <span>{t.auth.authenticating}</span>
                </span>
              ) : (
                <>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="font-semibold text-zinc-900">
                    {t.auth.loginWithGoogle}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 ml-auto" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>{t.auth.googleIdentityBadge}</span>
            </div>
          </div>

          {/* Compliance & Security Details */}
          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-xs space-y-2.5">
            <div className="font-semibold text-zinc-800 flex items-center gap-1.5 pb-1 border-b border-zinc-200">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>{t.auth.governanceTitle}</span>
            </div>
            <div className="space-y-2 text-zinc-600 text-[11px] leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                <span>{t.auth.ssoFeature}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                <span>{t.auth.lgpdFeature}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-800 shrink-0 mt-0.5" />
                <span>{t.auth.tlsFeature}</span>
              </div>
            </div>
          </div>

          {/* Bottom Redirect */}
          <div className="pt-2 border-t border-zinc-200 text-center space-y-2">
            <p className="text-xs text-zinc-600">
              {t.auth.noAccountPrompt}{" "}
              <Link
                href="/signup"
                className="font-bold text-zinc-900 hover:text-black underline underline-offset-4 ml-1"
              >
                {t.auth.requestAccess}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
