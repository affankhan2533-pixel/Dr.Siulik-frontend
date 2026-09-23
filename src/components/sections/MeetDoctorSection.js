"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';
import MediaLightbox from '../ui/MediaLightbox';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

export default function MeetDoctorSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const doctorPhoto = [
    {
      id: "doc-1",
      image: "/assets/doctor/image.webp",
      tag: "CHIEF DENTAL SURGEON",
      title: `${CLINIC_INFO.doctorName} — ${CLINIC_INFO.title}`,
    },
  ];

  const tapHandlers = useTapVsSwipe(() => setLightboxOpen(true));

  return (
    <section id="meet-doctor" className="py-10 sm:py-24 bg-brand-soft/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
          
          {/* Left Column: Portrait Reveal */}
          <div className="w-full max-w-full min-w-0 lg:col-span-6 relative">
            <div
              {...tapHandlers}
              className="relative w-full max-w-full rounded-3xl overflow-hidden border border-brand-primary/20 shadow-xl bg-white cursor-pointer group"
            >
              <img
                src="/assets/doctor/image.webp"
                alt={`${CLINIC_INFO.doctorName} - ${CLINIC_INFO.title}`}
                loading="eager"
                decoding="async"
                className="w-full max-w-full h-[380px] sm:h-[500px] lg:h-[520px] object-cover object-top group-hover:scale-[1.015] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/85 via-transparent to-transparent pointer-events-none" />
              
              {/* Expand Hint */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white flex items-end justify-between pointer-events-none">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">{CLINIC_INFO.doctorName}</h3>
                  <p className="text-xs font-semibold text-brand-aqua tracking-widest uppercase mt-0.5">{CLINIC_INFO.title}</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-brand-deep text-white border border-brand-aqua/30">
                  CLINICAL LEAD
                </span>
              </div>
            </div>
            <div className="flex sm:hidden justify-end mt-1.5 px-1">
              <span className="text-[10px] font-mono text-brand-primary uppercase tracking-wider">Tap image to enlarge</span>
            </div>
          </div>

          {/* Right Column: Independent Editorial Text Reveal */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-6">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-brand-deep block mb-1.5 sm:mb-3">
                CHIEF DENTAL SURGEON
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-brand-textDark leading-tight">
                Precision in care.<br />Personal attention.
              </h2>
            </div>

            <p className="text-sm sm:text-lg text-brand-textDark/85 leading-relaxed font-sans max-w-xl font-normal">
              Dr. Siulik Bandyopadhyay provides comprehensive dental care with an emphasis on clinical precision, gentle technique, and advanced restorative and implant dentistry.
            </p>

            {/* Fine Line Credential & Role Callout */}
            <div className="pt-4 border-t border-brand-primary/20 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-deep block">CLINICAL FOCUS</span>
                <span className="font-sans font-semibold text-xs sm:text-base text-brand-textDark mt-0.5 block">General &amp; Advanced Implant Dentistry</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-deep block">PATIENT PHILOSOPHY</span>
                <span className="font-sans font-semibold text-xs sm:text-base text-brand-textDark mt-0.5 block">Comfort, Precision &amp; Transparency</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Doctor Portrait Lightbox */}
      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={doctorPhoto}
        currentIndex={0}
      />
    </section>
  );
}
