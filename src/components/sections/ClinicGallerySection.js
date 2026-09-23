"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { CLINIC_GALLERY } from '@/data/clinicData';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

function GalleryCard({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const tapHandlers = useTapVsSwipe(() => onOpen(index));

  return (
    <div
      {...tapHandlers}
      className="group relative w-[90vw] sm:w-[380px] lg:w-[440px] h-[320px] sm:h-[420px] shrink-0 snap-start rounded-3xl overflow-hidden border border-brand-primary/20 bg-brand-primary/10 shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-brand-primary/10 animate-pulse flex items-center justify-center">
          <span className="text-xs font-mono text-brand-primary/40 uppercase tracking-widest">Loading...</span>
        </div>
      )}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/90 via-brand-textDark/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-400 pointer-events-none" />

      {/* Expand Icon */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 text-white">
        <ZoomIn className="w-4 h-4" />
      </div>

      {/* Bottom Details (Concise) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1">
          {item.category}
        </span>
        <h3 className="font-serif font-bold text-base sm:text-xl text-white leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function ClinicGallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const easeEditorial = [0.16, 1, 0.3, 1];
  const items = CLINIC_GALLERY;

  const handleOpenLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="clinic-gallery" className="py-10 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="teal-ambient-glow top-0 left-0 opacity-20 pointer-events-none" />

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
              CLINIC SPACES
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Our Environment,<br />
              <span className="text-brand-deep italic font-normal">Curated.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md mb-3">
              A look inside our reception lounge, consultation suites, and sterile clinical spaces.
            </p>
            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll gallery left"
                className="w-10 h-10 rounded-full border border-brand-primary/20 text-brand-textDark hover:bg-brand-soft hover:border-brand-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll gallery right"
                className="w-10 h-10 rounded-full border border-brand-primary/20 text-brand-textDark hover:bg-brand-soft hover:border-brand-primary flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-brand-textMuted ml-2">Drag or swipe to view</span>
            </div>
          </div>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider mb-3 px-1">
          <span>&larr; Swipe to explore photos &rarr;</span>
          <span className="text-brand-textMuted">Tap to enlarge</span>
        </div>

        {/* Editorial Horizontal Reel — Native Swipe & Scroll-Snap (~90vw with peek) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 cursor-grab active:cursor-grabbing touch-pan-x"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
          }}
        >
          {items.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={idx}
              onOpen={handleOpenLightbox}
            />
          ))}
        </div>

      </div>

      {/* Reusable Fullscreen Media Lightbox */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={items}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
