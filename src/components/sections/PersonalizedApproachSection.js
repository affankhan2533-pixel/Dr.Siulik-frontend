"use client";

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: "01",
    title: "Honest & Open Discussion",
    body: "We listen to your history, concerns, and goals before recommending any treatment.",
    tag: "PATIENT INTAKE",
  },
  {
    num: "02",
    title: "Customized Treatment Plan",
    body: "Treatment is mapped to your anatomy, prioritizing natural tooth preservation.",
    tag: "CLINICAL DESIGN",
  },
  {
    num: "03",
    title: "Comfort-Centered Care",
    body: "Step-by-step transparency with treatment paced to your personal comfort.",
    tag: "PATIENT CARE",
  },
  {
    num: "04",
    title: "Long-Term Oral Wellness",
    body: "Preventive guidance and scheduled follow-ups to support lasting oral health.",
    tag: "ONGOING HEALTH",
  },
];

export default function PersonalizedApproachSection() {
  const easeEditorial = [0.16, 1, 0.3, 1];

  return (
    <section className="py-10 sm:py-24 bg-white relative overflow-hidden">
      {/* Faint background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #006C73 0px, #006C73 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(90deg, #006C73 0px, #006C73 1px, transparent 1px, transparent 80px)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="mb-10 sm:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-2 sm:mb-3">
              OUR CARE PROCESS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-brand-textDark leading-tight tracking-tight">
              A Thoughtful, Structured Approach.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Every stage of your visit is designed around clinical clarity, transparent guidance, and personal comfort.
            </p>
          </div>
        </motion.div>

        {/* Mobile: Horizontal Swipe Rail for Steps (Touch-First & Compact) */}
        <div className="md:hidden">
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 pt-1 -mx-4 px-4 touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="w-[78vw] max-w-[290px] shrink-0 snap-center rounded-2xl bg-brand-soft/40 border border-brand-primary/15 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-2xl text-brand-primary/50">
                      {step.num}
                    </span>
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase border border-brand-primary/20 px-2 py-0.5 rounded-full bg-white">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-sm text-brand-textDark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-textMuted leading-relaxed font-sans">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider mt-2 px-1">
            <span>&larr; Swipe 4 care steps &rarr;</span>
            <span>Step by Step</span>
          </div>
        </div>

        {/* Desktop: Numbered Steps — Full Width, Fine-Line Separation */}
        <div className="hidden md:block relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: easeEditorial }}
            >
              {/* Top divider */}
              <div className="h-px w-full bg-brand-primary/15" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 sm:py-8 items-start group cursor-default">

                {/* Step Number */}
                <div className="md:col-span-2 flex items-center gap-3">
                  <span className="font-mono font-bold text-3xl sm:text-4xl leading-none text-brand-primary/30 group-hover:text-brand-primary/50 transition-colors">
                    {step.num}
                  </span>
                  <span className="md:hidden text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase border border-brand-primary/25 px-2 py-0.5 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Tag Column (desktop) */}
                <div className="hidden md:flex md:col-span-2 items-start pt-1">
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase border border-brand-primary/25 px-2.5 py-1 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="font-sans font-bold text-base sm:text-lg text-brand-textDark leading-snug group-hover:text-brand-deep transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Body Copy */}
                <div className="md:col-span-4">
                  <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed font-sans max-w-sm">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom divider */}
          <div className="h-px w-full bg-brand-primary/15" />
        </div>

      </div>
    </section>
  );
}
