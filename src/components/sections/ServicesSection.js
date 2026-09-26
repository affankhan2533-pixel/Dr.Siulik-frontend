"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '@/data/clinicData';
import { useDynamicServices } from '@/lib/useDynamicData';

const STATIC_CATEGORIES = [
  {
    id: "preventive",
    num: "01",
    shortName: "PREVENTIVE",
    title: "Preventive Dentistry",
    tagline: "Routine hygiene, diagnostic evaluation, and natural tooth preservation.",
  },
  {
    id: "restorative",
    num: "02",
    shortName: "RESTORATIVE",
    title: "Restorative Dentistry",
    tagline: "Tooth-colored restorations, composite bonding, and structural repair.",
  },
  {
    id: "surgical",
    num: "03",
    shortName: "SURGICAL",
    title: "Surgical Dentistry",
    tagline: "Minimally invasive oral surgery performed under strict sterile protocols.",
  },
  {
    id: "cosmetic",
    num: "04",
    shortName: "SMILE & COSMETIC",
    title: "Smile & Cosmetic Dentistry",
    tagline: "Aesthetic enhancements, porcelain veneers, and enamel contouring.",
  },
  {
    id: "orthodontics",
    num: "05",
    shortName: "ORTHODONTICS",
    title: "Orthodontics",
    tagline: "Clear aligners and corrective orthodontics for balanced bite alignment.",
  },
  {
    id: "implants",
    num: "06",
    shortName: "IMPLANT DENTISTRY",
    title: "Implant Dentistry",
    tagline: "Precision titanium root restorations and fixed implant prosthetics.",
  },
  {
    id: "child",
    num: "07",
    shortName: "CHILD DENTISTRY",
    title: "Child Dentistry",
    tagline: "Specialized pediatric dental care focused on gentle habit development.",
  },
];

