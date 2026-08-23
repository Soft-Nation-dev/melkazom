import React from 'react';
import heroCompleteScene from '../assets/images/hero-complete-scene.jpg';
import { WEDDING_CONFIG } from '../weddingData';

interface HeroSectionProps {
  isVisible: boolean;
}

const flowerBurst = [
  ['❀', '-42vw', '-58vh', '-150deg', '0ms', '#7090b8'],
  ['✿', '-31vw', '-40vh', '105deg', '80ms', '#c29352'],
  ['❁', '-20vw', '-67vh', '-85deg', '150ms', '#8fa4c4'],
  ['✾', '-9vw', '-48vh', '175deg', '240ms', '#d8a49b'],
  ['❀', '4vw', '-72vh', '-140deg', '110ms', '#e2c27c'],
  ['✿', '15vw', '-53vh', '120deg', '310ms', '#8aa3b8'],
  ['❁', '27vw', '-64vh', '-190deg', '190ms', '#b97e70'],
  ['✾', '40vw', '-43vh', '95deg', '360ms', '#c49b59'],
  ['❀', '-36vw', '-30vh', '140deg', '420ms', '#7d94b0'],
  ['✿', '-14vw', '-36vh', '-110deg', '500ms', '#d69f94'],
  ['❁', '10vw', '-34vh', '90deg', '450ms', '#7b9cb8'],
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
    <section className="reference-hero relative isolate -mx-4 -mt-4 flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pt-16 pb-6 text-center text-[#20241f] select-none sm:mx-0 sm:mt-0 sm:min-h-[960px] sm:px-12 sm:pt-20 sm:pb-10">
      {/* Unified Background Illustration with Moon, Branches, and Integrated Couple */}
      <img
        src={heroCompleteScene}
        alt="Melford & Chiazokam"
        width={1080}
        height={1920}
        decoding="async"
        className={`hero-frame pointer-events-none absolute inset-0 z-0 h-full w-full object-cover ${isVisible ? 'is-visible' : ''}`}
      />

      {/* Flower confetti burst */}
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

      {/* Top Center Content: Couple Names & Invitation Text positioned over sky area */}
      <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[22rem] flex-col items-center sm:mt-12 sm:max-w-md">
        <div className="flex flex-col items-center text-[#1c2c3d] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
          <h1 aria-label={`${groom.shortName}`} className="w-full font-script text-[clamp(2.8rem,12vw,4.2rem)] leading-[0.95] font-normal tracking-[-0.02em] text-[#1e2f42]">
            <span className={`hero-typewriter hero-typewriter--groom ${isVisible ? 'is-writing' : ''}`}>
              {groom.shortName}
            </span>
          </h1>
          <span className={`hero-ampersand font-script-accent my-0.5 text-[1.8rem] leading-none text-[#4a617a] sm:text-[2.2rem] ${isVisible ? 'is-visible' : ''}`}>
            &amp;
          </span>
          <h1 aria-label={`${bride.shortName}`} className="w-full font-script text-[clamp(2.8rem,12vw,4.2rem)] leading-[0.95] font-normal tracking-[-0.02em] text-[#1e2f42]">
            <span className={`hero-typewriter hero-typewriter--bride ${isVisible ? 'is-writing' : ''}`}>
              {bride.shortName}
            </span>
          </h1>
        </div>

        <p className={`hero-detail hero-detail--copy font-serif mt-6 max-w-[16rem] text-[0.7rem] leading-[1.8] font-medium tracking-[0.28em] text-[#344a61] uppercase sm:mt-7 sm:text-[0.76rem] ${isVisible ? 'is-visible' : ''}`}>
          We would like to
          <br />
          invite you for
          <br />
          our wedding
        </p>

        <div aria-hidden="true" className={`hero-detail hero-detail--divider mt-5 flex w-[9rem] items-center justify-center gap-3 sm:mt-6 sm:w-[11rem] ${isVisible ? 'is-visible' : ''}`}>
          <span className="h-px flex-1 bg-[#4a617a]/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#2d4257]" />
          <span className="h-px flex-1 bg-[#4a617a]/40" />
        </div>

        <time
          dateTime={WEDDING_CONFIG.event.dateISO}
          className={`hero-detail hero-detail--date font-serif-title mt-4 text-[1.35rem] leading-none font-normal tracking-[0.05em] text-[#243548] italic sm:text-[1.65rem] ${isVisible ? 'is-visible' : ''}`}
        >
          {dateLabel}
        </time>
      </div>

      {/* Spacer to keep text positioned cleanly above the painted couple */}
      <div className="h-44 sm:h-56" aria-hidden="true" />
    </section>
  );
};
