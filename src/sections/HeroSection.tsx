import React from 'react';
import { ChevronDown } from 'lucide-react';
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
  ['❁', '-20vw', '-67vh', '-85deg', '#8fa4c4'],
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
    <section className="reference-hero relative isolate -mx-4 -mt-4 flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-6 pt-14 pb-8 text-center text-[#20241f] select-none">
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

      {/* Top Center Content: Couple Names & Invitation Text floating directly on Hero scene */}
      <div className="relative z-10 mx-auto mt-28 sm:mt-36 flex w-full max-w-[22rem] sm:max-w-md flex-col items-center drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]">
        {/* Soft luminous localized white aura ONLY behind the text area */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-8 sm:-inset-12 -z-10 rounded-full blur-2xl opacity-90"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.65) 40%, rgba(255, 255, 255, 0.22) 68%, transparent 85%)',
          }}
        />
        {/* Couple Names in Rich Wine-Brown Ink */}
        <div className="flex flex-col items-center">
          <h1 aria-label={`${groom.shortName}`} className="w-full font-script text-[clamp(3.2rem,11vw,4.4rem)] leading-[0.95] font-normal tracking-[0.01em] text-[#3d1e18]">
            <span className={`hero-typewriter hero-typewriter--groom ${isVisible ? 'is-writing' : ''}`}>
              {groom.shortName}
            </span>
          </h1>
          <span className={`hero-ampersand font-script text-[2rem] sm:text-[2.4rem] font-normal leading-none text-[#b7934b] my-0.5 ${isVisible ? 'is-visible' : ''}`}>
            &amp;
          </span>
          <h1 aria-label={`${bride.shortName}`} className="w-full font-script text-[clamp(3.2rem,11vw,4.4rem)] leading-[0.95] font-normal tracking-[0.01em] text-[#3d1e18]">
            <span className={`hero-typewriter hero-typewriter--bride ${isVisible ? 'is-writing' : ''}`}>
              {bride.shortName}
            </span>
          </h1>
        </div>

        <p className={`hero-detail hero-detail--copy font-serif mt-5 max-w-[17rem] text-[0.75rem] sm:text-[0.82rem] leading-[1.8] font-semibold tracking-[0.26em] text-[#4a2d28] uppercase ${isVisible ? 'is-visible' : ''}`}>
          We would like to
          <br />
          invite you for
          <br />
          our wedding
        </p>

        <div aria-hidden="true" className={`hero-detail hero-detail--divider my-4 flex w-[10rem] sm:w-[12rem] items-center justify-center gap-3 ${isVisible ? 'is-visible' : ''}`}>
          <span className="h-[1.5px] flex-1 bg-[#b7934b]" />
          <span className="text-[11px] text-[#b7934b]">✦</span>
          <span className="h-[1.5px] flex-1 bg-[#b7934b]" />
        </div>

        <time
          dateTime={WEDDING_CONFIG.event.dateISO}
          className={`hero-detail hero-detail--date font-serif text-[1.25rem] sm:text-[1.45rem] leading-none font-semibold tracking-[0.08em] text-[#3d1e18] italic ${isVisible ? 'is-visible' : ''}`}
        >
          {dateLabel}
        </time>
      </div>

      {/* Fancy Animated Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        type="button"
        className="relative z-10 mb-2 flex cursor-pointer flex-col items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] backdrop-blur-xs transition-all hover:bg-white/90 hover:scale-105 active:scale-95"
      >
        <span className="font-serif text-[9px] font-bold tracking-[0.28em] text-[#4a2d28] uppercase">
          Scroll to Explore
        </span>
        <div className="animate-bounce-slow flex h-5 w-5 items-center justify-center rounded-full bg-[#b7934b] text-white shadow-xs">
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </button>
    </section>
  );
};