export default function ServicesSection({ onOpenBooking }) {
  const dynamicServices = useDynamicServices(SERVICES_DATA);

  // Normalize dynamic or static categories
  const categoriesList = dynamicServices.map((cat, idx) => ({
    id: cat.categoryId || cat.id || `cat-${idx}`,
    num: cat.num || String(idx + 1).padStart(2, '0'),
    shortName: cat.shortName || cat.title?.toUpperCase() || `CAT ${idx + 1}`,
    title: cat.title,
    tagline: cat.tagline || cat.description || '',
    description: cat.description || '',
    treatments: (cat.treatments || []).filter((t) => t.isActive !== false),
  }));

  const activeCategories = categoriesList.length > 0 ? categoriesList : STATIC_CATEGORIES;
  const [activeTab, setActiveTab] = useState(activeCategories[0].id);
  const railRef = useRef(null);

  const handleCategoryClick = (catId, index) => {
    setActiveTab(catId);
    const container = railRef.current;
    if (container && container.children[index]) {
      const pill = container.children[index];
      const targetLeft = pill.offsetLeft - (container.clientWidth / 2) + (pill.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  };

  const currentCategory = activeCategories.find((c) => c.id === activeTab) || activeCategories[0];
  const serviceData = dynamicServices.find((s) => (s.categoryId || s.id) === activeTab) || currentCategory || SERVICES_DATA[0];

  return (
    <section
      id="services"
      className="py-12 sm:py-20 lg:py-24 bg-brand-textDark relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="services-kicker"
    >
      {/* Ambient Teal Atmospheric Glow */}
      <div className="teal-ambient-glow -top-24 left-1/4 opacity-10 pointer-events-none" />
      <div className="teal-ambient-glow -bottom-24 right-1/4 opacity-10 pointer-events-none" />

      {/* Fine Horizontal Accent Rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-aqua/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span
            id="services-kicker"
            className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-aqua uppercase block mb-2"
          >
            TREATMENT INDEX
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Services &amp; Clinical Disciplines.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-sans max-w-md leading-relaxed">
              Evidence-based dental care structured across seven specialized clinical disciplines.
            </p>
          </div>
        </div>

        {/* Mobile Horizontal Swipeable Category Rail */}
        <div
          ref={railRef}
          role="tablist"
          aria-label="Service Categories"
          className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 pt-1 -mx-4 px-4 no-scrollbar snap-x snap-mandatory touch-pan-x mb-5"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {activeCategories.map((cat, idx) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryClick(cat.id, idx)}
                className={`px-4 py-2.5 min-h-[42px] rounded-full text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border snap-start shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua ${
                  isActive
                    ? 'bg-brand-primary text-white border-brand-primary shadow-teal-glow'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-aqua/40 hover:text-white'
                }`}
              >
                <span className="text-brand-aqua/80 mr-1.5">{cat.num}</span>
                <span>{cat.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* ── Two-Zone Editorial Grid: Left Index / Right Treatment Panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* ── Left Column (Desktop): Numbered Category Navigation Index ── */}
          <div
            role="tablist"
            aria-label="Clinical Disciplines"
            className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col border-t border-white/10 divide-y divide-white/10"
          >
            {activeCategories.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(cat.id)}
                  onMouseEnter={() => setActiveTab(cat.id)}
                  className={`w-full py-4 text-left transition-all duration-200 group flex items-start gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua ${
                    isActive
                      ? 'pl-4 border-l-2 border-brand-aqua'
                      : 'pl-0 border-l-2 border-transparent hover:pl-2'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold tracking-widest pt-1 transition-colors duration-200 ${
                      isActive ? 'text-brand-aqua' : 'text-white/30 group-hover:text-brand-aqua/70'
                    }`}
                  >
                    {cat.num}
                  </span>
                  <div className="flex-1">
                    <span
                      className={`font-serif text-lg xl:text-xl font-bold tracking-tight block transition-all duration-200 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/50 group-hover:text-white/85 group-hover:translate-x-1'
                      }`}
                    >
                      {cat.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Right Column: Active Category Experience ── */}
          <div className="lg:col-span-7 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                role="tabpanel"
                id={`panel-${currentCategory.id}`}
                aria-labelledby={`tab-${currentCategory.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-brand-textDark/90 border border-brand-aqua/15 rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 overflow-hidden"
              >
                {/* Large Subtle Editorial Watermark Index Number */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-4 sm:top-4 sm:right-6 text-6xl sm:text-7xl lg:text-8xl font-serif font-black text-white/[0.04] pointer-events-none select-none"
                >
                  {currentCategory.num}
                </span>

                {/* Category Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-brand-aqua tracking-widest">
                      {currentCategory.num}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-brand-aqua uppercase tracking-[0.16em]">
                      {currentCategory.shortName}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {currentCategory.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed mt-2">
                    {currentCategory.tagline}
                  </p>
                </div>

                {/* Treatment List in Clean Editorial Rows */}
                <div className="relative z-10 divide-y divide-white/10 border-t border-b border-white/10">
                  {(serviceData?.treatments || []).filter((t) => t.isActive !== false).map((treatment, idx) => (
                    <div
                      key={treatment.name || idx}
                      className="group py-3.5 sm:py-4 flex items-center justify-between cursor-default transition-colors duration-200"
                    >
                      <div className="pr-4">
                        <h4 className="font-sans text-sm sm:text-base text-white font-medium group-hover:text-brand-aqua transition-colors duration-200 flex items-center gap-2">
                          <span>{treatment.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-aqua text-xs">
                            →
                          </span>
                        </h4>
                        {treatment.desc && (
                          <p className="text-[11px] sm:text-xs text-white/50 font-sans mt-0.5 max-w-md group-hover:text-white/70 transition-colors">
                            {treatment.desc}
                          </p>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold tracking-widest text-brand-aqua/40 group-hover:text-brand-aqua transition-colors shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Compact Service CTA */}
                <div className="relative z-10 mt-6 sm:mt-8 pt-4 sm:pt-5 flex items-center justify-between flex-wrap gap-4">
                  <a
                    href="#book-appointment"
                    onClick={(e) => {
                      if (onOpenBooking) {
                        e.preventDefault();
                        onOpenBooking();
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-brand-primary hover:bg-brand-deep text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-teal-glow hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>BOOK THIS CONSULTATION</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <span className="text-[10px] sm:text-[11px] font-mono text-white/40 tracking-wider">
                    COMPREHENSIVE CLINICAL CARE
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
