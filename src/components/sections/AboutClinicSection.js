"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

/**
 * Authentic Client Photography from /public/assets/clinic/
 * Four core clinic spaces with verified authentic photography
 */
const CLINIC_SPACES = [
  {
    id: 1,
    num: "01",
    tag: "RECEPTION",
    title: "A welcoming first impression.",
    image: "/assets/clinic/reception/image.webp",
    objectPosition: "center 45%",
    alt: "Dr. Siulik's Dental Care reception and welcoming lounge",
  },
  {
    id: 2,
    num: "02",
    tag: "TREATMENT ROOM",
    title: "Thoughtfully prepared clinical spaces.",
    image: "/assets/clinic/treatment-rooms/image.webp",
    objectPosition: "center center",
    alt: "Ergonomic operatory chair and precision treatment suite",
  },
  {
    id: 3,
    num: "03",
    tag: "EQUIPMENT",
    title: "Technology supporting precise care.",
    image: "/assets/clinic/equipment/image.webp",
    objectPosition: "center center",
    alt: "Advanced sterilization technology and precision clinical instruments",
  },
  {
    id: 4,
    num: "04",
    tag: "INTERIOR",
    title: "A calm environment designed around comfort.",
    image: "/assets/clinic/interior/image.webp",
    objectPosition: "center center",
    alt: "Serene clinical hallway and quiet consultation spaces",
  },
];

