import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, SERVICES_DATA } from '../../data/clinicData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-brand-textDark text-white pt-12 sm:pt-20 pb-20 md:pb-12 border-t border-brand-deep/40 relative overflow-hidden">
      {/* Background Subtle Atmosphere Glow Accent */}
      <div className="teal-ambient-glow -top-40 -right-40 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Mobile Compact Footer (Prompt Item 17) ── */}
        <div className="md:hidden flex flex-col gap-5 pb-8 border-b border-white/10">
          {/* Logo & Brand Line */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-brand-aqua/30">
              <img
                src="/assets/branding/logo.svg"
                alt="Logo"
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
            onClick={onOpenBooking}
            className="w-full py-3 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-deep transition-colors"
          >
            Book an Appointment
          </button>

          {/* Essential Navigation */}
          <nav aria-label="Footer Essential Links" className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/70 pt-2 border-t border-white/8">
            <a href="#about-clinic" className="hover:text-brand-aqua transition-colors py-1">About Clinic</a>
            <a href="#services" className="hover:text-brand-aqua transition-colors py-1">Treatments</a>
            <a href="#technology" className="hover:text-brand-aqua transition-colors py-1">Technology</a>
            <a href="#before-after" className="hover:text-brand-aqua transition-colors py-1">Case Studies</a>
            <a href="#faq" className="hover:text-brand-aqua transition-colors py-1">FAQ</a>
            <a href="#location" className="hover:text-brand-aqua transition-colors py-1">Location</a>
          </nav>

          {/* Contact Details */}
          <div className="text-xs text-white/60 space-y-1 font-sans pt-1">
            <p>Email: <a href={`mailto:${CLINIC_INFO.email}`} className="text-brand-aqua hover:underline">{CLINIC_INFO.email}</a></p>
            <p>Mon &ndash; Sat: 10:00 AM &ndash; 8:00 PM &bull; Sunday by Appointment</p>
          </div>
        </div>

        {/* ── Desktop Full Mega-Footer (hidden on mobile) ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Overview */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-brand-aqua/30 shadow-inner">
                <img
                  src="/assets/branding/logo.svg"
                  alt="Dr. Siulik's Dental Care Logo"
                  width="32"
                  height="32"
                  style={{ maxWidth: '32px', maxHeight: '32px' }}
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
            <p className="text-sm text-white/70 leading-relaxed font-sans mt-2">
              Evidence-based dental care led by {CLINIC_INFO.doctorName}, Chief Dental Surgeon.
            </p>
            <div className="pt-2">
              <a
                href="#book-appointment"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-aqua hover:text-white uppercase tracking-wider transition-colors font-sans"
              >
                Plan Your Consultation <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold text-white tracking-widest uppercase">Quick Navigation</h4>
            <ul className="flex flex-col gap-1.5 text-sm text-white/70 font-sans">
              <li><a href="#about-clinic" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">About Clinic</a></li>
              <li><a href="#meet-doctor" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Meet Dr. Siulik</a></li>
              <li><a href="#services" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Treatments &amp; Services</a></li>
              <li><a href="#technology" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Modern Technology</a></li>
              <li><a href="#before-after" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Clinical Case Studies</a></li>
              <li><a href="#testimonials" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Patient Experiences</a></li>
              <li><a href="#faq" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Frequently Asked Questions</a></li>
              <li><a href="#book-appointment" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">Book Appointment</a></li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold text-white tracking-widest uppercase">Specialties</h4>
            <ul className="flex flex-col gap-1.5 text-sm text-white/70 font-sans">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="py-1 inline-block hover:text-brand-aqua transition-colors touch-manipulation">
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Direct Inquiries */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold text-white tracking-widest uppercase">Contact &amp; Hours</h4>
            <div className="flex flex-col gap-3 text-sm text-white/70 font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-aqua shrink-0 mt-1" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-aqua shrink-0" />
                <a href={`tel:${CLINIC_INFO.phonePrimary}`} className="py-1 hover:text-white transition-colors font-mono touch-manipulation">
                  {CLINIC_INFO.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-aqua text-xs font-mono font-bold">WA</span>
                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 text-brand-aqua hover:underline font-mono text-xs touch-manipulation"
                >
                  WhatsApp: +91 99386 74499
                </a>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Clock className="w-4 h-4 text-brand-aqua shrink-0 mt-1" />
                <div>
                  {CLINIC_INFO.workingHours.map((wh, idx) => (
                    <p key={idx} className="text-xs text-white/80">
                      <span className="font-semibold text-white">{wh.days}:</span> {wh.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Developer Credit in distinct typography */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4 border-t border-white/10 mt-8">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>

          {/* Distinct Developer Attribution */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-white/60 uppercase">
              Developed by
            </span>
            <a
              href="https://affan.nexcoreinstitute.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Affan Khan portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-brand-primary/30 border border-brand-aqua/40 hover:border-brand-aqua transition-all duration-300 shadow-sm group"
            >
              <span className="font-serif italic font-bold text-sm tracking-wide text-brand-aqua group-hover:text-white transition-colors">
                Affan Khan
              </span>
              <span className="text-[11px] font-mono text-brand-aqua group-hover:translate-x-0.5 transition-transform">
                ↗
              </span>
            </a>
          </div>

          <p className="text-center md:text-right font-sans text-white/50 text-[11px]">
            Clinical Precision &amp; Patient-First Dental Care.
          </p>
        </div>
      </div>
    </footer>
  );
}
