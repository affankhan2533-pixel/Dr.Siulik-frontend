"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaLightbox({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onIndexChange,
}) {
  const touchStart = useRef({ x: 0, y: 0, time: 0 });

  const currentItem = items[currentIndex] || items[0];
  const total = items.length;

  const handlePrev = () => {
    if (total <= 1) return;
    const newIdx = (currentIndex - 1 + total) % total;
    onIndexChange?.(newIdx);
  };

  const handleNext = () => {
    if (total <= 1) return;
    const newIdx = (currentIndex + 1) % total;
    onIndexChange?.(newIdx);
  };

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isOpen]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, total]);

  // Touch swipe gesture handlers (native swipe navigation)
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;
    const dx = touchStart.current.x - e.changedTouches[0].clientX;
    const dy = touchStart.current.y - e.changedTouches[0].clientY;
    const dt = Date.now() - touchStart.current.time;

    // Horizontal swipe threshold: > 35px horizontal, dominant over vertical, under 600ms
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3 && dt < 600) {
      if (dx > 0) {
        handleNext(); // swiped left -> next
      } else {
        handlePrev(); // swiped right -> prev
      }
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Header Bar: Counter & Close button */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-30 pt-1">
          <div className="flex items-center gap-2">
            {total > 1 && (
              <span className="text-xs font-mono text-brand-aqua/90 uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 border border-brand-aqua/30">
                {currentIndex + 1} / {total}
              </span>
            )}
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider hidden sm:inline-block">
              Use arrow keys or swipe to navigate
            </span>
          </div>

          {/* Close button with minimum 48px touch target */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-brand-aqua touch-manipulation cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center: Image Stage */}
        <div
          className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Desktop Navigation Arrows (hidden on mobile, swipe is primary) */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="hidden sm:flex absolute left-2 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-brand-aqua touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="hidden sm:flex absolute right-2 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-brand-aqua touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container — object-contain ensures zero crop */}
          <motion.div
            key={currentItem.id || currentIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={currentItem.image || currentItem.src}
              alt={currentItem.title || "Fullscreen view"}
              draggable="false"
              className="max-w-full max-h-[72vh] sm:max-h-[78vh] w-auto h-auto object-contain rounded-xl shadow-2xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Bottom Caption Overlay */}
        <div
          className="w-full max-w-4xl mx-auto text-center z-30 pb-2 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {(currentItem.tag || currentItem.category || currentItem.issuer) && (
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1">
              {currentItem.tag || currentItem.category || (currentItem.year ? `${currentItem.year} • ${currentItem.issuer}` : currentItem.issuer)}
            </span>
          )}
          {currentItem.title && (
            <p className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
              {currentItem.title}
            </p>
          )}
          {/* Subtle swipe hint for mobile */}
          <div className="sm:hidden mt-2 text-[10px] font-mono text-brand-aqua/60 uppercase tracking-widest">
            {total > 1 ? "Swipe left/right for next" : "Tap anywhere to close"}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
