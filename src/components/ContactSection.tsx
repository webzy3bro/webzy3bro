import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { CONTACT_BUDGET_OPTIONS, CONTACT_SERVICE_OPTIONS } from '../data/agencyData';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  preselectedService: string;
}

interface FormState {
  fullName: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  description: string;
}

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    company: '',
    service: preselectedService || 'Website',
    budget: '',
    description: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validateClient = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {};
    if (form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.service) {
      errors.service = 'Please select a service.';
    }
    if (form.description.trim().length < 15) {
      errors.description = 'Please include at least 15 characters describing your project.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting' || !validateClient()) return;

    setStatus('submitting');
    setSubmitError('');
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const responseText = await response.text();
      let result: { error?: string; message?: string } = {};
      if (responseText) {
        try {
          const parsed: unknown = JSON.parse(responseText);
          if (parsed && typeof parsed === 'object') {
            result = {
              error: 'error' in parsed && typeof parsed.error === 'string' ? parsed.error : undefined,
              message:
                'message' in parsed && typeof parsed.message === 'string' ? parsed.message : undefined,
            };
          }
        } catch {
          // Use the status-based message below when the server returns HTML or invalid JSON.
        }
      }

      if (!response.ok) {
        throw new Error(
          result.error || `We could not send your inquiry (server error ${response.status}). Please try again.`
        );
      }
      if (!result.message) {
        throw new Error('The server did not confirm delivery. Please try again or email us directly.');
      }
      setStatus('success');
    } catch (error) {
      setStatus('idle');
      setSubmitError(error instanceof Error ? error.message : 'We could not send your inquiry. Please try again.');
    }
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      email: '',
      company: '',
      service: 'Website',
      budget: '',
      description: '',
    });
    setFieldErrors({});
    setStatus('idle');
    setSubmitError('');
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-[#08090D] border-t border-white/8 overflow-hidden"
    >
      {/* Subtle Brand Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 w-[480px] h-[480px] rounded-full opacity-20 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #9333EA 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Pitch Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C084FC] uppercase">
              CONTACT
            </p>
            <h2 className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              LET&apos;S BUILD
              <span className="block text-[#B7A3FF]">SOMETHING GREAT.</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Have an idea, a business to grow, or a project waiting to happen? Let&apos;s bring it to life with design and technology.
            </p>

            <div className="pt-2">
              <MagneticButton
                onClick={() => nameInputRef.current?.focus()}
                className="px-7 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-sm gap-2 transition-colors"
              >
                <span>START YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-3 text-sm">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Direct Email</span>
                <a
                  href="mailto:hello@webzy3bro.com"
                  className="text-white hover:text-[#C084FC] transition-colors font-medium"
                >
                  hello@webzy3bro.com
                </a>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Typical Response</span>
                <span className="text-zinc-200">Within 1 business day</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/12 bg-[#0D0D14] p-6 sm:p-9">
              {status === 'success' ? (
                <div className="py-10 text-center space-y-5">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center text-[#C084FC]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      Your inquiry has been sent.
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      Thanks for reaching out. We&apos;ll review your project details and get back to you soon.
                    </p>
                  </div>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 text-sm font-medium text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {submitError && (
                    <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {submitError}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-zinc-200">
                        Full name <span className="text-[#C084FC]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="fullName"
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={form.fullName}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, fullName: e.target.value }));
                          if (fieldErrors.fullName) setFieldErrors((fe) => ({ ...fe, fullName: undefined }));
                        }}
                        className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                      />
                      {fieldErrors.fullName && (
                        <p className="text-xs text-red-400">{fieldErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
                        Email address <span className="text-[#C084FC]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, email: e.target.value }));
                          if (fieldErrors.email) setFieldErrors((fe) => ({ ...fe, email: undefined }));
                        }}
                        className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-400">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium text-zinc-200">
                        Company or brand name <span className="text-zinc-500 text-xs">(optional)</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Studio or Company Ltd."
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8B5CF6] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="service" className="block text-sm font-medium text-zinc-200">
                        Service required <span className="text-[#C084FC]">*</span>
                      </label>
                      <select
                        id="service"
                        required
                        value={form.service}
                        onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                        className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                      >
                        {CONTACT_SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#0D0D14] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-sm font-medium text-zinc-200">
                      Project budget <span className="text-zinc-500 text-xs">(optional)</span>
                    </label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                      className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    >
                      <option value="" className="bg-[#0D0D14] text-zinc-400">
                        Select an estimated range
                      </option>
                      {CONTACT_BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0D0D14] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-zinc-200">
                      Project description <span className="text-[#C084FC]">*</span>
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={4}
                      placeholder="Tell us about your website, mobile app, goals, and timeline..."
                      value={form.description}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, description: e.target.value }));
                        if (fieldErrors.description) {
                          setFieldErrors((fe) => ({ ...fe, description: undefined }));
                        }
                      }}
                      className="w-full rounded-xl bg-[#07070B] border border-white/12 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#8B5CF6] transition-colors resize-y"
                    />
                    {fieldErrors.description && (
                      <p className="text-xs text-red-400">{fieldErrors.description}</p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pt-2 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors min-h-[48px]"
                    >
                      <span>{status === 'submitting' ? 'Sending...' : 'Send Project Inquiry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
