import React from 'react';
import { Users } from 'lucide-react';
import dressCodeGuests from '../assets/images/dress-code-guests.jpg';
import { WEDDING_CONFIG } from '../weddingData';

export const PaletteSection: React.FC = () => {
  return (
    <section className="my-20 space-y-8 text-center">
      {/* Header */}
      <div>
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-[#34516d]">
          <Users className="h-6 w-6 stroke-[1.5]" />
        </div>
        <h2 className="font-script text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          Dress Code
        </h2>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      {/* Guest Lineup Artwork */}
      <div className="reference-media relative mx-auto aspect-[16/9] max-w-sm overflow-hidden sm:max-w-md">
        <img
          src={dressCodeGuests}
          alt="Wedding Guest Attire Inspiration"
          width={900}
          height={506}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Attire Label */}
      <div>
        <span className="font-serif text-sm font-bold tracking-[0.25em] text-[#2c3e50] uppercase">
          BLACK TIE / ELEGANT FORMAL
        </span>
        <p className="mx-auto mt-1 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          {WEDDING_CONFIG.palette.description}
        </p>
      </div>

      {/* Palette Swatches */}
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-3 px-4">
        {WEDDING_CONFIG.palette.colors.map((c, i) => (
          <div
            key={i}
            className="reference-swatch flex items-center gap-2 py-1.5 px-3.5"
          >
            <div
              className="h-4 w-4 rounded-full border border-white/80 shadow-xs"
              style={{ backgroundColor: c.hex }}
            />
            <span className="font-serif text-[11px] font-semibold text-[#2c3e50]">
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
