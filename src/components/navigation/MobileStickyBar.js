"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../../data/clinicData';

export default function MobileStickyBar({ onOpenBooking }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = 360;

      // Check if user is near or inside the appointment section or footer
      const appointmentEl = document.getElementById('book-appointment') || document.getElementById('appointment');
      const footerEl = document.querySelector('footer');
      let nearAppointment = false;
      let nearFooter = false;

      if (appointmentEl) {
        const rect = appointmentEl.getBoundingClientRect();
        // If appointment section is approaching or visible in viewport
        nearAppointment = rect.top < window.innerHeight + 80 && rect.bottom > -40;
      }

      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect();
        nearFooter = fRect.top < window.innerHeight + 40;
      }

      // Show only on mobile when scrolled past hero and not near appointment or footer
      setVisible(scrollY > heroThreshold && !nearAppointment && !nearFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-textDark/95 backdrop-blur-lg border-t border-brand-primary/20 px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.35)] print:hidden"
          style={{
            paddingBottom: 'max(0.625rem, calc(0.5rem + env(safe-area-inset-bottom, 0px)))'
          }}
          aria-label="Mobile Quick Actions"
        >
          <div className="max-w-md mx-auto flex items-center gap-2.5">
            {/* Direct Call Button */}
            <a
              href={`tel:${CLINIC_INFO.phonePrimary}`}
              className="flex items-center justify-center gap-1.5 px-4 min-h-[44px] rounded-full border border-white/20 text-white text-xs font-semibold tracking-wide hover:bg-white/10 active:scale-[0.97] transition-all shrink-0"
              aria-label={`Call clinic at ${CLINIC_INFO.phonePrimary}`}
            >
              <Phone className="w-3.5 h-3.5 text-brand-aqua shrink-0" aria-hidden="true" />
              <span>Call</span>
            </a>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="flex-1 flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-full bg-gradient-to-r from-brand-deep via-brand-primary to-brand-aqua text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
              aria-label="Book a dental consultation"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Book Appointment</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
