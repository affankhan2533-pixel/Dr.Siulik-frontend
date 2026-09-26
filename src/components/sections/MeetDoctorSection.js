"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Maximize2 } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';
import { useDynamicMedia } from '@/lib/useDynamicData';

const STATIC_DOCTOR_PHOTO = [
  {
    id: "doc-portrait",
    image: "/assets/doctor/image.png",
    tag: "FOUNDER & CHIEF DENTAL SURGEON",
    title: "Dr. Siulik Badajena — Founder & Chief Dental Surgeon",
  },
];

export default function MeetDoctorSection() {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const dynamicMedia = useDynamicMedia('Doctor', STATIC_DOCTOR_PHOTO);
  const currentPhoto = dynamicMedia[0] || STATIC_DOCTOR_PHOTO[0];
  const doctorImgSrc = currentPhoto.url || currentPhoto.image || '/assets/doctor/image.png';

  const doctorPhoto = [
    {
      id: "doc-portrait",
      image: doctorImgSrc,
      tag: "FOUNDER & CHIEF DENTAL SURGEON",
      title: "Dr. Siulik Badajena — Founder & Chief Dental Surgeon",
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  return (
    <section
      id="meet-doctor"
      className="py-12 sm:py-20 lg:py-24 bg-[#FAFCFC] relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28 border-t border-brand-primary/10"
      aria-labelledby="meet-doctor-kicker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header Kicker (Directly above portrait on mobile) */}
        <div className="lg:hidden mb-3">
          <span
            id="meet-doctor-kicker"
            className="text-[10px] font-sans font-bold tracking-[0.16em] text-brand-primary uppercase block"
          >
            MEET THE FOUNDER
          </span>
        </div>

        {/* ── Asymmetric Editorial Grid (Desktop: Left Dominant Portrait / Right Typography) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── Left Column: Editorial Doctor Portrait ── */}
          <div className="lg:col-span-7 xl:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              {...tapHandlers}
              className="group relative w-full sm:w-[94vw] lg:w-full mx-auto aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] overflow-hidden rounded-sm sm:rounded-md bg-brand-soft border border-brand-primary/20 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Authentic Client Doctor Photograph */}
              <img
                src={doctorImgSrc}
                alt="Dr. Siulik Badajena, Founder and Chief Dental Surgeon at Dr. Siulik's Dental Care"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-[center_12%] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              />

              {/* Minimal Editorial Fullscreen Cue */}
              <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-[10px] font-sans font-medium tracking-wider text-white/90 border border-white/15 uppercase opacity-75 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3 text-brand-aqua" />
                <span className="hidden sm:inline">VIEW FULLSCREEN</span>
              </div>
            </motion.div>

            {/* Mobile tap hint */}
            <p className="lg:hidden text-center text-[10px] font-mono text-brand-textMuted/70 uppercase tracking-widest mt-2">
              TAP PORTRAIT TO VIEW FULLSCREEN
            </p>
          </div>

          {/* ── Right Column: Editorial Typography & Content Hierarchy ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            
            {/* Desktop Category Kicker */}
            <span
              id="meet-doctor-kicker-desktop"
              className="hidden lg:block text-xs font-sans font-bold tracking-[0.16em] text-brand-primary uppercase mb-2"
            >
              MEET THE FOUNDER
            </span>

            {/* Doctor Name */}
            <h2 className="font-serif font-bold text-2xl sm:text-3xl xl:text-4xl text-brand-textDark tracking-tight mb-1">
              Dr. Siulik Badajena
            </h2>

            {/* Founder & Chief Dental Surgeon Title */}
            <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.16em] text-brand-primary uppercase mb-4 sm:mb-6">
              FOUNDER &amp; CHIEF DENTAL SURGEON
            </p>

            {/* Editorial Statement */}
            <div className="mb-4 sm:mb-5">
              <h3 className="font-serif font-bold text-xl sm:text-2xl xl:text-3xl text-brand-textDark leading-snug tracking-tight">
                Precision in care.<br />
                <span className="text-brand-deep font-normal italic">
                  Personal attention.
                </span>
              </h3>
            </div>

            {/* Short Supporting Copy (Strictly One Concise Paragraph) */}
            <p className="font-sans text-sm sm:text-base text-brand-textMuted leading-relaxed max-w-xl mb-5 font-normal">
              Evidence-based clinical practice with dedicated personal attention, continuous professional development, and an advanced focus on implant dentistry.
            </p>

            {/* Expandable Biography Trigger (Collapsed by default) */}
            <div className="mb-6">
              <button
                onClick={() => setBioExpanded((prev) => !prev)}
                aria-expanded={bioExpanded}
                aria-controls="dr-siulik-bio"
                className="group inline-flex items-center gap-2 py-1 text-xs font-sans font-bold tracking-wider text-brand-primary hover:text-brand-deep uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua rounded"
              >
                <span>{bioExpanded ? "CLOSE BIOGRAPHY" : "ABOUT DR. SIULIK"}</span>
                <ArrowRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    bioExpanded ? "rotate-90" : "group-hover:translate-x-1"
                  }`}
                />
              </button>

              {/* Collapsible Biography Content */}
              <AnimatePresence>
                {bioExpanded && (
                  <motion.div
                    id="dr-siulik-bio"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="pt-3 pb-2 text-xs sm:text-sm text-brand-textMuted font-sans leading-relaxed space-y-2.5 border-t border-brand-primary/10">
                      <p>
                        Leading the clinical team at Dr. Siulik&apos;s Dental Care, Dr. Siulik Badajena emphasizes clinical rigor paired with empathetic, unhurried patient communication.
                      </p>
                      <p>
                        Every consultation focuses on transparent diagnosis, preventative preservation of natural teeth, and precision-guided restorative solutions planned around long-term dental health.
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider">
                        <span>Clinical Practice • Bhubaneswar</span>
                        <span>Evidence-Based Dentistry</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Founder Signature Detail */}
            <div className="pt-5 mt-2 border-t border-brand-primary/15 flex items-baseline justify-between">
              <div>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1">
                  FOUNDER
                </span>
                <span className="font-serif font-bold text-base sm:text-lg text-brand-textDark tracking-tight block">
                  Dr. Siulik Badajena
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-brand-textMuted tracking-widest uppercase">
                EST. 2025
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ── Reusable Fullscreen Media Lightbox ── */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={doctorPhoto}
        currentIndex={0}
      />
    </section>
  );
}
