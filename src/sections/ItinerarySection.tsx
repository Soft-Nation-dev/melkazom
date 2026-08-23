import React from 'react';
import { Church, Utensils, Sparkles, Music, Car } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

const eventIcons = [
  Church,
  Utensils,
  Sparkles,
  Music,
  Car,
];

export const ItinerarySection: React.FC = () => {
  return (
    <section className="my-20 space-y-12 text-center">
      {/* Floating Vertical Schedule Items */}
      <div className="mx-auto max-w-md space-y-10 px-4">
        {WEDDING_CONFIG.itinerary.map((item, index) => {
          const IconComponent = eventIcons[index % eventIcons.length];
          return (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Event Icon */}
              <div className="mb-2 flex h-9 w-9 items-center justify-center text-[#4a6b82]">
                <IconComponent className="h-5 w-5 stroke-[1.5]" />
              </div>

              {/* Time */}
              <span className="font-serif text-xs font-semibold tracking-wider text-[#344d66]">
                {item.time}
              </span>

              {/* Title in Serif Upper */}
              <h3 className="font-serif text-sm font-bold tracking-[0.2em] text-[#2c3e50] uppercase mt-0.5">
                {item.title}
              </h3>

              {/* Subtitle in Delicate Script */}
              <p className="font-script text-lg text-[#556987] mt-0.5">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
