import React, { useState } from 'react';
import { MessageSquare, Send, Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const MessageSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [coupleMessage, setCoupleMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !coupleMessage.trim()) return;

    const text = [
      `*A wedding message for Melford & Chiazokam (#Melkazom)*`,
      ``,
      `*From:* ${senderName}`,
      senderEmail ? `*Email:* ${senderEmail}` : null,
      ``,
      `*Message:*`,
      `${coupleMessage}`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="my-24 px-4 text-center">
      <div className="mb-8">
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          With Love &amp; Warm Wishes
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          Send a Message to the Couple
        </h2>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          Share your heartfelt prayers, advice, or celebratory words directly with Melford &amp; Chiazokam.
        </p>
      </div>

      <div className="mx-auto max-w-md text-left">
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#17233a] uppercase mb-1">
              Your Name <span className="text-[#964b4b]">*</span>
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Obinna & Amaka"
              className="w-full rounded-xl border border-[#b28a46]/30 bg-white px-4 py-2.5 text-sm text-[#17233a] outline-none transition-all focus:border-[#b28a46] focus:ring-1 focus:ring-[#b28a46]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#17233a] uppercase mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-[#b28a46]/30 bg-white px-4 py-2.5 text-sm text-[#17233a] outline-none transition-all focus:border-[#b28a46] focus:ring-1 focus:ring-[#b28a46]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#17233a] uppercase mb-1">
              Your Message or Blessing <span className="text-[#964b4b]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={coupleMessage}
              onChange={(e) => setCoupleMessage(e.target.value)}
              placeholder="Write your prayers and congratulations..."
              className="w-full rounded-xl border border-[#b28a46]/30 bg-white px-4 py-2.5 text-sm text-[#17233a] outline-none transition-all focus:border-[#b28a46] focus:ring-1 focus:ring-[#b28a46]/30"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366] py-3.5 px-6 font-sans text-xs font-semibold tracking-wider text-white shadow-sm transition-all hover:bg-[#20bd5a] cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>Send Message via WhatsApp</span>
          </button>
        </form>
      </div>
    </section>
  );
};
