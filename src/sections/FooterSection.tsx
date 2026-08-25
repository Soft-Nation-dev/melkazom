import React from 'react';
import heroBg from '../assets/images/hero-swan-lake-v2.jpg';

export const FooterSection: React.FC = () => {
  return (
    <footer className="relative -mx-4 sm:-mx-7 overflow-hidden border-t border-[#b7934b]/30 pt-12 pb-16 text-center px-6">
      {/* Background Image Watermark with Warm Golden Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-bottom opacity-25 filter brightness-105 contrast-120"
        />
        {/* Soft golden parchment gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5ea]/82 via-[#fcf8f0]/75 to-[#fbf5ea]/82" />
      </div>


      <div className="relative z-10 mx-auto max-w-md">
        {/* Ornamental divider */}
        <div className="mx-auto mb-5 flex w-36 items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>

        {/* Couple names in large script */}
        <p className="font-script text-5xl sm:text-6xl text-[#4a2d28] leading-tight">
          Melford &amp; Chiazokam
        </p>

        <p className="mt-1 font-serif text-[10px] font-bold tracking-[0.35em] text-[#b7934b] uppercase">
          #Melkazom
        </p>

        <div className="mx-auto mt-3.5 mb-3.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/30" />
          <span className="text-[8px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/30" />
        </div>

        <p className="font-serif text-xs tracking-[0.2em] text-[#4a2d28] uppercase font-medium">
          Monday, 4th January 2027
        </p>
        <p className="mt-1 font-serif text-[11px] italic text-[#7a5c4e]">
          Enugu State, Nigeria
        </p>

        <p className="mt-6 font-serif text-[10px] tracking-wider text-[#8c6b5e]">
          Made with love &bull; #Melkazom2027
        </p>
      </div>
    </footer>
  );
};
