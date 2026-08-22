import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from '../components/VintageHeading';

export const ItinerarySection: React.FC = () => {
  return (
    <section className="my-16 space-y-7">
      <VintageHeading eyebrow="The Wedding Day" title="What We Have Planned" subtitle="Order of events and schedule" />

      <div className="relative space-y-4 before:absolute before:top-7 before:bottom-7 before:left-7 before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#aa8b56]/45 before:to-transparent">
        {WEDDING_CONFIG.itinerary.map((item, index) => (
          <div
            key={index}
            className="vintage-reveal-item relative flex items-start gap-4 border-b border-[#bba77f]/35 px-1 py-5 transition-all duration-500 hover:translate-x-1"
          >
            <div className="z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border border-[#c9a969]/65 bg-[#304238] text-[#f5e7bc] shadow-[0_6px_18px_rgba(43,59,50,.22),inset_0_0_0_3px_rgba(255,255,255,.06)]">
              <span className="font-cinzel text-xs font-bold leading-none">
                {item.time}
              </span>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-[#1a2520]">
                {item.title}
              </h3>
              <p className="text-xs text-[#6e6359] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
