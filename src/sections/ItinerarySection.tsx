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
        <span className="font-serif text-xs font-semibold tracking-[0.25em] text-[#b7934b] uppercase">
          {item.time}
        </span>

        {/* Event Title in elegant Cormorant Garamond Serif */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal tracking-wide text-[#4a2d28] uppercase mt-0.5">
          {item.title}
        </h3>

        {/* Subtitle in Delicate Italic Serif */}
        <p className="font-serif text-xs italic text-[#6b4c46] mt-0.5 leading-relaxed">
          {item.subtitle}
        </p>

        {/* Subtle decorative dot/rule */}
        <div className={`mt-2 flex items-center gap-1.5 ${isRight ? 'justify-end' : 'justify-start'}`}>
          <span className="h-px w-8 bg-[#b7934b]/30" />
          <span className="h-1 w-1 rotate-45 bg-[#b7934b]" />
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
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Order of the Day
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          Celebration Schedule
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Alternating Staggered Flow without bounding boxes */}
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
