"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

const TECH_ITEMS = [
  {
    num: "01",
    label: "DIGITAL X-RAYS",
    title: "Digital X-Rays & Imaging",
    tagline: "Low Radiation Precision",
    description: "Instant high-definition diagnostic imaging with minimal radiation exposure for rapid, safe clinical assessment.",
  },
  {
    num: "02",
    label: "DIGITAL INTRAORAL SCANNING",
    title: "Digital Intraoral Scanning",
    tagline: "Impression-Free Comfort",
    description: "Fast, accurate 3D digital impressions eliminating messy, uncomfortable conventional impression trays.",
  },
  {
    num: "03",
    label: "ADVANCED ENDODONTIC SYSTEMS",
    title: "Advanced Endodontic Systems",
    tagline: "Tooth Preservation Focus",
    description: "Precision rotary instrumentation and digital apex locators for comfortable, highly predictable root canal treatment.",
  },
  {
    num: "04",
    label: "LASER DENTISTRY",
    title: "Laser Dentistry Tools",
    tagline: "Soft Tissue Precision",
    description: "Minimally invasive soft-tissue contouring with reduced discomfort, minimal bleeding, and accelerated healing.",
  },
  {
    num: "05",
    label: "MODERN IMPLANT EQUIPMENT",
    title: "Modern Implant Equipment",
    tagline: "Guided Surgical Accuracy",
    description: "Digitally guided surgical instrumentation engineered for precision implant positioning and long-term stability.",
  },
  {
    num: "06",
    label: "ADVANCED STERILIZATION",
    title: "Multi-Class Sterilization Protocols",
    tagline: "Hospital-Grade Hygiene",
    description: "Class B vacuum autoclaves and multi-stage chemical disinfection protocols strictly safeguarding patient health.",
  },
];

export default function TechnologySection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const railRef = useRef(null);

  const equipmentPhotos = [
    {
      id: "tech-1",
      image: "/assets/clinic/equipment/image.webp",
      tag: "PRECISION OPERATORY",
      title: "Sterile Clinical Operatory & Digital Imaging Suite",
    },
    {
      id: "tech-2",
      image: "/assets/clinic/equipment/image copy.webp",
      tag: "INSPECTION & STERILIZATION",
      title: "Class B Autoclaves & Multi-Stage Instrument Sterilization",
    },
    {
      id: "tech-3",
      image: "/assets/clinic/equipment/image copy 2.webp",
      tag: "CLINICAL EQUIPMENT",
      title: "Advanced Dental Care Systems & Treatment Suite",
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  const handleMobileSelect = (index) => {
    setActiveIdx(index);
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

  const activeItem = TECH_ITEMS[activeIdx] || TECH_ITEMS[0];

  return (
    <section
      id="technology"
      className="py-12 sm:py-20 lg:py-24 bg-brand-textDark text-white relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="technology-kicker"
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
            id="technology-kicker"
            className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-aqua uppercase block mb-2"
          >
            SEE THE PRECISION
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Modern Clinical Technology.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-sans max-w-md leading-relaxed">
              Digital radiography, 3D intraoral scanning, and hospital-grade sterilization for predictable clinical outcomes.
            </p>
          </div>
        </div>

        {/* ── Desktop & Mobile Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* ── Left Column: Large Immersive Equipment Photograph ── */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div
              {...tapHandlers}
              className="group relative w-full sm:w-[94vw] lg:w-full mx-auto aspect-[16/11] sm:aspect-[4/3] lg:aspect-[4/4] overflow-hidden rounded-sm sm:rounded-md bg-black/40 border border-brand-aqua/20 shadow-xl cursor-pointer"
            >
              {/* Authentic Equipment Image */}
              <img
                src="/assets/clinic/equipment/image.webp"
                alt="Sterile clinical equipment and modern operatory suite at Dr. Siulik's Dental Care"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-[1.018] transition-transform duration-700 ease-out"
              />

              {/* Bottom Subtle Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/90 via-transparent to-transparent pointer-events-none" />

              {/* Minimal Expand Cue */}
              <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-[10px] font-sans font-medium tracking-wider text-white/90 border border-white/15 uppercase opacity-75 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3 text-brand-aqua" />
                <span className="hidden sm:inline">VIEW EQUIPMENT</span>
              </div>

              {/* In-Image Caption Anchor */}
              <div className="absolute bottom-3.5 left-4 right-4 text-white pointer-events-none z-10">
                <span className="text-[9px] font-mono tracking-[0.16em] text-brand-aqua uppercase block mb-0.5">
                  STERILE OPERATORY SUITE
                </span>
                <p className="font-serif font-bold text-xs sm:text-base text-white">
                  Precision Operatory &amp; Low-Dose Digital Imaging
                </p>
              </div>
            </div>

            {/* Mobile Tap Hint */}
            <p className="lg:hidden text-center text-[10px] font-mono text-brand-aqua/70 uppercase tracking-widest mt-2">
              TAP IMAGE TO VIEW FULLSCREEN
            </p>

            {/* Mobile Horizontal Swipeable Category Rail */}
            <div className="lg:hidden mt-5">
              <div
                ref={railRef}
                role="tablist"
                aria-label="Dental Technology Items"
                className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 -mx-4 px-4 no-scrollbar snap-x snap-mandatory touch-pan-x"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {TECH_ITEMS.map((item, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={item.num}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleMobileSelect(idx)}
                      className={`px-3.5 py-2 min-h-[42px] rounded-full text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-200 border snap-start shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua ${
                        isActive
                          ? 'bg-brand-primary text-white border-brand-primary shadow-teal-glow'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-aqua/40 hover:text-white'
                      }`}
                    >
                      <span className="text-brand-aqua/80 mr-1.5">{item.num}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Active Technology Detail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.num}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 p-4 rounded-lg bg-white/5 border border-brand-aqua/15"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-brand-aqua">
                      {activeItem.num}
                    </span>
                    <span className="text-white/30 text-xs">•</span>
                    <span className="font-mono text-[10px] font-bold text-brand-aqua uppercase tracking-[0.16em]">
                      {activeItem.tagline}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-white mb-1.5">
                    {activeItem.title}
                  </h3>
                  <p className="font-sans text-xs text-white/70 leading-relaxed">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right Column (Desktop): Editorial Technology Index ── */}
          <div
            role="tablist"
            aria-label="Dental Technologies"
            className="hidden lg:flex lg:col-span-6 xl:col-span-6 flex-col border-t border-white/10 divide-y divide-white/10"
          >
            {TECH_ITEMS.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={item.num}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`w-full py-4 text-left transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua ${
                    isActive
                      ? 'pl-4 border-l-2 border-brand-aqua'
                      : 'pl-0 border-l-2 border-transparent hover:pl-2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest transition-colors duration-200 ${
                          isActive ? 'text-brand-aqua' : 'text-white/30 group-hover:text-brand-aqua/70'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase transition-all duration-200 ${
                          isActive
                            ? 'text-white font-bold'
                            : 'text-white/60 group-hover:text-white/90'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Subtle Editorial Indicator */}
                    <span
                      className={`font-mono text-xs text-brand-aqua transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                      }`}
                    >
                      ●
                    </span>
                  </div>

                  {/* Active Item Description Reveal */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2">
                          <span className="text-[10px] font-mono font-bold tracking-wider text-brand-aqua/80 uppercase block mb-0.5">
                            {item.tagline}
                          </span>
                          <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed max-w-xl">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Equipment Fullscreen Lightbox */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={equipmentPhotos}
        currentIndex={0}
      />
    </section>
  );
}
