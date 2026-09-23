"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
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
  const [slotAvailability, setSlotAvailability] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);

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
    return () => {
      isMounted = false;
    };
  }, [formData.preferredDate]);

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
        console.warn('Backend API request offline; proceeding with direct WhatsApp flow:', err);
      } finally {
        setLoading(false);
        setSubmitted(true);
        // Direct reconnect: open WhatsApp with full details
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

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
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
    <section id="book-appointment" className="py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-brand-soft/40 to-white relative overflow-hidden">
      {/* Decorative Atmosphere Ambient Glow */}
      <div className="teal-ambient-glow -top-32 -left-32 opacity-30" />
      <div className="teal-ambient-glow -bottom-32 -right-32 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left: Large Editorial Heading & Clinical Reassurance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-3 sm:gap-5"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.25em] text-brand-primary uppercase block">
              CONSULTATION &amp; CARE PLANNING
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-brand-textDark leading-tight tracking-tight">
              Let&apos;s plan your next step.
            </h2>
            <p className="text-xs sm:text-base text-brand-textMuted leading-relaxed font-sans max-w-md">
              Select your consultation preference. To ensure meticulous attention, our clinic maintains a strict capacity of <strong className="text-brand-deep">maximum 2 patients per time slot</strong>.
            </p>

            {/* Editorial Reassurance Points */}
            <div className="hidden lg:flex flex-col gap-3.5 pt-6 border-t border-brand-primary/15 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Direct WhatsApp Reconnection:</strong> Your consultation request connects immediately to our clinic coordinator at <strong>+91 99386 74499</strong>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Strict Slot Capacity (Max 2):</strong> Zero waiting room overcrowding; unhurried clinical dialogue.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <p className="text-xs text-brand-textDark font-sans">
                  <strong>Transparent Guidance:</strong> Complete upfront procedural explanation and sterilized instrumentation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Step-by-Step Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-brand-primary/20 shadow-xl relative overflow-hidden">
              
              {!submitted ? (
                <div>
                  {/* Step Progress Bar */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-brand-primary uppercase mb-2">
                      <span>Step 0{step} of 04</span>
                      <span>
                        {step === 1 && 'Select Specialty'}
                        {step === 2 && 'Preferred Time Slot'}
                        {step === 3 && 'Patient Details'}
                        {step === 4 && 'Direct WhatsApp Confirmation'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-soft rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-deep to-brand-primary transition-all duration-300 rounded-full"
                        style={{ width: `${(step / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-sans animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleNext}>
                    <AnimatePresence mode="wait">
                      {/* STEP 1: Treatment Selection */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <label className="block text-sm font-semibold text-brand-textDark mb-1">
                            Choose Required Treatment Area:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                            {SERVICES_DATA.map((srv) => {
                              const isSelected = formData.treatment === srv.title;
                              return (
                                <div
                                  key={srv.id}
                                  onClick={() => setFormData({ ...formData, treatment: srv.title })}
                                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all touch-manipulation flex items-center justify-between ${
                                    isSelected
                                      ? 'bg-brand-soft border-brand-primary ring-2 ring-brand-primary/20 text-brand-deep font-semibold'
                                      : 'bg-white border-brand-primary/15 text-brand-textDark hover:border-brand-primary/40'
                                  }`}
                                >
                                  <div>
                                    <p className="text-sm font-medium">{srv.title}</p>
                                    <p className="text-[11px] text-brand-textMuted line-clamp-1">{srv.tagline}</p>
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-brand-primary shrink-0 ml-2" />}
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: Date & Real-Time Capacity Time Slots */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="text-sm font-semibold text-brand-textDark flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-brand-primary" /> Consultation Date:
                              </label>
                              <span className="text-[11px] font-mono text-brand-textMuted">Mon – Sat (10am–8pm)</span>
                            </div>
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
                                <span className="text-[10px] font-mono text-brand-textMuted uppercase tracking-wider">Max 2 patients per slot</span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[280px] overflow-y-auto pr-1">
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
                                      {/* Capacity Pill */}
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

                      {/* STEP 3: Patient Details */}
                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
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
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-white min-h-[44px]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <Phone className="w-4 h-4 text-brand-primary" /> Phone / WhatsApp Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98765 00000"
                              value={formData.patientPhone}
                              onChange={(e) => {
                                setFormData({ ...formData, patientPhone: e.target.value });
                                setErrorMessage('');
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-white min-h-[44px]"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                              <MessageSquare className="w-4 h-4 text-brand-primary" /> Dental Symptoms or Specific Concerns (Optional)
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Describe your toothache, sensitivity, cosmetic goal, or routine check-up request..."
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-white"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: Review & Direct WhatsApp Confirmation */}
                      {step === 4 && (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          {/* Request Summary Card */}
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
                              <p><strong className="text-brand-textDark">Direct Coordination:</strong> WhatsApp (+91 99386 74499)</p>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <p className="leading-relaxed">
                              Clicking <strong>Confirm &amp; Send on WhatsApp</strong> will automatically log your appointment and open WhatsApp to <strong>+91 99386 74499</strong> with your full details pre-filled.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-brand-primary/15 gap-2 sm:gap-3">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-full text-xs font-semibold text-brand-textMuted hover:text-brand-textDark hover:bg-brand-soft transition-colors touch-manipulation shrink-0"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                      ) : <div />}

                      <Button type="submit" variant="primary" size="md" icon={step === 4 ? Check : ArrowRight} disabled={loading} className="shrink-0">
                        {loading ? 'Connecting...' : step === 4 ? 'Confirm & Send on WhatsApp' : 'Continue'}
                      </Button>
                    </div>

                  </form>
                </div>
              ) : (
                /* Submission Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                    <Check className="w-8 h-8 text-emerald-700" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark">
                    Consultation Request Registered!
                  </h3>
                  <p className="text-sm text-brand-textMuted max-w-lg mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-brand-textDark">{formData.patientName}</strong>. Your consultation preference for <strong className="text-brand-deep">{formData.treatment}</strong> on <strong className="text-brand-textDark">{formData.preferredDate} ({formData.preferredTime})</strong> has been securely logged.
                  </p>

                  {/* Direct WhatsApp Reconnect CTA Button */}
                  <div className="pt-2">
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

                  <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                    <Button onClick={handleReset} variant="secondary" size="md">
                      Book Another Time
                    </Button>
                    <Button href={`tel:${CLINIC_INFO.phonePrimary}`} variant="primary" size="md" icon={Phone}>
                      Call Direct: {CLINIC_INFO.phonePrimary}
                    </Button>
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
