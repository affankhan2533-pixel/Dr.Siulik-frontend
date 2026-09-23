"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Sparkle, ArrowUpRight } from 'lucide-react';

/**
 * Minimalist luxury dental emblem outline
 */
function DentalEmblem({ className = "w-6 h-6 text-brand-aqua" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Refined anatomical contour of dental crown & roots */}
      <path d="M12 2.5C8.8 2.5 6.2 4 5.2 6.6C4.1 9.3 4.6 13 5.7 16C6.7 18.8 7.6 22 9.6 22C11 22 11.2 19 12 19C12.8 19 13 22 14.4 22C16.4 22 17.3 18.8 18.3 16C19.4 13 19.9 9.3 18.8 6.6C17.8 4 15.2 2.5 12 2.5Z" />
      {/* Subtle enamel groove reflection */}
      <path d="M9.5 7C10.3 6.6 11.1 6.4 12 6.4C12.9 6.4 13.7 6.6 14.5 7" opacity="0.6" />
    </svg>
  );
}

export default function ClinicConnect() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Synchronize responsive breakpoint for constellation geometry
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard accessibility: Escape to close and refocus trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click-outside listener for smooth closing
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
    }
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Official URLs
  const instagramUrl = "https://www.instagram.com/drsiuliksdentalcare?stkn=aTl6a3N0aWxpeDBm&utm_source=qr";
  const youtubeUrl = "https://youtube.com/@drsiuliksdentalcare?si=DVFzYLlcGZjMDvsl";

  // Coordinates: Mobile uses vertical stack; Desktop uses subtle diagonal constellation
  const instagramCoords = isMobile ? { x: 0, y: -58 } : { x: -84, y: -22 };
  const youtubeCoords = isMobile ? { x: 0, y: 58 } : { x: 84, y: 22 };

  return (
    <section
      id="clinic-connect"
      className="py-8 sm:py-10 bg-white relative overflow-hidden border-t border-brand-primary/10 select-none scroll-mt-28"
      aria-labelledby="clinic-connect-kicker"
    >
      {/* Background ambient lighting accent */}
      <div className="teal-ambient-glow -bottom-36 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Approved Short Header & Editorial Kicker */}
        <span
          id="clinic-connect-kicker"
          className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5"
        >
          INSIDE THE CLINIC
        </span>
        <h2 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-brand-textDark tracking-tight">
          Stay connected with Dr. Siulik&apos;s Dental Care.
        </h2>
        <p className="text-xs sm:text-sm text-brand-textMuted mt-1 max-w-sm mx-auto font-sans">
          Official clinic updates and patient guidance.
        </p>

        {/* Interactive Social Orbit Control Area */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[170px] sm:min-h-[150px] my-3"
          id="clinic-connect-constellation"
        >
          {/* Subtle Fine-line Connector Arcs (Secondary visual guide) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                {isMobile ? (
                  // Mobile vertical fine dashed guide line
                  <svg width="2" height="120" className="overflow-visible">
                    <line
                      x1="1"
                      y1="6"
                      x2="1"
                      y2="114"
                      stroke="#08A6A8"
                      strokeOpacity="0.25"
                      strokeWidth="1.2"
                      strokeDasharray="2 3"
                    />
                  </svg>
                ) : (
                  // Desktop subtle diagonal connecting fine arc
                  <svg width="220" height="90" viewBox="0 0 220 90" className="overflow-visible">
                    <path
                      d="M 26 23 Q 110 45 194 67"
                      fill="none"
                      stroke="#08A6A8"
                      strokeOpacity="0.22"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  </svg>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Satellite Node 1: Instagram */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    opacity: 1,
                    scale: 1,
                    x: instagramCoords.x,
                    y: instagramCoords.y,
                    pointerEvents: 'auto',
                  }
                : {
                    opacity: 0,
                    scale: 0.35,
                    x: 0,
                    y: 0,
                    pointerEvents: 'none',
                  }
            }
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 26,
              mass: 0.8,
            }}
            className="absolute z-20"
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              aria-label="Instagram — Dr. Siulik's Dental Care"
              className="group relative flex items-center gap-2.5 px-4 sm:px-3 py-2.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-primary/25 hover:border-brand-aqua shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 min-h-[48px] sm:min-h-[44px]"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Instagram className="w-3.5 h-3.5" />
              </div>
              
              {/* Mobile text label (Item 8) */}
              <span className="sm:hidden font-sans font-semibold text-xs text-brand-textDark tracking-wide">
                Instagram
              </span>

              {/* Desktop subtle arrow indicator */}
              <ArrowUpRight className="hidden sm:block w-3.5 h-3.5 text-brand-textMuted group-hover:text-brand-deep transition-colors" />

              {/* Desktop Hover Tooltip (Item 8) */}
              <div className="hidden sm:block absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30">
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white bg-brand-textDark/95 px-2.5 py-1 rounded shadow-md border border-brand-aqua/30 whitespace-nowrap block">
                  VISIT INSTAGRAM
                </span>
              </div>
            </a>
          </motion.div>

          {/* Central Circular Trigger */}
          <motion.button
            ref={triggerRef}
            onClick={toggleOpen}
            aria-label={isOpen ? "Close clinic social links" : "Open clinic social links"}
            aria-expanded={isOpen}
            aria-controls="clinic-connect-constellation"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={
              isOpen
                ? { scale: 1 }
                : {
                    scale: [1, 1.02, 1],
                  }
            }
            transition={
              isOpen
                ? { duration: 0.25 }
                : {
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className={`relative z-30 w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 ${
              isOpen
                ? 'bg-brand-deep text-white border-2 border-brand-aqua shadow-teal-glow'
                : 'bg-brand-textDark text-white border border-brand-aqua/40 hover:border-brand-aqua shadow-md'
            }`}
          >
            {/* Subtle Dental Sparkle Accent */}
            <Sparkle
              className={`w-2.5 h-2.5 absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-brand-aqua transition-transform duration-300 ${
                isOpen ? 'scale-125 rotate-45 text-white' : 'opacity-80'
              }`}
            />

            {/* Subtle Dental Emblem in Center */}
            <motion.div
              animate={{ rotate: isOpen ? 12 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <DentalEmblem
                className={`w-6 h-6 transition-colors duration-200 ${
                  isOpen ? 'text-white' : 'text-brand-aqua'
                }`}
              />
            </motion.div>

            {/* Subtle Outer Ambient Ring for Idle Presence */}
            <span
              className={`absolute -inset-1.5 rounded-full border border-brand-aqua/20 pointer-events-none transition-opacity duration-300 ${
                isOpen ? 'opacity-80 scale-105' : 'opacity-40'
              }`}
            />
          </motion.button>

          {/* Satellite Node 2: YouTube */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? {
                    opacity: 1,
                    scale: 1,
                    x: youtubeCoords.x,
                    y: youtubeCoords.y,
                    pointerEvents: 'auto',
                  }
                : {
                    opacity: 0,
                    scale: 0.35,
                    x: 0,
                    y: 0,
                    pointerEvents: 'none',
                  }
            }
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 26,
              mass: 0.8,
            }}
            className="absolute z-20"
          >
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              aria-label="YouTube — Dr. Siulik's Dental Care"
              className="group relative flex items-center gap-2.5 px-4 sm:px-3 py-2.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-primary/25 hover:border-brand-aqua shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 min-h-[48px] sm:min-h-[44px]"
            >
              <div className="w-6 h-6 rounded-full bg-[#FF0000] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Youtube className="w-3.5 h-3.5 fill-white" />
              </div>

              {/* Mobile text label (Item 9) */}
              <span className="sm:hidden font-sans font-semibold text-xs text-brand-textDark tracking-wide">
                YouTube
              </span>

              {/* Desktop subtle arrow indicator */}
              <ArrowUpRight className="hidden sm:block w-3.5 h-3.5 text-brand-textMuted group-hover:text-brand-deep transition-colors" />

              {/* Desktop Hover Tooltip (Item 9) */}
              <div className="hidden sm:block absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30">
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white bg-brand-textDark/95 px-2.5 py-1 rounded shadow-md border border-brand-aqua/30 whitespace-nowrap block">
                  WATCH ON YOUTUBE
                </span>
              </div>
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
