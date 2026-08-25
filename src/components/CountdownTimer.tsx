import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_CONFIG } from '../weddingData';

function getTimeLeft() {
  const target = new Date(WEDDING_CONFIG.event.dateISO).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

/** Single rolling digit slot — slides the new number in from below */
function RollingDigit({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [prev, setPrev] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value === displayed) return;
    setPrev(displayed);
    setAnimating(true);
  }, [value, displayed]);

  const onAnimEnd = () => {
    setDisplayed(value);
    setAnimating(false);
  };

  return (
    <span className="relative inline-block overflow-hidden align-top" style={{ height: '1.05em', minWidth: '0.62em' }}>
      {/* Exiting digit — slides up and fades */}
      {animating && (
        <span
          key={`out-${prev}`}
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'cd-exit 0.45s ease forwards' }}
        >
          {prev}
        </span>
      )}
      {/* Entering digit — slides up from below */}
      <span
        key={`in-${value}-${animating}`}
        className="absolute inset-0 flex items-center justify-center"
        style={animating ? { animation: 'cd-enter 0.45s ease forwards' } : {}}
        onAnimationEnd={onAnimEnd}
      >
        {value}
      </span>
    </span>
  );
}

function RollingNumber({ value, isDays }: { value: number; isDays?: boolean }) {
  const str = String(value).padStart(isDays ? 3 : 2, '0');
  const digits = str.split('');
  return (
    <span className="tabular-nums" aria-live="off">
      {digits.map((d, i) => (
        <RollingDigit key={i} value={d} />
      ))}
    </span>
  );
}

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative my-14 px-4 text-center">
      {/* Section kicker — gold script matching staceys */}
      <p className="font-script text-[2rem] leading-none text-[#b7934b] sm:text-[2.5rem]">
        Counting Down
      </p>
      <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.3em] text-[#4b2930]/60 uppercase mt-1">
        Until We Say "I Do"
      </h2>

      <div className="mx-auto mt-3 mb-8 flex w-16 items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-[#b7934b]/35" />
        <span className="text-[9px] text-[#b7934b]">✦</span>
        <span className="h-px flex-1 bg-[#b7934b]/35" />
      </div>

      {/* Rolling countdown — large serif numbers, colon separators, label beneath */}
      <div className="mx-auto flex items-start justify-center gap-0">
        {/* DAYS */}
        <div className="flex flex-col items-center">
          <span className="font-cormorant text-[clamp(3rem,10vw,5rem)] leading-none font-light text-[#4a2d28]">
            <RollingNumber value={timeLeft.days} isDays />
          </span>
          <span className="mt-1.5 font-sans text-[0.6rem] tracking-[0.28em] text-[#7a5c4e] uppercase">
            Days
          </span>
        </div>

        <span className="font-cormorant text-[clamp(2.2rem,8vw,4rem)] text-[#b7934b]/50 leading-none self-start pt-1 px-1 select-none" aria-hidden="true">:</span>

        {/* HOURS */}
        <div className="flex flex-col items-center">
          <span className="font-cormorant text-[clamp(3rem,10vw,5rem)] leading-none font-light text-[#4a2d28]">
            <RollingNumber value={timeLeft.hours} />
          </span>
          <span className="mt-1.5 font-sans text-[0.6rem] tracking-[0.28em] text-[#7a5c4e] uppercase">
            Hours
          </span>
        </div>

        <span className="font-cormorant text-[clamp(2.2rem,8vw,4rem)] text-[#b7934b]/50 leading-none self-start pt-1 px-1 select-none" aria-hidden="true">:</span>

        {/* MINUTES */}
        <div className="flex flex-col items-center">
          <span className="font-cormorant text-[clamp(3rem,10vw,5rem)] leading-none font-light text-[#4a2d28]">
            <RollingNumber value={timeLeft.minutes} />
          </span>
          <span className="mt-1.5 font-sans text-[0.6rem] tracking-[0.28em] text-[#7a5c4e] uppercase">
            Mins
          </span>
        </div>

        <span className="font-cormorant text-[clamp(2.2rem,8vw,4rem)] text-[#b7934b]/50 leading-none self-start pt-1 px-1 select-none" aria-hidden="true">:</span>

        {/* SECONDS */}
        <div className="flex flex-col items-center">
          <span className="font-cormorant text-[clamp(3rem,10vw,5rem)] leading-none font-light text-[#b7934b]">
            <RollingNumber value={timeLeft.seconds} />
          </span>
          <span className="mt-1.5 font-sans text-[0.6rem] tracking-[0.28em] text-[#7a5c4e] uppercase">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};
