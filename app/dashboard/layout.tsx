import React from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Painel & Agendamentos • R3uno",
  description: "Plataforma Inteligente de Agendamento e Gestão de Calendário",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
