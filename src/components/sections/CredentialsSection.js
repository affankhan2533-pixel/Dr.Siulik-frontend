"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '@/data/clinicData';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';
import { useDynamicMedia } from '@/lib/useDynamicData';

function FeaturedAchievementViewer({ item, onOpen }) {
  const tapHandlers = useTapVsSwipe(onOpen);

  return (
    <div
      {...tapHandlers}
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-primary/20 bg-white shadow-xl cursor-pointer group p-3 sm:p-5 flex items-center justify-center"
    >
      <img
        src={item.image}
        alt={`${item.name} — ${item.title}`}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-contain max-h-[360px] sm:max-h-[440px] group-hover:scale-[1.015] transition-transform duration-500"
      />
      {/* Expand hint button */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-brand-deep text-brand-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        <ZoomIn className="w-5 h-5" />
      </div>
      <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-2xl sm:rounded-3xl pointer-events-none group-hover:border-brand-primary/50 transition-colors" />
    </div>
  );
}

function ArchiveListItem({ item, index, isActive, onSelect, onOpen }) {
  const tapHandlers = useTapVsSwipe(() => {
    onSelect(index);
  });

  return (
    <button
      type="button"
      {...tapHandlers}
      className={`w-full text-left flex items-center gap-3.5 rounded-2xl border p-3 sm:p-3.5 transition-all duration-300 group touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-primary ${
        isActive
          ? 'border-brand-primary/50 bg-white shadow-soft ring-1 ring-brand-primary/20'
          : 'border-brand-primary/15 bg-white/70 hover:border-brand-primary/30 hover:bg-white'
      }`}
    >
      {/* Recognizable Thumbnail Preview */}
      <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border border-brand-primary/20 bg-brand-soft/40 shrink-0 p-1 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block truncate">
          {item.year} &middot; {item.name}
        </span>
        <p
          className={`font-sans text-xs sm:text-sm font-semibold mt-0.5 leading-snug line-clamp-2 ${
            isActive ? 'text-brand-textDark font-bold' : 'text-brand-textMuted group-hover:text-brand-textDark'
          }`}
        >
          {item.title}
        </p>
        <span className="text-[10px] font-sans text-brand-textMuted/80 block truncate mt-0.5">
          {item.issuer}
        </span>
      </div>

      {isActive && (
        <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0 mr-1" />
      )}
    </button>
  );
}

function PhotoRailCard({ item, index, isActive, onSelect, onOpen }) {
  const tapHandlers = useTapVsSwipe(() => {
    onSelect(index);
    onOpen(index);
  });

  return (
    <div
      {...tapHandlers}
      className={`w-[88vw] sm:w-[320px] lg:w-[340px] shrink-0 snap-start rounded-2xl bg-white border p-3.5 flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md touch-manipulation ${
        isActive
          ? 'border-brand-primary/60 ring-2 ring-brand-primary/20'
          : 'border-brand-primary/15 hover:border-brand-primary/35'
      }`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Photo Frame */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-brand-soft/40 border border-brand-primary/15 p-1.5 flex items-center justify-center">
        <img
          src={item.image}
          alt={`${item.name} — ${item.title}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-brand-deep/80 text-brand-aqua flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Card Details */}
      <div className="mt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase truncate">
            {item.year} &middot; {item.name}
          </span>
          <span className="text-[10px] font-mono text-brand-textMuted shrink-0">
            #{index + 1}
          </span>
        </div>
        <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-textDark mt-1 leading-snug line-clamp-2">
          {item.title}
        </h4>
        {item.description && (
          <p className="text-[11px] font-sans text-brand-textMuted mt-1">
            {item.description}
          </p>
        )}
        <p className="text-[10px] font-sans text-brand-textMuted/80 mt-1 truncate">
          {item.issuer}
        </p>
      </div>
    </div>
  );
}

export default function CredentialsSection() {
  const dynamicAchievements = useDynamicMedia('Achievements', ACHIEVEMENTS_DATA);

  const normalizedItems = (dynamicAchievements || []).map((item, idx) => ({
    id: item._id || item.id || `ach-${idx}`,
    name: item.name || 'Dr. Siulik Badajena',
    year: item.year || '2024',
    title: item.title || 'Clinical Certification',
    issuer: item.issuer || 'Continuing Dental Education',
    image: item.url || item.image || '/assets/awards/certificates/implant-dentistry.webp',
    description: item.description || '',
    isFeatured: Boolean(item.isFeatured),
  }));

  const achievementsList = normalizedItems.length > 0 ? normalizedItems : ACHIEVEMENTS_DATA;

  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const railRef = useRef(null);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const currentItem = achievementsList[activeIdx] || achievementsList[0];
  const total = achievementsList.length;

  const goPrev = () => setActiveIdx((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIdx((i) => (i + 1) % total);

  const openLightboxAt = (index) => {
    setActiveIdx(index);
    setLightboxOpen(true);
  };

  const scrollRail = (direction) => {
    if (!railRef.current) return;
    const scrollAmount = direction === 'next' ? 340 : -340;
    railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

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
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
              CREDENTIALS &amp; CONTINUING EDUCATION
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Achievements &amp; Certificates.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Verified clinical certifications and continuing dental education credentials under leading dental mentors.
            </p>
          </div>
        </motion.div>

        {/* Two-column layout: Featured Achievement (Left) + Archive Navigation (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* Left: Featured Achievement Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: easeEditorial }}
            className="w-full lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
              >
                {/* 90-94vw dominant frame on mobile, full width inside col on desktop */}
                <div className="w-[92vw] mx-auto sm:w-full">
                  <FeaturedAchievementViewer
                    item={currentItem}
                    onOpen={() => setLightboxOpen(true)}
                  />
                </div>

                {/* Minimal Factual Caption */}
                <div className="mt-3.5 flex items-start justify-between gap-4 px-1">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-brand-primary uppercase block mb-1">
                      {currentItem.year} &middot; {currentItem.name}
                    </span>
                    <h3 className="font-sans font-bold text-sm sm:text-lg text-brand-textDark leading-snug">
                      {currentItem.title}
                    </h3>
                    {currentItem.description && (
                      <p className="text-xs text-brand-textMuted mt-0.5 font-sans">
                        {currentItem.description}
                      </p>
                    )}
                    <span className="text-xs font-sans text-brand-textMuted/80 block mt-0.5">
                      {currentItem.issuer}
                    </span>
                  </div>

                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="shrink-0 min-h-[44px] px-3.5 py-2 rounded-full text-xs font-semibold text-brand-deep hover:text-brand-primary hover:bg-brand-soft/70 transition-colors flex items-center gap-1.5 focus:outline-none touch-manipulation"
                    aria-label="Open fullscreen certificate view"
                  >
                    <ZoomIn className="w-4 h-4" /> Enlarge
                  </button>
                </div>

                {/* Desktop Prev / Next Controls */}
                <div className="mt-4 hidden sm:flex items-center gap-3">
                  <button
                    onClick={goPrev}
                    className="w-11 h-11 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Previous achievement"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-mono text-brand-textMuted font-semibold">
                    {activeIdx + 1} / {total}
                  </span>
                  <button
                    onClick={goNext}
                    className="w-11 h-11 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    aria-label="Next achievement"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right on Desktop (hidden on mobile, rendered below rail for mobile-first order) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeEditorial }}
            className="hidden lg:block w-full lg:col-span-5"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-textMuted uppercase">
                CERTIFICATE &amp; ACHIEVEMENT ARCHIVE ({total})
              </p>
            </div>

            {/* Scrollable vertical archive on desktop */}
            <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1.5 custom-scrollbar">
              {achievementsList.map((item, idx) => (
                <ArchiveListItem
                  key={item.id}
                  item={item}
                  index={idx}
                  isActive={idx === activeIdx}
                  onSelect={setActiveIdx}
                  onOpen={() => openLightboxAt(idx)}
                />
              ))}
            </div>
          </motion.div>

        </div>

        {/* Horizontal Achievement & Learning Photo Rail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: easeEditorial }}
          className="mt-10 sm:mt-16 pt-8 border-t border-brand-primary/15"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1">
                PHOTO ARCHIVE ({total})
              </span>
              <h3 className="font-serif font-bold text-lg sm:text-2xl text-brand-textDark">
                Clinical Mentorship &amp; Recognition
              </h3>
            </div>

            {/* Rail Arrow Controls for desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollRail('prev')}
                className="w-9 h-9 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Scroll left in photo archive"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollRail('next')}
                className="w-9 h-9 rounded-full border border-brand-primary/25 text-brand-textDark hover:border-brand-primary hover:bg-brand-soft flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Scroll right in photo archive"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[10px] font-mono text-brand-primary sm:hidden">
              &larr; Swipe gallery &rarr;
            </span>
          </div>

          {/* Horizontal Scroll-Snap Rail with peek of partial next image on mobile */}
          <div
            ref={railRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory touch-pan-x"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {achievementsList.map((item, idx) => (
              <PhotoRailCard
                key={`rail-${item.id}`}
                item={item}
                index={idx}
                isActive={idx === activeIdx}
                onSelect={setActiveIdx}
                onOpen={openLightboxAt}
              />
            ))}
          </div>
        </motion.div>

        {/* Mobile Certificate Archive List (Step 4 in Mobile Order: 1. Featured, 2. Caption, 3. Photo Rail, 4. Archive) */}
        <div className="lg:hidden mt-8 pt-6 border-t border-brand-primary/15">
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-[10px] font-mono font-bold tracking-[0.16em] text-brand-textMuted uppercase">
              CERTIFICATE ARCHIVE ({total})
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {achievementsList.map((item, idx) => (
              <ArchiveListItem
                key={`mobile-archive-${item.id}`}
                item={item}
                index={idx}
                isActive={idx === activeIdx}
                onSelect={(selectedIdx) => {
                  setActiveIdx(selectedIdx);
                  // Optional scroll to top of section for smooth viewing on mobile
                  const el = document.getElementById('credentials');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
                onOpen={() => openLightboxAt(idx)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Unified Reusable Media Lightbox */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={achievementsList}
        currentIndex={activeIdx}
        onIndexChange={setActiveIdx}
      />
    </section>
  );
}
