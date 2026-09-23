"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

const EASE = [0.16, 1, 0.3, 1];

export default function HeroSection({ onOpenBooking }) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Subtle scroll-driven parallax — video lags gently behind page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-8%']
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-textDark"
      style={{ minHeight: '100svh' }}
      aria-label="Dr. Siulik's Dental Care — Hero"
    >
      {/* ── VIDEO / IMAGE LAYER — full-bleed video environment ── */}
      {shouldReduceMotion ? (
        /* Static poster fallback for reduced-motion */
        <img
          src="/assets/hero/images/image.png"
          alt="Dr. Siulik's Dental Care Consultation Suite"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[58%_38%] sm:object-center"
        />
      ) : (
        <motion.video
          src="/assets/hero/video/hero-video.mp4"
          poster="/assets/hero/images/image.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[58%_38%] sm:object-center"
          style={{
            y: videoY,
            willChange: 'transform',
          }}
        />
      )}

      {/* ── CINEMATIC OVERLAY — multi-layer scrim for legibility without darkening video ── */}
      <div
        className="hero-overlay z-10"
        aria-hidden="true"
      />

      {/* ── CONTENT — anchored towards lower screen portion with safe area clearance ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-end pt-16 sm:pt-0 sm:pb-20 lg:pb-24"
        style={{
          paddingBottom: 'max(1.25rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))'
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0.92, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-w-[620px] lg:max-w-[720px]"
          >
            {/* Eyebrow & Editorial Signature — Inspired by luxury boutique dental studio styling */}
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-4 flex-wrap select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A83B] shrink-0 shadow-[0_0_8px_rgba(229,168,59,0.7)]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11.5px] font-mono font-bold tracking-[0.2em] text-brand-aqua uppercase">
                DR. SIULIK&apos;S DENTAL CARE
              </span>
              <span className="text-white/40 font-mono text-[10px] sm:text-[11.5px] select-none">&middot;</span>
              <span className="text-[10px] sm:text-[11.5px] font-mono font-medium tracking-[0.2em] text-white/80 uppercase hidden sm:inline">
                PRIVATE DENTAL CLINIC
              </span>
              <span className="text-white/40 font-mono text-[10px] sm:text-[11.5px] select-none hidden sm:inline">&middot;</span>
              <span className="text-[10px] sm:text-[11.5px] font-mono font-bold tracking-[0.2em] text-white uppercase">
                SINCE 2025
              </span>
            </div>

            {/* Semantic H1 Headline — Playfair Display */}
            <h1 className="font-serif font-bold leading-[1.12] sm:leading-[1.08] tracking-tight text-white mb-2.5 sm:mb-5 text-[1.95rem] sm:text-5xl lg:text-[4.25rem]">
              A Healthier Smile.<br />
              <span className="text-brand-aqua italic font-normal">
                A More Confident You.
              </span>
            </h1>

            {/* Single Approved Supporting Line */}
            <p className="text-xs sm:text-base text-white/85 leading-relaxed font-sans mb-4 sm:mb-8 max-w-[480px]">
              Advanced, personalized dental care designed around your comfort, confidence, and long-term oral health.
            </p>

            {/* Minimalist CTA Row — Refined, thumb-friendly, not pill-heavy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 max-w-sm sm:max-w-none">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-deep hover:shadow-teal-glow transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2"
                aria-label="Book a dental appointment"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                Book an Appointment
              </button>

              <a
                href="#about-clinic"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-white/10 hover:bg-white/18 text-white border border-white/20 hover:border-brand-aqua/40 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2"
                aria-label="Explore the clinic"
              >
                Explore the Clinic
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SUBTLE BOTTOM TRANSITION INTO NEXT SECTION ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 sm:h-16 bg-gradient-to-t from-white/20 via-white/5 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ── SUBTLE SCROLL INDICATOR — Desktop ── */}
      <div
        className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none z-20 select-none opacity-60"
        aria-hidden="true"
      >
        <div className="animate-scroll-pulse w-px h-5 sm:h-7 bg-white/50" />
        <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.16em] text-white/60 uppercase mt-0.5">
          Scroll
        </span>
      </div>
    </section>
  );
}