export default function AboutClinicSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const railRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Synchronize activeIndex with scroll position on both mobile & desktop
  const handleScroll = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (scrollTimeoutRef.current) {
      window.cancelAnimationFrame(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;

      const scrollLeft = rail.scrollLeft;
      const slide = rail.firstElementChild;
      if (!slide) return;

      // Slide width + gap
      const slideWidth = slide.getBoundingClientRect().width;
      const gap = 16; // 1rem gap
      const step = slideWidth + gap;

      const calculatedIndex = Math.round(scrollLeft / step);
      const clampedIndex = Math.max(0, Math.min(calculatedIndex, CLINIC_SPACES.length - 1));

      setActiveIndex(clampedIndex);
    });
  }, [hasInteracted]);

  // Smooth scroll to target slide
  const scrollToSlide = (index) => {
    const rail = railRef.current;
    if (!rail) return;
    const slides = rail.children;
    if (slides[index]) {
      slides[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActiveIndex(index);
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1);
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = Math.min(CLINIC_SPACES.length - 1, activeIndex + 1);
    scrollToSlide(nextIdx);
  };

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about-clinic"
      className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28"
      aria-label="Step Inside — Clinic Tour"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Intro: Minimalist Editorial Header ── */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1.5 sm:mb-2">
              STEP INSIDE
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark tracking-tight">
              Designed around comfort.
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-brand-textMuted mt-1 sm:mt-1.5 font-sans">
              A closer look at the spaces behind your care.
            </p>
          </div>

          {/* Desktop Rail Navigation Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-textDark">
              {CLINIC_SPACES[activeIndex].num} <span className="text-brand-textMuted font-normal">/ 04</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous clinic space"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? 'border-brand-primary/10 text-brand-textMuted/40 cursor-not-allowed'
                    : 'border-brand-primary/25 text-brand-textDark hover:bg-brand-soft hover:border-brand-aqua active:scale-95'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === CLINIC_SPACES.length - 1}
                aria-label="Next clinic space"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  activeIndex === CLINIC_SPACES.length - 1
                    ? 'border-brand-primary/10 text-brand-textMuted/40 cursor-not-allowed'
                    : 'border-brand-primary/25 text-brand-textDark hover:bg-brand-soft hover:border-brand-aqua active:scale-95'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Wide Editorial Media Rail (Mobile-First Native Horizontal Swipe & Desktop Drag) ── */}
        <div className="relative">
          <div
            ref={railRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 pt-1 touch-pan-x cursor-grab active:cursor-grabbing"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {CLINIC_SPACES.map((space, index) => (
              <ClinicSlideItem
                key={space.id}
                space={space}
                index={index}
                isActive={activeIndex === index}
                showSwipeHint={index === 0 && !hasInteracted}
                onOpen={() => handleOpenLightbox(index)}
              />
            ))}
          </div>
        </div>

        {/* ── Captions & Progress Indicator ── */}
        <div className="mt-4 sm:mt-6 pt-3 border-t border-brand-primary/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Active Space Caption (Synchronized transition) */}
          <div className="min-h-[44px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-aqua tracking-widest">
                    {CLINIC_SPACES[activeIndex].num}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-[0.16em] text-brand-textDark uppercase">
                    {CLINIC_SPACES[activeIndex].tag}
                  </span>
                </div>
                <span className="hidden sm:inline text-brand-primary/30">•</span>
                <p className="font-serif text-sm sm:text-base text-brand-textDark font-medium">
                  {CLINIC_SPACES[activeIndex].title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Progress Indicators: 01 / 04 and Line Dots */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* Mobile Swipe / Tap Hint */}
            <span className="sm:hidden text-[11px] font-mono text-brand-textMuted tracking-wider">
              {CLINIC_SPACES[activeIndex].num} / 04 &mdash; Tap image to expand
            </span>

            {/* Subtle Progress Dots */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {CLINIC_SPACES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="py-1 px-0.5 focus:outline-none"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 bg-brand-aqua'
                        : 'w-1.5 bg-brand-primary/20 hover:bg-brand-primary/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── Shared Fullscreen Media Lightbox ── */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={CLINIC_SPACES}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}

/**
 * Individual Clinic Slide Card
 * Tuned for mobile-first peek (~90vw) and wide desktop editorial peek
 */
function ClinicSlideItem({ space, index, isActive, showSwipeHint, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const tapHandlers = useTapVsSwipe(onOpen);

  return (
    <div
      {...tapHandlers}
      className="w-[88vw] sm:w-[72vw] sm:max-w-[820px] aspect-[16/10] sm:aspect-[16/9] shrink-0 snap-start relative rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-primary/5 border border-brand-primary/15 shadow-md hover:shadow-xl transition-all duration-300 group"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Skeleton Loading State */}
      {!loaded && (
        <div className="absolute inset-0 bg-brand-primary/10 animate-pulse flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono text-brand-primary/40 uppercase tracking-widest">
            Loading {space.tag}...
          </span>
        </div>
      )}

      {/* Real Authentic Clinic Photograph */}
      <img
        ref={(el) => {
          if (el && (el.complete || el.naturalWidth > 0) && !loaded) {
            setLoaded(true);
          }
        }}
        src={space.image}
        alt={space.alt}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
        style={{ objectPosition: space.objectPosition }}
      />

      {/* Subtle Atmospheric Gradient for Contrast & Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/85 via-brand-textDark/15 to-transparent pointer-events-none" />

      {/* Slide Badge / Identification (Bottom Left) */}
      <div className="absolute bottom-3 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none z-10 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-brand-aqua">
              {space.num}
            </span>
            <span className="text-[9px] sm:text-[11px] font-mono font-bold tracking-[0.16em] text-white/90 uppercase">
              {space.tag}
            </span>
          </div>
          <p className="font-serif text-sm sm:text-xl font-bold text-white leading-snug line-clamp-1">
            {space.title}
          </p>
        </div>

        {/* Expand Icon Badge */}
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-aqua" />
        </div>
      </div>

      {/* Editorial Swipe Discovery Hint (Disappears after first interaction) */}
      {showSwipeHint && (
        <div className="sm:hidden absolute top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
          <span className="text-[10px] font-mono font-bold tracking-wider text-brand-textDark bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-brand-aqua/40 uppercase whitespace-nowrap">
            &larr; SWIPE TO EXPLORE &rarr;
          </span>
        </div>
      )}

      {/* Desktop Hover Action Pill */}
      <div className="hidden sm:flex absolute top-5 right-5 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-textDark/75 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-brand-aqua/30 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span>VIEW &rarr;</span>
      </div>
    </div>
  );
}
