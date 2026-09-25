"use client";

import { motion } from 'framer-motion';

export default function TrustSection() {
  const pillars = [
    {
      num: "01",
      title: "ADVANCE TECHNOLOGY",
      phrase: "Low-radiation radiography and high-resolution 3D intraoral imaging.",
    },
    {
      num: "02",
      title: "STRICT STERILISATION",
      phrase: "Hospital-grade multi-stage autoclave sterilization safeguarding every visit.",
    },
    {
      num: "03",
      title: "PATIENT-CENTERED CARE",
      phrase: "Clear treatment outlines, diagnostic clarity, and unhurried consultation.",
    },
    {
      num: "04",
      title: "COMFORTABLE ENVIRONMENT",
      phrase: "A calm, soothing, and anxiety-free clinical atmosphere designed for your comfort.",
    },
    {
      num: "05",
      title: "CARING PROFESSIONALS",
      phrase: "Empathetic, highly trained specialists dedicated to gentle and personalized care.",
    },
  ];

  return (
    <section className="py-6 sm:py-16 bg-white border-y border-brand-primary/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Statement Line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 sm:pb-6 border-b border-brand-primary/15 gap-1 sm:gap-4">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-brand-primary">
            CLINICAL STANDARDS
          </span>
          <p className="text-xs sm:text-sm text-brand-textMuted font-sans max-w-lg hidden sm:block">
            Evidence-based dental technology paired with dedicated personal attention.
          </p>
        </div>

        {/* Concise Principles — Clean architectural typography, fine editorial rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-brand-primary/15 pt-4 sm:pt-8 gap-y-4 sm:gap-y-6 lg:gap-y-0">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-3 sm:py-0 px-0 sm:px-4 lg:px-4 xl:px-5 first:pl-0 last:pr-0 group cursor-default"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-brand-primary/70 uppercase">
                    {item.num}
                  </span>
                  <h3 className="font-sans font-bold text-xs sm:text-sm lg:text-[13px] xl:text-sm tracking-wider text-brand-textDark uppercase group-hover:text-brand-deep transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-brand-textMuted leading-relaxed font-sans">
                  {item.phrase}
                </p>
              </div>
              <div className="hidden lg:block w-6 h-0.5 bg-brand-primary/20 group-hover:w-12 transition-all duration-300 mt-3.5" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
