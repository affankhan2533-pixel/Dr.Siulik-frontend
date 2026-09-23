"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { SERVICES_DATA } from '@/data/clinicData';

export default function ServicesSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];
  const easeEditorial = [0.16, 1, 0.3, 1];

  return (
    <section id="services" className="py-12 sm:py-20 lg:py-24 bg-brand-textDark relative overflow-hidden">

      {/* Ambient teal glow */}
      <div className="teal-ambient-glow -top-20 left-1/3 opacity-10 pointer-events-none" />
      <div className="teal-ambient-glow bottom-0 right-0 opacity-10 pointer-events-none" />

      {/* Fine horizontal rule across the full width */}
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-aqua/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="mb-8 sm:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-2 sm:mb-3">
              COMPREHENSIVE SPECIALTIES
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Dental Services<br />
              <span className="text-brand-aqua italic font-normal">&amp; Treatments.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans max-w-md">
              Evidence-based care across seven core disciplines, tailored to your oral health and comfort.
            </p>
          </div>
        </motion.div>

        {/* Two-Column Layout: Left = Vertical/Horizontal Nav, Right = Service Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">

          {/* Left: Service Navigation */}
          <div className="lg:col-span-4">
            
            {/* Mobile: Touch-Friendly Horizontal Scroll Pills with Smooth Momentum */}
            <div
              className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-4 px-4 no-scrollbar mb-3 snap-x touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {SERVICES_DATA.map((service) => {
                const isActive = service.id === activeTab;
                const shortNames = {
                  preventive: 'PREVENTIVE',
                  restorative: 'RESTORATIVE',
                  surgical: 'SURGICAL',
                  cosmetic: 'COSMETIC',
                  orthodontics: 'ORTHODONTICS',
                  implants: 'IMPLANT',
                  child: 'CHILD'
                };
                const displayLabel = shortNames[service.id] || service.title;
                return (
                  <button
                    key={service.id}
                    onClick={(e) => {
                      setActiveTab(service.id);
                      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }}
                    className={`px-3.5 py-2 min-h-[38px] rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 border touch-manipulation snap-start shrink-0 focus:outline-none ${
                      isActive
                        ? 'bg-brand-primary text-white border-brand-primary shadow-teal-glow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-aqua/40 hover:text-white'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>

            {/* Desktop: Vertical fine-line list with responsive hover states */}
            <div className="hidden lg:block border border-brand-aqua/15 rounded-2xl overflow-hidden bg-brand-textDark/80">
              {SERVICES_DATA.map((service, idx) => {
                const isActive = service.id === activeTab;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`w-full text-left px-5 py-4 flex items-center justify-between group transition-all duration-300 border-b border-brand-aqua/10 last:border-b-0 focus:outline-none focus:bg-white/10 ${
                      isActive
                        ? 'bg-brand-primary/20 border-l-[3px] border-l-brand-aqua'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`text-[10px] font-mono font-bold transition-all duration-300 ${
                        isActive ? 'text-brand-aqua translate-x-0.5' : 'text-white/30 group-hover:text-white/60 group-hover:translate-x-1'
                      }`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-sans font-medium text-sm transition-colors ${
                        isActive ? 'text-white font-semibold' : 'text-white/65 group-hover:text-white/90'
                      }`}>
                        {service.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-all duration-300 ${
                      isActive ? 'text-brand-aqua opacity-100 translate-x-1' : 'text-white/20 group-hover:text-white/60 group-hover:translate-x-1'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Editorial Service Detail Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
                className="h-full"
              >
                {/* Service Main Panel */}
                <div className="rounded-2xl border border-brand-aqua/15 overflow-hidden">

                  {/* Top Band: Service Identity */}
                  <div
                    className="p-4 sm:p-8 border-b border-brand-aqua/10"
                    style={{ background: 'rgba(8, 47, 53, 0.95)' }}
                  >
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1 sm:mb-2">
                      {activeService.tagline}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2 sm:mb-3">
                      <h3 className="font-serif font-bold text-xl sm:text-3xl text-white leading-tight">
                        {activeService.title}
                      </h3>
                      <button
                        onClick={onOpenBooking}
                        className="self-start sm:self-auto px-4 py-2 rounded-full bg-brand-primary hover:bg-brand-deep text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book Consultation
                      </button>
                    </div>
                    <p className="text-xs sm:text-base text-white/70 leading-relaxed font-sans max-w-xl">
                      {activeService.description}
                    </p>
                  </div>

                  {/* Bottom Band: Treatments Grid */}
                  <div className="p-3.5 sm:p-6" style={{ background: 'rgba(8, 47, 53, 0.6)' }}>
                    <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/45 uppercase mb-2.5 sm:mb-4">
                      INCLUDED PROCEDURES &amp; CARE
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-px sm:bg-brand-aqua/10 sm:rounded-xl overflow-hidden sm:border sm:border-brand-aqua/10">
                      {activeService.treatments.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 sm:p-4 rounded-lg sm:rounded-none group hover:bg-brand-primary/10 transition-colors duration-200 border border-brand-aqua/10 sm:border-none"
                          style={{ background: 'rgba(8, 47, 53, 0.88)' }}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-aqua mt-1.5 shrink-0" />
                            <div>
                              <h5 className="font-sans font-semibold text-xs sm:text-sm text-white">{item.name}</h5>
                              <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-sans mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
