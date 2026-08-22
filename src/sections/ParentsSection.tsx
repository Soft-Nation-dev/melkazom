import React from 'react';
import { Compass } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from '../components/VintageHeading';

export const ParentsSection: React.FC = () => {
  return (
    <section className="vintage-panel my-16 p-7 text-center sm:p-10">
      <VintageHeading
        eyebrow="Our Families"
        title="With the Blessings of Our Parents"
        subtitle="United in love and culture"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        {/* Groom's Family */}
        <div className="vintage-reveal-item border-y border-[#bda87f]/35 px-3 py-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">
            Groom's Family
          </p>
          <h3 className="font-serif text-lg font-medium text-[#2e3a31]">
            {WEDDING_CONFIG.couple.groom.father}
          </h3>
          <p className="mt-2 flex items-start justify-center gap-1.5 text-xs leading-relaxed text-[#74695e]">
            <Compass className="w-3.5 h-3.5 text-[#0e3b2e] shrink-0" />
            <span>{WEDDING_CONFIG.couple.groom.origin}</span>
          </p>
        </div>

        {/* Bride's Family */}
        <div className="vintage-reveal-item border-y border-[#bda87f]/35 px-3 py-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-1">
            Bride's Family
          </p>
          <h3 className="font-serif text-lg font-medium text-[#2e3a31]">
            {WEDDING_CONFIG.couple.bride.father}
          </h3>
          <p className="mt-2 flex items-start justify-center gap-1.5 text-xs leading-relaxed text-[#74695e]">
            <Compass className="w-3.5 h-3.5 text-[#0e3b2e] shrink-0" />
            <span>{WEDDING_CONFIG.couple.bride.origin}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
