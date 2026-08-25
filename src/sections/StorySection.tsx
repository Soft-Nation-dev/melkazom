import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';
import heroBg from '../assets/images/hero-swan-lake-v2.jpg';

const { groom, bride } = WEDDING_CONFIG.couple;

export const StorySection: React.FC = () => {
  return (
    <section className="relative my-16 -mx-4 sm:-mx-7 overflow-hidden py-14 px-6 sm:py-16 sm:px-10 text-center">
      {/* Background Image Watermark with Warm Golden Wash Overlay matching reference */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-25 filter brightness-105 contrast-120"
        />
        {/* Soft golden parchment gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5ea]/82 via-[#fcf8f0]/75 to-[#fbf5ea]/82" />
      </div>


      {/* Content Container (No outer card box, pure full-width stationery flow) */}
      <div className="relative z-10 mx-auto max-w-md space-y-4">
        {/* Script heading matching screenshot */}
        <p className="font-script text-3xl sm:text-4xl leading-snug text-[#4a2d28]">
          Two Souls, One Destiny
        </p>
        <p className="font-script text-2xl sm:text-3xl leading-snug text-[#4a2d28] -mt-2">
          A Lifetime Written Together
        </p>

        {/* Gold divider */}
        <div className="mx-auto flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>

        {/* Sacred invocation / opening dedication */}
        <p className="font-serif text-[0.7rem] uppercase tracking-[0.25em] text-[#b7934b] font-medium">
          Under God&apos;s Grace &amp; Loving Memory of Our Fathers
        </p>
        <p className="font-serif text-[0.76rem] leading-[1.9] tracking-[0.14em] text-[#7a5c4e] uppercase font-semibold">
          Dear Beloved Families &amp; Cherished Friends,
        </p>
        <p className="font-serif text-[0.82rem] leading-[1.85] text-[#5c3f39] italic max-w-xs mx-auto">
          Join us in thanksgiving, joy, and heartfelt prayers as two hearts from Nsukka and Igbo-Etiti unite in holy covenant to begin our forever.
        </p>

        {/* Gold divider */}
        <div className="mx-auto flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/30" />
          <span className="text-[8px] text-[#b7934b]/60">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/30" />
        </div>

        {/* Groom's family */}
        <div className="space-y-0.5">
          <p className="font-serif text-sm font-semibold text-[#4a2d28]">
            {groom.father}
          </p>
          <p className="font-serif text-sm font-semibold text-[#4a2d28]">
            {groom.mother}
          </p>
          <p className="font-serif text-[0.72rem] italic text-[#7a5c4e]">
            {groom.origin}
          </p>
        </div>

        {/* Ampersand divider */}
        <p className="font-script text-2xl text-[#b7934b]">&amp;</p>

        {/* Bride's family */}
        <div className="space-y-0.5">
          <p className="font-serif text-sm font-semibold text-[#4a2d28]">
            {bride.father}
          </p>
          <p className="font-serif text-[0.72rem] italic text-[#7a5c4e]">
            {bride.origin}
          </p>
        </div>

        {/* Gold divider */}
        <div className="mx-auto flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/30" />
          <span className="text-[8px] text-[#b7934b]/60">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/30" />
        </div>

        {/* Invitation phrase */}
        <p className="font-serif text-[0.74rem] leading-[1.9] italic text-[#6b4c46] max-w-xs mx-auto">
          humbly and joyfully request the honour of your presence and prayers to witness the Holy Matrimony of their beloved children
        </p>

        {/* Couple names in large script */}
        <div className="pt-2 space-y-1">
          <p className="font-script text-[2.6rem] leading-tight text-[#4a2d28] sm:text-[3.2rem]">
            {groom.fullName.split(' ').slice(0, 2).join(' ')}
          </p>
          <p className="font-script text-xl text-[#b7934b]">&amp;</p>
          <p className="font-script text-[2.6rem] leading-tight text-[#4a2d28] sm:text-[3.2rem]">
            {bride.fullName.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>

        {/* Gold divider */}
        <div className="mx-auto flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>

        {/* Closing unique quote */}
        <div className="max-w-xs mx-auto space-y-1">
          <p className="font-serif text-[0.78rem] italic leading-relaxed text-[#7a5c4e]">
            &ldquo;Two lives, two stories, one destiny &mdash; written in the stars and sealed in God&apos;s everlasting grace.&rdquo;
          </p>
          <p className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#b7934b] font-medium">
            #Melkazom2027
          </p>
        </div>
      </div>
    </section>
  );
};
