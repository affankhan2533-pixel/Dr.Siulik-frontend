"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Clock, User, Phone, MessageSquare, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { SERVICES_DATA, CLINIC_INFO, CONSULTATION_TIME_SLOTS } from '../../data/clinicData';
import { createAppointmentWhatsAppUrl } from '../../lib/whatsapp';

export default function BookingModal({ isOpen, onClose }) {
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
  const [slotAvailability, setSlotAvailability] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Set default date to tomorrow on open
  useEffect(() => {
    if (!isOpen) return;
    if (!formData.preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setFormData((prev) => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
    }
  }, [isOpen]);

  // Fetch real-time slot availability whenever date changes
  useEffect(() => {
    if (!formData.preferredDate) return;

    let isMounted = true;
    const fetchAvailability = async () => {
      setLoadingSlots(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/appointments/availability?date=${formData.preferredDate}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.slots) {
            const availMap = {};
            data.slots.forEach((s) => {
              availMap[s.time] = s;
            });
            setSlotAvailability(availMap);

            // If current selected slot is fully booked, switch to first available
            const currentSlotData = availMap[formData.preferredTime];
            if (currentSlotData && !currentSlotData.isAvailable) {
              const firstFree = data.slots.find((s) => s.isAvailable);
              if (firstFree) {
                setFormData((prev) => ({ ...prev, preferredTime: firstFree.time }));
              }
            }
          }
        }
      } catch (err) {
        console.warn('Real-time slot check running in offline mode:', err);
      } finally {
        if (isMounted) setLoadingSlots(false);
      }
    };

    fetchAvailability();
    return () => { isMounted = false; };
  }, [formData.preferredDate]);

  const resetAndClose = () => {
    setStep(1);
    setSubmitted(false);
    setErrorMessage('');
    setSlotAvailability({});
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
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') resetAndClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Step validations
    if (step === 2) {
      if (!formData.preferredDate) {
        setErrorMessage('Please choose a preferred appointment date.');
        return;
      }
      const slotData = slotAvailability[formData.preferredTime];
      if (slotData && !slotData.isAvailable) {
        setErrorMessage('The selected time slot is fully booked (max 2 patients). Please choose another slot.');
        return;
      }
    }

    if (step === 3) {
      if (!formData.patientName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!formData.patientPhone.trim() || formData.patientPhone.trim().length < 8) {
        setErrorMessage('Please enter a valid contact phone number.');
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const whatsappUrl = createAppointmentWhatsAppUrl(formData);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          if (errData.slotFull) {
            setErrorMessage(errData.message || 'This slot just reached capacity. Please select another slot.');
            setStep(2);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend API offline; proceeding with direct WhatsApp flow:', err);
      } finally {
        setLoading(false);
        setSubmitted(true);
        // Direct reconnect: open WhatsApp with full details pre-filled
        try {
          window.open(whatsappUrl, '_blank');
        } catch {
          window.location.href = whatsappUrl;
        }
      }
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={resetAndClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-panel bg-white p-5 sm:p-8 rounded-3xl border border-brand-primary/20 shadow-2xl overflow-hidden my-6"
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full text-brand-textMuted hover:text-brand-textDark hover:bg-brand-soft transition-colors flex items-center justify-center touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Close Booking Drawer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-5">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                    Step {step} of 4 — Consultation Request
                  </span>
                  <h3 id="booking-modal-title" className="font-serif font-bold text-2xl text-brand-textDark mt-1">
                    Schedule Your Consultation
                  </h3>
                  <p className="text-xs text-brand-textMuted mt-1 font-sans">
                    Fill in your details below. On submit, WhatsApp will open directly to our clinic coordinator at <strong>+91 99386 74499</strong>.
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-brand-soft h-1.5 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-gradient-to-r from-brand-deep to-brand-primary h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleNext} className="space-y-6">
                  <AnimatePresence mode="wait">

                    {/* STEP 1: Select Treatment */}
                    {step === 1 && (
                      <motion.div
                        key="modal-step-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <label className="block text-sm font-semibold text-brand-textDark">
                          Select Required Dental Specialty:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                          {SERVICES_DATA.map((srv) => {
                            const isSelected = formData.treatment === srv.title;
                            return (
                              <div
                                key={srv.id}
                                onClick={() => setFormData({ ...formData, treatment: srv.title })}
                                className={`p-4 min-h-[44px] rounded-xl border cursor-pointer transition-all touch-manipulation flex items-center justify-between ${
                                  isSelected
                                    ? 'bg-brand-soft border-brand-primary ring-2 ring-brand-primary/20 text-brand-deep font-bold shadow-sm'
                                    : 'bg-white border-brand-primary/15 text-brand-textDark hover:border-brand-primary/40'
                                }`}
                              >
                                <div>
                                  <h4 className="text-sm font-semibold">{srv.title}</h4>
                                  <p className="text-xs text-brand-textMuted mt-0.5 line-clamp-1">{srv.tagline}</p>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-brand-primary shrink-0 ml-2" />}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Date & Real-Time Capacity Slots */}
                    {step === 2 && (
                      <motion.div
                        key="modal-step-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-brand-primary" /> Preferred Appointment Date:
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
                            className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-textDark text-sm bg-white min-h-[44px]"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <label className="text-sm font-semibold text-brand-textDark flex items-center gap-2">
                              <Clock className="w-4 h-4 text-brand-primary" /> Select Consultation Slot:
                            </label>
                            {loadingSlots ? (
                              <span className="text-[10px] font-mono text-brand-primary animate-pulse">Checking capacity...</span>
                            ) : (
                              <span className="text-[10px] font-mono text-brand-textMuted uppercase tracking-wider">Max 2 per slot</span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                            {CONSULTATION_TIME_SLOTS.map((slot) => {
                              const fullLabel = slot.time;
                              const isSelected = formData.preferredTime === fullLabel;
                              const slotInfo = slotAvailability[fullLabel];
                              const spotsRemaining = slotInfo ? slotInfo.spotsRemaining : 2;
                              const isFull = slotInfo ? !slotInfo.isAvailable : false;

                              return (
                                <div
                                  key={slot.id}
                                  onClick={() => {
                                    if (isFull) return;
                                    setFormData({ ...formData, preferredTime: fullLabel });
                                    setErrorMessage('');
                                  }}
                                  className={`p-3 rounded-xl border transition-all text-left relative ${
                                    isFull
                                      ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-brand-soft border-brand-primary ring-2 ring-brand-primary/20 text-brand-deep font-bold cursor-pointer'
                                      : 'bg-white border-brand-primary/15 text-brand-textDark hover:border-brand-primary/40 cursor-pointer'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-bold block">{slot.time}</span>
                                    {/* Capacity Badge */}
                                    {isFull ? (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold uppercase tracking-tight">
                                        Full (2/2)
                                      </span>
                                    ) : spotsRemaining === 1 ? (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                                        1 Spot Left
                                      </span>
                                    ) : (
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                                        2 Spots Free
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-brand-textMuted block mt-0.5 font-sans">
                                    {slot.period} Consultation Window
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Patient Information */}
                    {step === 3 && (
                      <motion.div
                        key="modal-step-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-1 flex items-center gap-1.5">
                            <User className="w-4 h-4 text-brand-primary" /> Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Ananya Sharma"
                            value={formData.patientName}
                            onChange={(e) => {
                              setFormData({ ...formData, patientName: e.target.value });
                              setErrorMessage('');
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm min-h-[44px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-1 flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-brand-primary" /> Phone / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98000 00000"
                            value={formData.patientPhone}
                            onChange={(e) => {
                              setFormData({ ...formData, patientPhone: e.target.value });
                              setErrorMessage('');
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm min-h-[44px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-1 flex items-center gap-1.5">
                            <MessageSquare className="w-4 h-4 text-brand-primary" /> Dental Symptoms or Notes (Optional)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Describe your concern, toothache, or specific question..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Review & Direct WhatsApp Confirmation */}
                    {step === 4 && (
                      <motion.div
                        key="modal-step-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        {/* Summary Card */}
                        <div className="p-5 rounded-2xl bg-brand-soft/70 border border-brand-primary/20 text-xs text-brand-textDark space-y-2.5">
                          <div className="flex items-center gap-2 pb-2 border-b border-brand-primary/10">
                            <Sparkles className="w-4 h-4 text-brand-primary" />
                            <span className="font-bold text-brand-deep uppercase tracking-wider text-xs">
                              Consultation Request Summary
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                            <p><strong className="text-brand-textDark">Treatment:</strong> {formData.treatment}</p>
                            <p><strong className="text-brand-textDark">Date:</strong> {formData.preferredDate || 'Earliest available'}</p>
                            <p><strong className="text-brand-textDark">Slot:</strong> {formData.preferredTime}</p>
                            <p><strong className="text-brand-textDark">Patient:</strong> {formData.patientName}</p>
                            <p><strong className="text-brand-textDark">Phone:</strong> {formData.patientPhone}</p>
                            <p><strong className="text-brand-textDark">Direct Contact:</strong> WhatsApp +91 99386 74499</p>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="leading-relaxed">
                            Clicking <strong>Confirm &amp; Send on WhatsApp</strong> will open WhatsApp to <strong>+91 99386 74499</strong> with your full consultation details pre-filled.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-brand-soft gap-2">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-brand-textMuted hover:text-brand-textDark hover:bg-brand-soft transition-colors touch-manipulation"
                      >
                        Back
                      </button>
                    ) : <div />}

                    <Button type="submit" variant="primary" size="md" icon={step === 4 ? Check : ArrowRight} disabled={loading} className="shrink-0">
                      {loading ? 'Connecting...' : step === 4 ? 'Confirm & Send on WhatsApp' : 'Continue'}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              /* Confirmation / Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                  <Check className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-brand-textDark">
                  Request Registered!
                </h3>
                <p className="text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed font-sans">
                  Thank you, <strong className="text-brand-textDark">{formData.patientName}</strong>. Your consultation for <strong className="text-brand-deep">{formData.treatment}</strong> on <strong>{formData.preferredDate} ({formData.preferredTime})</strong> has been logged.
                </p>

                {/* Direct WhatsApp CTA */}
                <div className="pt-1">
                  <a
                    href={createAppointmentWhatsAppUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-white" />
                    <span>Continue to WhatsApp (+91 99386 74499)</span>
                  </a>
                </div>

                <div className="pt-1">
                  <button
                    onClick={resetAndClose}
                    className="text-xs text-brand-textMuted hover:text-brand-textDark transition-colors underline underline-offset-2"
                  >
                    Return to website
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
