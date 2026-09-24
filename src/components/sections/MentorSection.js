"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

/**
 * Editorial Mentor & Inspiration Section — Dr. Siulik's Dental Care
 * 
 * - Placed naturally between 'Meet Dr. Siulik' and 'Services'.
 * - Authentic client photograph: /assets/mentor/image.png
 * - Quietly emotional, human, premium editorial composition.
 * - Mobile: Prominent portrait (88-94vw) -> Eyebrow -> Heading -> Supporting Line -> Paragraph.
 * - Desktop: Asymmetric editorial composition (Left dominant portrait / Right reflective typography).
 * - Fullscreen MediaLightbox on tap/click.
 */
export default function MentorSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const mentorPhoto = [
    {
      id: "mentor-portrait",
      image: "/assets/mentor/image.png",
      tag: "MENTOR & INSPIRATION",
      title: "My Mentor & Inspiration",
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  return (
    <section
      id="mentor"
      className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28 border-t border-brand-primary/10"
      aria-labelledby="mentor-kicker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile Header Kicker (Above portrait on small screens) */}
        <div className="lg:hidden mb-3">
          <span
            id="mentor-kicker"
            className="text-[10px] font-sans font-bold tracking-[0.16em] text-brand-primary uppercase block"
          >
            MENTOR &amp; INSPIRATION
          </span>
        </div>

        {/* ── Asymmetric Editorial Grid (Desktop: Left Portrait / Right Reflective Typography) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-16 items-center">
          
          {/* ── Left Column: Editorial Mentor Portrait ── */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              {...tapHandlers}
              className="group relative w-full sm:w-[92vw] lg:w-full mx-auto aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] overflow-hidden rounded-sm sm:rounded-md bg-brand-soft border border-brand-primary/20 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Authentic Client Mentor Photograph */}
              <img
                src="/assets/mentor/image.png"
                alt="Mentor and guiding influence of Dr. Siulik Badajena at Dr. Siulik's Dental Care"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_16%] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
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

          {/* ── Right Column: Editorial Typography & Quiet Emotional Hierarchy ── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Desktop Category Kicker */}
            <span
              id="mentor-kicker-desktop"
              className="hidden lg:block text-xs font-sans font-bold tracking-[0.16em] text-brand-primary uppercase mb-2"
            >
              MENTOR &amp; INSPIRATION
            </span>

            {/* Main Headline */}
            <h2 className="font-serif font-bold text-2xl sm:text-3xl xl:text-4xl text-brand-textDark tracking-tight mb-2">
              My Mentor &amp; Inspiration
            </h2>

            {/* Supporting Line */}
            <p className="font-serif italic text-base sm:text-lg xl:text-xl text-brand-deep leading-snug tracking-tight mb-5 sm:mb-6">
              A guiding influence in my journey as a dentist.
            </p>

            {/* Short Editorial Paragraph — Client Provided Authentic Wording */}
            <div className="relative pl-5 sm:pl-6 border-l-2 border-brand-primary/30 py-1 mb-6">
              <p className="font-sans text-sm sm:text-base text-brand-textMuted leading-relaxed font-normal">
                &ldquo;Behind every professional journey are people who guide, inspire, and shape the path. I am deeply grateful to my mentor for his invaluable guidance, encouragement, and knowledge, which have played an important role in shaping my approach to dentistry and patient care.&rdquo;
              </p>
            </div>

            {/* Subtle Reflective Foundation Note */}
            <div className="pt-5 mt-2 border-t border-brand-primary/15 flex items-baseline justify-between">
              <div>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1">
                  FOUNDATION OF PRACTICE
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-brand-textDark tracking-tight block">
                  Clinical Guidance &bull; Ethical Dentistry
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
        items={mentorPhoto}
        currentIndex={0}
      />
    </section>
  );
}
