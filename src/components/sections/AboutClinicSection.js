"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

const CLINIC_SLIDES = [
  {
    id: 1,
    image: "/assets/clinic/reception/image copy.png",
    tag: "RECEPTION",
    title: "A calm, modern first impression.",
  },
  {
    id: 2,
    image: "/assets/clinic/equipment/image.png",
    tag: "OPERATORY SUITE",
    title: "Sterile operatory with advanced imaging.",
  },
  {
    id: 3,
    image: "/assets/clinic/treatment-rooms/image.png",
    tag: "TREATMENT ROOM",
    title: "Ergonomic comfort & precision care.",
  },
  {
    id: 4,
    image: "/assets/clinic/interior/image.png",
    tag: "CONSULTATION",
    title: "Transparent dialogue & patient education.",
  },
];

function MobileClinicSlide({ slide, index, onOpen }) {
  const tapHandlers = useTapVsSwipe(() => onOpen(index));

  return (
    <div
      {...tapHandlers}
      className="w-[90vw] shrink-0 snap-start relative rounded-2xl overflow-hidden aspect-[16/11] bg-brand-textDark border border-brand-primary/20 shadow-lg cursor-pointer active:scale-[0.99] transition-transform"
      style={{ scrollSnapAlign: 'start' }}
    >
      <img
        src={slide.image}
        alt={slide.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/90 via-brand-textDark/25 to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 pointer-events-none">
        <span className="text-[9px] font-mono font-bold tracking-widest text-brand-aqua uppercase block mb-0.5">
          {slide.tag}
        </span>
        <p className="font-serif text-sm font-bold text-white leading-snug line-clamp-1">
          {slide.title}
        </p>
      </div>
    </div>
  );
}

function DesktopClinicSlide({ slide, index, onOpen }) {
  const tapHandlers = useTapVsSwipe(() => onOpen(index));

  return (
    <div
      {...tapHandlers}
      className="w-[62vw] max-w-[760px] h-[440px] shrink-0 snap-start relative rounded-3xl overflow-hidden border border-brand-primary/20 shadow-xl bg-brand-textDark cursor-pointer group"
    >
      <img
        src={slide.image}
        alt={slide.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/90 via-brand-textDark/20 to-transparent pointer-events-none" />
      
      {/* Slide Caption Overlay */}
      <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1">
          {slide.tag}
        </span>
        <p className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
          {slide.title}
        </p>
      </div>

      {/* Enlarge Hint */}
      <div className="absolute top-5 right-5 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/80 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        Tap to Enlarge
      </div>
    </div>
  );
}

export default function AboutClinicSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const easeEditorial = [0.16, 1, 0.3, 1];

  return (
    <section id="about-clinic" className="py-10 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="mb-6 sm:mb-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-end"
        >
          <div className="lg:col-span-8">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
              ABOUT THE CLINIC
            </span>
            {/* Mobile Header */}
            <h2 className="sm:hidden font-serif font-bold text-2xl text-brand-textDark leading-tight mb-1">
              DESIGNED AROUND COMFORT.
            </h2>
            {/* Desktop Header */}
            <h2 className="hidden sm:block font-serif font-bold text-3xl lg:text-5xl text-brand-textDark leading-[1.18] tracking-tight">
              Dentistry as it should be &mdash;<br />
              <span className="text-brand-deep italic font-normal">precise, personal, and designed around you.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans mb-3">
              Thoughtfully planned clinical spaces, advanced equipment, and a calming atmosphere for every patient.
            </p>
            {/* Desktop Navigation / Scroll assistance */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById('clinic-desktop-rail');
                  if (el) el.scrollBy({ left: -500, behavior: 'smooth' });
                }}
                aria-label="Previous clinic space"
                className="w-9 h-9 rounded-full border border-brand-primary/20 text-brand-textDark hover:bg-brand-soft hover:border-brand-primary flex items-center justify-center transition-colors focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('clinic-desktop-rail');
                  if (el) el.scrollBy({ left: 500, behavior: 'smooth' });
                }}
                aria-label="Next clinic space"
                className="w-9 h-9 rounded-full border border-brand-primary/20 text-brand-textDark hover:bg-brand-soft hover:border-brand-primary flex items-center justify-center transition-colors focus:outline-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-brand-textMuted ml-2">Drag or swipe to view</span>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile: Native Horizontal Scroll-Snap Rail (~90vw with partial peek) ── */}
        <div className="sm:hidden">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 pt-1 -mx-4 px-4 touch-pan-x"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {CLINIC_SLIDES.map((slide, idx) => (
              <MobileClinicSlide
                key={slide.id}
                slide={slide}
                index={idx}
                onOpen={handleOpenLightbox}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider mt-1 px-1">
            <span>&larr; Swipe to explore &rarr;</span>
            <span className="text-brand-textMuted">Tap image to expand</span>
          </div>
        </div>

        {/* ── Desktop: Premium Editorial Horizontal Media Rail ── */}
        <div className="hidden sm:block">
          <div
            id="clinic-desktop-rail"
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CLINIC_SLIDES.map((slide, idx) => (
              <DesktopClinicSlide
                key={slide.id}
                slide={slide}
                index={idx}
                onOpen={handleOpenLightbox}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Reusable Fullscreen Media Lightbox */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={CLINIC_SLIDES}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
