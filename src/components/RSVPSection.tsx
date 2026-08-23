import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Heart, Music, Utensils, MessageSquare, Send } from 'lucide-react';

export const RSVPSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attending: 'yes',
    guestCount: '1',
    mealPreference: 'meat',
    songRequest: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#7090b8', '#d8a49b', '#f7f3eb', '#e2c27c'],
      });
    }, 600);
  };

  const generateWhatsAppMessage = () => {
    const status = formData.attending === 'yes' ? 'Attending with joy' : 'Regretfully unable to attend';
    const text = `*Wedding RSVP — #Melkazom*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email || 'N/A'}%0A*Status:* ${status}%0A*Guest Count:* ${formData.guestCount}%0A*Meal:* ${formData.mealPreference}%0A*Song Request:* ${formData.songRequest || 'None'}%0A*Message for Melford & Chiazokam:* ${formData.message || 'Congratulations!'}`;
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section id="rsvp-section" className="my-20 space-y-8 text-center">
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#556987] uppercase">
          The Honour of Your Reply
        </p>
        <h2 className="font-script mt-1 text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          RSVP
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          Kindly respond on or before 1st December 2026
        </p>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      <div className="mx-auto max-w-md px-4">
        {submitted ? (
          <div className="rounded-3xl border border-white/60 bg-white/60 py-8 px-6 text-center shadow-xs backdrop-blur-xs">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4f9] text-[#34516d] shadow-sm">
              <CheckCircle2 className="h-9 w-9 text-[#34516d]" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#2c3e50] mb-2">
              Thank you, {formData.fullName}!
            </h3>
            <p className="mx-auto mb-6 max-w-md text-xs leading-relaxed text-[#617488]">
              {formData.attending === 'yes'
                ? "Your RSVP has been confirmed. We can't wait to celebrate this special day with you in Enugu!"
                : 'Thank you for letting us know. You will be dearly missed on our special day!'}
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#20bd5a]"
              >
                <Send className="h-4 w-4" />
                Send Copy via WhatsApp
              </a>
              <button
                onClick={() => setSubmitted(false)}
                type="button"
                className="py-2 text-xs font-sans uppercase tracking-wider text-[#7a92ad] underline hover:text-[#2c3e50]"
              >
                Edit Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                Full Name <span className="text-[#964b4b]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Chief & Lolo Emeka Okafor"
                className="w-full rounded-2xl border border-[#cbd9e6] bg-[#f7fafc] px-4 py-3 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#7090b8] focus:bg-white focus:ring-2 focus:ring-[#7090b8]/20"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full rounded-2xl border border-[#cbd9e6] bg-[#f7fafc] px-4 py-3 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#7090b8] focus:bg-white focus:ring-2 focus:ring-[#7090b8]/20"
              />
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-2">
                Will you attend? <span className="text-[#964b4b]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`cursor-pointer rounded-2xl py-3 px-4 text-center font-serif text-xs font-semibold tracking-wider uppercase transition-all ${
                    formData.attending === 'yes'
                      ? 'bg-[#34516d] text-white shadow-sm'
                      : 'border border-[#cbd9e6] bg-[#f7fafc] text-[#617488] hover:border-[#7090b8]'
                  }`}
                >
                  Yes, I Will Attend
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`cursor-pointer rounded-2xl py-3 px-4 text-center font-serif text-xs font-semibold tracking-wider uppercase transition-all ${
                    formData.attending === 'no'
                      ? 'bg-[#617488] text-white shadow-sm'
                      : 'border border-[#cbd9e6] bg-[#f7fafc] text-[#617488] hover:border-[#7090b8]'
                  }`}
                >
                  No, I Can&apos;t Attend
                </button>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <>
                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                    Number of Guests (Including Yourself)
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full rounded-2xl border border-[#cbd9e6] bg-[#f7fafc] px-4 py-3 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#7090b8] focus:bg-white"
                  >
                    <option value="1">1 Guest (Myself)</option>
                    <option value="2">2 Guests (+1 Partner)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests (Family)</option>
                  </select>
                </div>

                {/* Meal Preference - Radio buttons matching reference video */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-2">
                    <Utensils className="h-3.5 w-3.5 text-[#34516d]" />
                    <span>Meal Preference</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'meat', label: 'Meat' },
                      { id: 'fish', label: 'Fish' },
                      { id: 'veggie', label: 'Vegetarian' },
                    ].map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, mealPreference: meal.id })}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-serif transition-all ${
                          formData.mealPreference === meal.id
                            ? 'border-[#34516d] bg-[#edf4f9] text-[#2c3e50] font-bold shadow-xs'
                            : 'border-[#cbd9e6] bg-[#f7fafc] text-[#617488] hover:border-[#7090b8]'
                        }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full border ${formData.mealPreference === meal.id ? 'border-[#34516d] bg-[#34516d]' : 'border-[#94a3b8]'}`} />
                        <span>{meal.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Song Request */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                    <Music className="h-3.5 w-3.5 text-[#34516d]" />
                    <span>Song Request for the Party</span>
                  </label>
                  <input
                    type="text"
                    value={formData.songRequest}
                    onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                    placeholder="e.g. 'Onyeka' by Burna Boy / 'Ada Ada' by Flavour"
                    className="w-full rounded-2xl border border-[#cbd9e6] bg-[#f7fafc] px-4 py-3 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#7090b8] focus:bg-white focus:ring-2 focus:ring-[#7090b8]/20"
                  />
                </div>
              </>
            )}

            {/* Message for the Couple */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-serif font-semibold tracking-wider text-[#2c3e50] uppercase mb-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-[#34516d]" />
                <span>Message for the Couple (Optional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write a few warm words of blessing for Melford and Chiazokam..."
                className="w-full rounded-2xl border border-[#cbd9e6] bg-[#f7fafc] px-4 py-3 text-sm text-[#2c3e50] outline-none transition-all focus:border-[#7090b8] focus:bg-white focus:ring-2 focus:ring-[#7090b8]/20"
              />
            </div>

            {/* Large Submit Button in Dusky Rose/Slate Blue matching reference */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#8e6e73] to-[#75585d] py-4 font-serif text-sm font-semibold tracking-[0.2em] text-white uppercase shadow-[0_10px_28px_rgba(117,88,93,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(117,88,93,0.35)] active:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Sending RSVP...</span>
              ) : (
                <>
                  <span>Submit RSVP</span>
                  <Heart className="h-4 w-4 fill-white text-white" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
