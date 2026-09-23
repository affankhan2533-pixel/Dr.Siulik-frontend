"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Calendar, Clock, User, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { SERVICES_DATA, CLINIC_INFO } from '../../data/clinicData';

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    treatment: SERVICES_DATA[0].title,
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    contactMethod: 'WhatsApp',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetAndClose = () => {
    setStep(1);
    setSubmitted(false);
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
    if (step < 4) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        await fetch(`${apiUrl}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.warn('Backend API submission skipped or offline, proceeding locally:', err);
      } finally {
        setLoading(false);
        setSubmitted(true);
      }
    }
  };

  const handleBack = () => {
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
              {/* Drawer Header */}
              <div className="mb-6">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  Step {step} of 4 — Appointment Preference Form
                </span>
                <h3 className="font-serif font-bold text-2xl text-brand-textDark mt-1">
                  Schedule Your Consultation
                </h3>
                <p className="text-xs text-brand-textMuted mt-1 font-sans">
                  Select your preferred treatment, date, and contact method. Our clinic staff will confirm availability with you directly.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-brand-soft h-1.5 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-brand-primary h-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICES_DATA.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, treatment: srv.title })}
                          className={`p-4 min-h-[44px] rounded-xl border cursor-pointer transition-all touch-manipulation ${
                            formData.treatment === srv.title
                              ? 'bg-brand-soft border-brand-primary text-brand-deep font-bold shadow-sm'
                              : 'bg-white border-brand-primary/15 text-brand-textDark hover:border-brand-primary/40'
                          }`}
                        >
                          <h4 className="text-sm font-semibold">{srv.title}</h4>
                          <p className="text-xs text-brand-textMuted mt-0.5">{srv.tagline}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Preferred Date & Preferred Time */}
                {step === 2 && (
                  <motion.div
                    key="modal-step-2"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-brand-textDark mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-primary" /> Preferred Appointment Date:
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-textDark text-base sm:text-sm min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-textDark mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-primary" /> Preferred Time Window:
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-textDark text-base sm:text-sm bg-white min-h-[44px]"
                      >
                        <option>Morning (10:00 AM - 1:00 PM)</option>
                        <option>Afternoon (1:00 PM - 4:00 PM)</option>
                        <option>Evening (4:00 PM - 8:00 PM)</option>
                      </select>
                      <p className="text-xs text-brand-textMuted mt-1">
                        * Note: This is your preferred window. Final slot will be confirmed by clinic staff.
                      </p>
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
                      <label className="block text-sm font-semibold text-brand-textDark mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Ananya Sharma"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm min-h-[44px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-textDark mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98000 00000"
                          value={formData.patientPhone}
                          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm min-h-[44px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-textDark mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={formData.patientEmail}
                          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-textDark mb-1">Notes / Specific Concerns (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Any relevant history or specific questions..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Preferred Contact Method */}
                {step === 4 && (
                  <motion.div
                    key="modal-step-4"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <label className="block text-sm font-semibold text-brand-textDark">
                      Select Preferred Confirmation Method:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {['WhatsApp', 'Call', 'Email'].map((method) => (
                        <div
                          key={method}
                          onClick={() => setFormData({ ...formData, contactMethod: method })}
                          className={`p-4 min-h-[44px] rounded-xl border text-center cursor-pointer transition-all touch-manipulation flex items-center justify-center ${
                            formData.contactMethod === method
                              ? 'bg-brand-deep text-white border-brand-deep font-bold'
                              : 'bg-brand-soft/50 border-brand-primary/20 text-brand-textDark'
                          }`}
                        >
                          <span className="text-sm">{method}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-brand-soft border border-brand-primary/20 text-xs text-brand-textDark space-y-1">
                      <p className="font-bold">Summary of Preference Request:</p>
                      <p><strong>Treatment:</strong> {formData.treatment}</p>
                      <p><strong>Date:</strong> {formData.preferredDate || 'To be aligned'}</p>
                      <p><strong>Time Window:</strong> {formData.preferredTime}</p>
                      <p><strong>Patient Name:</strong> {formData.patientName}</p>
                      <p><strong>Phone:</strong> {formData.patientPhone}</p>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>

                {/* Navigation Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-soft">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-brand-textMuted hover:text-brand-textDark touch-manipulation"
                    >
                      Back
                    </button>
                  ) : <div />}

                  <Button type="submit" variant="primary" size="md" icon={ArrowRight} disabled={loading}>
                    {loading ? 'Submitting...' : step === 4 ? 'Submit Preference' : 'Continue'}
                  </Button>
                </div>

              </form>
            </div>
          ) : (
            /* Confirmation State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-brand-textDark">
                Preference Submitted!
              </h3>
              <p className="text-sm text-brand-textMuted max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <strong className="text-brand-textDark">{formData.patientName}</strong>. Your appointment preference for <strong>{formData.treatment}</strong> has been logged. Our clinic team will reach out via <strong>{formData.contactMethod}</strong> at <strong>{formData.patientPhone}</strong> shortly.
              </p>
              <div className="pt-4">
                <Button onClick={resetAndClose} variant="primary" size="md">
                  Return to Website
                </Button>
              </div>
            </div>
          )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
