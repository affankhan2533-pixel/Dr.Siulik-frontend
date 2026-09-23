"use client";

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLINICAL_CASES = [
  {
    id: "diastema",
    num: "01",
    total: "04",
    name: "DIASTEMA CLOSURE",
    title: "Diastema Closure",
    tag: "Midline Gap Correction",
    beforeImage: "/assets/before-after/diastema-before.webp",
    afterImage: "/assets/before-after/diastema-after.webp",
    preOpLabel: "Midline Space",
    postOpLabel: "Aesthetic Closure",
  },
  {
    id: "composite",
    num: "02",
    total: "04",
    name: "COMPOSITE RESTORATION",
    title: "Composite Restoration",
    tag: "Posterior Tooth Restoration",
    beforeImage: "/assets/before-after/restorative-before.webp",
    afterImage: "/assets/before-after/restorative-after.webp",
    preOpLabel: "Carious Lesion",
    postOpLabel: "Anatomical Restoration",
  },
  {
    id: "occlusal",
    num: "03",
    total: "04",
    name: "OCCLUSAL RECONSTRUCTION",
    title: "Occlusal Reconstruction",
    tag: "Groove & Anatomy Sculpting",
    beforeImage: "/assets/before-after/occlusal-before.webp",
    afterImage: "/assets/before-after/occlusal-after.webp",
    preOpLabel: "Stained Fissures",
    postOpLabel: "Sculpted Anatomy",
  },
  {
    id: "scaling",
    num: "04",
    total: "04",
    name: "SCALING & POLISH",
    title: "Scaling & Polish",
    tag: "Ultrasonic Prophylaxis",
    beforeImage: "/assets/before-after/scaling-before.webp",
    afterImage: "/assets/before-after/scaling-after.webp",
    preOpLabel: "Extrinsic Stains",
    postOpLabel: "Polished Enamel",
  },
];

/**
 * Draggable Before/After Comparison Canvas
 * Feature: Complete gesture isolation — Touch-Action None on drag handle prevents swipe interference
 */
