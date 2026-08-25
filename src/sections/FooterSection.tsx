import React from 'react';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#b28a46]/25 pt-14 pb-28 text-center px-6">
      {/* Ornamental divider */}
      <div className="mx-auto mb-6 flex w-40 items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b28a46]/35" />
        <span className="font-serif text-base text-[#b28a46]">✦</span>
        <span className="h-px flex-1 bg-[#b28a46]/35" />
      </div>

      {/* Couple names in large Great Vibes script */}
      <p className="font-script text-6xl text-[#1e2f42] leading-tight sm:text-7xl">
        Melford &amp; Chiazokam
      </p>

      <p className="mt-2 font-serif text-[10px] font-bold tracking-[0.35em] text-[#b28a46] uppercase">
        #Melkazom
      </p>

      <div className="mx-auto mt-4 mb-4 flex w-20 items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b28a46]/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#b28a46]/60" />
        <span className="h-px flex-1 bg-[#b28a46]/30" />
      </div>

      <p className="font-serif text-xs tracking-[0.2em] text-[#556987] uppercase">
        Monday, 4th January 2027
      </p>
      <p className="mt-1 font-serif text-[11px] italic text-[#7a6a58]">
        Enugu State, Nigeria
      </p>

      <p className="mt-6 font-serif text-[10px] tracking-wider text-[#9aabb8]">
        Made with love • #Melkazom 2027
      </p>
    </footer>
  );
};
