import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { X, Send, Printer, Edit3, Sparkles } from 'lucide-react';
import confirmationSeal from '../assets/images/melkazom-confirmation-seal.png';
import rsvpActionSeal from '../assets/images/melkazom-rsvp-seal.png';
import { WEDDING_CONFIG } from '../weddingData';

const BACKEND_URL = 'https://melkazom-backend.ifeanyieee8105.workers.dev';

export interface RsvpReceiptData {
  code: string;
  fullName: string;
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    const newCode = `MELKAZOM-RSVP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newReceipt: RsvpReceiptData = {
      code: receipt?.code || newCode,
      fullName: formData.fullName.trim(),
      attending: formData.attending as 'yes' | 'no',
      guestCount: formData.guestCount,
      mealPreference: formData.mealPreference,
      songRequest: formData.songRequest.trim(),
      message: formData.message.trim(),
      submittedAt: now,
    };

    // Save to local storage for immediate persistence
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newReceipt));
    } catch {
      // Storage unavailable
    }

    // Submit to Cloudflare backend asynchronously
    try {
      await fetch(`${BACKEND_URL}/api/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: newReceipt.code,
          fullName: newReceipt.fullName,
          attending: newReceipt.attending,
          guestCount: newReceipt.guestCount,
          mealPreference: newReceipt.mealPreference,
          songRequest: newReceipt.songRequest,
          message: newReceipt.message,
        }),
      });
    } catch (err) {
      console.warn('Backend sync failed, stored locally:', err);
    }

    setReceipt(newReceipt);
    setIsSubmitting(false);
    setIsEditing(false);

    // Celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0E3B2E', '#D4AF37', '#b7934b', '#F7F3EB'],
    });
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
            className="group relative cursor-pointer focus:outline-none transition-transform active:scale-95"
            aria-label={receipt ? 'View your RSVP receipt' : 'Open RSVP Form'}
          >
            {/* Ambient Gold Glow behind the seal */}
            <div className="absolute -inset-4 rounded-full bg-[#b7934b]/15 blur-lg transition-all group-hover:bg-[#b7934b]/30 group-hover:scale-110" />

            {/* Seal Image with Constant 360-Degree Slow Motion Rotation */}
            <div className="animate-spin-slow relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full drop-shadow-[0_10px_24px_rgba(60,40,30,0.25)] transition-all group-hover:scale-105">
              <img
                src={receipt ? confirmationSeal : rsvpActionSeal}
                alt={receipt ? 'Confirmed RSVP Wax Seal' : 'Click Seal to RSVP'}
                className="h-full w-full object-cover"
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
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#b7934b]/50 bg-[#b7934b] px-7 py-3 font-serif text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-sm transition-all hover:bg-[#967434] cursor-pointer"
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
      {/* TRUE FULL SCREEN PORTAL RSVP MODAL OVERLAY */}
      {/* ========================================================================= */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[99999] h-screen w-screen overflow-y-auto bg-[#fbf6ed] p-4 sm:p-8 flex flex-col items-center justify-start sm:justify-center transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl my-auto rounded-3xl border border-[#b7934b]/35 bg-[#fdfaf5] p-6 sm:p-10 shadow-[0_20px_60px_rgba(74,45,40,0.18)] text-center">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e9dc] text-[#4a2d28] hover:bg-[#e4dcce] transition-colors cursor-pointer shadow-xs"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Vintage Double-Line Ornamental Corners */}
            <div className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-[#b7934b] rounded-tl-md" />
            <div className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-[#b7934b] rounded-tr-md" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-[#b7934b] rounded-bl-md" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#b7934b] rounded-br-md" />
            <div className="pointer-events-none absolute inset-4 rounded-2xl border border-[#b7934b]/20" />

            {/* RECEIPT VIEW IN MODAL */}
            {receipt && !isEditing ? (
              <article>
                <p className="font-serif text-[10px] font-bold tracking-[0.3em] uppercase text-[#b7934b]">
                  A Joyful Union &bull; #Melkazom
                </p>
                <h3 className="font-serif text-2xl font-medium tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
                  {receipt.attending === 'yes' ? 'Your Place Is Reserved' : 'Your Response Is Received'}
                </h3>
                <p className="mt-1 font-serif text-xs italic text-[#6b4c46]">
                  This certifies the official RSVP response of
                </p>
                <h4 className="font-serif text-xl font-bold tracking-wide text-[#4a2d28] sm:text-2xl mt-1">
                  {receipt.fullName}
                </h4>

                {/* Star Divider */}
                <div className="mx-auto my-4 flex w-36 items-center justify-center gap-2" aria-hidden="true">
                  <span className="h-px flex-1 bg-[#b7934b]/40" />
                  <span className="text-xs text-[#b7934b]">✦</span>
                  <span className="h-px flex-1 bg-[#b7934b]/40" />
                </div>

                {/* Details List */}
                <dl className="mx-auto max-w-sm space-y-2 text-left font-serif text-xs text-[#4a2d28] bg-white/80 p-4 rounded-xl border border-[#b7934b]/20">
                  <div className="flex justify-between border-b border-[#b7934b]/15 pb-1">
                    <dt className="text-[#7a5c4e] uppercase tracking-wider text-[10px]">Celebration</dt>
                    <dd className="font-semibold text-[#4a2d28]">{WEDDING_CONFIG.couple.groom.shortName} &amp; {WEDDING_CONFIG.couple.bride.shortName}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#b7934b]/15 pb-1">
                    <dt className="text-[#7a5c4e] uppercase tracking-wider text-[10px]">Wedding Date</dt>
                    <dd className="font-semibold text-[#4a2d28]">{WEDDING_CONFIG.event.date}</dd>
                  </div>
                  <div className="flex justify-between border-b border-[#b7934b]/15 pb-1">
                    <dt className="text-[#7a5c4e] uppercase tracking-wider text-[10px]">Response</dt>
                    <dd className={`font-semibold ${receipt.attending === 'yes' ? 'text-[#0E3B2E]' : 'text-[#964b4b]'}`}>
                      {receipt.attending === 'yes' ? `Joyfully Accepts (${receipt.guestCount} guest)` : 'Regretfully Declines'}
                    </dd>
                  </div>
                  {receipt.attending === 'yes' && (
                    <div className="flex justify-between border-b border-[#b7934b]/15 pb-1">
                      <dt className="text-[#7a5c4e] uppercase tracking-wider text-[10px]">Meal Preference</dt>
                      <dd className="font-semibold text-[#4a2d28] capitalize">{receipt.mealPreference}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-[#7a5c4e] uppercase tracking-wider text-[10px]">Receipt ID</dt>
                    <dd className="font-mono font-bold text-[#b7934b]">{receipt.code}</dd>
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
                  <span className="mt-1 font-serif text-[9px] tracking-[0.25em] text-[#7a5c4e] uppercase">
                    Official Melkazom Wax Seal
                  </span>
                </div>

                <p className="font-serif text-xs italic text-[#6b4c46] max-w-sm mx-auto mb-6">
                  {receipt.attending === 'yes'
                    ? 'Please download or print this keepsake as confirmation of your place at our celebration.'
                    : 'Thank you for your warm thoughts and prayers for our special day.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b7934b] bg-[#b7934b] px-5 py-2.5 font-serif text-xs font-semibold tracking-wider text-white shadow-sm transition-all hover:bg-[#967434] cursor-pointer"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print Receipt</span>
                  </button>

                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-2.5 font-sans text-xs font-semibold tracking-wider text-white shadow-sm hover:bg-[#1faa4f] transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span>Share on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#b7934b]/40 bg-white px-4 py-2.5 font-serif text-xs font-semibold tracking-wider text-[#4a2d28] hover:bg-[#fbf6ed] transition-colors cursor-pointer"
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
                  <p className="font-serif text-[10px] font-bold tracking-[0.3em] uppercase text-[#b7934b]">
                    Melkazom Guest Ledger
                  </p>
                  <h3 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-0.5">
                    {isEditing ? 'Update Your Attendance' : 'Confirm Your Attendance'}
                  </h3>
                  <div className="mx-auto mt-2 flex w-16 items-center justify-center gap-2" aria-hidden="true">
                    <span className="h-px flex-1 bg-[#b7934b]/40" />
                    <span className="text-[10px] text-[#b7934b]">✦</span>
                    <span className="h-px flex-1 bg-[#b7934b]/40" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
                      Full Name <span className="text-[#964b4b]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Chief & Lolo Emeka Okafor"
                      className="w-full rounded-xl border border-[#b7934b]/30 bg-white px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b] focus:ring-1 focus:ring-[#b7934b]/30"
                    />
                  </div>

                  {/* Attendance */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1.5">
                      Will you attend? <span className="text-[#964b4b]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: 'yes' })}
                        className={`cursor-pointer rounded-xl py-2.5 px-3 text-center font-serif text-xs font-semibold tracking-wider uppercase transition-all ${
                          formData.attending === 'yes'
                            ? 'bg-[#0E3B2E] text-white shadow-sm'
                            : 'border border-[#b7934b]/30 bg-white text-[#4a2d28] hover:bg-[#fbf6ed]'
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
                            : 'border border-[#b7934b]/30 bg-white text-[#4a2d28] hover:bg-[#fbf6ed]'
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
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
                          Number of Guests Attending
                        </label>
                        <select
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                          className="w-full rounded-xl border border-[#b7934b]/30 bg-white px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b]"
                        >
                          <option value="1">1 Guest (Myself)</option>
                          <option value="2">2 Guests (+1 Partner)</option>
                          <option value="3">3 Guests (Family)</option>
                          <option value="4">4 Guests (Family)</option>
                        </select>
                      </div>

                      {/* Meal Preference */}
                      <div>
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
                          Meal Preference
                        </label>
                        <select
                          value={formData.mealPreference}
                          onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value })}
                          className="w-full rounded-xl border border-[#b7934b]/30 bg-white px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b]"
                        >
                          <option value="meat">Assorted Meat &amp; Nigerian Delicacies</option>
                          <option value="fish">Fresh Fish &amp; Seafood Classics</option>
                          <option value="chicken">Spiced Peppered Chicken</option>
                          <option value="vegetarian">Vegetarian / Plant-Based Feast</option>
                        </select>
                      </div>

                      {/* Song Request */}
                      <div>
                        <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
                          Song Request for the DJ (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.songRequest}
                          onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                          placeholder="e.g. Flavour – Ada Ada"
                          className="w-full rounded-xl border border-[#b7934b]/30 bg-white px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b]"
                        />
                      </div>
                    </>
                  )}

                  {/* Message for Couple */}
                  <div>
                    <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
                      Warm Wishes or Prayers (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share a heartfelt blessing for Melford &amp; Chiazokam..."
                      className="w-full rounded-xl border border-[#b7934b]/30 bg-white px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#b7934b] bg-[#b7934b] py-3.5 px-6 font-serif text-xs font-bold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:bg-[#967434] active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Recording in Ledger...' : 'Submit Official RSVP'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
