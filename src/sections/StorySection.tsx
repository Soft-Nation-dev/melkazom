import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const StorySection: React.FC = () => {
  return (
    <section className="relative my-20 px-4 text-center">
      <div className="mx-auto mb-4 h-0.5 w-10 bg-[#4a637d]/40" />

      <h2 className="font-script text-3xl font-normal text-[#2c3e50] sm:text-4xl">
        Why This Is Special
      </h2>

      <div className="mx-auto mt-3 mb-6 flex w-20 items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-[#6c829c]/40" />
        <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
        <span className="h-px flex-1 bg-[#6c829c]/40" />
      </div>

      <p className="mx-auto max-w-lg font-serif text-[0.82rem] leading-[2.1] font-medium tracking-[0.16em] text-[#3e5063] uppercase sm:text-[0.88rem]">
        {WEDDING_CONFIG.quote.text.replace(/^[“"]|[”"]$/g, '')}
      </p>

      <p className="mt-5 font-script text-2xl text-[#5c738c]">
        — {WEDDING_CONFIG.quote.author}
      </p>
    </section>
  );
};
