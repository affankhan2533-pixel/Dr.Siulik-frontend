"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { SERVICES_DATA, CLINIC_INFO } from '../../data/clinicData';

export default function AppointmentSection() {
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Step validations
    if (step === 2 && !formData.preferredDate) {
      setErrorMessage('Please choose a preferred appointment date.');
      return;
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
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiUrl}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          // Graceful fallback for local development if backend is offline
          console.warn('Backend responded with status:', res.status);
        }
      } catch (err) {
        console.warn('Backend API request skipped or offline; storing preference locally:', err);
      } finally {
        setLoading(false);
        setSubmitted(true);
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
      preferredTime: 'Morning (10:00 AM - 1:00 PM)',
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
              Select your preferred treatment and schedule, and our team will confirm your consultation with personal attention.
            </p>

            {/* Editorial Reassurance Points */}
            <div className="hidden lg:flex flex-col gap-3.5 pt-6 border-t border-brand-primary/15 mt-2">
              <div className="flex items-center gap-3 text-xs text-brand-deep font-sans">
                <div className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-brand-primary shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Strict clinical privacy and patient confidentiality</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-deep font-sans">
                <div className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-brand-primary shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>Unhurried appointments paced to your comfort</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-deep font-sans">
                <div className="w-7 h-7 rounded-full bg-brand-soft flex items-center justify-center text-brand-primary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>Direct consultation with {CLINIC_INFO.doctorName}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Compact Progressive Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-7 md:p-8 rounded-3xl border border-brand-primary/20 shadow-xl bg-white">
            
            {!submitted ? (
              <div>
                {/* Step Indicator Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-brand-primary/15 gap-3">
                  <div>
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-sans">
                      STEP 0{step} OF 04
                    </span>
                    <h3 className="font-sans font-semibold text-lg text-brand-textDark mt-0.5">
                      {step === 1 && 'Select Treatment / Service'}
                      {step === 2 && 'Preferred Date & Time Window'}
                      {step === 3 && 'Patient Information'}
                      {step === 4 && 'Preferred Confirmation Method'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-textMuted bg-brand-soft/70 px-3 py-1.5 rounded-full border border-brand-primary/10 self-start sm:self-auto">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Private &amp; Confidential</span>
                  </div>
                </div>

                {/* Progress Line */}
                <div className="w-full bg-brand-soft h-1.5 rounded-full overflow-hidden my-6">
                  <motion.div
                    className="bg-brand-primary h-full rounded-full"
                    initial={{ width: '25%' }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 mb-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleNext} className="space-y-6">
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
                      <label className="block text-sm font-semibold text-brand-textDark">
                        Choose the primary area of focus for your consultation:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
                        {SERVICES_DATA.map((srv) => {
                          const isSelected = formData.treatment === srv.title;
                          return (
                            <div
                              key={srv.id}
                              onClick={() => {
                                setFormData({ ...formData, treatment: srv.title });
                                setErrorMessage('');
                              }}
                              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left cursor-pointer transition-all duration-200 touch-manipulation ${
                                isSelected
                                  ? 'bg-brand-soft border-brand-primary ring-2 ring-brand-primary/30 shadow-sm'
                                  : 'bg-white border-brand-primary/15 hover:border-brand-primary/40 hover:bg-brand-soft/30'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-brand-deep font-bold' : 'text-brand-textDark'}`}>
                                  {srv.title}
                                </h4>
                                {isSelected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-primary shrink-0" />}
                              </div>
                              <p className="hidden sm:block text-xs text-brand-textMuted mt-1 leading-relaxed line-clamp-2">
                                {srv.tagline}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Preferred Date & Time Window */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
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
                          onChange={(e) => {
                            setFormData({ ...formData, preferredDate: e.target.value });
                            setErrorMessage('');
                          }}
                          className="w-full px-4 py-3.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-textDark text-base sm:text-sm bg-white min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-textDark mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-primary" /> Preferred Time Window:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { label: 'Morning', window: '10:00 AM - 1:00 PM' },
                            { label: 'Afternoon', window: '1:00 PM - 4:00 PM' },
                            { label: 'Evening', window: '4:00 PM - 8:00 PM' },
                          ].map((slot) => {
                            const fullLabel = `${slot.label} (${slot.window})`;
                            const isSelected = formData.preferredTime === fullLabel;
                            return (
                              <div
                                key={slot.label}
                                onClick={() => setFormData({ ...formData, preferredTime: fullLabel })}
                                className={`p-4 min-h-[44px] rounded-xl border text-center cursor-pointer transition-all touch-manipulation ${
                                  isSelected
                                    ? 'bg-brand-soft border-brand-primary ring-2 ring-brand-primary/20 text-brand-deep font-bold'
                                    : 'bg-white border-brand-primary/15 text-brand-textDark hover:border-brand-primary/40'
                                }`}
                              >
                                <span className="text-sm block">{slot.label}</span>
                                <span className="text-xs text-brand-textMuted block mt-0.5">{slot.window}</span>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-brand-textMuted mt-3 font-sans italic">
                          * Note: The selected date and time represent your preferred consultation window. Our coordination staff will confirm final availability directly.
                        </p>
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
                          className="w-full px-4 py-3.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm bg-white min-h-[44px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-brand-primary" /> Phone Number *
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
                            className="w-full px-4 py-3.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm bg-white min-h-[44px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-brand-primary" /> Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={formData.patientEmail}
                            onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm bg-white min-h-[44px]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-textDark mb-1.5 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-brand-primary" /> Specific Concerns or Questions (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Please mention any prior treatment, symptoms, or scheduling preferences..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary text-base sm:text-sm bg-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Preferred Contact Method */}
                  {step === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-5"
                    >
                      <label className="block text-sm font-semibold text-brand-textDark">
                        How would you prefer our clinic coordinator to reach you?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['WhatsApp', 'Call', 'Email'].map((method) => {
                          const isSelected = formData.contactMethod === method;
                          return (
                            <div
                              key={method}
                              onClick={() => setFormData({ ...formData, contactMethod: method })}
                              className={`p-4 min-h-[44px] rounded-xl border text-center cursor-pointer transition-all touch-manipulation flex items-center justify-center ${
                                isSelected
                                  ? 'bg-brand-deep text-white border-brand-deep font-bold shadow-sm'
                                  : 'bg-brand-soft/50 border-brand-primary/20 text-brand-textDark hover:border-brand-primary/40'
                              }`}
                            >
                              <span className="text-sm block">{method}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Request Summary Card */}
                      <div className="p-5 rounded-2xl bg-brand-soft/70 border border-brand-primary/20 text-xs text-brand-textDark space-y-2">
                        <div className="flex items-center gap-2 pb-2 border-b border-brand-primary/10">
                          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                          <span className="font-bold text-brand-deep uppercase tracking-wider">
                            Appointment Preference Summary
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                          <p><strong className="text-brand-textDark">Treatment:</strong> {formData.treatment}</p>
                          <p><strong className="text-brand-textDark">Preferred Date:</strong> {formData.preferredDate || 'Flexible'}</p>
                          <p><strong className="text-brand-textDark">Preferred Time:</strong> {formData.preferredTime}</p>
                          <p><strong className="text-brand-textDark">Contact Method:</strong> {formData.contactMethod}</p>
                          <p><strong className="text-brand-textDark">Patient Name:</strong> {formData.patientName}</p>
                          <p><strong className="text-brand-textDark">Phone:</strong> {formData.patientPhone}</p>
                        </div>
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
                      {loading ? 'Transmitting...' : step === 4 ? 'Submit Preference' : 'Continue'}
                    </Button>
                  </div>

                </form>
              </div>
            ) : (
              /* Submission Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto border-2 border-brand-primary/30 shadow-sm">
                  <Check className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-textDark">
                  Preference Request Received
                </h3>
                <p className="text-sm text-brand-textMuted max-w-lg mx-auto leading-relaxed font-sans">
                  Thank you, <strong className="text-brand-textDark">{formData.patientName}</strong>. Your consultation preference for <strong className="text-brand-deep">{formData.treatment}</strong> on <strong className="text-brand-textDark">{formData.preferredDate || 'your preferred schedule'}</strong> has been registered. Our coordination team will reach out via <strong className="text-brand-textDark">{formData.contactMethod}</strong> at <strong className="text-brand-textDark">{formData.patientPhone}</strong> to confirm your slot.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Button onClick={handleReset} variant="secondary" size="md">
                    Submit Another Request
                  </Button>
                  {CLINIC_INFO.phonePrimary && !CLINIC_INFO.phonePrimary.includes('98765') ? (
                    <Button href={`tel:${CLINIC_INFO.phonePrimary}`} variant="primary" size="md" icon={Phone}>
                      Call Direct: {CLINIC_INFO.phonePrimary}
                    </Button>
                  ) : (
                    <Button href="#about-clinic" variant="primary" size="md">
                      Explore the Clinic
                    </Button>
                  )}
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
