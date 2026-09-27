"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  CalendarDays, 
  ArrowUpRight, 
  Sparkles, 
  Heart, 
  X
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SpecialistPin {
  id: string;
  name: string;
  titleEn: string;
  titlePt: string;
  category: "saude" | "psicologia" | "advocacia" | "consultoria" | "design";
  categoryLabelEn: string;
  categoryLabelPt: string;
  rating: number;
  reviewsCount: number;
  locationEn: string;
  locationPt: string;
  modeEn: string;
  modePt: string;
  nextSlotEn: string;
  nextSlotPt: string;
  duration: string;
  price: string;
  imageUrl: string;
  aspectClass: string;
  slug: string;
  bioEn: string;
  bioPt: string;
}

const SPECIALIST_PINS: SpecialistPin[] = [
  {
    id: "1",
    name: "Dr. Beatriz Santos",
    titleEn: "Clinical Psychologist & CBT",
    titlePt: "Psicóloga Clínica & TCC",
    category: "psicologia",
    categoryLabelEn: "Psychology",
    categoryLabelPt: "Psicologia",
    rating: 4.98,
    reviewsCount: 142,
    locationEn: "New York, NY",
    locationPt: "São Paulo, SP",
    modeEn: "Online & In-Person",
    modePt: "Online & Presencial",
    nextSlotEn: "Today at 3:30 PM",
    nextSlotPt: "Hoje às 15:30",
    duration: "50 min",
    price: "$120",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-[3/4]",
    slug: "dr-beatriz-santos",
    bioEn: "Specialist in anxiety, corporate burnout, and personal development. Compassionate care synced directly to Google Workspace.",
    bioPt: "Especialista em ansiedade, estresse corporativo e desenvolvimento pessoal. Atendimento acolhedor com agenda sincronizada ao Google Workspace."
  },
  {
    id: "2",
    name: "Dr. Rafael Alencar",
    titleEn: "Cardiologist",
    titlePt: "Médico Cardiologista",
    category: "saude",
    categoryLabelEn: "Health & Medicine",
    categoryLabelPt: "Saúde & Medicina",
    rating: 4.95,
    reviewsCount: 218,
    locationEn: "Chicago, IL",
    locationPt: "Belo Horizonte, MG",
    modeEn: "In-Person",
    modePt: "Presencial",
    nextSlotEn: "Tomorrow at 9:00 AM",
    nextSlotPt: "Amanhã às 09:00",
    duration: "40 min",
    price: "$180",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-[4/5]",
    slug: "dr-rafael-alencar",
    bioEn: "Cardiovascular health prevention and management with integrated testing and digital booking.",
    bioPt: "Prevenção e acompanhamento de saúde cardiovascular com exames integrados e agendamento digital simplificado."
  },
  {
    id: "3",
    name: "Marcus Vieira, Esq.",
    titleEn: "Corporate & Tax Attorney",
    titlePt: "Advogado Tributário & Corporativo",
    category: "advocacia",
    categoryLabelEn: "Corporate Law",
    categoryLabelPt: "Direito & Advocacia",
    rating: 4.92,
    reviewsCount: 89,
    locationEn: "Washington, DC",
    locationPt: "Brasília, DF",
    modeEn: "Online (Google Meet)",
    modePt: "Online (Google Meet)",
    nextSlotEn: "Today at 5:00 PM",
    nextSlotPt: "Hoje às 17:00",
    duration: "60 min",
    price: "$250",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-[2/3]",
    slug: "marcus-vieira",
    bioEn: "Strategic legal counsel for startups, executives, and growing enterprises. Direct booking with no intermediaries.",
    bioPt: "Consultoria jurídica estratégica para empresas e empresários. Reuniões pontuais sem intermediários."
  },
  {
    id: "4",
    name: "Camila Guimaraes, MS, RD",
    titleEn: "Sports & Clinical Nutritionist",
    titlePt: "Nutricionista Esportiva e Clínica",
    category: "saude",
    categoryLabelEn: "Nutrition & Health",
    categoryLabelPt: "Nutrição & Saúde",
    rating: 4.97,
    reviewsCount: 167,
    locationEn: "Miami, FL",
    locationPt: "Rio de Janeiro, RJ",
    modeEn: "Online & In-Person",
    modePt: "Online & Presencial",
    nextSlotEn: "Today at 2:00 PM",
    nextSlotPt: "Hoje às 14:00",
    duration: "45 min",
    price: "$95",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-square",
    slug: "camila-guimaraes",
    bioEn: "Tailored nutritional blueprints for peak athletic performance and sustainable vitality.",
    bioPt: "Planos alimentares sob medida para alta performance esportiva e bem-estar duradouro."
  },
  {
    id: "5",
    name: "Philip Vasconcelos",
    titleEn: "Architect & Interior Designer",
    titlePt: "Arquiteto & Designer de Interiores",
    category: "design",
    categoryLabelEn: "Architecture",
    categoryLabelPt: "Arquitetura",
    rating: 4.94,
    reviewsCount: 76,
    locationEn: "Seattle, WA",
    locationPt: "Curitiba, PR",
    modeEn: "In-Person & Site Visit",
    modePt: "Presencial & Visita Técnica",
    nextSlotEn: "Thursday at 10:30 AM",
    nextSlotPt: "Quinta às 10:30",
    duration: "60 min",
    price: "$150",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-[3/4]",
    slug: "philip-vasconcelos",
    bioEn: "Contemporary residential and commercial architecture. Project briefing sessions with instant booking.",
    bioPt: "Criação de projetos contemporâneos, residenciais e corporativos. Sessões de alinhamento e briefing com agendamento direto."
  },
  {
    id: "6",
    name: "Mariana Ribeiro",
    titleEn: "Executive Coach & OKR Consultant",
    titlePt: "Consultora de Gestão & OKRs",
    category: "consultoria",
    categoryLabelEn: "Consulting",
    categoryLabelPt: "Consultoria",
    rating: 4.96,
    reviewsCount: 114,
    locationEn: "San Francisco, CA",
    locationPt: "São Paulo, SP",
    modeEn: "Online (Google Meet)",
    modePt: "Online (Google Meet)",
    nextSlotEn: "Today at 4:00 PM",
    nextSlotPt: "Hoje às 16:00",
    duration: "45 min",
    price: "$175",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    aspectClass: "aspect-[4/5]",
    slug: "mariana-ribeiro",
    bioEn: "Executive advisory and goal alignment for high-growth tech ventures and leadership teams.",
    bioPt: "Mentoria e estruturação de metas ágeis para startups e equipes de alta performance."
  }
];

