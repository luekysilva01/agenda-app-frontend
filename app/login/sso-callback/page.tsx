"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function LoginSSOCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100/80 relative p-4 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="relative z-10 w-full max-w-sm bg-white p-8 rounded-2xl border border-zinc-300 shadow-sm text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-900">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-900" />
        </div>
        
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-zinc-900">
            Autenticando com o Google...
          </h2>
          <p className="text-xs text-zinc-500">
            Verificando credenciais corporativas e carregando seu espaço de trabalho.
          </p>
        </div>

        <AuthenticateWithRedirectCallback
          signInForceRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
          signInFallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
