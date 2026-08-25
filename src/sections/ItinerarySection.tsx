import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_CONFIG } from '../weddingData';

interface AnimatedItineraryItemProps {
  item: typeof WEDDING_CONFIG.itinerary[0];
  index: number;
  isRight: boolean;
}

const AnimatedItineraryItem: React.FC<AnimatedItineraryItemProps> = ({
  item,
  isRight,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`flex w-full ${
        isRight ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col max-w-[240px] sm:max-w-[280px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isRight ? 'text-right items-end pr-3 sm:pr-8' : 'text-left items-start pl-3 sm:pl-8'
        } ${
          isRevealed
            ? 'opacity-100 translate-x-0 scale-100'
            : isRight
            ? 'opacity-0 translate-x-8 scale-95'
            : 'opacity-0 -translate-x-8 scale-95'
        }`}
      >
        {/* Time with gold kicker styling */}
        <span className="font-serif text-xs font-semibold tracking-[0.25em] text-[#b28a46] uppercase">
          {item.time}
        </span>

        {/* Event Title in elegant Cormorant Garamond Serif */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#1e2f42] uppercase mt-0.5">
          {item.title}
        </h3>

        {/* Subtitle in Delicate Italic Serif */}
        <p className="font-serif text-xs italic text-[#556987] mt-0.5 leading-relaxed">
          {item.subtitle}
        </p>

        {/* Subtle decorative dot/rule */}
        <div className={`mt-2 flex items-center gap-1.5 ${isRight ? 'justify-end' : 'justify-start'}`}>
          <span className="h-px w-8 bg-[#b28a46]/30" />
          <span className="h-1 w-1 rotate-45 bg-[#b28a46]" />
        </div>
      </div>
    </div>
  );
};

export const ItinerarySection: React.FC = () => {
  return (
    <section className="my-16 px-4 sm:px-8">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          Order of the Day
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          Celebration Schedule
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
      </div>

      {/* Alternating Staggered Flow without pictures and tightened spacing */}
      <div className="relative mx-auto max-w-lg space-y-8 sm:space-y-10">
        {WEDDING_CONFIG.itinerary.map((item, index) => {
          const isRight = index % 2 === 1;

          return (
            <AnimatedItineraryItem
              key={index}
              item={item}
              index={index}
              isRight={isRight}
            />
          );
        })}
      </div>
    </section>
  );
};
