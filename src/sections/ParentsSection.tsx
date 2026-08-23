import React from 'react';
import { Compass } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const ParentsSection: React.FC = () => {
  return (
    <section className="my-20 space-y-8 text-center">
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#556987] uppercase">
          Our Families
        </p>
        <h2 className="font-script mt-1 text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          With the Blessings of Our Parents
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          United in love, tradition and culture
        </p>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      <div className="mx-auto grid max-w-md grid-cols-1 gap-4 text-center px-4 sm:grid-cols-2">
        {/* Groom's Family */}
        <div className="reference-family flex flex-col items-center p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#34516d] mb-1">
            Groom&apos;s Family
          </p>
          <h3 className="font-serif text-sm font-semibold text-[#2c3e50]">
            {WEDDING_CONFIG.couple.groom.father}
          </h3>
          <p className="mt-2 flex items-center justify-center gap-1 text-xs leading-relaxed text-[#556987]">
            <Compass className="h-3.5 w-3.5 text-[#34516d] shrink-0" />
            <span>{WEDDING_CONFIG.couple.groom.origin}</span>
          </p>
        </div>

        {/* Bride's Family */}
        <div className="reference-family flex flex-col items-center p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#34516d] mb-1">
            Bride&apos;s Family
          </p>
          <h3 className="font-serif text-sm font-semibold text-[#2c3e50]">
            {WEDDING_CONFIG.couple.bride.father}
          </h3>
          <p className="mt-2 flex items-center justify-center gap-1 text-xs leading-relaxed text-[#556987]">
            <Compass className="h-3.5 w-3.5 text-[#34516d] shrink-0" />
            <span>{WEDDING_CONFIG.couple.bride.origin}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
