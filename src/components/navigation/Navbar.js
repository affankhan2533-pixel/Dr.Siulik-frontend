"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Button from '../ui/Button';
import { CLINIC_INFO } from '../../data/clinicData';

const NAV_LINKS = [
  { label: 'About',          href: '#about-clinic', sectionId: 'about-clinic'   },
  { label: 'Treatments',     href: '#services',     sectionId: 'services'        },
  { label: 'Technology',     href: '#technology',   sectionId: 'technology'      },
  { label: 'Patient Stories',href: '#testimonials', sectionId: 'testimonials'    },
  { label: 'Contact',        href: '#location',     sectionId: 'location'        },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar({ onOpenBooking }) {
  const [scrolled,        setScrolled]       = useState(false);
  const [mobileOpen,      setMobileOpen]     = useState(false);
  const [activeSection,   setActiveSection]  = useState('');

  // ── Scroll → glass-nav transition ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Body scroll lock while mobile menu is open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // ── Escape key closes mobile menu ───────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // ── Active section tracker ──────────────────────────────────────────────────
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.sectionId);
    const detect = () => {
      const mid = window.scrollY + window.innerHeight * 0.35;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 200) setActiveSection('');
    };
    window.addEventListener('scroll', detect, { passive: true });
    return () => window.removeEventListener('scroll', detect);
  }, []);

  const close = useCallback(() => setMobileOpen(false), []);

  // ── Scroll progress bar ─────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

  // ── Derived nav colour context ──────────────────────────────────────────────
  // Over the hero (transparent state): white text for readability over dark video
  // After scroll (glass state): brand-textDark text
  const overHero = !scrolled && !mobileOpen;

  return (
    <>
      {/* ── Scroll progress line (z-[60] so it sits above everything) ── */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-deep via-brand-primary to-brand-aqua z-[60] pointer-events-none"
      />

      {/* ── Main Navbar ── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled || mobileOpen
            ? 'py-3 bg-white/95 backdrop-blur-md border-b border-brand-primary/12 shadow-[0_4px_24px_-4px_rgba(8,47,53,0.07)]'
            : 'py-5 bg-transparent border-b border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* ── Left: Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua rounded-lg shrink-0 z-50"
            aria-label="Dr. Siulik's Dental Care — Home"
          >
            <div
              className={`
                w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                transition-colors duration-300
                ${overHero
                  ? 'bg-white/15 border border-white/25'
                  : 'bg-brand-deep/10 border border-brand-primary/20 group-hover:bg-brand-deep/20'
                }
              `}
            >
              <img
                src="/assets/branding/logo.svg"
                alt=""
                width="24"
                height="24"
                aria-hidden="true"
                className="w-6 h-6 object-contain shrink-0"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-serif font-bold text-[15px] tracking-wide transition-colors duration-300 ${
                  overHero ? 'text-white' : 'text-brand-textDark group-hover:text-brand-deep'
                }`}
              >
                DR. SIULIK&apos;S
              </span>
              <span
                className={`font-sans font-semibold text-[9px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  overHero ? 'text-brand-aqua/90' : 'text-brand-primary'
                }`}
              >
                DENTAL CARE
              </span>
            </div>
          </Link>

          {/* ── Centre: Desktop Navigation ── */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 xl:gap-9"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  className={`
                    nav-link relative py-1
                    text-[11px] font-sans font-semibold uppercase tracking-[0.18em]
                    transition-colors duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua rounded-sm
                    ${overHero
                      ? isActive
                        ? 'text-brand-aqua'
                        : 'text-white/80 hover:text-white'
                      : isActive
                        ? 'text-brand-deep'
                        : 'text-brand-textDark/75 hover:text-brand-deep'
                    }
                    ${isActive ? 'active' : ''}
                  `}
                >
                  {link.label}
                  {/* Underline rule */}
                  <span
                    className={`
                      nav-link-line
                      ${overHero ? 'bg-brand-aqua' : 'bg-brand-primary'}
                    `}
                  />
                </a>
              );
            })}
          </nav>

          {/* ── Right: Book CTA (desktop, ≥sm) ── */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {CLINIC_INFO.phonePrimary && !CLINIC_INFO.phonePrimary.includes('98765') && (
              <a
                href={`tel:${CLINIC_INFO.phonePrimary}`}
                aria-label={`Call ${CLINIC_INFO.phonePrimary}`}
                className={`
                  hidden md:flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full
                  text-[11px] font-mono font-semibold tracking-wide
                  border transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua
                  ${overHero
                    ? 'text-white/80 hover:text-white border-white/20 hover:border-white/40 bg-white/8 hover:bg-white/14'
                    : 'text-brand-deep border-brand-primary/20 bg-brand-soft/70 hover:bg-brand-soft hover:border-brand-primary/40'
                  }
                `}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{CLINIC_INFO.phonePrimary}</span>
              </a>
            )}

            <button
              onClick={onOpenBooking}
              className={`
                inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[40px] rounded-full
                text-[11px] font-semibold tracking-[0.06em] uppercase
                transition-all duration-300 cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2
                touch-manipulation active:scale-[0.97]
                ${overHero
                  ? 'bg-brand-aqua text-brand-textDark hover:bg-white hover:text-brand-deep border border-transparent'
                  : 'bg-brand-deep text-white hover:bg-brand-primary border border-transparent shadow-sm'
                }
              `}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Book Appointment
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={`
              lg:hidden w-11 h-11 rounded-full flex items-center justify-center
              transition-colors duration-300 z-50
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua
              ${overHero
                ? 'text-white hover:bg-white/15'
                : 'text-brand-textDark hover:bg-brand-soft'
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: 45,  opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 45,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden fixed inset-0 z-[48] bg-brand-textDark flex flex-col overflow-y-auto"
          >
            {/* Subtle ambient — very restrained */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.07] bg-brand-aqua blur-[72px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.05] bg-brand-primary blur-[60px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full min-h-svh pt-24 pb-10 px-7">

              {/* Top label */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="block text-[10px] font-mono font-bold tracking-[0.3em] text-brand-aqua/60 uppercase mb-10"
                >
                  NAVIGATION
                </motion.span>

                {/* Large serif navigation links */}
                <nav aria-label="Mobile Navigation Links">
                  {NAV_LINKS.map((link, idx) => (
                    <motion.div
                      key={link.sectionId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0  }}
                      transition={{ duration: 0.4, delay: 0.08 + idx * 0.06, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={close}
                        className="
                          group flex items-center justify-between
                          py-4 border-b border-white/8
                          font-serif font-bold text-[2rem] leading-none
                          text-white/85 hover:text-white
                          transition-colors duration-300
                          focus:outline-none focus-visible:text-brand-aqua
                        "
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight
                          className="w-5 h-5 text-white/25 group-hover:text-brand-aqua group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                          aria-hidden="true"
                        />
                      </a>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42, ease: EASE }}
                className="flex flex-col gap-3 pt-8 border-t border-white/10"
              >
                {CLINIC_INFO.phonePrimary && !CLINIC_INFO.phonePrimary.includes('98765') ? (
                  <a
                    href={`tel:${CLINIC_INFO.phonePrimary}`}
                    onClick={close}
                    className="
                      flex items-center justify-center gap-2.5 w-full
                      min-h-[52px] py-3.5 rounded-full
                      text-sm font-semibold tracking-wide
                      text-white/80 border border-white/15
                      hover:text-white hover:border-white/30 hover:bg-white/8
                      transition-all duration-300 touch-manipulation
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua
                    "
                  >
                    <Phone className="w-4 h-4 text-brand-aqua shrink-0" aria-hidden="true" />
                    {CLINIC_INFO.phonePrimary}
                  </a>
                ) : (
                  <a
                    href="#location"
                    onClick={close}
                    className="
                      flex items-center justify-center gap-2.5 w-full
                      min-h-[52px] py-3.5 rounded-full
                      text-sm font-semibold tracking-wide
                      text-white/80 border border-white/15
                      hover:text-white hover:border-white/30 hover:bg-white/8
                      transition-all duration-300 touch-manipulation
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua
                    "
                  >
                    View Clinic Hours &amp; Location
                  </a>
                )}

                <button
                  onClick={() => { close(); onOpenBooking(); }}
                  className="
                    flex items-center justify-center gap-2 w-full
                    min-h-[52px] py-3.5 rounded-full
                    text-sm font-semibold tracking-[0.06em] uppercase
                    bg-brand-primary text-white
                    hover:bg-brand-aqua hover:text-brand-textDark
                    border border-transparent
                    transition-all duration-300 cursor-pointer touch-manipulation
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua
                    active:scale-[0.97]
                  "
                >
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Book an Appointment
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