export function PinterestGrid() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [activePin, setActivePin] = useState<SpecialistPin | null>(null);
  const [likedPins, setLikedPins] = useState<Record<string, boolean>>({});

  const categories = useMemo(
    () => [
      { key: "todos", label: t.mural.allSpecialists },
      { key: "saude", label: t.mural.health },
      { key: "psicologia", label: t.mural.psychology },
      { key: "advocacia", label: t.mural.law },
      { key: "consultoria", label: t.mural.consulting },
      { key: "design", label: t.mural.design },
    ],
    [t]
  );

  const filteredPins = useMemo(() => {
    if (selectedCategory === "todos") return SPECIALIST_PINS;
    return SPECIALIST_PINS.filter((pin) => pin.category === selectedCategory);
  }, [selectedCategory]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="mural" className="py-20 sm:py-28 bg-zinc-50 border-b border-zinc-200 scroll-mt-20">
      <div className="px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{t.mural.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
            {t.mural.title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            {t.mural.subtitle}
          </p>
        </div>

        {/* Pinterest Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm scale-105"
                    : "bg-white hover:bg-zinc-200/70 text-zinc-700 border border-zinc-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry / Pinterest Waterfall Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">
          {filteredPins.map((pin) => {
            const isLiked = !!likedPins[pin.id];
            const title = language === "pt" ? pin.titlePt : pin.titleEn;
            const categoryLabel = language === "pt" ? pin.categoryLabelPt : pin.categoryLabelEn;
            const location = language === "pt" ? pin.locationPt : pin.locationEn;
            const nextSlot = language === "pt" ? pin.nextSlotPt : pin.nextSlotEn;

            return (
              <div
                key={pin.id}
                onClick={() => setActivePin(pin)}
                className="break-inside-avoid rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-zinc-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col"
              >
                {/* Image Container with Pinterest Hover Overlays */}
                <div className={`relative w-full ${pin.aspectClass} overflow-hidden bg-zinc-100`}>
                  <Image
                    src={pin.imageUrl}
                    alt={pin.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Pinterest-style Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-zinc-900 border border-white/40 shadow-xs">
                      {categoryLabel}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePin(pin);
                      }}
                      className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.mural.bookNow}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom quick action bar on image hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white drop-shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{nextSlot}</span>
                    </div>

                    <button
                      onClick={(e) => toggleLike(pin.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isLiked 
                          ? "bg-rose-500 text-white" 
                          : "bg-white/90 text-zinc-700 hover:bg-white hover:text-rose-500"
                      }`}
                      title="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-4 sm:p-5 flex flex-col space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-zinc-950 flex items-center gap-1 group-hover:text-black">
                        {pin.name}
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 inline" />
                      </h3>
                      <p className="text-xs text-zinc-500 font-medium">
                        {title}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-md shrink-0">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{pin.rating}</span>
                    </div>
                  </div>

                  {/* Meta details: mode, location, price */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500 font-medium pt-1 border-t border-zinc-100">
                    <span className="flex items-center gap-1 text-zinc-600">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {location}
                    </span>
                    <span>•</span>
                    <span className="text-zinc-600">{pin.duration}</span>
                    <span>•</span>
                    <span className="font-bold text-zinc-900">{pin.price}</span>
                  </div>

                  {/* Live availability pill */}
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t.mural.nextSlot}: {nextSlot}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pinterest Modal / Details Drawer */}
        {activePin && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setActivePin(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-zinc-300 flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePin(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 flex items-center justify-center shadow-md cursor-pointer"
                title={t.common.close}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Left Photo */}
              <div className="relative md:w-1/2 h-64 md:h-auto min-h-[320px] bg-zinc-100">
                <Image
                  src={activePin.imageUrl}
                  alt={activePin.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold">
                    {language === "pt" ? activePin.categoryLabelPt : activePin.categoryLabelEn}
                  </span>
                </div>
              </div>

              {/* Modal Right Info */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mb-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-zinc-900">{activePin.rating}</span>
                      <span className="text-zinc-500 font-normal">({activePin.reviewsCount} {t.mural.reviews})</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-zinc-950 flex items-center gap-1.5">
                      {activePin.name}
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    </h3>
                    <p className="text-xs font-semibold text-zinc-600">
                      {language === "pt" ? activePin.titlePt : activePin.titleEn}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {language === "pt" ? activePin.bioPt : activePin.bioEn}
                  </p>

                  <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200 text-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-700">
                      <span className="font-medium">{t.mural.format}</span>
                      <span className="font-bold text-zinc-900">
                        {language === "pt" ? activePin.modePt : activePin.modeEn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-700">
                      <span className="font-medium">{t.mural.duration}</span>
                      <span className="font-bold text-zinc-900">{activePin.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-700">
                      <span className="font-medium">{t.mural.investment}</span>
                      <span className="font-bold text-zinc-900">{activePin.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-700 pt-1 border-t border-zinc-200 font-semibold">
                      <span>{t.mural.firstSlot}</span>
                      <span>{language === "pt" ? activePin.nextSlotPt : activePin.nextSlotEn}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/signup"
                    className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>{t.mural.modalCta}</span>
                  </Link>

                  <p className="text-[11px] text-center text-zinc-500">
                    {t.mural.modalSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Callout Banner */}
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
              {t.mural.bannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
              {t.mural.bannerDesc}
            </p>
          </div>

          <Link
            href="/signup"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>{t.mural.bannerCta}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
