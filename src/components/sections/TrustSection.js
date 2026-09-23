"use client";

import { motion } from 'framer-motion';

export default function TrustSection() {
  const pillars = [
    {
      num: "01",
      title: "PERSONALIZED",
      phrase: "Mapped specifically to your oral health and individual goals.",
    },
    {
      num: "02",
      title: "PRECISE",
      phrase: "Evidence-based digital diagnostics and clinical accuracy.",
    },
    {
      num: "03",
      title: "COMFORT-LED",
      phrase: "A calm setting with gentle technique and transparent guidance.",
    },
  ];

  return (
    <section className="py-6 sm:py-16 bg-white border-y border-brand-primary/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Statement Line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 sm:pb-6 border-b border-brand-primary/15 gap-1 sm:gap-4">
          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-brand-primary">
            CLINICAL VALUES
          </span>
          <p className="text-xs sm:text-sm text-brand-textMuted font-sans max-w-lg hidden sm:block">
            Advanced dental technology with thoughtful, individual attention.
          </p>
        </div>

        {/* Concise Principles — Large typography, fine editorial rules, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-brand-primary/15 pt-4 sm:pt-8">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-3 md:py-0 px-0 md:px-8 first:pl-0 last:pr-0 group cursor-default"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-brand-primary/70 uppercase">
                    {item.num}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-xl lg:text-2xl tracking-wide text-brand-textDark uppercase group-hover:text-brand-deep transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed font-sans max-w-sm">
                  {item.phrase}
                </p>
              </div>
              <div className="hidden md:block w-8 h-0.5 bg-brand-primary/20 group-hover:w-16 transition-all duration-300 mt-4" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
