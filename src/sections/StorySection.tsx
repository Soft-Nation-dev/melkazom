import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const StorySection: React.FC = () => {
  return (
    <section className="floral-section floral-section--sage vintage-panel my-16 px-7 py-14 text-center sm:px-12 sm:py-20">
      <span aria-hidden="true" className="font-serif text-6xl leading-none text-[#a48650]/35">“</span>
      <p className="vintage-eyebrow -mt-3">A note from us</p>
      <h2 className="font-serif text-2xl font-medium text-[#29362d] sm:text-3xl">
        {WEDDING_CONFIG.quote.title}
      </h2>
      <div className="vintage-divider" aria-hidden="true"><i /><b>◆</b><i /></div>
      <p className="mx-auto mt-5 max-w-lg font-serif text-sm leading-[1.9] text-[#5d5147] italic sm:text-base">
        {WEDDING_CONFIG.quote.text}
      </p>
      <p className="mt-6 font-script text-3xl text-[#987a49]">
        — {WEDDING_CONFIG.quote.author}
      </p>
    </section>
  );
};
