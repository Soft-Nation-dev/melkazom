import React, { useEffect, useState } from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(WEDDING_CONFIG.event.dateISO).getTime();
    const calculate = () => {
      const difference = target - Date.now();
      setTimeLeft(
        difference > 0
          ? {
              days: Math.floor(difference / 86_400_000),
              hours: Math.floor((difference / 3_600_000) % 24),
              minutes: Math.floor((difference / 60_000) % 60),
              seconds: Math.floor((difference / 1_000) % 60),
            }
          : { days: 0, hours: 0, minutes: 0, seconds: 0 },
      );
    };

    calculate();
    const interval = window.setInterval(calculate, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    ['DAYS', timeLeft.days],
    ['HOURS', timeLeft.hours],
    ['MINUTES', timeLeft.minutes],
    ['SECONDS', timeLeft.seconds],
  ] as const;

  return (
    <div className="relative my-24 px-4 text-center">
      <h2 className="font-script text-4xl font-normal text-[#2c3e50] sm:text-5xl transition-transform duration-300">
        Countdown
      </h2>

      <div className="mx-auto mt-3 mb-8 flex w-20 items-center justify-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 bg-[#6c829c]/40" />
        <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
        <span className="h-px flex-1 bg-[#6c829c]/40" />
      </div>

      <div className="mx-auto grid max-w-sm grid-cols-4 gap-2.5 sm:gap-4">
        {units.map(([label, value]) => {
          const isSeconds = label === 'SECONDS';
          return (
            <div
              key={label}
              className="reference-countdown-unit relative flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl border border-white/60 bg-white/45 shadow-[0_4px_16px_rgba(40,60,90,0.06)] backdrop-blur-xs transition-all duration-300 hover:bg-white/65 hover:scale-[1.02]"
            >
              <span
                key={isSeconds ? value : undefined}
                className={`font-serif text-2xl font-light tabular-nums text-[#2c3e50] sm:text-4xl ${
                  isSeconds ? 'animate-clock-tick' : ''
                }`}
              >
                {String(value).padStart(2, '0')}
              </span>
              <span className="mt-1 font-serif text-[8px] tracking-[0.2em] text-[#556987] uppercase sm:text-[9px]">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
