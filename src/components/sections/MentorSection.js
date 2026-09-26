"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';
import { useDynamicMedia } from '@/lib/useDynamicData';

const STATIC_MENTOR_PHOTO = [
  {
    id: "mentor-portrait",
    image: "/assets/mentor/image.png",
    tag: "MENTOR & INSPIRATION",
    title: "My Mentor & Inspiration",
  },
];

export default function MentorSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const dynamicMedia = useDynamicMedia('Mentor', STATIC_MENTOR_PHOTO);
  const currentPhoto = dynamicMedia[0] || STATIC_MENTOR_PHOTO[0];
  const mentorImgSrc = currentPhoto.url || currentPhoto.image || '/assets/mentor/image.png';

  const mentorPhoto = [
    {
      id: "mentor-portrait",
      image: mentorImgSrc,
      tag: "MENTOR & INSPIRATION",
      title: "My Mentor & Inspiration",
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  return (
    <section
      id="mentor"
      className="py-7 sm:py-9 lg:py-11 bg-white relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28 border-t border-brand-primary/10"
      aria-labelledby="mentor-kicker"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-9 items-center">

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1.0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              {...tapHandlers}
              className="group relative w-full max-w-[260px] mx-auto aspect-[4/5] overflow-hidden rounded-[14px] bg-brand-soft border border-brand-primary/15 shadow-[0_10px_30px_rgba(9,24,30,0.08)] hover:shadow-[0_16px_40px_rgba(9,24,30,0.12)] transition-all duration-500 cursor-pointer"
            >
              <img
                src={mentorImgSrc}
                alt="Mentor and guiding influence of Dr. Siulik Badajena at Dr. Siulik's Dental Care"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_16%] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />

              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md text-[9px] font-sans font-medium tracking-wider text-white/90 border border-white/15 uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3 text-brand-aqua" />
                <span className="hidden sm:inline">View</span>
              </div>
            </motion.div>

            <p className="lg:hidden text-center text-[10px] font-mono text-brand-textMuted/70 uppercase tracking-widest mt-2">
              Tap to enlarge
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <span
              id="mentor-kicker"
              className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.18em] text-brand-primary uppercase mb-1.5"
            >
              Mentor &amp; Inspiration
            </span>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-brand-textDark tracking-tight mb-2">
              My Mentor &amp; Inspiration
            </h2>

            <p className="font-serif italic text-sm sm:text-base text-brand-deep leading-snug tracking-tight mb-3">
              A guiding influence in my journey as a dentist.
            </p>

            <div className="relative pl-3 sm:pl-4 border-l-2 border-brand-primary/25 py-0.5 mb-4">
              <p className="font-sans text-xs sm:text-sm text-brand-textMuted leading-relaxed font-normal max-w-xl">
                &ldquo;Behind every professional journey are people who guide, inspire, and shape the path. I am deeply grateful to my mentor for his invaluable guidance, encouragement, and knowledge, which have played an important role in shaping my approach to dentistry and patient care.&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-brand-primary/10 flex items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1">
                  Foundation of Practice
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-brand-textDark tracking-tight block">
                  Clinical Guidance &bull; Ethical Dentistry
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px] text-brand-textMuted tracking-widest uppercase">
                Est. 2025
              </span>
            </div>
          </div>

        </div>

      </div>

      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={mentorPhoto}
        currentIndex={0}
      />
    </section>
  );
}
