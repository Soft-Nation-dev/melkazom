import React from 'react';
import autumnFrame from '../assets/images/hero-autumn-frame-v1.webp';
import { WEDDING_CONFIG } from '../weddingData';

interface HeroSectionProps {
  isVisible: boolean;
}

const flowerBurst = [
  ['❀', '-42vw', '-58vh', '-150deg', '0ms', '#a96343'],
  ['✿', '-31vw', '-40vh', '105deg', '80ms', '#c29352'],
  ['❁', '-20vw', '-67vh', '-85deg', '150ms', '#718064'],
  ['✾', '-9vw', '-48vh', '175deg', '240ms', '#b97e70'],
  ['❀', '4vw', '-72vh', '-140deg', '110ms', '#d2aa66'],
  ['✿', '15vw', '-53vh', '120deg', '310ms', '#7f8d72'],
  ['❁', '27vw', '-64vh', '-190deg', '190ms', '#a95f47'],
  ['✾', '40vw', '-43vh', '95deg', '360ms', '#c49b59'],
  ['❀', '-36vw', '-30vh', '140deg', '420ms', '#8d7756'],
  ['✿', '-14vw', '-36vh', '-110deg', '500ms', '#c18575'],
  ['❁', '10vw', '-34vh', '90deg', '450ms', '#708366'],
  ['✾', '34vw', '-28vh', '-130deg', '560ms', '#b9784e'],
] as const;

const formatHeroDate = (dateISO: string) => {
  const date = new Date(dateISO);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();

  return `${day} ${month} ${date.getFullYear()}`;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  const { groom, bride } = WEDDING_CONFIG.couple;
  const dateLabel = formatHeroDate(WEDDING_CONFIG.event.dateISO);

  return (
    <section className="relative isolate -mx-4 -mt-4 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f4efe6] px-9 py-24 text-center text-[#20241f] select-none sm:mx-0 sm:mt-0 sm:min-h-[900px] sm:rounded-[2.25rem] sm:px-16 sm:shadow-[0_24px_80px_rgba(67,48,30,.13)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#f7f3eb]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, rgba(255,255,255,.88), rgba(250,246,238,.52) 46%, rgba(229,216,197,.32) 100%), radial-gradient(rgba(91,70,43,.16) .42px, transparent .55px)',
          backgroundSize: '100% 100%, 7px 7px',
        }}
      />

      <img
        src={autumnFrame}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1536}
        decoding="async"
        className={`hero-frame pointer-events-none absolute inset-0 z-[1] h-full w-full object-fill ${isVisible ? 'is-visible' : ''}`}
      />

      <div aria-hidden="true" className="absolute inset-x-[12%] top-[10%] z-[2] h-32 rounded-full bg-white/30 blur-3xl" />

      <div aria-hidden="true" className={`hero-flower-burst ${isVisible ? 'is-active' : ''}`}>
        {flowerBurst.map(([flower, x, y, rotation, delay, color], index) => (
          <span
            key={`${flower}-${index}`}
            style={{
              '--flower-x': x,
              '--flower-y': y,
              '--flower-rotation': rotation,
              '--flower-delay': delay,
              '--flower-color': color,
            } as React.CSSProperties}
          >
            {flower}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[21rem] -translate-y-[8vh] flex-col items-center sm:max-w-md sm:-translate-y-[4vh]">
        <div className="flex flex-col items-center text-[#252923] drop-shadow-[0_1px_0_rgba(255,255,255,.75)]">
          <h1 aria-label={`${groom.shortName} Ugwu`} className="w-full font-script text-[clamp(3rem,13.5vw,4.65rem)] leading-[.92] font-normal tracking-[-.025em]">
            <span className={`hero-typewriter hero-typewriter--groom ${isVisible ? 'is-writing' : ''}`}>
              {groom.shortName} Ugwu
            </span>
          </h1>
          <span className={`hero-ampersand font-script-accent my-2 text-[2rem] leading-none text-[#625a4e] sm:text-[2.35rem] ${isVisible ? 'is-visible' : ''}`}>
            &amp;
          </span>
          <h1 aria-label={`${bride.shortName} Okagu`} className="w-full font-script text-[clamp(2.8rem,12.6vw,4.45rem)] leading-[.94] font-normal tracking-[-.035em]">
            <span className={`hero-typewriter hero-typewriter--bride ${isVisible ? 'is-writing' : ''}`}>
              {bride.shortName} Okagu
            </span>
          </h1>
        </div>

        <p className={`hero-detail hero-detail--copy font-cinzel mt-12 max-w-[15rem] text-[.7rem] leading-[1.82] font-semibold tracking-[.31em] text-[#4d4b44] uppercase sm:mt-14 sm:text-[.76rem] ${isVisible ? 'is-visible' : ''}`}>
          Would like to
          <br />
          invite
          <br />
          you for our
          <br />
          wedding
        </p>

        <div aria-hidden="true" className={`hero-detail hero-detail--divider mt-10 flex w-[10.8rem] items-center justify-center gap-3 sm:mt-12 sm:w-[13rem] ${isVisible ? 'is-visible' : ''}`}>
          <span className="h-px flex-1 bg-[#77756d]/55" />
          <span className="h-2 w-2 rotate-45 bg-[#5b5d57] shadow-[0_0_0_2px_rgba(91,93,87,.08)]" />
          <span className="h-px flex-1 bg-[#77756d]/55" />
        </div>

        <time
          dateTime={WEDDING_CONFIG.event.dateISO}
          className={`hero-detail hero-detail--date font-serif-title mt-7 text-[1.55rem] leading-none font-medium tracking-[.015em] text-[#343833] italic sm:text-[1.9rem] ${isVisible ? 'is-visible' : ''}`}
        >
          {dateLabel}
        </time>
      </div>
    </section>
  );
};
