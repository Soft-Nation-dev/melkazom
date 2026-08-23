import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative space-y-3 overflow-hidden border-t border-[#6c829c]/25 pt-12 pb-24 text-center">
      <span aria-hidden="true" className="block font-serif text-xl text-[#6c829c]">❦</span>
      <p className="font-script text-5xl text-[#2c3e50]">
        Melford & Chiazokam
      </p>
      <p className="font-serif text-xs font-semibold tracking-[0.3em] text-[#4a6b82] uppercase">
        #Melkazom • 04.01.2027
      </p>
      <p className="text-[11px] text-[#617488]">
        Enugu, Nigeria • With Love and Gratitude
      </p>
    </footer>
  );
};
