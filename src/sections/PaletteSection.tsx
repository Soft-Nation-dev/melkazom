import React from 'react';
import { Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const PaletteSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6 text-center px-4">
      {/* Header */}
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          Dress Code &amp; Palette
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          Attire &amp; Colour Palette
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
      </div>

      {/* Attire Card */}
      <div className="mx-auto max-w-md rounded-2xl border border-[#b28a46]/30 bg-white/70 p-6 shadow-[0_4px_16px_rgba(40,60,90,0.05)] backdrop-blur-xs">
        <span className="font-serif text-sm font-bold tracking-[0.25em] text-[#1e2f42] uppercase">
          BLACK TIE / ELEGANT FORMAL
        </span>
        <p className="mx-auto mt-2 max-w-sm font-serif text-xs italic text-[#556987] leading-relaxed">
          {WEDDING_CONFIG.palette.description}
        </p>

        {/* Palette Swatches */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {WEDDING_CONFIG.palette.colors.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-[#b28a46]/25 bg-[#fdfcf9] py-1.5 px-3.5 shadow-xs"
            >
              <div
                className="h-4 w-4 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: c.hex }}
              />
              <span className="font-serif text-xs font-semibold text-[#1e2f42]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
