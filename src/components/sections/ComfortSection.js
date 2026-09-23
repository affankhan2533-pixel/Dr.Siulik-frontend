"use client";

import { motion } from 'framer-motion';

const COMFORT_POINTS = [
  {
    index: "01",
    title: "Clear Communication",
    body: "Every step explained clearly before treatment begins.",
  },
  {
    index: "02",
    title: "Calm Environment",
    body: "A quiet, serene clinical setting designed for relaxation.",
  },
  {
    index: "03",
    title: "Gentle Technique",
    body: "Refined procedural methods that minimize sensitivity.",
  },
  {
    index: "04",
    title: "Patient-Paced Visits",
    body: "Appointments scheduled with ample time so you never feel rushed.",
  },
];

export default function ComfortSection() {
  const calmEase = [0.16, 1, 0.3, 1];

  return (
    <section id="comfort" className="py-10 sm:py-24 bg-brand-soft/30 relative overflow-hidden">

      {/* Ambient lighting */}
      <div className="teal-ambient-glow top-0 left-0 opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">

          {/* Left: Heading + Short Supporting Line + Concise Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, ease: calmEase }}
            className="lg:col-span-6 flex flex-col gap-3 sm:gap-6"
          >
            {/* Section Identity */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
                PATIENT WELLNESS
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
                Your Comfort<br />
                <span className="text-brand-deep italic font-normal">Always Matters.</span>
              </h2>
            </div>

            {/* One concise supporting sentence */}
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-xl">
              A reassuring clinical experience with unhurried appointments, transparent communication, and gentle technique.
            </p>

            {/* Fine-Line Comfort Points */}
            <div className="border-t border-brand-primary/15 pt-1">
              {COMFORT_POINTS.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + idx * 0.06, ease: calmEase }}
                  className="group"
                >
                  <div className="py-2.5 sm:py-4 grid grid-cols-12 gap-2 sm:gap-4 items-start hover:bg-white/60 rounded-lg px-2 -mx-2 transition-colors duration-300 cursor-default">
                    <div className="col-span-2 sm:col-span-1">
                      <span className="font-mono text-xs font-bold text-brand-primary/60 group-hover:text-brand-primary transition-colors duration-300">
                        {point.index}
                      </span>
                    </div>
                    <div className="col-span-10 sm:col-span-11">
                      <h4 className="font-sans font-semibold text-xs sm:text-base text-brand-textDark mb-0.5 group-hover:text-brand-deep transition-colors duration-300">
                        {point.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed font-sans">
                        {point.body}
                      </p>
                    </div>
                  </div>
                  {idx < COMFORT_POINTS.length - 1 && (
                    <div className="h-px bg-brand-primary/10" />
                  )}
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Right: Clean Image Composition (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: calmEase }}
            className="hidden lg:block lg:col-span-6 relative mt-4 lg:mt-0"
          >
            {/* Main Image Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-brand-primary/20 shadow-2xl bg-brand-soft min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]">
              <img
                src="/assets/clinic/interior/image.webp"
                alt="Serene Patient Lounge at Dr. Siulik's Dental Care"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]"
              />
              {/* Soft Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-textDark/65 via-brand-textDark/15 to-transparent pointer-events-none" />

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
                <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1">
                  CLINIC ATMOSPHERE
                </span>
                <p className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  Serene, sterile, and designed around your wellbeing.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
