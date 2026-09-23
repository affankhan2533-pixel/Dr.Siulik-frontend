"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, ArrowRight, ArrowLeft, ShieldCheck, PhoneCall } from 'lucide-react';
import { SERVICES_DATA, CLINIC_INFO, CONSULTATION_TIME_SLOTS } from '../../data/clinicData';
import { createAppointmentWhatsAppUrl } from '../../lib/whatsapp';

export default function AppointmentSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    treatment: SERVICES_DATA[0].title,
    preferredDate: '',
    preferredTime: CONSULTATION_TIME_SLOTS[0].time,
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    contactMethod: 'WhatsApp',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Set default date to tomorrow on initial mount if empty
  useEffect(() => {
    if (!formData.preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      const defaultDate = `${yyyy}-${mm}-${dd}`;
      setFormData((prev) => ({ ...prev, preferredDate: defaultDate }));
    }
  }, []);

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Step 2 validation
    if (step === 2) {
      if (!formData.preferredDate) {
        setErrorMessage('Please select a preferred consultation date.');
        return;
      }
      if (!formData.preferredTime) {
        setErrorMessage('Please select a preferred time window.');
        return;
      }
    }

    // Step 3 validation
    if (step === 3) {
      if (!formData.patientName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!formData.patientPhone.trim() || formData.patientPhone.trim().length < 8) {
        setErrorMessage('Please enter a valid phone number.');
        return;
      }
    }

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${apiUrl}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Backend offline; proceeding with direct confirmation:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);

      // Direct WhatsApp redirect if selected
      if (formData.contactMethod === 'WhatsApp') {
        const whatsappUrl = createAppointmentWhatsAppUrl(formData);
        try {
          window.open(whatsappUrl, '_blank');
        } catch {
          window.location.href = whatsappUrl;
        }
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    setErrorMessage('');
    setFormData({
      treatment: SERVICES_DATA[0].title,
      preferredDate: '',
      preferredTime: CONSULTATION_TIME_SLOTS[0].time,
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      contactMethod: 'WhatsApp',
      notes: '',
    });
  };

  return (
    <section
      id="book-appointment"
      className="pt-10 sm:pt-16 lg:pt-20 pb-28 sm:pb-20 lg:pb-24 bg-white relative overflow-hidden select-none border-t border-brand-primary/10 scroll-mt-24"
      aria-label="Appointment Concierge"
    >
      {/* Subtle Ambient Background Lighting */}
      <div className="teal-ambient-glow -top-24 -left-24 opacity-20 pointer-events-none" />
      <div className="teal-ambient-glow -bottom-24 -right-24 opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ── Left Column: Editorial Heading & Reassurance ── */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] text-brand-primary uppercase block">
              CONSULTATION &amp; CARE PLANNING
            </span>

            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Let&apos;s plan your next step.
            </h2>

            <p className="text-xs sm:text-sm text-brand-textMuted leading-relaxed font-sans max-w-md">
              Select your consultation preferences for personal, unhurried attention at Dr. Siulik&apos;s Dental Care.
            </p>

            {/* Editorial Reassurance Points (Desktop Only) */}
            <div className="hidden lg:flex flex-col gap-3.5 pt-6 border-t border-brand-primary/15 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Personal Coordination:</strong> Connects directly with our clinical desk at <strong>{CLINIC_INFO.phonePrimary}</strong>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Unhurried Consultations:</strong> Ample appointment time dedicated to clear diagnostic communication.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Transparent Guidance:</strong> Complete upfront treatment explanations and sterile modern operatories.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right Column: Concierge Flow Container ── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-brand-primary/20 shadow-xl p-5 sm:p-8 lg:p-10 relative overflow-hidden">
              
              {!submitted ? (
                <div>
                  {/* ── Refined Minimal Progress Indicator ── */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-primary/10">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-brand-primary font-bold">0{step}</span>
                      <span className="text-brand-textMuted/40">/</span>
                      <span className="text-brand-textMuted font-medium">04</span>
                      <span className="text-brand-primary/30 mx-1">•</span>
                      <span className="text-brand-textDark font-sans font-semibold text-xs tracking-wider uppercase">
                        {step === 1 && 'What brings you in?'}
                        {step === 2 && 'Preferred Timing'}
                        {step === 3 && 'Your Details'}
                        {step === 4 && 'Preferred Reach Out'}
                      </span>
                    </div>

                    {/* Segmented Line Indicator */}
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            s === step
                              ? 'w-6 bg-brand-primary'
                              : s < step
                              ? 'w-3 bg-brand-primary/40'
                              : 'w-3 bg-brand-primary/15'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* ── Step-by-Step Concierge Form ── */}
                  <form onSubmit={step === 4 ? handleSubmit : handleNext}>
                    <AnimatePresence mode="wait">

                      {/* ── STEP 01: WHAT BRINGS YOU IN? ── */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div className="mb-2">
                            <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold block mb-1">
                              STEP 01
                            </span>
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-textDark">
                              What brings you in?
                            </h3>
                            <p className="text-xs text-brand-textMuted font-sans mt-0.5">
                              Choose the clinical discipline matching your consultation need.
                            </p>
                          </div>

                          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 -mr-1">
                            {SERVICES_DATA.map((srv) => {
                              const isSelected = formData.treatment === srv.title;
                              return (
                                <button
                                  key={srv.id}
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, treatment: srv.title });
                                    setErrorMessage('');
                                  }}
                                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-center justify-between min-h-[52px] touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
                                    isSelected
                                      ? 'border-brand-primary bg-brand-soft/50 ring-1 ring-brand-primary/30 text-brand-deep'
                                      : 'border-brand-primary/15 bg-white text-brand-textDark hover:border-brand-primary/40 hover:bg-brand-soft/10'
                                  }`}
                                  aria-selected={isSelected}
                                >
                                  <div className="min-w-0 pr-3">
                                    <p className="text-xs sm:text-sm font-semibold truncate">
                                      {srv.title}
                                    </p>
                                    <p className="text-[11px] text-brand-textMuted truncate mt-0.5 font-sans">
                                      {srv.tagline}
                                    </p>
                                  </div>
                                  <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected ? 'bg-brand-primary text-white' : 'border border-brand-primary/20 text-transparent'
                                    }`}
                                  >
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 02: WHEN WOULD YOU PREFER TO VISIT? ── */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div className="mb-2">
                            <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold block mb-1">
                              STEP 02
                            </span>
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-textDark">
                              When would you prefer to visit?
                            </h3>
                            <p className="text-xs text-brand-textMuted font-sans mt-0.5">
                              Indicate your preferred date and time window.
                            </p>
                          </div>

                          {/* Date Selection */}
                          <div>
                            <label className="text-xs font-semibold text-brand-textDark flex items-center gap-1.5 mb-2">
                              <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Preferred Date</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.preferredDate}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => {
                                setFormData({ ...formData, preferredDate: e.target.value });
                                setErrorMessage('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-1 focus:ring-brand-primary text-base sm:text-sm text-brand-textDark bg-white min-h-[48px]"
                            />
                          </div>

                          {/* Time Preference Windows */}
                          <div>
                            <label className="text-xs font-semibold text-brand-textDark flex items-center gap-1.5 mb-2">
                              <Clock className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Preferred Time Window</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                              {CONSULTATION_TIME_SLOTS.map((slot) => {
                                const isSelected = formData.preferredTime === slot.time;
                                return (
                                  <button
                                    key={slot.id}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, preferredTime: slot.time });
                                      setErrorMessage('');
                                    }}
                                    className={`p-3 rounded-xl border text-left transition-all min-h-[48px] flex items-center justify-between touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
                                      isSelected
                                        ? 'border-brand-primary bg-brand-soft/50 ring-1 ring-brand-primary/30 text-brand-deep font-bold'
                                        : 'border-brand-primary/15 bg-white text-brand-textDark hover:border-brand-primary/40'
                                    }`}
                                    aria-selected={isSelected}
                                  >
                                    <div>
                                      <span className="font-mono text-xs font-bold block">{slot.time}</span>
                                      <span className="text-[10px] text-brand-textMuted block font-sans mt-0.5">
                                        {slot.period} Window Preference
                                      </span>
                                    </div>
                                    <div
                                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                        isSelected ? 'bg-brand-primary text-white' : 'border border-brand-primary/20 text-transparent'
                                      }`}
                                    >
                                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 03: YOUR DETAILS ── */}
                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div className="mb-2">
                            <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold block mb-1">
                              STEP 03
                            </span>
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-textDark">
                              Your details
                            </h3>
                            <p className="text-xs text-brand-textMuted font-sans mt-0.5">
                              Please share your contact info so we can coordinate your visit.
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Full Name *</span>
                            </label>
                            <input
                              type="text"
                              required
                              autoComplete="name"
                              placeholder="e.g., Ananya Sharma"
                              value={formData.patientName}
                              onChange={(e) => {
                                setFormData({ ...formData, patientName: e.target.value });
                                setErrorMessage('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-1 focus:ring-brand-primary text-base sm:text-sm text-brand-textDark bg-white min-h-[48px]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Phone / WhatsApp Number *</span>
                            </label>
                            <input
                              type="tel"
                              required
                              autoComplete="tel"
                              placeholder="+91 98765 00000"
                              value={formData.patientPhone}
                              onChange={(e) => {
                                setFormData({ ...formData, patientPhone: e.target.value });
                                setErrorMessage('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-1 focus:ring-brand-primary text-base sm:text-sm text-brand-textDark bg-white min-h-[48px]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Email Address (Optional)</span>
                            </label>
                            <input
                              type="email"
                              autoComplete="email"
                              placeholder="your.email@domain.com"
                              value={formData.patientEmail}
                              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-1 focus:ring-brand-primary text-base sm:text-sm text-brand-textDark bg-white min-h-[48px]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-brand-primary" />
                              <span>Specific Concerns or Questions (Optional)</span>
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Brief note on toothache, routine check-up, aesthetic inquiry..."
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-1 focus:ring-brand-primary text-base sm:text-sm text-brand-textDark bg-white"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 04: HOW SHOULD WE REACH YOU? ── */}
                      {step === 4 && (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div className="mb-2">
                            <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold block mb-1">
                              STEP 04
                            </span>
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-textDark">
                              How should we reach you?
                            </h3>
                            <p className="text-xs text-brand-textMuted font-sans mt-0.5">
                              Choose your preferred channel for consultation confirmation.
                            </p>
                          </div>

                          {/* Contact Channels */}
                          <div className="space-y-2">
                            {[
                              { id: 'WhatsApp', label: 'WhatsApp', desc: 'Direct message with pre-filled consultation request details', icon: MessageSquare },
                              { id: 'Phone Call', label: 'Phone Call', desc: 'Direct voice confirmation from our clinical coordinator', icon: PhoneCall },
                              { id: 'Email', label: 'Email', desc: 'Written appointment preference sent to your inbox', icon: Mail },
                            ].map((method) => {
                              const isSelected = formData.contactMethod === method.id;
                              const IconComponent = method.icon;
                              return (
                                <button
                                  key={method.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                                  className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all min-h-[50px] flex items-center justify-between touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary ${
                                    isSelected
                                      ? 'border-brand-primary bg-brand-soft/50 ring-1 ring-brand-primary/30 text-brand-deep'
                                      : 'border-brand-primary/15 bg-white text-brand-textDark hover:border-brand-primary/40'
                                  }`}
                                  aria-selected={isSelected}
                                >
                                  <div className="flex items-center gap-3 min-w-0 pr-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSelected ? 'bg-brand-primary text-white' : 'bg-brand-soft text-brand-primary'}`}>
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs sm:text-sm font-semibold">{method.label}</p>
                                      <p className="text-[11px] text-brand-textMuted font-sans truncate">{method.desc}</p>
                                    </div>
                                  </div>

                                  <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected ? 'bg-brand-primary text-white' : 'border border-brand-primary/20 text-transparent'
                                    }`}
                                  >
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* ── Compact Editorial Summary ── */}
                          <div className="mt-4 pt-3.5 border-t border-brand-primary/15">
                            <span className="text-[10px] font-mono tracking-widest text-brand-primary uppercase font-bold block mb-2">
                              REQUEST SUMMARY
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-brand-soft/30 p-3 rounded-xl border border-brand-primary/10">
                              <div>
                                <span className="text-brand-textMuted block text-[10px]">TREATMENT</span>
                                <span className="text-brand-textDark font-semibold block truncate">{formData.treatment}</span>
                              </div>
                              <div>
                                <span className="text-brand-textMuted block text-[10px]">PREFERRED DATE</span>
                                <span className="text-brand-textDark font-semibold block truncate">{formData.preferredDate || 'Earliest'}</span>
                              </div>
                              <div>
                                <span className="text-brand-textMuted block text-[10px]">TIME WINDOW</span>
                                <span className="text-brand-textDark font-semibold block truncate">{formData.preferredTime}</span>
                              </div>
                              <div>
                                <span className="text-brand-textMuted block text-[10px]">CONFIRMATION VIA</span>
                                <span className="text-brand-deep font-bold block truncate">{formData.contactMethod}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* Inline Error Message */}
                    {errorMessage && (
                      <p className="text-xs text-rose-600 font-medium mt-3 flex items-center gap-1.5 font-sans">
                        <span>•</span> {errorMessage}
                      </p>
                    )}

                    {/* ── Navigation Actions (Back / Continue / Submit) ── */}
                    <div className="flex items-center justify-between pt-5 mt-4 border-t border-brand-primary/15 gap-3">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-1.5 px-4 py-3 min-h-[48px] rounded-full text-xs font-semibold text-brand-textMuted hover:text-brand-textDark hover:bg-brand-soft transition-colors touch-manipulation focus-visible:outline-none"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full bg-brand-primary hover:bg-brand-deep text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-[0.98] transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-50"
                      >
                        {loading ? (
                          'Submitting...'
                        ) : step === 4 ? (
                          <>
                            <span>Submit Request</span>
                            <Check className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                /* ── Calm Confirmation / Success State ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="py-6 sm:py-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300">
                    <Check className="w-7 h-7 text-emerald-700 stroke-[2.5]" />
                  </div>

                  <span className="text-[10px] font-mono tracking-[0.25em] text-brand-primary uppercase font-bold block">
                    REQUEST RECEIVED
                  </span>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark tracking-tight">
                    Your consultation preference has been submitted.
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-brand-textDark">{formData.patientName}</strong>. Our clinical team will reach out via <strong className="text-brand-deep">{formData.contactMethod}</strong> to confirm your appointment for <strong className="text-brand-textDark">{formData.treatment}</strong> on <strong className="text-brand-textDark">{formData.preferredDate} ({formData.preferredTime})</strong>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 min-h-[48px] rounded-full border border-brand-primary/20 text-xs font-semibold text-brand-textDark hover:bg-brand-soft/50 transition-colors touch-manipulation"
                    >
                      Book Another Consultation
                    </button>
                    <a
                      href={`tel:${CLINIC_INFO.phonePrimary}`}
                      className="px-5 py-3 min-h-[48px] rounded-full bg-brand-primary hover:bg-brand-deep text-white text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-md transition-colors touch-manipulation"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Clinic: {CLINIC_INFO.phonePrimary}</span>
                    </a>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
