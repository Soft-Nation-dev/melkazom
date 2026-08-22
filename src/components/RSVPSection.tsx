import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, MessageCircle } from 'lucide-react';
import { VintageHeading } from './VintageHeading';

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attending: 'yes',
    guestCount: '1',
    songRequest: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    // Simulate save & confetti celebration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger wedding celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#0e3b2e', '#f7f3eb', '#d8a49b'],
      });
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    const status = formData.attending === 'yes' ? 'Attending with joy' : 'Regretfully unable to attend';
    const text = `*Wedding RSVP — #Melkazom*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email || 'N/A'}%0A*Status:* ${status}%0A*Guest Count:* ${formData.guestCount}%0A*Song Request:* ${formData.songRequest || 'None'}%0A*Message for Melford & Chiazokam:* ${formData.message || 'Congratulations!'}`;
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section id="rsvp-section" className="floral-section floral-section--sage my-20 w-full px-1 py-12 sm:px-5">
      <VintageHeading eyebrow="The Honour of Your Reply" title="R.S.V.P" subtitle="Kindly respond on or before 1st December 2026" />

      <div className="vintage-panel p-6 sm:p-9">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#0e3b2e]/10 text-[#0e3b2e] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#0e3b2e]" />
            </div>
            <h3 className="text-2xl font-serif text-[#1a2520] mb-2">
              Thank you, {formData.fullName}!
            </h3>
            <p className="text-sm font-sans text-[#5c544d] max-w-md mx-auto mb-6">
              {formData.attending === 'yes'
                ? "Your RSVP has been confirmed. We can't wait to celebrate this special day with you in Enugu!"
                : "Thank you for letting us know. You will be dearly missed on our special day!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-md hover:bg-[#20bd5a] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Send Copy via WhatsApp
              </a>
              <button
                onClick={() => setSubmitted(false)}
                type="button"
                className="text-xs font-sans uppercase tracking-wider text-[#8e7f6e] underline py-2 hover:text-[#1a2520]"
              >
                Edit Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-1.5">
                Full Name <span className="text-[#d4af37]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Chief & Lolo Emeka Okafor"
                className="vintage-field w-full px-4 py-3 text-sm text-[#29362d] outline-none transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="vintage-field w-full px-4 py-3 text-sm text-[#29362d] outline-none transition-all"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-2.5">
                Will you attend? <span className="text-[#d4af37]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-3 px-4 rounded-xl border text-xs uppercase font-serif font-semibold tracking-wider transition-all text-center cursor-pointer ${
                    formData.attending === 'yes'
                      ? 'bg-[#0e3b2e] text-[#f7e199] border-[#0e3b2e] shadow-sm'
                      : 'bg-[#faf8f5] text-[#5c544d] border-[#e5ddd3] hover:border-[#d4af37]'
                  }`}
                >
                  Yes, I Will Attend
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-3 px-4 rounded-xl border text-xs uppercase font-serif font-semibold tracking-wider transition-all text-center cursor-pointer ${
                    formData.attending === 'no'
                      ? 'bg-[#8e7f6e] text-white border-[#8e7f6e] shadow-sm'
                      : 'bg-[#faf8f5] text-[#5c544d] border-[#e5ddd3] hover:border-[#d4af37]'
                  }`}
                >
                  No, I Can't Attend
                </button>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <>
                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-1.5">
                    Number of Guests (Including Yourself)
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="vintage-field w-full px-4 py-3 text-sm text-[#29362d] outline-none"
                  >
                    <option value="1">1 Guest (Myself)</option>
                    <option value="2">2 Guests (+1 Partner)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests (Family)</option>
                  </select>
                </div>

                {/* Song Request */}
                <div>
                  <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-1.5">
                    Song Request for the Party
                  </label>
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="e.g. 'Onyeka' by Burna Boy / 'Ada Ada' by Flavour"
                    className="vintage-field w-full px-4 py-3 text-sm text-[#29362d] outline-none"
                  />
                </div>
              </>
            )}

            {/* Message for the Couple */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#3a322c] mb-1.5">
                Message for the Couple (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write a few warm words of blessing for Melford and Chiazokam..."
                className="vintage-field w-full px-4 py-3 text-sm text-[#29362d] outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#c5a45f]/55 bg-gradient-to-r from-[#293b31] to-[#3e5144] py-4 font-serif text-sm font-semibold tracking-[0.2em] text-[#f6e7b8] uppercase shadow-[0_10px_28px_rgba(41,59,49,.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(41,59,49,.34)] active:translate-y-0"
            >
              {isSubmitting ? (
                <span>Sending RSVP...</span>
              ) : (
                <>
                  <span>Send RSVP</span>
                  <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
