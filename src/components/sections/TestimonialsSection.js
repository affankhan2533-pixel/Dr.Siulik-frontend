"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const AUTHENTIC_STORIES = [
  {
    id: "story-01",
    num: "01",
    total: "03",
    label: "PATIENT STORY",
    title: "Patient Experience 01",
    category: "Consultation & Care",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0026.mp4",
    poster: "/assets/testimonials/thumbnails/thumb-1.webp",
  },
  {
    id: "story-02",
    num: "02",
    total: "03",
    label: "PATIENT STORY",
    title: "Patient Experience 02",
    category: "Restorative Treatment",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0027.mp4",
    poster: "/assets/testimonials/thumbnails/thumb-2.webp",
  },
  {
    id: "story-03",
    num: "03",
    total: "03",
    label: "PATIENT STORY",
    title: "Patient Experience 03",
    category: "Clinical Care Visit",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0028.mp4",
    poster: "/assets/testimonials/thumbnails/thumb-3.webp",
  },
];

function formatTime(secs) {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function TestimonialsSection() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const activeStory = AUTHENTIC_STORIES[activeStoryIdx] || AUTHENTIC_STORIES[0];

  // Pause and reset video when story changes
  const selectStory = useCallback((idx) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setActiveStoryIdx(idx);
  }, []);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setDuration(v.duration);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    } else if (v.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
    }
  };

  // Activity timer for controls overlay on desktop/mobile
  const handleUserActivity = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <section
      id="testimonials"
      className="pt-8 sm:pt-14 lg:pt-16 pb-28 sm:pb-16 lg:pb-20 bg-brand-textDark relative overflow-hidden select-none border-t border-brand-aqua/15 scroll-mt-24"
      aria-label="Patient Stories"
    >
      {/* Subtle Ambient Glows */}
      <div className="teal-ambient-glow top-0 left-0 opacity-15 pointer-events-none" />
      <div className="teal-ambient-glow bottom-0 right-0 opacity-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── 1. Minimal Editorial Header ── */}
        <div className="mb-4 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-aqua uppercase block mb-1">
            PATIENT STORIES
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Real experiences.
          </h2>
        </div>

        {/* ── Desktop & Mobile Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* ── Left / Dominant Video Viewer (Hero Element) ── */}
          <div className="lg:col-span-8">

            {/* Video Canvas Container (92vw-96vw feel on mobile) */}
            <div
              className="relative aspect-[4/3] sm:aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-brand-aqua/20 shadow-2xl group"
              onMouseMove={handleUserActivity}
              onTouchStart={handleUserActivity}
            >
              {/* Cinematic Blurred Ambient Frame of Real Patient */}
              <img
                src={activeStory.poster}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-30 pointer-events-none transition-opacity duration-500"
                aria-hidden="true"
              />

              {/* Video Element */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative z-10 flex items-center justify-center"
                >
                  <video
                    ref={videoRef}
                    src={activeStory.videoUrl}
                    poster={activeStory.poster}
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onClick={togglePlay}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Big Centered Play Trigger (shown when paused) */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 cursor-pointer backdrop-blur-[2px] transition-all"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${activeStory.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePlay(e);
                    }
                  }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-aqua text-brand-textDark flex items-center justify-center shadow-teal-glow transition-transform hover:scale-110 active:scale-95">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-1 fill-brand-textDark" />
                  </div>
                </div>
              )}

              {/* Minimal Clean Video Controls Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 flex flex-col gap-2 transition-opacity duration-300 ${
                  !isPlaying || showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Scrub Progress Bar */}
                <div
                  className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden flex items-center"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Video progress"
                  aria-valuenow={Math.round(progress)}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-aqua rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full hover:bg-white/10 flex items-center justify-center text-white hover:text-brand-aqua transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full hover:bg-white/10 flex items-center justify-center text-white hover:text-brand-aqua transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua"
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    <span className="text-[10px] sm:text-xs font-mono text-white/80 tabular-nums">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full hover:bg-white/10 flex items-center justify-center text-white hover:text-brand-aqua transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── 3. Single Clean Media Label (No Duplicate Text) ── */}
            <div className="mt-3.5 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] text-brand-aqua uppercase block">
                  {activeStory.label}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-white mt-0.5">
                  {activeStory.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-brand-aqua font-bold tracking-widest block">
                  {activeStory.num} / {activeStory.total}
                </span>
                <span className="text-[11px] font-mono text-white/50 block mt-0.5">
                  {activeStory.category}
                </span>
              </div>
            </div>

            {/* ── 15. Cinematic Detail: Subtle Segmented Progress Indicator ── */}
            <div className="w-full h-[2px] bg-white/10 rounded-full mt-3 overflow-hidden flex gap-1">
              {AUTHENTIC_STORIES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-full flex-1 transition-all duration-300 ${
                    idx === activeStoryIdx
                      ? 'bg-brand-aqua shadow-[0_0_8px_rgba(94,215,213,0.6)]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* ── 6. Mobile Story Rail (Native Horizontal Swipe) ── */}
            <div className="lg:hidden mt-4">
              <div
                className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar snap-x snap-mandatory touch-pan-x"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollSnapType: 'x mandatory',
                }}
              >
                {AUTHENTIC_STORIES.map((story, idx) => {
                  const isActive = idx === activeStoryIdx;
                  return (
                    <button
                      key={story.id}
                      onClick={() => selectStory(idx)}
                      className={`w-[76vw] sm:w-[280px] shrink-0 snap-start p-3 rounded-lg text-left transition-all duration-200 border flex items-center gap-3 touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua ${
                        isActive
                          ? 'border-brand-aqua/60 bg-white/10 text-white shadow-teal-glow'
                          : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/25'
                      }`}
                      style={{ scrollSnapAlign: 'start' }}
                      aria-selected={isActive}
                      role="tab"
                    >
                      {/* Authentic Patient Thumbnail */}
                      <div className="w-14 h-14 rounded overflow-hidden shrink-0 bg-black relative border border-white/10">
                        <img
                          src={story.poster}
                          alt={`${story.title} video thumbnail`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center ${
                            isActive ? 'bg-brand-aqua/20 text-brand-aqua' : 'bg-black/40 text-white/80'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Story Metadata */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-[10px] font-mono font-bold tracking-wider ${
                              isActive ? 'text-brand-aqua' : 'text-white/40'
                            }`}
                          >
                            {story.num}
                          </span>
                          <span className="text-[9px] font-mono text-brand-aqua/80 tracking-widest uppercase">
                            {story.label}
                          </span>
                        </div>
                        <p
                          className={`text-xs font-sans font-semibold truncate ${
                            isActive ? 'text-white' : 'text-white/70'
                          }`}
                        >
                          {story.title}
                        </p>
                        <span className="text-[10px] text-white/40 font-mono block truncate mt-0.5">
                          {story.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Swipe Cue */}
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-2 px-1">
                <span>&larr; Swipe stories &rarr;</span>
                <span className="text-brand-aqua/80">Tap to view</span>
              </div>
            </div>

          </div>

          {/* ── 17. Desktop Story Selector (Vertical Editorial Index) ── */}
          <div
            role="tablist"
            aria-label="Patient Stories Index"
            className="hidden lg:flex lg:col-span-4 flex-col border-t border-brand-aqua/15 divide-y divide-brand-aqua/15"
          >
            {AUTHENTIC_STORIES.map((story, idx) => {
              const isActive = idx === activeStoryIdx;
              return (
                <button
                  key={story.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectStory(idx)}
                  className={`w-full py-4 text-left transition-all duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-aqua ${
                    isActive
                      ? 'pl-4 border-l-2 border-brand-aqua bg-white/5'
                      : 'pl-0 border-l-2 border-transparent hover:pl-2 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-mono text-xs font-bold tracking-widest transition-colors duration-200 ${
                          isActive ? 'text-brand-aqua' : 'text-white/40 group-hover:text-brand-aqua'
                        }`}
                      >
                        {story.num}
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`font-sans text-xs tracking-wider uppercase block truncate transition-colors ${
                            isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          {story.title}
                        </span>
                        <span className="text-[10px] font-mono text-brand-aqua/70 block mt-0.5">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-xs text-brand-aqua font-mono transition-opacity duration-200 shrink-0 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                      }`}
                    >
                      ●
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Factual Transparency Footnote */}
            <div className="pt-4 mt-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                AUTHENTIC PATIENT DOCUMENTATION
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
