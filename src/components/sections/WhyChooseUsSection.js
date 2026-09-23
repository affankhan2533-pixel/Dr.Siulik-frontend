"use client";

import { motion } from 'framer-motion';

const PILLARS = [
  {
    label: "PERSONALISED TREATMENT",
    body: "Care plans customized to your oral anatomy and personal goals.",
  },
  {
    label: "MODERN DENTISTRY",
    body: "Digital diagnostics, low-dose imaging, and precision instrumentation.",
  },
  {
    label: "HONEST COMMUNICATION",
    body: "Transparent explanations of all procedure options, timelines, and costs.",
  },
  {
    label: "COMFORT-FIRST APPROACH",
    body: "A calm, unhurried pace designed to make every visit reassuring.",
  },
  {
    label: "COMPREHENSIVE CARE",
    body: "From preventive hygiene to advanced implant care under one roof.",
  },
];

export default function WhyChooseUsSection() {
  const easeEditorial = [0.16, 1, 0.3, 1];

  return (
    <section className="py-10 sm:py-24 bg-white relative overflow-hidden">

      {/* Faint ambient glow */}
      <div className="teal-ambient-glow -top-10 -right-20 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-end mb-6 sm:mb-14">

          {/* Left: Large Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: easeEditorial }}
            className="lg:col-span-6"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
              THE CLINIC DIFFERENCE
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-5xl lg:text-6xl text-brand-textDark leading-tight tracking-tight">
              Why Choose<br />
              <span className="text-brand-deep italic font-normal">Dr. Siulik.</span>
            </h2>
          </motion.div>

          {/* Right: One concise supporting sentence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeEditorial }}
            className="lg:col-span-6"
          >
            <p className="text-xs sm:text-lg text-brand-textMuted leading-relaxed font-sans max-w-lg">
              Care grounded in clinical excellence, clear communication, and dedicated personal attention for every patient.
            </p>
          </motion.div>
        </div>

        {/* Mobile: Compact Brand-Value Narrative (Item 6) */}
        <div className="md:hidden border-t border-brand-primary/15 pt-3">
          <div className="flex flex-col gap-2.5">
            {[
              { title: "PERSONALIZED", phrase: "Care plans customized to your unique oral anatomy and individual smile goals." },
              { title: "PRECISE", phrase: "Evidence-based diagnostics, low-dose imaging, and micro-precision clinical technique." },
              { title: "COMFORT-LED", phrase: "A calm, unhurried pace designed to make every visit reassuring." },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-brand-soft/40 border border-brand-primary/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span className="font-mono text-xs font-bold tracking-wider text-brand-textDark uppercase">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-brand-textMuted leading-relaxed font-sans pl-3.5">
                  {item.phrase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Five Pillars — Fine-Line Horizontal List */}
        <div className="hidden md:block relative border-t border-brand-primary/15">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: easeEditorial }}
              className="group"
            >
              <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 items-start cursor-default hover:bg-brand-soft/40 transition-colors duration-300 px-3 -mx-3 rounded-xl">

                {/* Index Number */}
                <div className="md:col-span-1 flex items-center">
                  <span className="font-mono text-sm sm:text-base font-bold text-brand-primary/40 group-hover:text-brand-primary transition-colors duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Label */}
                <div className="md:col-span-4">
                  <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-brand-textDark group-hover:text-brand-deep transition-colors duration-300 uppercase">
                    {pillar.label}
                  </span>
                </div>

                {/* Body */}
                <div className="md:col-span-7">
                  <p className="text-sm sm:text-base text-brand-textMuted leading-relaxed font-sans">
                    {pillar.body}
                  </p>
                </div>
              </div>

              {/* Progressive fine separator line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: easeEditorial }}
                className="h-px bg-brand-primary/15 origin-left group-last:hidden"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
