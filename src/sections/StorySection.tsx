import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const StorySection: React.FC = () => {
  return (
    <section className="relative my-24 px-6 text-center">
      {/* Section kicker label — matching staceys-invitation paper-section style */}
      <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
        A Love Story
      </p>

      <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
        {WEDDING_CONFIG.couple.themeTitle}
      </h2>

      {/* Gold ornamental divider — matches staceys vintage dividers */}
      <div className="mx-auto mt-3 mb-8 flex w-32 items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b28a46]/40" />
        <span className="text-[10px] text-[#b28a46]">✦</span>
        <span className="h-px flex-1 bg-[#b28a46]/40" />
      </div>

      {/* Parents intro block — matching staceys "together with their families" */}
      <p className="mx-auto max-w-xs font-serif text-[0.72rem] leading-[2] tracking-[0.18em] text-[#7a6a58] uppercase sm:text-[0.78rem]">
        Together with their families
      </p>
      <p className="mt-1 font-serif text-[0.72rem] leading-[1.9] tracking-[0.12em] text-[#556987] sm:text-[0.76rem]">
        <span className="font-semibold text-[#1e2f42]">{WEDDING_CONFIG.couple.groom.father}</span>
        <br />request the honour of your presence
        <br />at the wedding of their children
      </p>

      {/* Couple names in large script */}
      <p className="mt-6 font-script text-5xl text-[#1e2f42] leading-tight sm:text-6xl">
        {WEDDING_CONFIG.couple.groom.shortName}
      </p>
      <p className="font-serif text-sm italic tracking-widest text-[#b28a46]">&amp;</p>
      <p className="font-script text-5xl text-[#1e2f42] leading-tight sm:text-6xl">
        {WEDDING_CONFIG.couple.bride.shortName}
      </p>

      {/* Divider */}
      <div className="mx-auto mt-6 mb-5 flex w-24 items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b28a46]/35" />
        <span className="h-1 w-1 rotate-45 bg-[#b28a46]/70" />
        <span className="h-px flex-1 bg-[#b28a46]/35" />
      </div>

      {/* Quote */}
      <blockquote className="mx-auto max-w-sm font-serif text-sm italic leading-relaxed text-[#556987]">
        "{WEDDING_CONFIG.quote.text.replace(/^["\u201c]|["\u201d]$/g, '')}"
        <footer className="mt-2 not-italic font-serif text-[10px] tracking-[0.2em] text-[#b28a46] uppercase">
          — {WEDDING_CONFIG.quote.author}
        </footer>
      </blockquote>
    </section>
  );
};
