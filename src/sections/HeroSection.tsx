import React from 'react';
import { ChevronDown } from 'lucide-react';
import heroSwanLakeOriginal from '../assets/images/hero-swan-lake.jpg';
import heroSwanLakeV2 from '../assets/images/hero-swan-lake-v2.jpg';
import { WEDDING_CONFIG } from '../weddingData';

// Switch between v1 (heroSwanLakeOriginal) and v2 (heroSwanLakeV2)
const activeHeroImage = heroSwanLakeV2;

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

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth',
    });
  };

  return (
    <section className="reference-hero relative isolate -mx-4 -mt-4 flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pt-14 pb-8 text-center text-[#20241f] select-none sm:mx-0 sm:mt-0 sm:min-h-[960px] sm:px-12 sm:pt-16 sm:pb-10">
      {/* Gothic Stone Arch with Swans, Castle & Lake Background Artwork */}
      <img
        src={activeHeroImage}
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

      {/* Top Center Content: Couple Names & Invitation Text positioned further down */}
      <div className="relative z-10 mx-auto mt-20 flex w-full max-w-[22rem] flex-col items-center sm:mt-28 sm:max-w-md">
        <div className="flex flex-col items-center drop-shadow-[0_3px_8px_rgba(0,0,0,0.75)]">
          <h1 aria-label={`${groom.shortName}`} className="w-full font-script text-[clamp(3rem,12vw,4.4rem)] leading-[0.95] font-normal tracking-[0.01em] text-[#fffbf2]">
            <span className={`hero-typewriter hero-typewriter--groom ${isVisible ? 'is-writing' : ''}`}>
              {groom.shortName}
            </span>
          </h1>
          <span className={`hero-ampersand font-script-accent my-0.5 text-[2rem] font-normal leading-none text-[#f5d084] sm:text-[2.4rem] ${isVisible ? 'is-visible' : ''}`}>
            &amp;
          </span>
          <h1 aria-label={`${bride.shortName}`} className="w-full font-script text-[clamp(3rem,12vw,4.4rem)] leading-[0.95] font-normal tracking-[0.01em] text-[#fffbf2]">
            <span className={`hero-typewriter hero-typewriter--bride ${isVisible ? 'is-writing' : ''}`}>
              {bride.shortName}
            </span>
          </h1>
        </div>

        <p className={`hero-detail hero-detail--copy font-serif mt-5 max-w-[17rem] text-[0.75rem] leading-[1.8] font-medium tracking-[0.28em] text-[#fbf8f0] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] sm:mt-6 sm:text-[0.82rem] ${isVisible ? 'is-visible' : ''}`}>
          We would like to
          <br />
          invite you for
          <br />
          our wedding
        </p>

        <div aria-hidden="true" className={`hero-detail hero-detail--divider mt-4 flex w-[10rem] items-center justify-center gap-3 sm:mt-5 sm:w-[12rem] ${isVisible ? 'is-visible' : ''}`}>
          <span className="h-[1.5px] flex-1 bg-[#f5d084] shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />
          <span className="text-[11px] text-[#f5d084] shadow-[0_1px_4px_rgba(0,0,0,0.6)]">✦</span>
          <span className="h-[1.5px] flex-1 bg-[#f5d084] shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />
        </div>

        <time
          dateTime={WEDDING_CONFIG.event.dateISO}
          className={`hero-detail hero-detail--date font-serif mt-3 text-[1.35rem] leading-none font-normal tracking-[0.08em] text-[#fffbf2] italic drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-[1.6rem] ${isVisible ? 'is-visible' : ''}`}
        >
          {dateLabel}
        </time>
      </div>

      {/* Fancy Animated Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        type="button"
        className="relative z-10 mb-2 flex cursor-pointer flex-col items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-xs transition-all hover:bg-white/80 hover:scale-105 active:scale-95"
      >
        <span className="font-serif text-[9px] font-bold tracking-[0.28em] text-[#1e2f42] uppercase">
          Scroll to Explore
        </span>
        <div className="animate-bounce-slow flex h-5 w-5 items-center justify-center rounded-full bg-[#b28a46] text-white shadow-xs">
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </button>
    </section>
  );
};
