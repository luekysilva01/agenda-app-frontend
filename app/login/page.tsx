import { Suspense } from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Login Corporativo | R3uno Agendamentos",
  description: "Acesso seguro à plataforma profissional de agendamentos R3uno.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100/80 relative p-4 sm:p-8 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md relative z-10 my-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-zinc-300 shadow-xs">
              <Loader2 className="w-6 h-6 text-zinc-800 animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
