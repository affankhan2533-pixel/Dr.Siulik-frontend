"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';

// ─── Google "G" logo SVG ──────────────────────────────────────────────────────
function GoogleLogo({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
      <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
      <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
      <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
    </svg>
  );
}

// ─── Star rating row ──────────────────────────────────────────────────────────
function StarRow({ count = 5 }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-white/15'}`} />
      ))}
    </span>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function GoogleReviewsSection() {
  const easeEditorial = [0.16, 1, 0.3, 1];

  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="teal-ambient-glow top-0 left-0 opacity-25 pointer-events-none" />

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
              GOOGLE REVIEWS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Patient experiences,<br />
              <span className="text-brand-deep italic font-normal">in their own words.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Direct patient feedback sourced from our verified Google Business Profile.
            </p>
          </div>
        </motion.div>

        {/* Compact Confirmed Status Card (Prompt Item 11) */}
        <div className="rounded-2xl border border-brand-primary/20 overflow-hidden shadow-soft bg-brand-soft/40 p-4 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 border border-brand-primary/15 shadow-sm">
              <GoogleLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-sans font-bold text-base sm:text-lg text-brand-textDark leading-tight">Google Reviews</h3>
                <span className="text-[9px] font-mono font-bold tracking-wider text-amber-800 uppercase bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                  Awaiting confirmed source
                </span>
              </div>
              <p className="text-xs sm:text-sm text-brand-textMuted font-sans mt-0.5">
                Verified patient reviews will display automatically upon Google Business Profile confirmation.
              </p>
            </div>
          </div>

          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-brand-deep bg-white border border-brand-primary/25 hover:border-brand-primary hover:bg-brand-soft transition-all duration-300 shadow-soft touch-manipulation w-full sm:w-auto shrink-0"
          >
            <span>View Clinic on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
          </a>
        </div>

      </div>
    </section>
  );
}
