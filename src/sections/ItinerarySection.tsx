import React, { useEffect, useRef, useState } from 'react';
import { WEDDING_CONFIG } from '../weddingData';

// Neutral Line-Art Sketches for Order of the Day matching reference screenshot
const ChurchSketch: React.FC = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#486078] stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 6 L32 16 M27 11 L37 11" strokeWidth="1.5" />
    <path d="M32 16 L22 28 L42 28 Z" />
    <path d="M24 28 L24 56 L40 56 L40 28" />
    <path d="M12 36 L24 28 M52 36 L40 28" />
    <path d="M12 36 L12 56 L24 56" />
    <path d="M52 36 L52 56 L40 56" />
    <path d="M28 56 C28 48 36 48 36 56" />
    <circle cx="32" cy="36" r="3.5" />
  </svg>
);

const BanquetSketch: React.FC = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#486078] stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 46 L56 46" strokeWidth="1.6" />
    <path d="M14 46 C14 26 50 26 50 46" />
    <circle cx="32" cy="23" r="2.5" />
    <path d="M10 50 L54 50" />
    <path d="M26 16 Q28 10 32 14" strokeWidth="0.9" opacity="0.6" />
    <path d="M36 14 Q38 8 42 12" strokeWidth="0.9" opacity="0.6" />
  </svg>
);

const CakeSketch: React.FC = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#486078] stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="40" width="36" height="16" rx="2" />
    <rect x="20" y="26" width="24" height="14" rx="1.5" />
    <rect x="26" y="16" width="12" height="10" rx="1" />
    <path d="M32 12 C30 8 26 9 28 13 L32 16 L36 13 C38 9 34 8 32 12 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M10 56 L54 56" strokeWidth="1.5" />
  </svg>
);

const ChampagneBucketSketch: React.FC = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-[#486078] stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30 6 L34 6 L34 14 Q38 18 36 26 L28 26 Q26 18 30 14 Z" />
    <path d="M31 6 L33 6" strokeWidth="2" />
    <path d="M20 24 L44 24 L40 52 L24 52 Z" />
    <circle cx="18" cy="30" r="2.5" />
    <circle cx="46" cy="30" r="2.5" />
    <path d="M12 28 L16 28 L15 38 L13 38 Z" />
    <path d="M14 38 L14 48 M10 48 L18 48" />
    <path d="M48 28 L52 28 L51 38 L49 38 Z" />
    <path d="M50 38 L50 48 M46 48 L54 48" />
    <circle cx="14" cy="22" r="0.8" fill="currentColor" />
    <circle cx="50" cy="22" r="0.8" fill="currentColor" />
    <circle cx="32" cy="20" r="1" fill="currentColor" />
  </svg>
);

const VintageCarSketch: React.FC = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11 text-[#486078] stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 32 Q24 22 32 22 Q40 22 46 32 Z" />
    <path d="M10 38 C10 34 16 32 32 32 C48 32 54 34 54 38 L52 46 L12 46 Z" />
    <rect x="26" y="38" width="12" height="6" rx="1" />
    <path d="M29 38 L29 44 M32 38 L32 44 M35 38 L35 44" strokeWidth="0.8" />
    <circle cx="16" cy="40" r="2.5" />
    <circle cx="48" cy="40" r="2.5" />
    <rect x="14" y="46" width="6" height="4" rx="1" />
    <rect x="44" y="46" width="6" height="4" rx="1" />
    <path d="M8 44 L56 44" strokeWidth="1.5" />
  </svg>
);

const sketchMap = [
  ChurchSketch,
  BanquetSketch,
  CakeSketch,
  ChampagneBucketSketch,
  VintageCarSketch,
];

interface AnimatedItineraryItemProps {
  item: typeof WEDDING_CONFIG.itinerary[0];
  index: number;
  SketchComponent: React.FC;
  isRight: boolean;
}

const AnimatedItineraryItem: React.FC<AnimatedItineraryItemProps> = ({
  item,
  SketchComponent,
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
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
        className={`flex flex-col items-center text-center max-w-[210px] sm:max-w-[240px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          isRight ? 'pr-2 sm:pr-6' : 'pl-2 sm:pl-6'
        } ${
          isRevealed
            ? 'opacity-100 translate-x-0 scale-100'
            : isRight
            ? 'opacity-0 translate-x-8 scale-95'
            : 'opacity-0 -translate-x-8 scale-95'
        }`}
      >
        {/* Neutral Line-Art Artwork with gentle hover rotation */}
        <div className="mb-2.5 flex h-12 w-12 items-center justify-center text-[#3c5570] transition-transform duration-500 hover:rotate-3">
          <SketchComponent />
        </div>

        {/* Time in Italic Roman/Serif */}
        <span className="font-serif text-sm italic tracking-widest text-[#556987]">
          {item.time}
        </span>

        {/* Event Name in Script Typography matching screenshot */}
        <h3 className="font-script text-3xl font-normal text-[#2c3e50] sm:text-4xl mt-0.5 tracking-wide">
          {item.title}
        </h3>

        {/* Subtitle in Delicate Italic Script */}
        <p className="font-script text-base text-[#556987] mt-1 leading-snug">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
};

export const ItinerarySection: React.FC = () => {
  return (
    <section className="my-28 px-4 sm:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-sans text-[10px] font-bold tracking-[0.25em] text-[#556987] uppercase">
          Order of the Day
        </p>
        <h2 className="font-script mt-1 text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          The Celebration Schedule
        </h2>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      {/* Staggered Alternating Flow matching reference screenshot */}
      <div className="relative mx-auto max-w-lg space-y-20">
        {WEDDING_CONFIG.itinerary.map((item, index) => {
          const SketchComponent = sketchMap[index % sketchMap.length];
          const isRight = index % 2 === 1;

          return (
            <AnimatedItineraryItem
              key={index}
              item={item}
              index={index}
              SketchComponent={SketchComponent}
              isRight={isRight}
            />
          );
        })}
      </div>
    </section>
  );
};
