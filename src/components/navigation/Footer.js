"use client";

import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

export default function Footer({ onOpenBooking }) {
  const instagramUrl = "https://www.instagram.com/drsiuliksdentalcare?stkn=aTl6a3N0aWxpeDBm&utm_source=qr";
  const youtubeUrl = "https://youtube.com/@drsiuliksdentalcare?si=DVFzYLlcGZjMDvsl";

  return (
    <footer className="bg-brand-textDark text-white pt-12 sm:pt-16 pb-16 md:pb-12 border-t border-brand-deep/40 relative overflow-hidden select-none">
      {/* Subtle Atmosphere Glow Accent */}
      <div className="teal-ambient-glow -top-32 -right-32 opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Mobile Compact Section ── */}
        <div className="md:hidden flex flex-col gap-5 pb-8 border-b border-white/10">
          {/* Logo & Brand Line */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-brand-aqua/30">
              <img
                src="/assets/branding/logo.svg"
                alt="Dr. Siulik's Dental Care Logo"
                width="28"
                height="28"
                className="w-7 h-7 object-contain shrink-0"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-base text-white tracking-wide">
                DR. SIULIK&apos;S
              </span>
              <span className="font-sans font-semibold text-[9px] tracking-widest text-brand-aqua uppercase mt-0.5">
                DENTAL CARE
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 leading-relaxed font-sans">
            Evidence-based dental care led by {CLINIC_INFO.doctorName}, Chief Dental Surgeon.
          </p>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpenBooking || (() => {
              const el = document.getElementById('book-appointment');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="w-full py-3 min-h-[48px] rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-deep transition-colors touch-manipulation"
          >
            Book an Appointment
          </button>

          {/* Essential Navigation (Single clean wrap, not repeated) */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70 pt-2 border-t border-white/8">
            <a href="#about-clinic" className="hover:text-brand-aqua transition-colors py-1">About Clinic</a>
            <a href="#services" className="hover:text-brand-aqua transition-colors py-1">Treatments</a>
            <a href="#technology" className="hover:text-brand-aqua transition-colors py-1">Technology</a>
            <a href="#before-after" className="hover:text-brand-aqua transition-colors py-1">Case Studies</a>
            <a href="#testimonials" className="hover:text-brand-aqua transition-colors py-1">Stories</a>
            <a href="#faq" className="hover:text-brand-aqua transition-colors py-1">FAQ</a>
            <a href="#location" className="hover:text-brand-aqua transition-colors py-1">Location</a>
          </nav>

          {/* Contact Details */}
          <div className="text-xs text-white/60 space-y-1 font-sans pt-1">
            <p>
              Phone:{' '}
              <a href={`tel:${CLINIC_INFO.phonePrimary}`} className="text-white hover:text-brand-aqua font-mono font-bold">
                {CLINIC_INFO.phonePrimary}
              </a>
            </p>
            <p>
              Email:{' '}
              <a href={`mailto:${CLINIC_INFO.email}`} className="text-brand-aqua hover:underline">
                {CLINIC_INFO.email}
              </a>
            </p>
            <p className="text-[11px] text-white/50 pt-0.5">
              Mon &ndash; Sun: 09:00 AM &ndash; 01:00 PM &bull; 04:00 PM &ndash; 08:30 PM
            </p>
          </div>
        </div>

        {/* ── Desktop 3-Column Editorial Layout (hidden on mobile) ── */}
        <div className="hidden md:grid grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-brand-aqua/30 shadow-inner">
                <img
                  src="/assets/branding/logo.svg"
                  alt="Dr. Siulik's Dental Care Logo"
                  width="32"
                  height="32"
                  className="w-8 h-8 object-contain shrink-0"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight text-white tracking-wide">
                  DR. SIULIK&apos;S
                </span>
                <span className="font-sans font-semibold text-xs tracking-widest text-brand-aqua uppercase">
                  DENTAL CARE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans max-w-sm">
              Evidence-based dental care led by {CLINIC_INFO.doctorName}, Chief Dental Surgeon.
            </p>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenBooking || (() => {
                  const el = document.getElementById('book-appointment');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                })}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-aqua hover:text-white uppercase tracking-wider transition-colors font-sans touch-manipulation"
              >
                <span>Plan Your Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Essential Navigation (3 cols) */}
          <div className="col-span-3 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-brand-aqua uppercase block">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2 text-xs text-white/70 font-sans">
              <li><a href="#about-clinic" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">About Clinic</a></li>
              <li><a href="#meet-doctor" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Meet the Founder</a></li>
              <li><a href="#services" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Treatments &amp; Disciplines</a></li>
              <li><a href="#technology" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Modern Technology</a></li>
              <li><a href="#before-after" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Clinical Results</a></li>
              <li><a href="#testimonials" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Patient Stories</a></li>
              <li><a href="#faq" className="hover:text-brand-aqua transition-colors py-0.5 inline-block">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours (4 cols) */}
          <div className="col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-brand-aqua uppercase block">
              CONTACT &amp; HOURS
            </span>
            <div className="flex flex-col gap-2 text-xs text-white/70 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-brand-aqua shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-brand-aqua shrink-0" />
                <a href={`tel:${CLINIC_INFO.phonePrimary}`} className="font-mono font-bold text-white hover:text-brand-aqua transition-colors">
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-brand-aqua shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="text-white hover:text-brand-aqua transition-colors">
                  {CLINIC_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-brand-aqua shrink-0 mt-0.5" />
                <div>
                  {CLINIC_INFO.workingHours.map((wh, idx) => (
                    <p key={idx} className="text-[11px] text-white/80">
                      <span className="font-semibold text-white">{wh.days}:</span> {wh.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Founder Signature & Social Presence Bar ── */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Subtle Closing Founder Signature */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-mono text-[10px] tracking-[0.16em] text-brand-aqua/80 uppercase">
              FOUNDER &amp; CHIEF DENTAL SURGEON
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="font-serif font-bold text-sm tracking-wide text-white">
              Dr. Siulik Bandyopadhyay
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="font-mono text-[10px] tracking-widest text-white/50">
              EST. 2025
            </span>
          </div>

          {/* Compact Secondary Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-white/40 uppercase tracking-wider text-[10px]">CONNECT:</span>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — Dr. Siulik's Dental Care"
              className="text-brand-aqua hover:text-white transition-colors"
            >
              Instagram ↗
            </a>
            <span className="text-white/20">•</span>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube — Dr. Siulik's Dental Care"
              className="text-brand-aqua hover:text-white transition-colors"
            >
              YouTube ↗
            </a>
          </div>
        </div>

        {/* ── Sub-Footer Bar: Copyright & Brand Line ── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50 border-t border-white/5 mt-6">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>

          <p className="text-center sm:text-right font-mono text-[10px] tracking-widest text-white/40 uppercase">
            CLINICAL PRECISION. PATIENT-FIRST CARE.
          </p>
        </div>

      </div>
    </footer>
  );
}
