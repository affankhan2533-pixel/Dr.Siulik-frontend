"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ZoomIn } from 'lucide-react';
import { TECHNOLOGY_ITEMS } from '@/data/clinicData';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

export default function TechnologySection() {
  const [expandedItem, setExpandedItem] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const toggleItem = (idx) => {
    setExpandedItem((curr) => (curr === idx ? null : idx));
  };

  const equipmentPhotos = [
    {
      id: "tech-1",
      image: "/assets/clinic/equipment/image.png",
      tag: "PRECISION OPERATORY",
      title: "Sterile Clinical Operatory & Digital Imaging Suite",
    },
    {
      id: "tech-2",
      image: "/assets/clinic/equipment/image copy.png",
      tag: "INSPECTION & STERILIZATION",
      title: "Class B Autoclaves & Multi-Stage Instrument Sterilization",
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  return (
    <section id="technology" className="py-10 sm:py-20 lg:py-24 bg-brand-textDark text-white relative overflow-hidden">

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #5ED7D5 0px, #5ED7D5 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, #5ED7D5 0px, #5ED7D5 1px, transparent 1px, transparent 60px)`
        }}
      />
      <div className="teal-ambient-glow top-0 left-0 opacity-15 pointer-events-none" />
      <div className="teal-ambient-glow bottom-0 right-0 opacity-10 pointer-events-none" />

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
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1.5 sm:mb-3">
              CLINICAL EQUIPMENT &amp; STANDARDS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Modern Dental<br />
              <span className="text-brand-aqua italic font-normal">Technology.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-white/70 leading-relaxed font-sans max-w-md">
              Evidence-based diagnostic tools and hospital-grade sterilization for clinical precision and safety.
            </p>
          </div>
        </motion.div>

        {/* Composition: Large Featured Equipment Image + Interactive Technology List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

          {/* Featured Equipment Image (Large, Touch-Friendly) */}
          <div className="lg:col-span-5">
            <div
              {...tapHandlers}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-aqua/25 bg-black/40 shadow-xl aspect-[16/11] sm:aspect-[4/3] lg:aspect-[1/1] w-full cursor-pointer group"
            >
              <img
                src="/assets/clinic/equipment/image.png"
                alt="Featured Clinical Equipment"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/90 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-3 left-3.5 right-3.5 text-white pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest text-brand-aqua uppercase block mb-0.5">
                  FEATURED OPERATORY
                </span>
                <p className="font-serif font-bold text-xs sm:text-base text-white">
                  Precision Operatory &amp; Low-Dose Digital Imaging
                </p>
              </div>
            </div>
            <div className="flex sm:hidden justify-end mt-1.5 px-1">
              <span className="text-[10px] font-mono text-brand-aqua/70 uppercase tracking-wider">Tap image to enlarge</span>
            </div>
          </div>

          {/* Technology Items List */}
          <div className="lg:col-span-7 border-t border-brand-aqua/20 pt-2 lg:pt-0">
            {TECHNOLOGY_ITEMS.map((item, idx) => {
              const isExpanded = expandedItem === idx;

              return (
                <div
                  key={idx}
                  className="group border-b border-brand-aqua/12 last:border-b-0"
                >
                  <div
                    onClick={() => toggleItem(idx)}
                    onMouseEnter={() => setExpandedItem(idx)}
                    className="py-3 sm:py-5 flex flex-col gap-1.5 cursor-pointer hover:bg-brand-primary/10 transition-colors duration-200 px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-xl touch-manipulation"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                          isExpanded ? 'bg-brand-aqua shadow-teal-glow' : 'bg-brand-aqua/40 group-hover:bg-brand-aqua'
                        }`} />
                        <span className={`font-mono text-xs sm:text-sm font-bold transition-colors duration-300 ${
                          isExpanded ? 'text-brand-aqua' : 'text-brand-aqua/50 group-hover:text-brand-aqua'
                        }`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className={`font-sans font-bold text-sm sm:text-lg text-white transition-colors duration-200 ml-1 ${
                          isExpanded ? 'text-brand-aqua' : 'group-hover:text-brand-aqua'
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-aqua/70 shrink-0">
                        <span className="hidden sm:inline-block text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border border-brand-aqua/20 text-brand-aqua/80 mr-1">
                          {item.tag}
                        </span>
                        <span>{isExpanded ? 'Close' : 'Details'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-aqua' : ''}`} />
                      </div>
                    </div>

                    {/* Animated Reveal Description */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: easeEditorial }}
                          className="overflow-hidden pt-1"
                        >
                          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans bg-white/5 p-3 rounded-xl border border-brand-aqua/15">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
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
