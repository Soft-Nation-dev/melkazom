import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, Printer, Edit3, Sparkles } from 'lucide-react';
import confirmationSeal from '../assets/images/melkazom-confirmation-seal.png';
import rsvpActionSeal from '../assets/images/melkazom-rsvp-seal.png';
import { WEDDING_CONFIG } from '../weddingData';

export interface RsvpReceiptData {
  code: string;
  fullName: string;
  email: string;
  attending: 'yes' | 'no';
  guestCount: string;
  mealPreference: string;
  songRequest: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = 'melkazom-rsvp-receipt-v1';

export const RSVPSection: React.FC = () => {
  const [receipt, setReceipt] = useState<RsvpReceiptData | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RsvpReceiptData;
        return parsed && parsed.code && parsed.fullName ? parsed : null;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [formData, setFormData] = useState(() => {
    const defaultData = {
      fullName: '',
      email: '',
      attending: 'yes',
      guestCount: '1',
      mealPreference: 'meat',
      songRequest: '',
      message: '',
    } as const;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RsvpReceiptData;
        if (parsed && parsed.fullName) {
          return {
            fullName: parsed.fullName,
            email: parsed.email || '',
            attending: parsed.attending,
            guestCount: parsed.guestCount,
            mealPreference: parsed.mealPreference,
            songRequest: parsed.songRequest || '',
            message: parsed.message || '',
          };
        }
      }
    } catch {
      // ignore
    }
    return defaultData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newCode = `MELKAZOM-RSVP-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const newReceipt: RsvpReceiptData = {
        code: receipt?.code || newCode,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        attending: formData.attending as 'yes' | 'no',
        guestCount: formData.guestCount,
        mealPreference: formData.mealPreference,
        songRequest: formData.songRequest.trim(),
        message: formData.message.trim(),
        submittedAt: now,
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newReceipt));
      } catch {
        // Storage unavailable
      }

      setReceipt(newReceipt);
      setIsSubmitting(false);
      setIsEditing(false);

      // Celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0E3B2E', '#D4AF37', '#7090b8', '#F7F3EB'],
      });
    }, 700);
  };

  const generateWhatsAppMessage = () => {
    if (!receipt) return '';
    const status = receipt.attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Unable to Attend';
    const text = [
      `*Official Wedding RSVP Confirmation — #Melkazom*`,
      `*Receipt Code:* ${receipt.code}`,
      ``,
      `*Guest Name:* ${receipt.fullName}`,
      `*Response:* ${status}`,
      receipt.attending === 'yes' ? `*Party Size:* ${receipt.guestCount} guest(s)` : null,
      receipt.attending === 'yes' ? `*Meal Choice:* ${receipt.mealPreference.toUpperCase()}` : null,
      receipt.songRequest ? `*Song Request:* ${receipt.songRequest}` : null,
      receipt.message ? `*Message for Couple:* ${receipt.message}` : null,
      ``,
      `_Certified on ${receipt.submittedAt}_`,
    ].filter(Boolean).join('\n');

    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="rsvp-section" className="relative my-20 px-4 text-center">
      {/* Section Header */}
      <div className="mb-8">
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          The Honour of Your Reply
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          RSVP &amp; Attendance
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE WAX SEAL BUTTON — PREMIUM BORDERLESS STATIONERY */}
      {/* ========================================================================= */}
      <div className="relative mx-auto max-w-sm text-center">
        <p className="font-serif text-xs italic text-[#6b4c46] mb-6">
          {receipt
            ? `Welcome, ${receipt.fullName}. Your RSVP is certified in our ledger.`
            : 'Kindly break the seal below to submit your attendance and receive your official keepsake receipt.'}
        </p>

        {/* The Clickable Wax Seal Button with Constant Slow 360 Rotation */}
        <div className="relative flex flex-col items-center justify-center">
          <button
            onClick={() => {
              setIsEditing(false);
              setIsModalOpen(true);
            }}
            type="button"
            className="group relative cursor-pointer outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label={receipt ? 'Open RSVP Keepsake Receipt' : 'Open RSVP Form'}
          >
            {/* Glowing Halo */}
            <div className="animate-pulse-soft absolute -inset-3 rounded-full bg-[#b7934b]/20 blur-md group-hover:bg-[#b7934b]/35" />

            {/* Seal Image with Constant 360-Degree Slow Motion Rotation & Transparent Multiply Blend */}
            <div className="animate-spin-slow relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full shadow-[0_10px_28px_rgba(76,39,35,0.25)] transition-all">
              <img
                src={receipt ? confirmationSeal : rsvpActionSeal}
                alt={receipt ? 'Confirmed RSVP Wax Seal' : 'Click Seal to RSVP'}
                className="h-full w-full object-cover mix-blend-multiply"
              />
            </div>
          </button>

          {/* CTA Label */}
          <button
            onClick={() => {
              setIsEditing(false);
              setIsModalOpen(true);
            }}
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#b7934b]/50 bg-[#b7934b] px-7 py-3 font-serif text-xs font-semibold tracking-[0.2em] text-white uppercase"
          >
            <Sparkles className="h-4 w-4 text-[#fcfaf7]" />
            <span>{receipt ? 'View Keepsake Receipt' : 'Click Seal to RSVP'}</span>
          </button>

          <p className="mt-3 font-serif text-[10px] tracking-wider text-[#7a5c4e] uppercase">
            Kindly respond on or before 1st Dec 2026
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL SCREEN RSVP MODAL DIALOG */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-[#f6f1e8]/95 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl min-h-[85vh] my-auto flex flex-col justify-center rounded-3xl border-2 border-[#b28a46]/50 bg-[#fdfcf9] p-6 sm:p-12 shadow-2xl text-center">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0e9df] text-[#2c3e50] hover:bg-[#e4dcce] transition-colors cursor-pointer shadow-xs"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Vintage Double-Line Ornamental Corners */}
            <div className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[#b28a46] rounded-tl-md" />
            <div className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[#b28a46] rounded-tr-md" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#b28a46] rounded-bl-md" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#b28a46] rounded-br-md" />
            <div className="pointer-events-none absolute inset-4 rounded-2xl border border-[#b28a46]/20" />

            {/* RECEIPT VIEW IN MODAL */}
            {receipt && !isEditing ? (
              <article>
                <p className="font-serif text-[10px] font-bold tracking-[0.3em] uppercase text-[#b28a46]">
                  A Joyful Union • #Melkazom
                </p>
                <h3 className="font-serif text-2xl font-medium tracking-wide text-[#2c3e50] sm:text-3xl mt-1">
                  {receipt.attending === 'yes' ? 'Your Place Is Reserved' : 'Your Response Is Received'}
                </h3>
                <p className="mt-1 font-serif text-xs italic text-[#556987]">
                  This certifies the official RSVP response of
                </p>
                <h4 className="font-serif text-xl font-bold tracking-wide text-[#1e2f42] sm:text-2xl mt-1">
                  {receipt.fullName}
                </h4>

                {/* Star Divider */}
                <div className="mx-auto my-4 flex w-36 items-center justify-center gap-2" aria-hidden="true">
                  <span className="h-px flex-1 bg-[#b28a46]/40" />
                  <span className="text-xs text-[#b28a46]">✦</span>
                  <span className="h-px flex-1 bg-[#b28a46]/40" />
                </div>

                {/* Details List */}
                <dl className="mx-auto max-w-sm space-y-2 text-left font-serif text-xs text-[#344d66] bg-white/80 p-4 rounded-xl border border-[#b28a46]/20">
                  <div className="flex justify-between border-b border-[#b28a46]/15 pb-1">
                    <dt className="text-[#7a6a58] uppercase tracking-wider text-[10px]">Celebration</dt>
                    <dd className="font-semibold text-[#1e2f42]">{WEDDING_CONFIG.couple.groom.shortName} &amp; {WEDDING_CONFIG.couple.bride.shortName}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#b28a46]/15 pb-1">
                    <dt className="text-[#7a6a58] uppercase tracking-wider text-[10px]">Wedding Date</dt>
                    <dd className="font-semibold text-[#1e2f42]">{WEDDING_CONFIG.event.date}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#b28a46]/15 pb-1">
                    <dt className="text-[#7a6a58] uppercase tracking-wider text-[10px]">Response</dt>
                    <dd className={`font-semibold ${receipt.attending === 'yes' ? 'text-[#0E3B2E]' : 'text-[#964b4b]'}`}>
                      {receipt.attending === 'yes' ? `Joyfully Accepts (${receipt.guestCount} guest)` : 'Regretfully Declines'}
                    </dd>
                  </div>
                  {receipt.attending === 'yes' && (
                    <div className="flex justify-between border-b border-[#b28a46]/15 pb-1">
                      <dt className="text-[#7a6a58] uppercase tracking-wider text-[10px]">Meal Preference</dt>
                      <dd className="font-semibold text-[#1e2f42] capitalize">{receipt.mealPreference}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-[#7a6a58] uppercase tracking-wider text-[10px]">Receipt ID</dt>
                    <dd className="font-mono font-bold text-[#b28a46]">{receipt.code}</dd>
                  </div>
                </dl>

                {/* Wax Seal Badge */}
                <div className="my-5 flex flex-col items-center justify-center">
                  <div className="relative h-24 w-24 overflow-hidden rounded-full drop-shadow-md">
                    <img
                      src={confirmationSeal}
                      alt="Melford & Chiazokam Confirmed RSVP Wax Seal"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-1 font-serif text-[9px] tracking-[0.25em] text-[#7a6a58] uppercase">
                    Official Melkazom Wax Seal
                  </span>
                </div>

                <p className="font-serif text-xs italic text-[#556987] max-w-sm mx-auto mb-6">
                  {receipt.attending === 'yes'
                    ? 'Please download or print this keepsake as confirmation of your place at our celebration.'
                    : 'Thank you for your warm thoughts and prayers for our special day.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b28a46] bg-[#b28a46] px-5 py-2.5 font-serif text-xs font-semibold tracking-wider text-white"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Receipt</span>
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-2.5 font-sans text-xs font-semibold tracking-wider text-white"
                  >
                    <Send className="h-4 w-4" />
                    <span>Share on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#cbd9e6] bg-white px-4 py-2.5 font-serif text-xs font-semibold tracking-wider text-[#34516d]"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit Response</span>
                  </button>
                </div>
              </article>
            ) : (
              /* FORM VIEW IN MODAL */
              <div className="text-left">
                <div className="mb-6 text-center">
                  <p className="font-serif text-[10px] font-bold tracking-[0.3em] uppercase text-[#b28a46]">
                    Melkazom Guest Ledger
                  </p>
                  <h3 className="font-serif text-2xl font-normal tracking-wide text-[#2c3e50] sm:text-3xl mt-0.5">
                    {isEditing ? 'Update Your Attendance' : 'Confirm Your Attendance'}
                  </h3>
                  <div className="mx-auto mt-2 flex w-16 items-center justify-center gap-2" aria-hidden="true">
                    <span className="h-px flex-1 bg-[#b28a46]/40" />
                    <span className="text-[10px] text-[#b28a46]">✦</span>
                    <span className="h-px flex-1 bg-[#b28a46]/40" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                      Full Name <span className="text-[#964b4b]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Chief & Lolo Emeka Okafor"
                      className="w-full rounded-xl border border-[#cbd9e6] bg-white px-4 py-2.5 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#b28a46] focus:ring-1 focus:ring-[[...]]"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full rounded-xl border border-[#cbd9e6] bg-white px-4 py-2.5 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#b28a46] focus:ring-1 focus:ring-[[...]]"
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                      Will you attend? <span className="text-[#964b4b]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                        className={`cursor-pointer rounded-xl py-2.5 px-3 text-center font-serif text-xs font-semibold tracking-wider uppercase transition-all ${
                          formData.attending === 'yes'
                            ? 'bg-[#0E3B2E] text-white shadow-sm'
                            : 'border border-[#cbd9e6] bg-white text-[#34516d] hover:bg-[#f7fafc]'
                        }`}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'no' })}
                        className={`cursor-pointer rounded-xl py-2.5 px-3 text-center font-serif text-xs font-semibold tracking-wider uppercase transition-all ${
                          formData.attending === 'no'
                            ? 'bg-[#5c4040] text-white shadow-sm'
                            : 'border border-[#cbd9e6] bg-white text-[#34516d] hover:bg-[#f7fafc]'
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {formData.attending === 'yes' && (
                    <>
                      {/* Party Size */}
                      <div>
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                          Number of Guests Attending
                        </label>
                        <select
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="w-full rounded-xl border border-[#cbd9e6] bg-white px-4 py-2.5 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#b28a46]"
                        >
                          <option value="1">1 Guest (Myself)</option>
                          <option value="2">2 Guests (+1 Partner)</option>
                          <option value="3">3 Guests (Family)</option>
                          <option value="4">4 Guests (Family)</option>
                        </select>
                      </div>

                      {/* Meal Selection */}
                      <div>
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                          Banquet Meal Selection
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { key: 'meat', label: 'Meat Feast', note: 'Jollof & Beef' },
                            { key: 'fish', label: 'Fresh Fish', note: 'Croaker Fish' },
                            { key: 'vegetarian', label: 'Vegetarian', note: 'Plantain & Veg' },
                          ].map((meal) => (
                            <button
                              key={meal.key}
                              type="button"
                              onClick={() => setFormData({ ...formData, mealPreference: meal.key })}
                              className={`cursor-pointer rounded-xl p-2 text-center transition-all ${
                                formData.mealPreference === meal.key
                                  ? 'border-2 border-[#b28a46] bg-[#fcfaf7] shadow-xs'
                                  : 'border border-[#cbd9e6] bg-white hover:bg-[#f7fafc]'
                              }`}
                            >
                              <span className="block font-serif text-[11px] font-bold text-[#2c3e50]">
                                {meal.label}
                              </span>
                              <span className="block text-[8px] text-[#556987]">
                                {meal.note}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Song Request */}
                      <div>
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                          Song Request for the Dance Floor
                        </label>
                        <input
                          type="text"
                          value={formData.songRequest}
                          onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                          placeholder="e.g. Beautiful People by Chike"
                          className="w-full rounded-xl border border-[#cbd9e6] bg-white px-4 py-2 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#b28a46]"
                        />
                      </div>
                    </>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1">
                      Blessings &amp; Message for the Couple
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a sweet note or blessing for Melford & Chiazokam..."
                      className="w-full rounded-xl border border-[#cbd9e6] bg-white px-4 py-2 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#b28a46]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer rounded-full border border-[#b28a46]/50 bg-gradient-to-r from-[#0E3B2E] via-[#1a4a3c] to-[#0E3B2E] py-3.5 text-center font-serif text-xs font-semibold tracking-wider text-white"
                    >
                      {isSubmitting ? 'Recording RSVP...' : isEditing ? 'Update Response' : 'Confirm RSVP & Generate Receipt'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
