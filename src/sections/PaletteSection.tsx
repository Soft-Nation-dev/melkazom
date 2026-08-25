import React from 'react';
import { Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const PaletteSection: React.FC = () => {
  return (
    <section className="my-20 space-y-6 text-center px-4">
      {/* Header */}
      <div>
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Dress Code
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          Attire &amp; Colour Palette
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Open Editorial Attire Block */}
      <div className="mx-auto max-w-md text-center">
        <p className="font-serif text-xs font-bold tracking-[0.25em] text-[#4a2d28] uppercase">
          BLACK TIE / ELEGANT FORMAL
        </p>
        <p className="mx-auto mt-2 max-w-sm font-serif text-xs italic text-[#6b4c46] leading-relaxed">
          {WEDDING_CONFIG.palette.description}
        </p>

        {/* Palette Swatches with subtle 3D debossed pill border */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {WEDDING_CONFIG.palette.colors.map((c, i) => (
            <div
              key={i}
              className="paper-deboss-pill flex items-center gap-2 rounded-full py-1.5 px-3.5"
            >
              <div
                className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs"
                style={{ backgroundColor: c.hex }}
              />
              <span className="font-serif text-xs font-semibold text-[#4a2d28]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
