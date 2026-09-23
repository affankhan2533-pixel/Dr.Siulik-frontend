"use client";

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BEFORE_AFTER_DATA } from '@/data/clinicData';

// ─── Individual Drag-Slider Component with Gesture Isolation ────────────────
function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  isAuthentic,
  onDividerDragStart,
  onDividerDragEnd,
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const calcPos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e) => {
    dragging.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    onDividerDragStart?.();
    calcPos(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;
    e.stopPropagation();
    calcPos(e.clientX);
  };

  const handlePointerUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    onDividerDragEnd?.();
  };

  const onContainerPointerDown = (e) => {
    // Only desktop mouse clicks anywhere on canvas jump/drag divider
    if (e.pointerType === 'mouse') {
      handlePointerDown(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] select-none overflow-hidden rounded-2xl bg-brand-textDark shadow-md cursor-ew-resize"
      onPointerDown={onContainerPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* AFTER IMAGE (full background) */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
      />

      {/* BEFORE IMAGE (clipped left portion) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover pointer-events-none"
          style={{ width: containerRef.current?.offsetWidth || '100%', maxWidth: 'none' }}
          draggable="false"
        />
      </div>

      {/* Divider line & Independent Touch-Draggable Handle with Touch-Action None */}
      <div
        className="absolute inset-y-0 w-14 -ml-7 z-20 flex items-center justify-center cursor-ew-resize touch-none select-none"
        style={{ left: `${pos}%`, touchAction: 'none' }}
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
        <div className="absolute inset-y-0 w-[2px] bg-white/95 shadow-2xl pointer-events-none" />

        {/* Handle Button — 48x48px High-Contrast Touch Target */}
        <div className="relative w-12 h-12 rounded-full bg-brand-deep border-2 border-white shadow-2xl flex items-center justify-center gap-0.5 z-20 transition-transform active:scale-110 pointer-events-none">
          <svg className="w-4 h-4 text-brand-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Range input for full keyboard accessibility */}
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-3 focus:right-3 focus:z-30 focus:p-2 focus:bg-white focus:text-black focus:rounded-md"
        aria-label="Drag to compare before and after treatment"
      />

      {/* Corner Badges */}
      <span className="absolute top-3 left-3 z-10 text-[9px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-sm pointer-events-none">
        BEFORE
      </span>
      <span className="absolute top-3 right-3 z-10 text-[9px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded-full bg-brand-primary/90 text-white backdrop-blur-sm pointer-events-none">
        AFTER
      </span>

      {/* Authenticity Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[8px] font-mono tracking-[0.18em] px-2.5 py-1 rounded-full bg-brand-deep/90 text-brand-aqua uppercase backdrop-blur-sm whitespace-nowrap flex items-center gap-1.5 border border-brand-aqua/30 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-aqua animate-pulse" />
          Clinical Result
        </span>
      </div>
    </div>
  );
}

// ─── Case Card Component ─────────────────────────────────────────────────────
function CaseCard({ item, index, onDividerDragStart, onDividerDragEnd }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col w-full rounded-3xl bg-white border border-brand-primary/15 shadow-soft hover:shadow-xl transition-all duration-300 p-4 sm:p-5"
    >
      {/* Category & Tag */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
          {item.category}
        </span>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-brand-soft text-brand-deep font-semibold">
          {item.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-sans font-bold text-sm sm:text-base text-brand-textDark leading-snug mb-3 line-clamp-1">
        {item.title}
      </h3>

      {/* Interactive Comparison Slider */}
      <div className="mb-3">
        <CompareSlider
          beforeSrc={item.beforeImage}
          afterSrc={item.afterImage}
          beforeLabel={item.beforeLabel}
          afterLabel={item.afterLabel}
          isAuthentic={item.isAuthentic}
          onDividerDragStart={onDividerDragStart}
          onDividerDragEnd={onDividerDragEnd}
        />
      </div>

      {/* Drag Instruction */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-textMuted font-sans mb-3">
        <svg className="w-3 h-3 text-brand-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
        </svg>
        <span>Slide handle to compare Before &amp; After</span>
      </div>

      {/* Pre-Op vs Post-Op Labels */}
      <div className="mt-auto pt-2.5 border-t border-brand-primary/15 grid grid-cols-2 gap-2 text-left">
        <div className="bg-brand-soft/50 rounded-xl p-2">
          <span className="text-[8px] font-mono font-bold tracking-[0.18em] text-brand-textMuted uppercase block mb-0.5">
            PRE-OP
          </span>
          <p className="font-sans text-xs text-brand-textDark font-medium leading-tight truncate">
            {item.beforeLabel}
          </p>
        </div>
        <div className="bg-brand-soft/50 rounded-xl p-2">
          <span className="text-[8px] font-mono font-bold tracking-[0.18em] text-brand-primary uppercase block mb-0.5">
            POST-OP
          </span>
          <p className="font-sans text-xs text-brand-deep font-semibold leading-tight truncate">
            {item.afterLabel}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function BeforeAfterSection() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeCaseId, setActiveCaseId] = useState(BEFORE_AFTER_DATA[0].id);
  const [isDividerDragging, setIsDividerDragging] = useState(false);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const activeCase = BEFORE_AFTER_DATA.find((c) => c.id === activeCaseId) || BEFORE_AFTER_DATA[0];

  const casesToDisplay =
    selectedFilter === 'ALL'
      ? BEFORE_AFTER_DATA
      : BEFORE_AFTER_DATA.filter((c) => c.id === selectedFilter || c.category.toUpperCase().includes(selectedFilter.toUpperCase()));

  return (
    <section id="before-after" className="py-10 sm:py-20 lg:py-24 bg-brand-soft/20 relative overflow-hidden">
      <div className="teal-ambient-glow top-0 right-0 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: easeEditorial }}
          className="mb-6 sm:mb-12 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 items-end"
        >
          <div className="lg:col-span-7">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-1.5 sm:mb-3">
              CLINICAL RESULTS
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Real treatment.<br />
              <span className="text-brand-deep italic font-normal">Thoughtful transformation.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Authentic clinical photography documented at Dr. Siulik&apos;s Dental Care. Slide horizontally to evaluate restorative precision.
            </p>
          </div>
        </motion.div>

        {/* Filter / Category Selector with 44px Touch Targets (Mobile Only) */}
        <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar mb-3 touch-pan-x">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              selectedFilter === 'ALL'
                ? 'bg-brand-deep text-white border-brand-deep shadow-teal-glow'
                : 'bg-white text-brand-textDark border-brand-primary/20 hover:border-brand-primary hover:bg-brand-soft'
            }`}
          >
            All 4 Clinical Cases
          </button>
          {BEFORE_AFTER_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFilter(item.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                selectedFilter === item.id
                  ? 'bg-brand-deep text-white border-brand-deep shadow-teal-glow'
                  : 'bg-white text-brand-textDark border-brand-primary/20 hover:border-brand-primary hover:bg-brand-soft'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-between text-[10px] font-mono text-brand-primary uppercase tracking-wider mb-3 px-1">
          <span>&larr; Swipe cases &rarr;</span>
          <span className="text-brand-textMuted">Drag handle to compare</span>
        </div>

        {/* ── Mobile Layout: Horizontal Scroll-Snap (94vw Canvas with Gesture Isolation) ── */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={`flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 items-stretch -mx-4 px-4 ${
                isDividerDragging ? 'overflow-x-hidden touch-none' : 'touch-pan-x'
              }`}
              style={{
                WebkitOverflowScrolling: isDividerDragging ? 'auto' : 'touch',
                scrollSnapType: isDividerDragging ? 'none' : 'x mandatory',
              }}
            >
              {casesToDisplay.map((item, idx) => (
                <div
                  key={item.id}
                  className="w-[94vw] snap-start shrink-0 flex"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <CaseCard
                    item={item}
                    index={idx}
                    onDividerDragStart={() => setIsDividerDragging(true)}
                    onDividerDragEnd={() => setIsDividerDragging(false)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop Layout: One Large Active Case + Case Navigation (Preserved) ── */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Case Navigation */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase mb-1">
              AUTHENTIC CLINICAL CASES
            </span>
            {BEFORE_AFTER_DATA.map((item, idx) => {
              const isActive = activeCase.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCaseId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-3 group focus:outline-none ${
                    isActive
                      ? 'bg-white border-brand-primary shadow-md ring-1 ring-brand-primary/20'
                      : 'bg-white/60 border-brand-primary/10 hover:bg-white hover:border-brand-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`font-mono text-xs font-bold pt-0.5 ${
                      isActive ? 'text-brand-deep' : 'text-brand-textMuted group-hover:text-brand-primary'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase block mb-0.5">
                        {item.category}
                      </span>
                      <h4 className={`font-sans font-bold text-sm sm:text-base leading-snug transition-colors ${
                        isActive ? 'text-brand-textDark' : 'text-brand-textDark/80 group-hover:text-brand-textDark'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-textMuted font-sans mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 transition-all ${
                    isActive ? 'bg-brand-primary scale-125' : 'bg-transparent border border-brand-primary/30'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Dominant Comparison Area */}
          <div className="md:col-span-7">
            <div className="rounded-3xl bg-white border border-brand-primary/20 p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block mb-0.5">
                    {activeCase.tag}
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-textDark">
                    {activeCase.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-textMuted font-mono">
                  <span>Drag divider to compare</span>
                </div>
              </div>

              {/* Large Comparison Slider */}
              <div className="aspect-[16/11] rounded-2xl overflow-hidden shadow-inner border border-brand-primary/15">
                <CompareSlider
                  key={activeCase.id}
                  beforeSrc={activeCase.beforeImage}
                  afterSrc={activeCase.afterImage}
                  beforeLabel={activeCase.beforeLabel}
                  afterLabel={activeCase.afterLabel}
                  isAuthentic={activeCase.isAuthentic}
                />
              </div>

              {/* Pre & Post Op Footers */}
              <div className="mt-4 pt-4 border-t border-brand-primary/10 grid grid-cols-2 gap-4">
                <div className="bg-brand-soft/60 rounded-xl p-3 border border-brand-primary/10">
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-textMuted uppercase block mb-0.5">
                    PRE-OP CLINICAL STATE
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-brand-textDark font-semibold">
                    {activeCase.beforeLabel}
                  </p>
                </div>
                <div className="bg-brand-soft/60 rounded-xl p-3 border border-brand-primary/10">
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-brand-primary uppercase block mb-0.5">
                    POST-OP CLINICAL RESULT
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-brand-deep font-semibold">
                    {activeCase.afterLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Disclaimer & Transparency Notice */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeEditorial }}
          className="mt-10 sm:mt-12 rounded-2xl border border-teal-200/80 bg-teal-50/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-brand-deep font-sans"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 text-sm font-bold">
              ✓
            </span>
            <div>
              <strong className="block font-bold text-brand-textDark text-[11px] tracking-wide uppercase">
                Authentic Clinical Documentation
              </strong>
              <span>
                All treatment photography shown represents genuine clinical procedures performed by Dr. Siulik Badajena. Individual treatment outcomes may vary based on unique oral conditions.
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
