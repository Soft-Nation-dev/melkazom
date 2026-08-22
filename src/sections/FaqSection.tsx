import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from '../components/VintageHeading';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="my-16 space-y-6">
      <VintageHeading eyebrow="A Few Details" title="Frequently Asked" subtitle="Everything you need to know" />

      <div className="space-y-3">
        {WEDDING_CONFIG.faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className={`vintage-reveal-item overflow-hidden border-b transition-all duration-500 ${
                isOpen ? 'border-[#9d7d49]/60' : 'border-[#bba77f]/35'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 p-5 text-left"
              >
                <span className="font-serif font-semibold text-sm text-[#1a2520]">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#d4af37] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8e7f6e] shrink-0" />
                )}
              </button>
              <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="border-t border-[#bba579]/25 px-5 pt-4 pb-5 text-xs leading-relaxed text-[#675c51]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
