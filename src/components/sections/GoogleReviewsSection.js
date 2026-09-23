"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, X, ArrowUpRight } from 'lucide-react';

// ─── GOOGLE REVIEW DESTINATION URL ───────────────────────────────────────────
// Set this to the clinic's official Google Business Profile write-a-review URL.
// Leave empty ("") until the real URL is confirmed — the CTA will be disabled.
// Do NOT use any of the 9 individual share.google review reading URLs here.
const GOOGLE_REVIEW_URL = "";

// ─── REVIEW DATA ──────────────────────────────────────────────────────────────
// To add or update a review, edit this array only.
// The UI automatically handles numbering, stars, and layout.
// Leave reviewerName / reviewText / date / rating as null until authentic data is confirmed.
// googleUrl values are official clinic-supplied links — do not change them.

const REVIEWS = [
  {
    id: 1,
    reviewerName: "Bright human future",
    reviewText: "My mother recently visited Dr. Siulik for a tooth extraction, and the experience was excellent. Dr. Siulik was incredibly professional, explaining the entire process and ensuring my mother felt at ease throughout the procedure. The \u2026",
    rating: 5,
    date: "6 months ago",
    googleUrl: "https://share.google/Dm4isPQaHrTFNDpLQ",
    verified: true,
  },
  {
    id: 2,
    reviewerName: "Sidhyananda Pradhan",
    reviewText: "I recently had a surgical tooth extraction at this clinic and had a great experience. The staff was incredibly welcoming, and the clinic was spotless. The dentist explained everything clearly and made sure I was completely comfortable and \u2026",
    rating: 5,
    date: "3 months ago",
    googleUrl: "https://share.google/jDoSEuYbSQUIAvtCn",
    verified: true,
  },
  {
    id: 3,
    reviewerName: "Saraswati Ho",
    reviewText: "I have done wisdom tooth surgery.The procedure was smooth and quick. Professional doctor with good behaviour.and hygienic clinic. Highly recommend.",
    rating: 5,
    date: "4 months ago",
    googleUrl: "https://share.google/OoCx1LG7uoMnikbRR",
    verified: true,
  },
  {
    id: 4,
    reviewerName: "Mansi Bhoi",
    reviewText: "Excellent Service. Friendly staff.good doctor Highly recommend!",
    rating: 5,
    date: "2 months ago",
    googleUrl: "https://share.google/YklpWBbtUECCKK1d0",
    verified: true,
  },
  {
    id: 5,
    reviewerName: "Tuna Baga",
    reviewText: "Highly recommended this clinic..Best doctor available here.all dental solutions are available.thank you madam.",
    rating: 5,
    date: "3 weeks ago",
    googleUrl: "https://share.google/RRWssd8n0YS4SQhxa",
    verified: true,
  },
  {
    id: 6,
    reviewerName: "prakaskumar das",
    reviewText: "I had a tooth extracted at Dr. Siuliks Dental Clinic and the entire experience was smooth and comfortable. The doctor was very supportive, explained each step clearly, and gave excellent aftercare advice. I really appreciate the professionalism and care. Highly recommended!!!",
    rating: 5,
    date: "7 months ago",
    googleUrl: "https://share.google/gQleNjCdL6soTovG4",
    verified: true,
  },
  {
    id: 7,
    reviewerName: "Shreya Mohanty",
    reviewText: "Recently got my cavity removed, the procedure went smoothly and I felt no pain at all. They maintained proper hygiene too while operating.",
    rating: 5,
    date: "2 months ago",
    googleUrl: "https://share.google/MKck8bJbnvPl9CHwY",
    verified: true,
  },
  {
    id: 8,
    reviewerName: "Soumyashree Nayak",
    reviewText: "Dr. Siulik is absolutely amazing! She is not only highly experienced but also truly passionate about her work. I went to her for a root canal treatment, and the entire process was smooth and painless. From the moment I walked into her \u2026",
    rating: 5,
    date: "a year ago",
    googleUrl: "https://share.google/W6tIBfmG5Ik2sebOK",
    verified: true,
  },
  {
    id: 9,
    reviewerName: "Rajinder Lal",
    reviewText: "Painless treatment, Dr. Siulik clearely explained to me before treatment. Clinic having high hygiene standards, Dr. Siulik and her assistants/staff are professional & friendly and having modern tech/equipments and a comfortable, calming \u2026",
    rating: 5,
    date: "Edited 8 months ago",
    googleUrl: "https://share.google/iRKN8cxj5Yx7XaQvL",
    verified: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => String(n).padStart(2, '0');

// ─── Google "G" mark ──────────────────────────────────────────────────────────
function GoogleMark({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
      <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
      <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
      <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
    </svg>
  );
}

// ─── Dynamic star renderer ────────────────────────────────────────────────────
// Supports ratings 1–5. rating=null shows 5 muted placeholder stars.
// A review with rating 4 shows 4 filled + 1 empty. Never hardcodes 5 filled.
function StarRow({ rating, size = "sm" }) {
  const total = 5;
  const filled = rating != null ? Math.min(5, Math.max(1, Math.round(rating))) : 0;
  const sz = size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";

  if (rating == null) {
    return (
      <span className="flex items-center gap-0.5" aria-label="Rating not yet confirmed">
        {[...Array(total)].map((_, i) => (
          <Star key={i} className={`${sz} text-brand-primary/20 fill-brand-primary/10`} />
        ))}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(total)].map((_, i) => (
        <Star
          key={i}
          className={`${sz} ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-brand-textMuted/20 fill-transparent'}`}
        />
      ))}
    </span>
  );
}

// ─── Active Review Panel (Desktop + Tablet) ───────────────────────────────────
function ActiveReviewPanel({ review, index, total }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={review.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5 min-h-[280px]"
      >
        {/* Oversized index number */}
        <div className="flex items-baseline gap-2">
          <span className="font-mono font-bold text-[38px] sm:text-[46px] leading-none tracking-tighter text-brand-primary/15 select-none">
            {fmt(index + 1)}
          </span>
          <span className="font-mono text-xs text-brand-textMuted/40 tracking-[0.12em]">
            / {fmt(total)}
          </span>
        </div>

        {/* Dynamic stars + rating */}
        <div className="flex items-center gap-3">
          <StarRow rating={review.rating} size="lg" />
          {review.rating != null && (
            <span className="font-mono text-sm text-brand-textMuted font-bold tracking-wider">
              {review.rating}.0 / 5
            </span>
          )}
        </div>

        {/* Reviewer name & Date */}
        <div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-textDark tracking-tight">
            {review.reviewerName || `Google Reviewer ${fmt(index + 1)}`}
          </h3>
          {review.date && (
            <p className="font-mono text-[11px] tracking-[0.14em] text-brand-textMuted/60 uppercase mt-1">
              {review.date}
            </p>
          )}
        </div>

        {/* Authentic review text */}
        {review.reviewText && (
          <blockquote className="border-l-2 border-brand-primary/30 pl-5 sm:pl-6 my-1">
            <p className="font-sans text-base sm:text-lg text-brand-textDark leading-relaxed font-light italic">
              &ldquo;{review.reviewText}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Google CTA */}
        <a
          href={review.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            review.reviewerName
              ? `Read ${review.reviewerName}'s review on Google`
              : `View Google review ${index + 1}`
          }
          className="group inline-flex items-center gap-2 w-fit mt-auto pt-3"
        >
          <GoogleMark className="w-4 h-4 shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" />
          <span className="font-mono font-bold text-[11px] tracking-[0.18em] text-brand-primary uppercase group-hover:text-brand-deep transition-colors">
            VIEW ON GOOGLE
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-brand-primary/60 group-hover:text-brand-deep transition-colors" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Desktop Numbered Navigator ───────────────────────────────────────────────
function ReviewIndex({ reviews, activeIdx, onSelect }) {
  return (
    <nav aria-label="Review navigator" className="flex flex-col divide-y divide-brand-primary/8">
      {reviews.map((review, i) => {
        const active = i === activeIdx;
        return (
          <button
            key={review.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`View review ${i + 1} of ${reviews.length}`}
            aria-current={active ? 'true' : undefined}
            className={`group flex items-center justify-between gap-3 px-3 py-2.5 text-left rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
              active ? 'bg-brand-soft/70' : 'hover:bg-brand-soft/30'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`font-mono font-bold text-xs tabular-nums shrink-0 transition-colors ${
                active ? 'text-brand-primary' : 'text-brand-textMuted/35 group-hover:text-brand-textMuted'
              }`}>
                {fmt(i + 1)}
              </span>
              <span className={`font-sans text-xs truncate transition-colors ${
                active ? 'text-brand-textDark font-semibold' : 'text-brand-textMuted/50 group-hover:text-brand-textMuted'
              }`}>
                {review.reviewerName || `Google Review ${fmt(i + 1)}`}
              </span>
            </div>
            <div className="shrink-0">
              <StarRow rating={review.rating} size="sm" />
            </div>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Mobile Swipe Card ────────────────────────────────────────────────────────
function MobileReviewCard({ review, index, total }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = (review.reviewText || '').length > 170;

  return (
    <article
      className="min-w-[85vw] max-w-[340px] flex-shrink-0 flex flex-col gap-4 p-5 bg-white border border-brand-primary/12 rounded-2xl shadow-soft snap-start"
      aria-label={`Review ${index + 1} of ${total}`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono font-bold text-[28px] leading-none tracking-tighter text-brand-primary/15 select-none">
          {fmt(index + 1)}
        </span>
        <GoogleMark className="w-4 h-4 opacity-55 mt-0.5" />
      </div>

      <div className="flex items-center gap-2">
        <StarRow rating={review.rating} size="sm" />
        {review.rating != null && (
          <span className="font-mono text-[11px] text-brand-textMuted font-bold">
            {review.rating}.0 / 5
          </span>
        )}
      </div>

      <div>
        <h3 className="font-serif font-bold text-base text-brand-textDark tracking-tight">
          {review.reviewerName || `Google Reviewer ${fmt(index + 1)}`}
        </h3>
        {review.date && (
          <p className="font-mono text-[10px] tracking-[0.14em] text-brand-textMuted/60 uppercase mt-0.5">
            {review.date}
          </p>
        )}
      </div>

      <div className="flex-1">
        <p className={`font-sans text-sm text-brand-textDark leading-relaxed font-light italic ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
          &ldquo;{review.reviewText}&rdquo;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="font-mono text-[10px] tracking-wider text-brand-primary uppercase mt-2 underline underline-offset-2 touch-manipulation"
          >
            {expanded ? 'SHOW LESS' : 'READ FULL REVIEW'}
          </button>
        )}
      </div>

      <a
        href={review.googleUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          review.reviewerName
            ? `Read ${review.reviewerName}'s review on Google`
            : `View Google review ${index + 1}`
        }
        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 min-h-[44px] rounded-full border border-brand-primary/18 bg-brand-soft/40 hover:bg-brand-soft transition-colors touch-manipulation"
      >
        <GoogleMark className="w-3.5 h-3.5 shrink-0" />
        <span className="font-mono font-bold text-[10px] tracking-[0.16em] text-brand-primary uppercase">
          VIEW ON GOOGLE
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-brand-primary/60 shrink-0" />
      </a>
    </article>
  );
}

// ─── Interactive Star Selector (write-mode) ──────────────────────────────────
// Entirely separate from the read-only StarRow used in review display.
function InteractiveStars({ selected, hovered, onSelect, onHover, onLeave }) {
  const labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  return (
    <div
      className="flex items-center gap-2"
      role="radiogroup"
      aria-label="Select your star rating"
      onMouseLeave={onLeave}
    >
      {[1, 2, 3, 4, 5].map((val) => {
        const active = val <= (hovered ?? selected ?? 0);
        return (
          <button
            key={val}
            type="button"
            role="radio"
            aria-checked={selected === val}
            aria-label={`${val} ${val === 1 ? 'star' : 'stars'} — ${labels[val - 1]}`}
            onClick={() => onSelect(val)}
            onMouseEnter={() => onHover(val)}
            className="group p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 rounded-sm touch-manipulation"
          >
            <motion.div
              animate={{
                scale: active ? 1.15 : 1,
              }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <Star
                className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-150 ${
                  active
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-brand-primary/20 fill-transparent'
                }`}
              />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Leave Review Modal ───────────────────────────────────────────────────────
function LeaveReviewModal({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [redirected, setRedirected] = useState(false);
  const hasDestination = Boolean(GOOGLE_REVIEW_URL);
  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  // ESC closes, trap focus within dialog
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleContinue = () => {
    if (!hasDestination || !selected) return;
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    setRedirected(true);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-brand-textDark/60 backdrop-blur-[3px]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Dialog panel */}
      <motion.div
        key="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-heading"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-md bg-white rounded-2xl shadow-glass border border-brand-primary/12 overflow-hidden"
        style={{ paddingBottom: 'max(1.5rem, calc(1.5rem + env(safe-area-inset-bottom, 0px)))' }}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <span className="font-mono text-[10px] tracking-[0.18em] text-brand-primary/60 uppercase">
            YOUR EXPERIENCE
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close review panel"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-brand-primary/15 hover:border-brand-primary/40 text-brand-textMuted hover:text-brand-textDark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pt-5 pb-0">
          {redirected ? (
            /* Post-redirect thank-you state */
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <GoogleMark className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-xl text-brand-textDark tracking-tight mb-2">
                Thank you.
              </h2>
              <p className="font-sans text-sm text-brand-textMuted leading-relaxed">
                Your review window has opened on Google.<br />
                Please complete your experience there.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 font-mono text-[11px] tracking-[0.16em] text-brand-textMuted/60 hover:text-brand-primary uppercase transition-colors"
              >
                CLOSE
              </button>
            </motion.div>
          ) : (
            <>
              {/* Heading */}
              <div className="mb-5">
                <h2
                  id="review-modal-heading"
                  className="font-serif font-bold text-2xl text-brand-textDark tracking-tight leading-snug"
                >
                  How was your experience?
                </h2>
                <p className="font-sans text-xs text-brand-textMuted mt-1.5 leading-relaxed">
                  Your feedback helps patients understand the experience at Dr. Siulik&apos;s Dental Care.
                </p>
              </div>

              {/* Thin divider */}
              <div className="h-px bg-brand-primary/10 mb-5" />

              {/* Interactive stars */}
              <div className="flex flex-col items-center gap-4 py-2">
                <InteractiveStars
                  selected={selected}
                  hovered={hovered}
                  onSelect={setSelected}
                  onHover={setHovered}
                  onLeave={() => setHovered(null)}
                />

                {/* Dynamic rating display */}
                <AnimatePresence mode="wait">
                  {selected != null ? (
                    <motion.div
                      key={selected}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <span className="font-mono font-bold text-[13px] tracking-[0.16em] text-brand-primary uppercase">
                        YOUR RATING
                      </span>
                      <span className="font-serif font-bold text-3xl text-brand-textDark tracking-tight leading-none">
                        {selected} / 5
                      </span>
                      <span className="font-sans text-xs text-brand-textMuted">
                        {ratingLabels[selected]}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-sans text-xs text-brand-textMuted/50"
                    >
                      Tap a star to rate your visit
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Thin divider */}
              <div className="h-px bg-brand-primary/10 mt-5 mb-5" />

              {/* CTA */}
              {hasDestination ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selected}
                  aria-label={selected ? `Continue to Google with ${selected} star rating` : 'Select a rating to continue'}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 min-h-[48px] rounded-full font-mono font-bold text-[11px] tracking-[0.18em] uppercase transition-all duration-250 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    selected
                      ? 'bg-brand-primary text-white hover:bg-brand-deep shadow-teal-glow'
                      : 'bg-brand-primary/10 text-brand-textMuted/50 cursor-not-allowed'
                  }`}
                >
                  <GoogleMark className="w-4 h-4 shrink-0" />
                  <span>CONTINUE TO GOOGLE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ) : (
                /* Disabled state — URL not yet configured */
                <button
                  type="button"
                  disabled
                  aria-label="Google review destination not yet configured"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 min-h-[48px] rounded-full bg-brand-primary/8 text-brand-textMuted/40 font-mono font-bold text-[11px] tracking-[0.18em] uppercase cursor-not-allowed"
                >
                  <span>REVIEW LINK PENDING CONFIGURATION</span>
                </button>
              )}

              {/* Honest micro-disclaimer */}
              <p className="font-sans text-[10px] text-brand-textMuted/40 text-center mt-3 leading-relaxed">
                Your review will be completed securely on Google.
              </p>
            </>
          )}
        </div>

        {/* Bottom spacer for safe-area */}
        <div className="h-1.5" />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Story Panel: Unique inline on-site review composer ───────────────────────
// "Write your story" — feels like leaving a note in a clinical journal.
// Sections: ritual star selector → typewriter textarea → live preview → submit.
const STORY_LABELS = ['', 'Difficult', 'Ordinary', 'Good', 'Very Good', 'Exceptional'];
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const MAX_CHARS = 500;

function StoryPanel() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0=closed,1=stars,2=story,3=preview,4=sent
  const [rating, setRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  const charsLeft = MAX_CHARS - story.length;
  const activeRating = hoveredRating ?? rating ?? 0;

  // Auto-focus textarea when step 2 opens
  useEffect(() => {
    if (step === 2 && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 350);
    }
  }, [step]);

  const handleOpen = () => { setOpen(true); setStep(1); };
  const handleClose = () => { setOpen(false); setTimeout(() => { setStep(0); setRating(null); setName(''); setStory(''); setError(''); }, 400); };

  const handleSubmit = async () => {
    if (!name.trim() || !rating || story.trim().length < 10) {
      setError('Please fill in your name, select a rating, and write at least 10 characters.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/reviews/site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), rating, reviewText: story.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed.');
      setStep(4);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-t border-brand-primary/12 pt-8">
      {/* ── Trigger row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-brand-primary/50 uppercase block mb-1">
            PATIENT STORIES
          </span>
          <p className="font-serif font-bold text-lg sm:text-xl text-brand-textDark tracking-tight leading-snug">
            Leave your story here.
          </p>
          <p className="font-sans text-xs text-brand-textMuted leading-relaxed mt-0.5 max-w-xs">
            Write your experience directly — it helps future patients.
          </p>
        </div>

        {!open && (
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open review composer"
            className="group flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm touch-manipulation"
          >
            <div className="text-right">
              <span className="font-mono font-bold text-sm tracking-[0.14em] text-brand-primary uppercase group-hover:text-brand-deep transition-colors block">
                WRITE YOUR STORY
              </span>
              <span className="font-mono text-[10px] tracking-widest text-brand-textMuted/40 uppercase">
                on this page
              </span>
            </div>
            <div className="w-9 h-9 rounded-full border border-brand-primary/25 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-soft transition-all duration-200">
              <Star className="w-4 h-4 text-brand-primary" />
            </div>
          </button>
        )}
      </div>

      {/* ── Animated composer panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              {/* Close row */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.18em] text-brand-primary/50 uppercase">
                  YOUR STORY / {String(step).padStart(2,'0')}
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close story panel"
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-brand-primary/15 hover:border-brand-primary/40 text-brand-textMuted hover:text-brand-textDark transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary touch-manipulation"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ══ STEP 4: Success ══ */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center py-10 text-center gap-4"
                >
                  {/* Seal */}
                  <div className="w-16 h-16 rounded-full border-2 border-brand-primary/30 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      <span className="text-2xl">✦</span>
                    </motion.div>
                  </div>
                  <div>
                    <p className="font-mono font-bold text-[11px] tracking-[0.2em] text-brand-primary uppercase">
                      STORY RECEIVED
                    </p>
                    <h3 className="font-serif font-bold text-2xl text-brand-textDark mt-1 tracking-tight">
                      Thank you, {name}.
                    </h3>
                    <p className="font-sans text-sm text-brand-textMuted mt-2 leading-relaxed max-w-sm">
                      Your experience has been submitted and will appear after a brief review.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-2 font-mono text-[10px] tracking-[0.16em] text-brand-textMuted/50 hover:text-brand-primary uppercase transition-colors"
                  >
                    CLOSE
                  </button>
                </motion.div>
              )}

              {step < 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* ── Left column: form ── */}
                  <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* ─ Step 1: Star ritual ─ */}
                    <div className={`transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                      <p className="font-mono text-[10px] tracking-[0.16em] text-brand-primary/60 uppercase mb-3">
                        01 &mdash; HOW WOULD YOU RATE YOUR VISIT?
                      </p>
                      <div
                        className="flex items-center gap-1.5 sm:gap-2"
                        role="radiogroup"
                        aria-label="Rating"
                        onMouseLeave={() => setHoveredRating(null)}
                      >
                        {[1,2,3,4,5].map((v) => (
                          <button
                            key={v}
                            type="button"
                            role="radio"
                            aria-checked={rating === v}
                            aria-label={`${v} star${v > 1 ? 's' : ''} — ${STORY_LABELS[v]}`}
                            onClick={() => { setRating(v); if (step === 1) setStep(2); }}
                            onMouseEnter={() => setHoveredRating(v)}
                            className="p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary touch-manipulation"
                          >
                            <motion.div
                              animate={{ scale: v <= activeRating ? 1.2 : 1 }}
                              transition={{ duration: 0.15, ease: 'easeOut' }}
                            >
                              <Star className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-150 ${
                                v <= activeRating ? 'text-amber-400 fill-amber-400' : 'text-brand-primary/20 fill-transparent'
                              }`} />
                            </motion.div>
                          </button>
                        ))}
                        {activeRating > 0 && (
                          <motion.span
                            key={activeRating}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-mono text-xs text-brand-textMuted font-semibold ml-2 tracking-wider"
                          >
                            {STORY_LABELS[activeRating]}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* ─ Step 2: Name + story ─ */}
                    <AnimatePresence>
                      {step >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col gap-4"
                        >
                          {/* Name */}
                          <div>
                            <p className="font-mono text-[10px] tracking-[0.16em] text-brand-primary/60 uppercase mb-2">
                              02 &mdash; YOUR NAME
                            </p>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value.slice(0, 60))}
                              placeholder="First name or initials"
                              aria-label="Your name"
                              className="w-full font-sans text-sm text-brand-textDark bg-transparent border-b border-brand-primary/20 focus:border-brand-primary pb-2 outline-none placeholder:text-brand-textMuted/35 transition-colors"
                            />
                          </div>

                          {/* Story textarea */}
                          <div>
                            <p className="font-mono text-[10px] tracking-[0.16em] text-brand-primary/60 uppercase mb-2">
                              03 &mdash; YOUR EXPERIENCE
                            </p>
                            <div className="relative">
                              <textarea
                                ref={textareaRef}
                                value={story}
                                onChange={(e) => { setStory(e.target.value.slice(0, MAX_CHARS)); if (step === 2 && e.target.value.length > 0) setStep(3); }}
                                placeholder="Describe your visit — what stood out, how you felt, what made it different…"
                                aria-label="Your review story"
                                rows={5}
                                className="w-full font-sans text-sm text-brand-textDark bg-brand-soft/30 border border-brand-primary/12 focus:border-brand-primary/40 rounded-lg p-4 outline-none placeholder:text-brand-textMuted/30 resize-none transition-colors leading-relaxed"
                              />
                              {/* Char count bar */}
                              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                <div className="w-16 h-0.5 bg-brand-primary/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full rounded-full ${charsLeft < 50 ? 'bg-amber-400' : 'bg-brand-primary/40'}`}
                                    animate={{ width: `${(story.length / MAX_CHARS) * 100}%` }}
                                    transition={{ duration: 0.2 }}
                                  />
                                </div>
                                <span className={`font-mono text-[10px] tabular-nums ${charsLeft < 50 ? 'text-amber-500' : 'text-brand-textMuted/40'}`}>
                                  {charsLeft}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Error */}
                          {error && (
                            <p className="font-sans text-xs text-red-500 leading-relaxed">
                              {error}
                            </p>
                          )}

                          {/* Submit */}
                          {step >= 3 && (
                            <motion.button
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              type="button"
                              onClick={handleSubmit}
                              disabled={submitting || !name.trim() || !rating || story.trim().length < 10}
                              className={`self-start inline-flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-full font-mono font-bold text-[11px] tracking-[0.18em] uppercase transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary touch-manipulation ${
                                submitting || !name.trim() || !rating || story.trim().length < 10
                                  ? 'bg-brand-primary/10 text-brand-textMuted/40 cursor-not-allowed'
                                  : 'bg-brand-textDark text-white hover:bg-brand-deep shadow-md'
                              }`}
                            >
                              {submitting ? (
                                <span className="flex items-center gap-2">
                                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  SENDING
                                </span>
                              ) : (
                                <>
                                  <span>SUBMIT STORY</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </motion.button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Right column: live preview ── */}
                  <div className="lg:col-span-5">
                    <AnimatePresence>
                      {step >= 3 && (name || story) && (
                        <motion.div
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <p className="font-mono text-[10px] tracking-[0.16em] text-brand-primary/50 uppercase mb-3">
                            PREVIEW
                          </p>
                          {/* Journal card */}
                          <div className="border border-brand-primary/15 rounded-xl p-5 bg-brand-soft/20 relative overflow-hidden">
                            {/* Decorative line accent */}
                            <div className="absolute top-0 left-0 w-0.5 h-full bg-brand-primary/20" />
                            <div className="pl-4">
                              {/* Stars preview */}
                              <div className="flex items-center gap-0.5 mb-3">
                                {[1,2,3,4,5].map(v => (
                                  <Star key={v} className={`w-3.5 h-3.5 ${v <= (rating ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-brand-primary/15 fill-transparent'}`} />
                                ))}
                                {rating && <span className="font-mono text-[10px] text-brand-textMuted ml-2">{rating}.0 / 5</span>}
                              </div>
                              {/* Story text */}
                              {story ? (
                                <p className="font-sans text-sm text-brand-textDark leading-relaxed italic">
                                  &ldquo;{story}&rdquo;
                                </p>
                              ) : (
                                <p className="font-sans text-sm text-brand-textMuted/30 italic">
                                  Your story will appear here…
                                </p>
                              )}
                              {/* Name */}
                              {name && (
                                <p className="font-mono text-[10px] tracking-[0.16em] text-brand-textMuted uppercase mt-4">
                                  &mdash; {name}
                                </p>
                              )}
                              {/* Pending badge */}
                              <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-primary/8 border border-brand-primary/12">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                <span className="font-mono text-[9px] tracking-widest text-brand-textMuted/60 uppercase">PENDING REVIEW</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {step < 3 && (
                      <div className="hidden lg:flex flex-col gap-2 pt-2">
                        <p className="font-mono text-[10px] tracking-[0.18em] text-brand-textMuted/30 uppercase">HOW IT WORKS</p>
                        {['Rate your visit','Write your story','See live preview','Submit'].map((s, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <span className={`font-mono text-[10px] w-5 ${step - 1 >= i ? 'text-brand-primary' : 'text-brand-textMuted/25'}`}>
                              {String(i+1).padStart(2,'0')}
                            </span>
                            <div className={`h-px flex-1 ${step - 1 >= i ? 'bg-brand-primary/30' : 'bg-brand-primary/8'} transition-colors duration-300`} />
                            <span className={`font-sans text-xs ${step - 1 >= i ? 'text-brand-textMuted' : 'text-brand-textMuted/30'} transition-colors duration-300`}>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function GoogleReviewsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = REVIEWS.length;
  const scrollRef = useRef(null);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMobileScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / (total + 1); // +1 for spacer
    const idx = Math.round(el.scrollLeft / cardWidth);
    setMobileIdx(Math.min(total - 1, Math.max(0, idx)));

  }, [total]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleMobileScroll);
  }, [handleMobileScroll]);

  return (
    <section
      id="google-reviews"
      className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-brand-primary/8 scroll-mt-24"
      aria-labelledby="reviews-headline"
    >
      {/* Ambient glow */}
      <div className="teal-ambient-glow -top-40 -left-24 opacity-18 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Editorial Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-14 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end"
        >
          <div className="lg:col-span-6">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block mb-2 sm:mb-3">
              GOOGLE REVIEWS
            </span>
            <h2
              id="reviews-headline"
              className="font-serif font-bold text-2xl sm:text-4xl lg:text-[2.6rem] text-brand-textDark leading-tight tracking-tight"
            >
              Real Experiences.{' '}
              <em className="not-italic text-brand-primary font-normal">Real Trust.</em>
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end items-start lg:items-end gap-3">
            <p className="font-sans text-xs sm:text-sm text-brand-textMuted leading-relaxed max-w-sm lg:text-right">
              Patient experiences, shared directly on Google.
            </p>
            <div className="flex items-center gap-3 w-full justify-between lg:justify-end">
              <span className="font-mono text-[10px] tracking-[0.18em] text-brand-textMuted/45 uppercase shrink-0">
                {fmt(total)} ENTRIES
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-soft/50 hover:bg-brand-soft hover:border-brand-primary/40 text-brand-primary font-mono font-bold text-[10px] tracking-[0.14em] uppercase transition-all duration-200"
              >
                <Star className="w-3 h-3 text-brand-primary fill-brand-primary/30" />
                <span>SHARE YOUR EXPERIENCE</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── DESKTOP: Index left (4 cols) + Active right (8 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="hidden lg:grid grid-cols-12 gap-12 items-start"
        >
          {/* Left: Numbered index */}
          <div className="col-span-4 border-t border-brand-primary/15 pt-1">
            <ReviewIndex reviews={REVIEWS} activeIdx={activeIdx} onSelect={setActiveIdx} />
            {/* Progress bar */}
            <div className="mt-4 h-px bg-brand-primary/8 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-primary/40 rounded-full"
                animate={{ width: `${((activeIdx + 1) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="font-mono text-[10px] tracking-widest text-brand-textMuted/35 uppercase mt-2">
              {fmt(activeIdx + 1)} / {fmt(total)} SELECTED
            </p>
          </div>

          {/* Right: Active review */}
          <div className="col-span-8 border-t border-brand-primary/15 pt-6">
            <ActiveReviewPanel review={REVIEWS[activeIdx]} index={activeIdx} total={total} />
          </div>
        </motion.div>

        {/* ── TABLET (sm to lg): Active on top, pill index below ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="hidden sm:block lg:hidden"
        >
          <div className="border-t border-brand-primary/15 pt-6 mb-8">
            <ActiveReviewPanel review={REVIEWS[activeIdx]} index={activeIdx} total={total} />
          </div>
          <div className="border-t border-brand-primary/12 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Select review ${i + 1}`}
                  aria-current={i === activeIdx ? 'true' : undefined}
                  className={`font-mono font-bold text-[11px] tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
                    i === activeIdx
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-brand-textMuted/55 border-brand-primary/15 hover:border-brand-primary/40'
                  }`}
                >
                  {fmt(i + 1)}
                </button>
              ))}
            </div>
            <div className="mt-3 h-px bg-brand-primary/8 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand-primary/40 rounded-full"
                animate={{ width: `${((activeIdx + 1) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── MOBILE: Horizontal scroll-snap swipe ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="sm:hidden"
        >
          {/* Swipe rail — contained overflow, no page bleed */}
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            role="list"
            aria-label="Patient Google reviews — swipe to browse"
          >
            {REVIEWS.map((review, i) => (
              <MobileReviewCard key={review.id} review={review} index={i} total={total} />
            ))}
            {/* End spacer for partial next-card peek */}
            <div className="min-w-4 shrink-0" aria-hidden="true" />
          </div>

          {/* Dot indicator + swipe label */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {REVIEWS.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileIdx
                    ? 'w-5 h-1.5 bg-brand-primary'
                    : 'w-1.5 h-1.5 bg-brand-primary/20'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-brand-textMuted/35 uppercase text-center mt-2 select-none">
            {fmt(mobileIdx + 1)} / {fmt(total)} &mdash; SWIPE TO EXPLORE
          </p>
        </motion.div>

        {/* ── PATIENT STORY PANEL: Inline on-site review composer ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="mt-12 sm:mt-16"
        >
          <StoryPanel />
        </motion.div>

      </div>

      {/* Leave Review Modal */}
      {modalOpen && <LeaveReviewModal onClose={() => setModalOpen(false)} />}

    </section>
  );
}