"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

/**
 * Authentic Dr. Siulik's Dental Care brand mark emblem from /assets/branding/logo.svg
 */
function DentalEmblem({ className = "w-6 h-6 text-brand-aqua" }) {
  return (
    <svg
      viewBox="0 0 342.51 312.88"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Authentic upper medical cross and crown crest */}
      <path
        d="M 69.83 92.66 C 64.30 93.07, 60.09 89.04, 58.90 84.87 C 57.87 81.30, 59.73 68.65, 57.79 66.85 C 55.84 65.01, 45.58 67.18, 40.28 65.94 C 29.73 63.46, 28.96 48.16, 39.66 44.78 C 44.17 43.36, 53.89 45.25, 57.64 44.03 C 59.56 42.07, 57.92 30.00, 58.71 26.28 C 59.68 21.72, 63.78 17.98, 68.97 17.82 C 74.49 17.65, 78.62 21.28, 79.96 25.58 C 81.40 30.19, 79.44 39.75, 80.79 43.86 C 85.90 45.91, 98.14 41.71, 103.35 47.30 C 88.63 49.59, 77.85 63.60, 73.16 76.20 C 71.00 82.00, 70.79 86.20, 69.83 92.66 Z M 55.34 41.06 C 49.16 41.76, 41.98 39.96, 36.74 42.56 C 26.61 47.58, 26.10 62.19, 36.37 67.79 C 41.45 70.56, 49.00 69.07, 55.19 69.46 C 56.45 75.41, 53.80 82.04, 56.76 88.04 C 59.39 93.36, 63.88 95.64, 69.73 95.68 L 69.78 99.17 C 65.48 99.48, 60.50 99.35, 56.12 99.47 C 47.73 99.72, 20.23 99.96, 15.67 101.24 L 16.19 101.47 C 18.58 102.22, 49.51 102.21, 54.38 102.02 C 56.07 101.95, 59.29 101.91, 60.92 102.01 L 91.04 102.43 C 94.43 101.24, 93.79 94.69, 100.43 85.40 C 107.00 76.21, 118.73 68.16, 135.69 68.20 C 150.51 68.23, 164.17 74.66, 177.49 79.29 C 176.16 77.66, 171.77 74.88, 169.72 73.40 C 154.37 62.37, 132.00 50.55, 112.84 47.62 C 110.58 47.27, 108.18 47.61, 106.97 46.52 L 103.48 43.23 C 111.22 41.27, 126.34 44.21, 133.42 46.48 C 142.06 49.25, 149.93 52.89, 156.90 57.06 C 163.96 61.30, 171.27 65.08, 179.29 68.70 C 187.47 72.40, 197.13 75.01, 207.60 74.42 C 212.77 74.13, 217.13 72.71, 221.63 71.46 C 252.80 62.87, 297.06 49.16, 295.18 100.68 L 319.59 100.65 C 321.35 85.76, 321.97 77.52, 315.23 65.14 C 310.84 57.10, 300.22 51.36, 288.82 48.79 C 282.77 47.43, 275.84 46.88, 269.44 47.70 C 262.43 48.60, 258.63 49.81, 252.24 51.67 C 240.79 55.00, 231.34 59.03, 220.80 62.96 C 210.96 66.63, 193.87 67.56, 184.19 63.44 C 163.88 54.82, 146.84 40.63, 122.48 39.92 C 114.48 39.68, 110.24 40.69, 103.49 42.27 C 101.46 42.74, 101.27 42.06, 99.39 41.58 C 96.53 40.85, 87.02 41.19, 83.58 41.14 C 83.56 35.40, 84.39 27.12, 82.06 22.45 C 76.86 12.00, 61.94 12.31, 56.95 22.13 C 54.39 27.15, 55.31 34.96, 55.34 41.06"
        fillRule="evenodd"
      />
      {/* Authentic lower anatomical root contour */}
      <path
        d="M 87.01 197.28 C 87.82 201.22, 98.10 229.65, 99.61 233.84 C 103.07 243.44, 110.01 258.20, 114.64 267.44 C 119.56 277.24, 126.98 292.01, 134.70 296.40 C 142.58 300.88, 146.41 294.28, 149.34 289.59 C 159.77 272.90, 164.40 253.42, 178.84 233.63 C 187.30 222.03, 196.07 210.48, 207.58 201.58 C 211.51 198.55, 210.49 198.60, 216.64 198.48 C 225.80 198.29, 273.03 198.61, 275.02 197.54 C 271.20 196.39, 260.26 196.41, 255.54 196.29 L 216.28 195.41 C 213.58 195.40, 203.04 194.86, 201.24 195.25 C 198.05 195.94, 194.33 198.85, 191.67 200.96 C 189.71 202.52, 188.17 204.24, 186.34 205.70 L 175.82 215.68 C 165.17 226.81, 156.77 236.72, 150.06 251.43 C 147.89 256.19, 145.61 260.55, 143.00 264.85 C 140.23 269.42, 136.54 273.60, 130.57 268.55 C 127.45 265.91, 123.98 261.39, 121.43 257.19 C 115.94 248.13, 112.31 240.29, 108.51 229.12 L 99.20 197.30 Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

/**
 * Official YouTube brand play button mark
 */
function YouTubeBrandIcon({ className = "w-5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M23.498 2.186a3.016 3.016 0 0 0-2.122-2.136C19.505.545 12 .545 12 .545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 2.186C0 4.07 0 8 0 8s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 11.93 24 8 24 8s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="M9.6 11.5V4.5L15.6 8l-6 3.5z" fill="#FFFFFF" />
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

  // Official URLs exactly as provided
  const instagramUrl = "https://www.instagram.com/drsiuliksdentalcare?stkn=aTl6a3N0aWxpeDBm&utm_source=qr";
  const youtubeUrl = "https://youtube.com/@drsiuliksdentalcare?si=DVFzYLlcGZjMDvsl";

  // Coordinates: Mobile uses vertical stack; Desktop uses balanced diagonal positioning
  const instagramCoords = isMobile ? { x: 0, y: -62 } : { x: -132, y: -22 };
  const youtubeCoords = isMobile ? { x: 0, y: 62 } : { x: 132, y: 22 };

  return (
    <section
      id="clinic-connect"
      className="py-6 sm:py-10 bg-white relative overflow-hidden border-t border-brand-primary/10 select-none scroll-mt-28"
      aria-labelledby="clinic-connect-kicker"
    >
      {/* Background ambient lighting accent */}
      <div className="teal-ambient-glow -bottom-36 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Approved Short Header & Editorial Kicker */}
        <span
          id="clinic-connect-kicker"
          className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-1.5"
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
          className="relative flex items-center justify-center min-h-[190px] sm:min-h-[150px] my-3"
          id="clinic-connect-constellation"
        >
          {/* Subtle Fine-line Connector Arcs (Secondary visual guide) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                {isMobile ? (
                  // Mobile vertical fine dashed guide line
                  <svg width="2" height="130" className="overflow-visible">
                    <line
                      x1="1"
                      y1="4"
                      x2="1"
                      y2="126"
                      stroke="#08A6A8"
                      strokeOpacity="0.22"
                      strokeWidth="1.2"
                      strokeDasharray="2 3"
                    />
                  </svg>
                ) : (
                  // Desktop subtle diagonal connecting fine arc
                  <svg width="270" height="90" viewBox="0 0 270 90" className="overflow-visible">
                    <path
                      d="M 15 23 Q 135 45 255 67"
                      fill="none"
                      stroke="#08A6A8"
                      strokeOpacity="0.2"
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
                    scale: 0.8,
                    x: 0,
                    y: 0,
                    pointerEvents: 'none',
                  }
            }
            transition={{
              duration: 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute z-20"
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              aria-label="Instagram — Dr. Siulik's Dental Care"
              className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-primary/20 hover:border-brand-aqua shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 min-h-[44px]"
            >
              <div className="w-5 h-5 rounded-[5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Instagram className="w-3.5 h-3.5 stroke-[2.2]" />
              </div>
              
              {/* Desktop text label */}
              <span className="hidden sm:inline-block font-mono font-bold text-[10px] sm:text-[11px] tracking-wider text-brand-textDark group-hover:text-brand-deep transition-colors uppercase whitespace-nowrap">
                VISIT INSTAGRAM
              </span>

              {/* Mobile text label */}
              <span className="sm:hidden font-sans font-semibold text-xs text-brand-textDark whitespace-nowrap">
                Instagram
              </span>

              {/* Subtle outbound arrow indicator */}
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-textMuted/70 group-hover:text-brand-deep transition-colors shrink-0" />
            </a>
          </motion.div>

          {/* Central Circular Trigger Container */}
          <div className="relative z-30 flex flex-col items-center">
            <motion.button
              ref={triggerRef}
              onClick={toggleOpen}
              aria-label={isOpen ? "Close clinic social links" : "Open clinic social links"}
              aria-expanded={isOpen}
              aria-controls="clinic-connect-constellation"
              whileInView={{ scale: [1, 1.025, 1] }}
              viewport={{ once: true, amount: 0.6 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              className={`relative w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 ${
                isOpen
                  ? 'bg-brand-deep text-white border-2 border-brand-aqua shadow-[0_0_20px_rgba(8,166,168,0.35)]'
                  : 'bg-brand-textDark text-white border border-brand-aqua/40 hover:border-brand-aqua hover:shadow-[0_0_20px_rgba(8,166,168,0.3)] shadow-md'
              }`}
            >
              {/* Authentic Dental Brand Emblem in Center */}
              <DentalEmblem
                className={`w-6 h-6 transition-colors duration-200 ${
                  isOpen ? 'text-white' : 'text-brand-aqua'
                }`}
              />

              {/* Subtle Outer Ambient Ring for Idle Presence */}
              <span
                className={`absolute -inset-1.5 rounded-full border border-brand-aqua/20 pointer-events-none transition-opacity duration-300 ${
                  isOpen ? 'opacity-80 scale-105' : 'opacity-40'
                }`}
              />
            </motion.button>

            {/* Subtle editorial micro-label directly below central trigger */}
            <motion.button
              type="button"
              onClick={toggleOpen}
              tabIndex={-1}
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isOpen ? 0 : 0.85,
                y: isOpen ? 4 : 0,
                pointerEvents: isOpen ? 'none' : 'auto',
              }}
              transition={{ duration: 0.25 }}
              className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-[9.5px] sm:text-[10px] font-mono font-medium tracking-[0.16em] text-slate-500 hover:text-brand-primary uppercase cursor-pointer whitespace-nowrap transition-colors select-none"
            >
              TAP TO EXPLORE
            </motion.button>
          </div>

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
                    scale: 0.8,
                    x: 0,
                    y: 0,
                    pointerEvents: 'none',
                  }
            }
            transition={{
              duration: 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute z-20"
          >
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              aria-label="YouTube — Dr. Siulik's Dental Care"
              className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-primary/20 hover:border-brand-aqua shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 min-h-[44px]"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <YouTubeBrandIcon className="w-5 h-3.5" />
              </div>

              {/* Desktop text label */}
              <span className="hidden sm:inline-block font-mono font-bold text-[10px] sm:text-[11px] tracking-wider text-brand-textDark group-hover:text-brand-deep transition-colors uppercase whitespace-nowrap">
                WATCH ON YOUTUBE
              </span>

              {/* Mobile text label */}
              <span className="sm:hidden font-sans font-semibold text-xs text-brand-textDark whitespace-nowrap">
                YouTube
              </span>

              {/* Subtle outbound arrow indicator */}
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-textMuted/70 group-hover:text-brand-deep transition-colors shrink-0" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
