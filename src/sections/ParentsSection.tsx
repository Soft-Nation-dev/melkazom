import React from 'react';
import { Compass } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const ParentsSection: React.FC = () => {
  return (
    <section className="my-16 space-y-8 text-center px-4">
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          Family Heritage &amp; Blessings
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          With the Blessings of Our Families
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          Two families united in love, faith and cherished tradition
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
      </div>

      <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 text-center px-2 sm:grid-cols-2">
        {/* Groom's Family */}
        <div className="flex flex-col items-center">
          <p className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28a46] mb-1">
            Groom&apos;s Family
          </p>
          <h3 className="font-serif text-base font-semibold text-[#1e2f42]">
            {WEDDING_CONFIG.couple.groom.father}
          </h3>
          <p className="mt-1 flex items-center justify-center gap-1.5 font-serif text-xs italic text-[#556987]">
            <Compass className="h-3.5 w-3.5 text-[#b28a46] shrink-0" />
            <span>{WEDDING_CONFIG.couple.groom.origin}</span>
          </p>
        </div>

        {/* Bride's Family */}
        <div className="flex flex-col items-center">
          <p className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28a46] mb-1">
            Bride&apos;s Family
          </p>
          <h3 className="font-serif text-base font-semibold text-[#1e2f42]">
            {WEDDING_CONFIG.couple.bride.father}
          </h3>
          <p className="mt-1 flex items-center justify-center gap-1.5 font-serif text-xs italic text-[#556987]">
            <Compass className="h-3.5 w-3.5 text-[#b28a46] shrink-0" />
            <span>{WEDDING_CONFIG.couple.bride.origin}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