function CompareCanvas({
  beforeSrc,
  afterSrc,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  onDragStart,
  onDragEnd,
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const calculatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    onDragStart?.();
    calculatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    e.stopPropagation();
    calculatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    onDragEnd?.();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden bg-brand-textDark"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse') {
          handlePointerDown(e);
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* AFTER IMAGE (Full canvas base) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        draggable="false"
      />

      {/* BEFORE IMAGE (Clipped left partition) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full object-cover object-center pointer-events-none"
          style={{
            width: containerRef.current?.offsetWidth || '100%',
            maxWidth: 'none',
          }}
          draggable="false"
        />
      </div>

      {/* Divider Drag Line & 48px Accessible Handle (touch-action: none ensures gesture isolation) */}
      <div
        className="absolute inset-y-0 w-12 -ml-6 z-20 flex items-center justify-center cursor-ew-resize select-none"
        style={{ left: `${sliderPos}%`, touchAction: 'none' }}
        onPointerDown={(e) => {
          e.stopPropagation();
          handlePointerDown(e);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => {
          e.stopPropagation();
          handlePointerUp(e);
        }}
        onPointerCancel={(e) => {
          e.stopPropagation();
          handlePointerUp(e);
        }}
      >
        {/* Fine vertical line */}
        <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] pointer-events-none" />

        {/* 48px Interactive Hit Target with Compact Elegant Visible Circle */}
        <div className="w-12 h-12 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-brand-deep text-brand-aqua border-2 border-white shadow-xl flex items-center justify-center transition-transform active:scale-110">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Range input for keyboard accessibility */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="sr-only"
        aria-label="Drag to compare before and after treatment"
      />

      {/* Subtle Corner Status Badges */}
      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded bg-black/65 text-white/95 backdrop-blur-md border border-white/10 uppercase">
          BEFORE
        </span>
      </div>
      <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none">
        <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded bg-brand-primary/90 text-white backdrop-blur-md border border-white/10 uppercase">
          AFTER
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [isDividerDragging, setIsDividerDragging] = useState(false);

  const activeCase = CLINICAL_CASES[activeCaseIdx] || CLINICAL_CASES[0];

  return (
    <section
      id="before-after"
      className="py-12 sm:py-20 lg:py-24 bg-white relative overflow-hidden select-none scroll-mt-24 sm:scroll-mt-28 border-t border-brand-primary/10"
      aria-labelledby="before-after-kicker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span
            id="before-after-kicker"
            className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-2"
          >
            CLINICAL RESULTS
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark tracking-tight leading-tight">
              Real treatment.<br />
              <span className="text-brand-deep italic font-normal">Thoughtful transformation.</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-textMuted font-sans max-w-md leading-relaxed">
              Authentic before-and-after clinical documentation from Dr. Siulik&apos;s Dental Care.
            </p>
          </div>
        </div>

        {/* ── Desktop Layout: Two-Zone Split (Left Large Canvas / Right Case Index) ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-14 items-start">

          {/* Left / Large Area: Dominant Comparison Canvas */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="relative aspect-[16/10] w-full min-h-[440px] max-h-[540px] rounded-sm sm:rounded-md overflow-hidden border border-brand-primary/20 shadow-xl bg-brand-textDark">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.id}
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  <CompareCanvas
                    beforeSrc={activeCase.beforeImage}
                    afterSrc={activeCase.afterImage}
                    beforeLabel={activeCase.preOpLabel}
                    afterLabel={activeCase.postOpLabel}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Canvas Sub-bar: Minimal Metadata */}
            <div className="mt-3.5 pt-3 border-t border-brand-primary/15 flex items-center justify-between text-xs text-brand-textMuted font-mono">
              <div className="flex items-center gap-3">
                <span className="font-bold text-brand-deep">
                  CASE {activeCase.num} / {activeCase.total}
                </span>
                <span>•</span>
                <span className="text-brand-textDark font-sans font-semibold">
                  {activeCase.title}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span>PRE-OP: {activeCase.preOpLabel}</span>
                <span>/</span>
                <span className="text-brand-deep font-semibold">POST-OP: {activeCase.postOpLabel}</span>
              </div>
            </div>
          </div>

          {/* Right / Secondary Area: Refined Editorial Case Index */}
          <div
            role="tablist"
            aria-label="Clinical Cases"
            className="lg:col-span-4 xl:col-span-4 flex flex-col border-t border-brand-primary/15 divide-y divide-brand-primary/15"
          >
            {CLINICAL_CASES.map((item, idx) => {
              const isActive = activeCaseIdx === idx;
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`w-full py-4 text-left transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
                    isActive
                      ? 'pl-4 border-l-2 border-brand-primary bg-brand-soft/30'
                      : 'pl-0 border-l-2 border-transparent hover:pl-2 hover:bg-brand-soft/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest transition-colors duration-200 ${
                          isActive ? 'text-brand-primary' : 'text-brand-textMuted/60 group-hover:text-brand-primary'
                        }`}
                      >
                        {item.num}
                      </span>
                      <span
                        className={`font-mono text-xs tracking-[0.16em] uppercase transition-all duration-200 ${
                          isActive ? 'text-brand-textDark font-bold' : 'text-brand-textMuted group-hover:text-brand-textDark'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <span
                      className={`font-mono text-xs text-brand-primary transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                      }`}
                    >
                      ●
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Drag Instruction Cue */}
            <div className="pt-4 mt-2">
              <span className="text-[10px] font-mono text-brand-textMuted uppercase tracking-wider block">
                DRAG DIVIDER TO COMPARE
              </span>
            </div>
          </div>

        </div>

        {/* ── Mobile Layout: Horizontal Swipe Rail with Isolated Divider Gesture ── */}
        <div className="lg:hidden">
          <div
            className={`flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 items-stretch -mx-4 px-4 ${
              isDividerDragging ? 'overflow-x-hidden touch-none' : 'touch-pan-x'
            }`}
            style={{
              WebkitOverflowScrolling: isDividerDragging ? 'auto' : 'touch',
              scrollSnapType: isDividerDragging ? 'none' : 'x mandatory',
            }}
          >
            {CLINICAL_CASES.map((item, idx) => (
              <div
                key={item.id}
                className="w-[92vw] sm:w-[94vw] snap-start shrink-0 flex flex-col"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Case Metadata */}
                <div className="flex items-center justify-between text-xs font-mono mb-2 px-1">
                  <span className="font-bold text-brand-primary">
                    {item.num} / {item.total}
                  </span>
                  <span className="font-sans font-bold text-brand-textDark tracking-tight">
                    {item.name}
                  </span>
                </div>

                {/* Comparison Canvas */}
                <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-brand-primary/20 shadow-md bg-brand-textDark">
                  <CompareCanvas
                    beforeSrc={item.beforeImage}
                    afterSrc={item.afterImage}
                    beforeLabel={item.preOpLabel}
                    afterLabel={item.postOpLabel}
                    onDragStart={() => setIsDividerDragging(true)}
                    onDragEnd={() => setIsDividerDragging(false)}
                  />
                </div>

                {/* Pre / Post Op Footnote */}
                <div className="flex items-center justify-between text-[11px] font-mono text-brand-textMuted mt-2 px-1">
                  <span>PRE-OP: {item.preOpLabel}</span>
                  <span className="text-brand-deep font-semibold">POST-OP: {item.postOpLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="flex items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider mt-3 px-1">
            <span>&larr; Swipe for next case &rarr;</span>
            <span className="text-brand-textMuted">Drag handle to compare</span>
          </div>
        </div>

        {/* Documentation Transparency Notice */}
        <div className="mt-8 pt-4 border-t border-brand-primary/15 flex items-center justify-between flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono text-brand-textMuted uppercase tracking-wider">
          <span>Authentic Clinical Photography</span>
          <span>Dr. Siulik Badajena</span>
        </div>

      </div>
    </section>
  );
}
