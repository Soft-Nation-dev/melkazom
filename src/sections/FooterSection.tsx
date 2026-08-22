import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative space-y-3 overflow-hidden border-t border-[#a98b58]/30 pt-12 pb-20 text-center">
      <span aria-hidden="true" className="block font-serif text-xl text-[#a8874b]">❦</span>
      <p className="font-script text-5xl text-[#29362d]">
        Melford & Chiazokam
      </p>
      <p className="font-cinzel text-xs tracking-[0.3em] text-[#d4af37] font-semibold uppercase">
        #Melkazom • 04.01.2027
      </p>
      <p className="text-[11px] text-[#8e7f6e]">
        Enugu, Nigeria • With Love and Gratitude
      </p>
    </footer>
  );
};
