import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';

const BACKEND_URL = 'https://melkazom-backend.ifeanyieee8105.workers.dev';

export const MessageSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [coupleMessage, setCoupleMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !coupleMessage.trim()) return;

    setIsSending(true);

    // Save to Cloudflare Backend Database
    try {
      await fetch(`${BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: senderName.trim(),
          message: coupleMessage.trim(),
        }),
      });
    } catch (err) {
      console.warn('Backend message save failed:', err);
    }

    // Optional WhatsApp bridge text
    const text = [
      `*A wedding message for Melford & Chiazokam (#Melkazom)*`,
      ``,
      `*From:* ${senderName.trim()}`,
      ``,
      `*Message:*`,
      `${coupleMessage.trim()}`,
    ].join('\n');

    setIsSending(false);
    setIsSent(true);

    // Also prompt WhatsApp if they wish to open it
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
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

      <div className="mx-auto max-w-md text-left">
        {isSent ? (
          <div className="rounded-3xl border border-[#b7934b]/30 bg-[#fdfaf5] p-8 text-center shadow-md space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3B2E]/10 text-[#0E3B2E]">
              <Heart className="h-7 w-7 fill-[#0E3B2E]" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#4a2d28]">
              Thank You, {senderName}!
            </h3>
            <p className="font-serif text-xs italic leading-relaxed text-[#6b4c46]">
              Your blessing has been lovingly recorded in our guest ledger for Melford &amp; Chiazokam.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSent(false);
                setCoupleMessage('');
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#b7934b] px-5 py-2 font-serif text-xs font-semibold text-[#4a2d28] hover:bg-[#b7934b] hover:text-white transition-all cursor-pointer"
            >
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
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
              disabled={isSending}
              className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#b7934b] bg-[#b7934b] py-3.5 px-6 font-serif text-xs font-semibold tracking-wider text-white shadow-md transition-all hover:bg-[#967434] active:scale-[0.99] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              <span>{isSending ? 'Saving Message...' : 'Send Message to Couple'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
