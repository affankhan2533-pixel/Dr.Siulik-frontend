"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHILOSOPHY_VALUES = [
  {
    num: "01",
    title: "ADVANCE TECHNOLOGY",
    statement: "Evidence-based digital diagnostics and precision clinical technique.",
    detail: "Low-dose digital radiography, intraoral imaging, and advanced instruments for predictable, high-precision oral wellness.",
  },
  {
    num: "02",
    title: "STRICT STERILISATION",
    statement: "Hospital-grade multi-stage autoclave sterilization safeguarding every visit.",
    detail: "Class B autoclave sterilization, disposable consumables, and rigorous chemical disinfection for absolute patient safety.",
  },
  {
    num: "03",
    title: "PATIENT-CENTERED CARE",
    statement: "Care mapped to your unique anatomy, with treatment paced to your goals.",
    detail: "Comprehensive consultation listening to your history, prioritizing natural tooth preservation with transparent clinical guidance.",
  },
  {
    num: "04",
    title: "COMFORTABLE ENVIRONMENT",
    statement: "A calm, soothing, and anxiety-free clinic setting designed for your peace of mind.",
    detail: "Gentle procedural technique, step-by-step clarity before treatment begins, and quiet operatory suites tailored to ease anxiety.",
  },
  {
    num: "05",
    title: "CARING PROFESSIONALS",
    statement: "Dedicated dental specialists committed to empathetic, gentle patient care.",
    detail: "Warm, experienced dental professionals dedicated to continuing education, ethical practice, and personalized clinical attention.",
  },
];

export default function WhyChooseUsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const toggleExpand = (idx) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="care-philosophy"
      className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden select-none border-t border-brand-primary/10 scroll-mt-24"
      aria-labelledby="philosophy-title"
    >
      {/* Subtle Architectural Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #006C73 0px, #006C73 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(90deg, #006C73 0px, #006C73 1px, transparent 1px, transparent 64px)`
        }}
      />

      {/* Large Subtle Watermark Accent: Architectural Numeral */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none select-none font-serif text-[180px] sm:text-[240px] font-bold text-brand-primary/[0.03] leading-none z-0">
        05
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetric Editorial Composition (Left Headline / Right Values) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Left: Headline & Brand Statement */}
          <div className="lg:col-span-5">
            <span
              id="philosophy-kicker"
              className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-2 sm:mb-3"
            >
              THE DIFFERENCE
            </span>

            <h2
              id="philosophy-title"
              className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark tracking-tight leading-tight"
            >
              Thoughtful care.<br />
              <span className="text-brand-deep italic font-normal">Built around you.</span>
            </h2>

            <p className="text-xs sm:text-sm text-brand-textMuted font-sans max-w-sm leading-relaxed mt-3 sm:mt-5">
              Core clinical principles guiding patient care at Dr. Siulik&apos;s Dental Care.
            </p>

            {/* Architectural Rule Accent */}
            <div className="w-16 h-0.5 bg-brand-primary/25 mt-6 hidden lg:block" />
          </div>

          {/* Right: Three Numbered Editorial Values */}
          <div
            className="lg:col-span-7 flex flex-col border-t border-brand-primary/15 divide-y divide-brand-primary/15"
            role="region"
            aria-label="Core Care Values"
          >
            {PHILOSOPHY_VALUES.map((item, idx) => {
              const isExpanded = activeIdx === idx;
              return (
                <div
                  key={item.num}
                  className={`transition-all duration-300 ${
                    isExpanded ? 'bg-brand-soft/25' : 'hover:bg-brand-soft/10'
                  }`}
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className={`w-full py-5 sm:py-6 text-left transition-all duration-300 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary flex flex-col gap-1.5 ${
                      isExpanded
                        ? 'pl-4 border-l-2 border-brand-primary'
                        : 'pl-2 border-l-2 border-transparent hover:pl-3'
                    }`}
                    aria-expanded={isExpanded}
                    aria-controls={`philosophy-content-${item.num}`}
                  >
                    {/* Header Row: Number + Title + Action Hint */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold tracking-widest transition-colors duration-200 ${
                            isExpanded ? 'text-brand-primary' : 'text-brand-primary/60 group-hover:text-brand-primary'
                          }`}
                        >
                          {item.num}
                        </span>
                        <h3
                          className={`font-mono text-xs sm:text-sm font-bold tracking-[0.16em] uppercase transition-colors duration-200 ${
                            isExpanded ? 'text-brand-textDark' : 'text-brand-textDark/80 group-hover:text-brand-deep'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <span
                        className={`font-mono text-xs transition-transform duration-300 ${
                          isExpanded ? 'text-brand-primary rotate-45' : 'text-brand-textMuted group-hover:text-brand-primary'
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </div>

                    {/* Primary Statement: One short sentence visible */}
                    <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed font-sans mt-0.5">
                      {item.statement}
                    </p>

                    {/* Secondary Detail: Expandable on tap/click */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={`philosophy-content-${item.num}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-brand-deep/80 leading-relaxed font-sans pt-2 border-t border-brand-primary/10 mt-1">
                            {item.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
