"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CERTIFICATES_DATA } from '@/data/clinicData';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

function FeaturedCertificateViewer({ cert, onOpen }) {
  const tapHandlers = useTapVsSwipe(onOpen);

  return (
    <div
      {...tapHandlers}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-primary/20 bg-white shadow-xl cursor-pointer group p-3 sm:p-5 flex items-center justify-center"
    >
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-contain max-h-[380px] sm:max-h-[460px] group-hover:scale-[1.015] transition-transform duration-500"
      />
      {/* Expand hint */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-deep text-brand-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        <ZoomIn className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-2xl sm:rounded-3xl pointer-events-none group-hover:border-brand-primary/50 transition-colors" />
    </div>
  );
}

function CertificateRailItem({ cert, index, isActive, onSelect, onOpen }) {
  const tapHandlers = useTapVsSwipe(() => {
    onSelect(index);
  });

  return (
    <button
      type="button"
      {...tapHandlers}
      className={`w-[75vw] sm:w-[320px] lg:w-full text-left flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 transition-all duration-300 group touch-manipulation snap-start shrink-0 lg:shrink focus:outline-none focus:ring-2 focus:ring-brand-primary ${
        isActive
          ? 'border-brand-primary/50 bg-white shadow-soft ring-1 ring-brand-primary/20'
          : 'border-brand-primary/15 bg-white/70 hover:border-brand-primary/30 hover:bg-white'
      }`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Recognizable Thumbnail Preview */}
      <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border border-brand-primary/20 bg-brand-soft/30 shrink-0 p-1 flex items-center justify-center">
        <img
          src={cert.image}
          alt={cert.title}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase block truncate">
          {cert.year} &middot; {cert.issuer}
        </span>
        <p className={`font-sans text-xs sm:text-sm font-semibold mt-0.5 leading-snug line-clamp-2 ${
          isActive ? 'text-brand-textDark font-bold' : 'text-brand-textMuted group-hover:text-brand-textDark'
        }`}>
          {cert.title}
        </p>
      </div>

      {isActive && (
        <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
      )}
    </button>
  );
}

export default function CredentialsSection() {
  const [featured, setFeatured] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const featuredCert = CERTIFICATES_DATA[featured];
  const total = CERTIFICATES_DATA.length;

  const goPrev = () => setFeatured((i) => (i - 1 + total) % total);
  const goNext = () => setFeatured((i) => (i + 1) % total);

  return (
    <section id="credentials" className="py-10 sm:py-20 lg:py-24 bg-brand-soft/30 relative overflow-hidden">
      <div className="teal-ambient-glow -top-10 -right-10 opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="mb-6 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
              CREDENTIALS &amp; EDUCATION
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Achievements<br />
              <span className="text-brand-deep italic font-normal">&amp; Certificates.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Verified clinical certifications and continuing dental education credentials.
            </p>
          </div>
        </motion.div>

        {/* Two-column layout: featured certificate + thumbnail rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

          {/* Left: Featured certificate viewer (~94vw on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="w-full lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredCert.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
              >
                {/* 94vw Dominant Frame */}
                <div className="w-[94vw] mx-auto sm:w-full">
                  <FeaturedCertificateViewer
                    cert={featuredCert}
                    onOpen={() => setLightboxOpen(true)}
                  />
                </div>

                {/* Caption */}
                <div className="mt-3.5 flex items-start justify-between gap-4 px-1">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase block mb-1">
                      {featuredCert.year} &middot; {featuredCert.issuer}
                    </span>
                    <h3 className="font-sans font-bold text-sm sm:text-lg text-brand-textDark leading-snug">
                      {featuredCert.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="shrink-0 min-h-[44px] px-3.5 py-2 rounded-full text-xs font-semibold text-brand-deep hover:text-brand-primary hover:bg-brand-soft/70 transition-colors flex items-center gap-1.5 focus:outline-none"
                    aria-label="Open fullscreen certificate view"
                  >
                    <ZoomIn className="w-4 h-4" /> Enlarge
                  </button>
                </div>

                {/* Desktop Prev / Next controls (hidden on mobile, swipe is primary) */}
                <div className="mt-4 hidden sm:flex items-center gap-3">
                  <button
                    onClick={goPrev}
                    className="w-11 h-11 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-brand-textMuted font-semibold">
                    {featured + 1} / {total}
                  </span>
                  <button
                    onClick={goNext}
                    className="w-11 h-11 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: Certificate horizontal rail on mobile, vertical stack on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeEditorial }}
            className="w-full lg:col-span-5"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[10px] font-mono font-bold tracking-[0.3em] text-brand-textMuted uppercase">
                CERTIFICATE ARCHIVE ({total})
              </p>
              <span className="text-[10px] font-mono text-brand-primary lg:hidden">
                &larr; Swipe archive &rarr;
              </span>
            </div>

            {/* Horizontal Scroll-Snap Rail on Mobile with ~75vw Peek */}
            <div
              className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar snap-x snap-mandatory touch-pan-x"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
              }}
            >
              {CERTIFICATES_DATA.map((cert, idx) => (
                <CertificateRailItem
                  key={cert.id}
                  cert={cert}
                  index={idx}
                  isActive={idx === featured}
                  onSelect={setFeatured}
                  onOpen={() => {
                    setFeatured(idx);
                    setLightboxOpen(true);
                  }}
                />
              ))}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Reusable Fullscreen Media Lightbox with Uncropped object-contain */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={CERTIFICATES_DATA}
        currentIndex={featured}
        onIndexChange={setFeatured}
      />
    </section>
  );
}
