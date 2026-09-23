"use client";

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

const EASE = [0.16, 1, 0.3, 1];

export default function HeroSection({ onOpenBooking }) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Subtle scroll-driven parallax — video lags slightly behind page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-10%']
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-textDark"
      style={{ minHeight: '100svh' }}
      aria-label="Dr. Siulik's Dental Care — Hero"
    >
      {/* ── VIDEO / IMAGE LAYER — position absolute, fills entire section ── */}
      {shouldReduceMotion ? (
        /* Static fallback for reduced-motion */
        <img
          src="/assets/hero/images/image.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
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
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            y: videoY,
            willChange: 'transform',
          }}
        />
      )}

      {/* ── CINEMATIC OVERLAY — multi-layer for legibility without killing video ── */}
      <div
        className="hero-overlay"
        aria-hidden="true"
      />

      {/* ── CONTENT — anchored cleanly for mobile viewport and desktop ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-5 sm:pb-24 lg:pb-32 pt-16 sm:pt-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12">

          <div className="max-w-[660px] lg:max-w-[740px]">

            {/* Eyebrow */}
            <span className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.3em] text-brand-aqua uppercase mb-2 sm:mb-6">
              DR. SIULIK&apos;S DENTAL CARE
            </span>

            {/* Headline — semantic h1 */}
            <h1
              className="font-serif font-bold leading-[1.08] tracking-tight text-white mb-2.5 sm:mb-6"
              style={{ fontSize: 'clamp(1.75rem, 6.2vw, 4.75rem)' }}
            >
              A Healthier Smile.<br />
              <span className="text-brand-aqua italic font-normal">
                A More Confident You.
              </span>
            </h1>

            {/* Supporting line — one sentence, no more */}
            <p className="text-xs sm:text-lg text-white/80 leading-relaxed font-sans mb-4 sm:mb-8 max-w-[480px]">
              {CLINIC_INFO.subheadline}
            </p>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
              <button
                onClick={onOpenBooking}
                className="hero-btn-primary"
                aria-label="Book a dental appointment"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                Book an Appointment
              </button>

              <a
                href="#about-clinic"
                className="hero-btn-secondary"
                aria-label="Explore the clinic"
              >
                Explore the Clinic
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR — bottom-center, desktop only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        aria-hidden="true"
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div
          className="animate-scroll-pulse"
          style={{
            width: '1px',
            height: '2.25rem',
            background: 'rgba(255,255,255,0.3)',
          }}
        />
        <span
          style={{
            fontSize: '9px',
            fontFamily: 'monospace',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </motion.div>

    </section>
  );
}
