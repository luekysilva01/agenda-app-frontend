import { Suspense } from "react";
import { Metadata } from "next";
import { SignupForm } from "@/components/signup-form";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cadastro Profissional | R3uno Agendamentos",
  description: "Configure sua plataforma inteligente de agendamento online com o R3uno.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100/80 relative p-4 sm:p-8 text-zinc-900 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-lg relative z-10 my-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-zinc-300 shadow-xs">
              <Loader2 className="w-6 h-6 text-zinc-800 animate-spin" />
            </div>
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
