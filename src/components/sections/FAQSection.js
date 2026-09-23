"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import { FAQ_DATA } from '../../data/clinicData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-10 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-brand-primary/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-6 sm:mb-12"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
            PATIENT GUIDANCE
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-brand-textDark leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-base text-brand-textMuted mt-1.5 sm:mt-2.5 leading-relaxed font-sans max-w-xl">
            Answers to common questions regarding clinic visits, consultations, and sterilization protocols.
          </p>
        </motion.div>

        {/* Editorial Accordion List Structure with Fine-line Separators */}
        <div className="border-t border-brand-primary/15">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const indexNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={idx}
                className="border-b border-brand-primary/15 transition-colors duration-200 hover:bg-brand-soft/20"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-4 sm:py-6 min-h-[44px] text-left flex items-start justify-between gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg group cursor-pointer touch-manipulation"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                >
                  <div className="flex items-start gap-3.5 sm:gap-5 flex-1">
                    {/* Index Number */}
                    <span className={`font-mono font-semibold text-sm sm:text-base transition-colors duration-200 mt-0.5 shrink-0 ${
                      isOpen ? 'text-brand-deep font-bold' : 'text-brand-primary/50 group-hover:text-brand-deep'
                    }`}>
                      {indexNumber}
                    </span>

                    {/* Question Title */}
                    <span className={`font-sans font-semibold text-base sm:text-lg leading-snug transition-colors duration-200 ${
                      isOpen ? 'text-brand-deep' : 'text-brand-textDark group-hover:text-brand-deep'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Symbol Indicator */}
                  <div className={`w-9 h-9 sm:w-8 sm:h-8 min-w-[36px] min-h-[36px] rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 ${
                    isOpen
                      ? 'bg-brand-deep border-brand-deep text-white shadow-sm'
                      : 'border-brand-primary/30 text-brand-primary group-hover:border-brand-deep group-hover:text-brand-deep bg-white'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-question-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="pl-8 sm:pl-14 pr-2 sm:pr-12 pb-6 sm:pb-8 pt-1 text-sm sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-3xl">
                        {faq.answer.replace(', or call our clinic directly at +91 98765 43210', '.')}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
