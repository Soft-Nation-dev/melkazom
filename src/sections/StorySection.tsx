import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const StorySection: React.FC = () => {
  return (
    <section className="relative my-20 px-4 sm:px-6 text-center">
      {/* Section kicker label */}
      <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
        A Love Story
      </p>

      <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
        {WEDDING_CONFIG.couple.themeTitle}
      </h2>

      {/* Gold ornamental divider */}
      <div className="mx-auto mt-3 mb-6 flex w-28 items-center justify-center gap-2.5" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b7934b]/40" />
        <span className="text-[10px] text-[#b7934b]">✦</span>
        <span className="h-px flex-1 bg-[#b7934b]/40" />
      </div>

      {/* Inner Vintage Paper Card with Rounded Edges */}
      <div className="paper-emboss-card mx-auto max-w-md rounded-3xl p-7 sm:p-10 my-4 shadow-[0_8px_30px_rgba(60,40,30,0.06)]">
        <p className="font-serif text-[0.72rem] leading-[2] tracking-[0.2em] text-[#7a5c4e] uppercase sm:text-[0.78rem]">
          Together with their families
        </p>
        <p className="mt-1 font-serif text-[0.75rem] leading-[1.9] tracking-[0.1em] text-[#5c3f39] sm:text-[0.8rem]">
          <span className="font-semibold text-[#4a2d28]">{WEDDING_CONFIG.couple.groom.father}</span>
          <br />request the honour of your presence
          <br />at the wedding of their children
        </p>

        {/* Couple names in script with subtle depth */}
        <div className="my-5">
          <p className="font-script text-4xl text-[#4a2d28] leading-tight sm:text-5xl">
            {WEDDING_CONFIG.couple.groom.shortName}
          </p>
          <p className="font-serif text-sm italic tracking-widest text-[#b7934b] my-0.5">&amp;</p>
          <p className="font-script text-4xl text-[#4a2d28] leading-tight sm:text-5xl">
            {WEDDING_CONFIG.couple.bride.shortName}
          </p>
        </div>

        {/* Quote */}
        <blockquote className="mt-5 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
          "{WEDDING_CONFIG.quote.text.replace(/^["\u201c]|["\u201d]$/g, '')}"
          <footer className="mt-2 not-italic font-serif text-[10px] tracking-[0.2em] text-[#b7934b] uppercase">
            — {WEDDING_CONFIG.quote.author}
          </footer>
        </blockquote>
      </div>
    </section>
  );
};
