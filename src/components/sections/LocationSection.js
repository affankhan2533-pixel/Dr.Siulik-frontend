"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

export default function LocationSection({ onOpenBooking }) {
  return (
    <section
      id="location"
      className="pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 bg-white relative overflow-hidden select-none border-t border-brand-primary/10 scroll-mt-24"
      aria-label="Clinic Location & Visit Details"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1.5 sm:mb-2">
            CLINIC LOCATION
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-brand-textDark leading-tight tracking-tight">
            <span className="hidden sm:inline">Visit Dr. Siulik&apos;s Dental Care</span>
            <span className="sm:hidden">Visit the Clinic</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-textMuted mt-1.5 leading-relaxed font-sans max-w-lg">
            Consultation hours, clinic suite location, and contact information for your visit.
          </p>
        </motion.div>

        {/* Compact Editorial Rows: LOCATION, CONTACT, HOURS, DIRECTIONS */}
        <div className="border-t border-brand-primary/15 divide-y divide-brand-primary/15">
          
          {/* 1. LOCATION */}
          <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase">
              LOCATION
            </span>
            <div className="sm:col-span-9">
              <p className="font-sans font-semibold text-sm sm:text-base text-brand-textDark leading-snug">
                {CLINIC_INFO.address}
              </p>
              <p className="text-xs text-brand-deep font-medium mt-1 font-sans">
                Led by {CLINIC_INFO.doctorName} &mdash; {CLINIC_INFO.title}
              </p>
            </div>
          </div>

          {/* 2. CONTACT */}
          <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase">
              CONTACT
            </span>
            <div className="sm:col-span-9 space-y-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-sans">
                <a
                  href={`tel:${CLINIC_INFO.phonePrimary}`}
                  className="font-mono font-bold text-brand-textDark hover:text-brand-primary transition-colors touch-manipulation"
                >
                  {CLINIC_INFO.phonePrimary}
                </a>
                <span className="text-brand-primary/30">•</span>
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="text-brand-deep font-semibold hover:underline touch-manipulation"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
              <p className="text-[11px] text-brand-textMuted font-sans">
                Direct coordination line and WhatsApp inquiry assistance.
              </p>
            </div>
          </div>

          {/* 3. HOURS */}
          <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase">
              HOURS
            </span>
            <div className="sm:col-span-9 text-xs sm:text-sm font-sans space-y-1">
              {CLINIC_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-semibold text-brand-textDark">{wh.days}:</span>
                  <span className="font-mono text-brand-textMuted text-xs">{wh.time}</span>
                </div>
              ))}
              <p className="text-[11px] text-brand-textMuted font-sans pt-0.5">
                Consultations scheduled by appointment preference for unhurried attention.
              </p>
            </div>
          </div>

          {/* 4. DIRECTIONS */}
          <div className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase">
              DIRECTIONS
            </span>
            <div className="sm:col-span-9 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-brand-textDark font-sans leading-relaxed">
                Consultation suite located near Chandaka Police Station, Bhubaneswar.
              </p>
              {CLINIC_INFO.googleMapsUrl && (
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-brand-primary hover:text-brand-deep transition-colors shrink-0 touch-manipulation"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Closing Action CTA */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <button
            type="button"
            onClick={onOpenBooking || (() => {
              const el = document.getElementById('book-appointment');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-full bg-brand-primary hover:bg-brand-deep text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <span>Schedule Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
