"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { useTapVsSwipe } from '../ui/useTapVsSwipe';

const AUTHENTIC_TESTIMONIALS = [
  {
    id: "t1",
    title: "Patient Experience 01",
    category: "Consultation & Care",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0026.mp4",
  },
  {
    id: "t2",
    title: "Patient Experience 02",
    category: "Restorative Treatment",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0027.mp4",
  },
  {
    id: "t3",
    title: "Patient Experience 03",
    category: "Clinical Care Visit",
    videoUrl: "/assets/testimonials/videos/VID-20260904-WA0028.mp4",
  },
];

// ─── Inline Video Player Modal ──────────────────────────────────────────────
function VideoPlayer({ src, title, onClose }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seekTo = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    v.currentTime = (x / rect.width) * v.duration;
  };

  // Close on Escape and lock body scroll
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    const origOverflow = document.body.style.overflow;
    const origTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = origOverflow;
      document.body.style.touchAction = origTouchAction;
    };
  }, [onClose]);

  // Autoplay video on modal open
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-brand-textDark rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-aqua/20 shadow-2xl"
      >
        {/* Close button with min 48px touch target */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-black/70 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-brand-aqua touch-manipulation"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Frame */}
        <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-contain"
            onTimeUpdate={onTimeUpdate}
            onEnded={() => setPlaying(false)}
            playsInline
            preload="auto"
          />
          {/* Play button overlay when paused */}
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl border border-brand-aqua/30">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Video Controls Bar */}
        <div className="px-4 sm:px-5 py-3 sm:py-4 bg-brand-textDark flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-11 h-11 flex items-center justify-center text-white hover:text-brand-aqua transition-colors focus:outline-none touch-manipulation"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Progress Slider */}
          <div
            className="flex-1 h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
            onClick={seekTo}
            role="slider"
            aria-label="Video progress"
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="absolute inset-y-0 left-0 bg-brand-primary rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={toggleMute}
            className="w-11 h-11 flex items-center justify-center text-white hover:text-brand-aqua transition-colors focus:outline-none touch-manipulation"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileStoryRailCard({ story, index, isActive, onSelect, onPlay }) {
  const tapHandlers = useTapVsSwipe(() => {
    onSelect(story);
    onPlay(story);
  });

  return (
    <div
      {...tapHandlers}
      className={`w-[75vw] sm:w-[300px] shrink-0 snap-start rounded-2xl overflow-hidden border p-3 flex flex-col gap-2.5 transition-all duration-300 cursor-pointer ${
        isActive
          ? 'border-brand-aqua/60 bg-brand-primary/20 shadow-teal-glow'
          : 'border-brand-aqua/15 bg-white/5 hover:border-brand-aqua/30'
      }`}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
        <video
          src={story.videoUrl}
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-80 pointer-events-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isActive ? 'bg-brand-aqua text-brand-textDark' : 'bg-white/30 text-white'
          }`}>
            <Play className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </div>
      <div>
        <span className="text-[9px] font-mono tracking-widest text-brand-aqua/80 uppercase block">
          {story.category}
        </span>
        <p className="font-sans text-xs font-semibold text-white mt-0.5 truncate">
          {story.title}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [featured, setFeatured] = useState(AUTHENTIC_TESTIMONIALS[0]);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const easeEditorial = [0.16, 1, 0.3, 1];

  const featuredTapHandlers = useTapVsSwipe(() => setLightboxVideo(featured));

  return (
    <section id="testimonials" className="py-10 sm:py-20 lg:py-24 bg-brand-textDark relative overflow-hidden">
      <div className="teal-ambient-glow top-0 left-0 opacity-12 pointer-events-none" />
      <div className="teal-ambient-glow bottom-0 right-0 opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-brand-aqua/15" />

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
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-aqua uppercase block mb-1.5 sm:mb-3">
              PATIENT STORIES
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Real experiences.<br />
              <span className="text-brand-aqua italic font-normal">Genuine conversations.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-base text-white/70 leading-relaxed font-sans max-w-md">
              Authentic patient care videos documented at Dr. Siulik&apos;s Dental Care.
            </p>
          </div>
        </motion.div>

        {/* Video Showcase Layout: Featured player card + stories selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">

          {/* Featured Active Video Card */}
          <div className="lg:col-span-8">
            <div
              {...featuredTapHandlers}
              className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group border border-brand-aqua/20 bg-black shadow-2xl w-full"
            >
              {/* Native Video Background Frame */}
              <video
                key={featured.id}
                src={featured.videoUrl}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Center Play Target */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-brand-aqua text-brand-textDark flex items-center justify-center shadow-teal-glow group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 sm:w-8 h-6 sm:h-8 ml-0.5 fill-brand-textDark" />
                </div>
              </div>

              {/* Patient Banner Overlay */}
              <div className="absolute bottom-3.5 sm:bottom-6 left-3.5 sm:left-6 right-3.5 sm:right-6 text-white pointer-events-none">
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand-aqua uppercase block mb-1">
                  CLINICAL VIDEO
                </span>
                <p className="font-serif font-bold text-sm sm:text-xl leading-snug text-white">
                  {featured.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-white/70 text-xs">
                  <span>{featured.category}</span>
                  <span>&bull;</span>
                  <span className="text-brand-aqua">Tap to Play Full Video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/50 uppercase">
                STORIES ({AUTHENTIC_TESTIMONIALS.length})
              </p>
              <span className="text-[10px] font-mono text-white/40 lg:hidden">&larr; Swipe stories &rarr;</span>
            </div>

            {/* Mobile: Swipeable Story Rail with ~75vw Peek */}
            <div
              className="flex lg:hidden gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar snap-x snap-mandatory touch-pan-x"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
              }}
            >
              {AUTHENTIC_TESTIMONIALS.map((v, idx) => (
                <MobileStoryRailCard
                  key={v.id}
                  story={v}
                  index={idx}
                  isActive={v.id === featured.id}
                  onSelect={setFeatured}
                  onPlay={setLightboxVideo}
                />
              ))}
            </div>

            {/* Mobile: Quick Selector Pills */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
              {AUTHENTIC_TESTIMONIALS.map((v, idx) => {
                const isActive = v.id === featured.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setFeatured(v)}
                    className={`px-4 py-2 min-h-[44px] rounded-full text-xs font-semibold whitespace-nowrap transition-all border touch-manipulation focus:outline-none ${
                      isActive
                        ? 'bg-brand-primary text-white border-brand-primary shadow-teal-glow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-aqua/40 hover:text-white'
                    }`}
                  >
                    Story 0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Desktop: Vertical Card Stack */}
            <div className="hidden lg:flex flex-col gap-3">
              {AUTHENTIC_TESTIMONIALS.map((v) => {
                const isActive = v.id === featured.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setFeatured(v)}
                    className={`w-full text-left group rounded-2xl overflow-hidden border transition-all duration-300 touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-aqua ${
                      isActive
                        ? 'border-brand-aqua/60 bg-brand-primary/20 shadow-teal-glow'
                        : 'border-brand-aqua/15 bg-white/5 hover:border-brand-aqua/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex gap-4 p-3.5 sm:p-4 items-center">
                      <div className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 bg-black border border-white/10">
                        <video
                          src={v.videoUrl}
                          muted
                          playsInline
                          preload="none"
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity pointer-events-none"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-brand-aqua text-brand-textDark' : 'bg-white/30 text-white'}`}>
                            <Play className="w-3 h-3 ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-mono tracking-[0.2em] text-brand-aqua/80 uppercase block truncate">
                          {v.category}
                        </span>
                        <p className={`font-sans text-sm font-semibold mt-0.5 truncate ${isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>
                          {v.title}
                        </p>
                        <span className="text-[10px] text-brand-aqua/60 font-mono mt-0.5 block">
                          Tap to select
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Video Player */}
      <AnimatePresence>
        {lightboxVideo && (
          <VideoPlayer
            src={lightboxVideo.videoUrl}
            title={lightboxVideo.title}
            onClose={() => setLightboxVideo(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
