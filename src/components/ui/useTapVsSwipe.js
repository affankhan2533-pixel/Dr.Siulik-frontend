"use client";

import { useRef } from 'react';

/**
 * Hook to distinguish between a tap/click and a scroll/swipe gesture.
 * Guarantees that swiping/scrolling across media will NEVER accidentally trigger lightbox opening.
 * Lightbox only opens when movement remains strictly below the threshold (default 8px).
 */
export function useTapVsSwipe(onTap, threshold = 8) {
  const startPos = useRef({ x: 0, y: 0, time: 0 });
  const hasMoved = useRef(false);

  const onPointerDown = (e) => {
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    hasMoved.current = false;
  };

  const onPointerMove = (e) => {
    if (hasMoved.current) return;
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    if (dx > threshold || dy > threshold) {
      hasMoved.current = true;
    }
  };

  const onClick = (e) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onTap?.(e);
  };

  return {
    onPointerDown,
    onPointerMove,
    onClick,
  };
}
