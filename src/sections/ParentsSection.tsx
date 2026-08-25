import React from 'react';
import { Compass } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const ParentsSection: React.FC = () => {
  return (
    <section className="my-20 space-y-8 text-center px-4">
      <div>
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Family Heritage &amp; Blessings
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          With the Blessings of Our Families
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#6b4c46]">
          Two families united in love, faith and cherished tradition
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Open Editorial Two-Column Family Hierarchy (No box border) */}
      <div className="mx-auto max-w-lg py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Groom's Family */}
          <div className="flex flex-col items-center text-center">
            <p className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7934b] mb-1.5">
              Groom&apos;s Family
            </p>
            <h3 className="font-serif text-lg font-medium text-[#4a2d28] leading-snug">
              {WEDDING_CONFIG.couple.groom.father}
            </h3>
            <p className="mt-2 flex items-center justify-center gap-1.5 font-serif text-xs italic text-[#7a5c4e]">
              <Compass className="h-3.5 w-3.5 text-[#b7934b] shrink-0" />
              <span>{WEDDING_CONFIG.couple.groom.origin}</span>
            </p>
          </div>

          {/* Bride's Family */}
          <div className="flex flex-col items-center text-center sm:border-l sm:border-[#b7934b]/25 sm:pl-8">
            <p className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7934b] mb-1.5">
              Bride&apos;s Family
            </p>
            <h3 className="font-serif text-lg font-medium text-[#4a2d28] leading-snug">
              {WEDDING_CONFIG.couple.bride.father}
            </h3>
            <p className="mt-2 flex items-center justify-center gap-1.5 font-serif text-xs italic text-[#7a5c4e]">
              <Compass className="h-3.5 w-3.5 text-[#b7934b] shrink-0" />
              <span>{WEDDING_CONFIG.couple.bride.origin}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
