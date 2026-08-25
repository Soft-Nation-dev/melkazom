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
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          With Love &amp; Warm Wishes
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          Send a Message to the Couple
        </h2>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#6b4c46]">
          Share your heartfelt prayers, advice, or celebratory words directly with Melford &amp; Chiazokam.
        </p>
      </div>

      <div className="paper-emboss-card mx-auto max-w-md rounded-3xl p-6 sm:p-8 text-left">
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
              Your Name <span className="text-[#964b4b]">*</span>
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Obinna & Amaka"
              className="w-full rounded-2xl border border-[#b7934b]/30 bg-white/85 px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b] focus:ring-1 focus:ring-[#b7934b]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-[#b7934b]/30 bg-white/85 px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b] focus:ring-1 focus:ring-[#b7934b]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold tracking-wider text-[#4a2d28] uppercase mb-1">
              Your Message or Blessing <span className="text-[#964b4b]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={coupleMessage}
              onChange={(e) => setCoupleMessage(e.target.value)}
              placeholder="Write your prayers and congratulations..."
              className="w-full rounded-2xl border border-[#b7934b]/30 bg-white/85 px-4 py-2.5 text-sm text-[#4a2d28] outline-none transition-all focus:border-[#b7934b] focus:ring-1 focus:ring-[#b7934b]/30"
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
