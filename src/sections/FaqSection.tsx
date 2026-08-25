import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="my-20 space-y-8 text-center">
      <div>
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Questions &amp; Information
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-3.5 px-4 text-left">
        {WEDDING_CONFIG.faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="paper-emboss-card rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left"
              >
                <span className="font-serif text-xs font-semibold tracking-wider text-[#4a2d28] uppercase">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 shrink-0 text-[#b7934b]" />
                ) : (
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#b7934b]/70" />
                )}
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-[#b7934b]/15 px-4 pt-3 pb-4 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
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
