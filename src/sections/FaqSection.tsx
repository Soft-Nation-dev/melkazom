import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="my-20 space-y-8 text-center">
      <div>
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-[#34516d]">
          <HelpCircle className="h-6 w-6 stroke-[1.5]" />
        </div>
        <h2 className="font-serif text-3xl font-normal tracking-[0.25em] text-[#2c3e50] uppercase sm:text-4xl">
          FAQ
        </h2>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-3 px-4 text-left">
        {WEDDING_CONFIG.faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className={`reference-faq overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'is-open'
                  : ''
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left"
              >
                <span className="font-serif text-xs font-semibold tracking-wider text-[#2c3e50] uppercase">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-[#34516d]" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#7a92ad]" />
                )}
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="reference-faq-answer px-4 pt-3 pb-4 text-xs leading-relaxed text-[#556987]">
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
