"use client";

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation, Compass, Shield } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { CLINIC_INFO } from '../../data/clinicData';

export default function LocationSection({ onOpenBooking }) {
  return (
    <section id="location" className="py-10 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-brand-primary/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-6 sm:mb-12"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
            CLINIC LOCATION &amp; VISIT
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-brand-textDark leading-tight tracking-tight">
            Visiting Dr. Siulik&apos;s Dental Care
          </h2>
          <p className="text-xs sm:text-base text-brand-textMuted mt-1.5 sm:mt-2.5 leading-relaxed font-sans max-w-xl">
            Consultation hours, clinic suite details, and contact information for your visit.
          </p>
        </motion.div>

        {/* Minimal Editorial Rows (Item 16: CLINIC, CONTACT, HOURS, DIRECTIONS) */}
        <div className="border-t border-brand-primary/15 divide-y divide-brand-primary/10 bg-brand-soft/20 rounded-2xl sm:rounded-3xl border p-4 sm:p-8">
          
          {/* 1. CLINIC */}
          <div className="py-3.5 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              CLINIC
            </span>
            <div className="sm:col-span-9">
              <h3 className="font-sans font-bold text-base sm:text-lg text-brand-textDark">
                {CLINIC_INFO.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-deep font-medium mt-0.5 font-sans">
                Led by {CLINIC_INFO.doctorName} &mdash; {CLINIC_INFO.title}
              </p>
            </div>
          </div>

          {/* 2. CONTACT */}
          <div className="py-3.5 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              CONTACT
            </span>
            <div className="sm:col-span-9 space-y-1">
              <p className="text-xs sm:text-sm text-brand-textDark font-sans">
                Email: <a href={`mailto:${CLINIC_INFO.email}`} className="text-brand-deep font-semibold hover:underline">{CLINIC_INFO.email}</a>
              </p>
              <p className="text-xs text-brand-textMuted font-sans">
                Direct coordination line shared upon appointment confirmation. Please submit consultation preferences via the booking form.
              </p>
            </div>
          </div>

          {/* 3. HOURS */}
          <div className="py-3.5 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              HOURS
            </span>
            <div className="sm:col-span-9 space-y-1 text-xs sm:text-sm text-brand-textDark font-sans">
              {CLINIC_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-semibold text-brand-textDark min-w-[130px]">{wh.days}:</span>
                  <span className="text-brand-textMuted">{wh.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. DIRECTIONS */}
          <div className="py-3.5 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 items-baseline">
            <span className="sm:col-span-3 text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              DIRECTIONS
            </span>
            <div className="sm:col-span-9 space-y-1.5">
              <p className="text-xs sm:text-sm text-brand-textDark font-sans leading-relaxed">
                Consultation suite location &amp; precise map directions provided upon appointment confirmation.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-brand-deep font-medium pt-1">
                <span>&bull; Wheelchair Accessible</span>
                <span>&bull; Patient Parking Available</span>
                <span>&bull; Air-Conditioned Suite</span>
              </div>
            </div>
          </div>

        </div>

        {/* Single Clean Action CTA */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Button href="#book-appointment" variant="primary" size="md" className="w-full sm:w-auto px-8 justify-center">
            Schedule Your Consultation
          </Button>
        </div>

      </div>
    </section>
  );
}
