import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R3uno | Smart & Simple Online Scheduling",
  description:
    "Complete online scheduling and calendar management platform for consultants, lawyers, healthcare providers, specialists, and businesses.",
  keywords: [
    "online scheduling system",
    "scheduling saas",
    "consulting scheduling",
    "appointment booking software",
    "calendar management",
    "universal scheduling software",
  ],
  authors: [{ name: "R3uno Technologies" }],
  openGraph: {
    title: "R3uno | Universal Scheduling System & Calendar Management",
    description:
      "Effortless, rapid scheduling synced to your workflow across any industry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      appearance={{
        variables: {
          colorPrimary: "#18181b",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased light`}
      >
        <body className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
          <LanguageProvider>
            <AuthProvider>
              {children}
              <CookieConsentBanner />
              <Toaster
                position="top-right"
                closeButton
                toastOptions={{
                  duration: 4000,
                  className: "font-sans text-xs",
                }}
              />
            </AuthProvider>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
