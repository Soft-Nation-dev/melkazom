import React, { useEffect, useState } from 'react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from './VintageHeading';

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
    ['Days', timeLeft.days],
    ['Hours', timeLeft.hours],
    ['Minutes', timeLeft.minutes],
    ['Seconds', timeLeft.seconds],
  ] as const;

  return (
    <div className="vintage-panel px-5 py-10 text-center sm:px-10 sm:py-12">
      <VintageHeading eyebrow="Until We Say I Do" title="The Celebration Begins" subtitle="We cannot wait to share this moment with you" />
      <div className="mx-auto grid max-w-md grid-cols-4 divide-x divide-[#ad9366]/30 border-y border-[#ad9366]/30 py-5">
        {units.map(([label, value]) => (
          <div key={label} className="vintage-reveal-item flex min-w-0 flex-col items-center px-1">
            <span className="font-serif text-2xl font-medium tabular-nums text-[#2e3b32] sm:text-4xl">
              {String(value).padStart(2, '0')}
            </span>
            <span className="mt-1 font-cinzel text-[8px] tracking-[.16em] text-[#88765f] uppercase sm:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
