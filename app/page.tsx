"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SimpleHowItWorks } from "@/components/SimpleHowItWorks";
import { GoogleSyncHighlight } from "@/components/GoogleSyncHighlight";
import { SimpleFeatures } from "@/components/SimpleFeatures";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* 1. Minimal Header */}
      <Navbar />

      <main className="flex-1 bg-white">
        {/* 2. Hero Section & Interactive Booking Demo */}
        <Hero />

        {/* 3. Pinterest-Style Specialist Discovery Grid */}

        {/* 4. 3-Step How It Works */}
        <SimpleHowItWorks />

        {/* 4. Smart Schedule Management Highlight */}
        <GoogleSyncHighlight />

        {/* 5. Essential Pure Scheduling Features */}
        <SimpleFeatures />

        {/* 6. Frequently Asked Questions */}
        <FaqSection />

        {/* 7. Direct High-Impact CTA */}
        <CtaSection />
      </main>

      {/* 8. Minimal Footer */}
      <Footer />
    </div>
  );
}
