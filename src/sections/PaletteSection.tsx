import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from '../components/VintageHeading';

export const PaletteSection: React.FC = () => {
  return (
    <section className="floral-section floral-section--rose vintage-panel my-16 p-7 text-center sm:p-10">
      <VintageHeading eyebrow="Attire & Atmosphere" title={WEDDING_CONFIG.palette.title} subtitle={WEDDING_CONFIG.palette.description} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {WEDDING_CONFIG.palette.colors.map((c, i) => (
          <div
            key={i}
            className="vintage-reveal-item flex flex-col items-center border-b border-[#bba77f]/30 px-1 py-4"
          >
            <div
              className="mb-2.5 h-12 w-12 rounded-full border-[3px] border-[#fffaf0] shadow-[0_5px_14px_rgba(58,42,29,.2),0_0_0_1px_rgba(128,99,59,.25)]"
              style={{ backgroundColor: c.hex }}
            />
            <span className="font-serif text-xs font-semibold text-[#1a2520]">
              {c.name}
            </span>
            <span className="text-[10px] text-[#8e7f6e] uppercase tracking-wider">
              {c.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
