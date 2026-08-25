import React from 'react';
import { ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const AccommodationsSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6 text-center px-4">
      <div>
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Guest Lodging
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          Recommended Accommodations
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic text-[#6b4c46]">
          Curated hotels in Enugu for our beloved travelling family and friends
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Open Editorial Lodging Columns (No box border) */}
      <div className="mx-auto max-w-lg py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          {WEDDING_CONFIG.accommodations.map((hotel, i) => (
            <div
              key={i}
              className={`flex flex-col justify-between ${i === 1 ? 'sm:border-l sm:border-[#b7934b]/25 sm:pl-8' : ''}`}
            >
              <div>
                <h3 className="font-serif text-sm font-semibold tracking-wider text-[#4a2d28] uppercase">
                  {hotel.name}
                </h3>
                <p className="mt-1.5 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
                  {hotel.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#b7934b]/20 pt-2.5">
                <span className="font-serif text-xs font-semibold text-[#b7934b]">
                  {hotel.distance}
                </span>
                <a
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-serif text-[11px] font-semibold text-[#4a2d28] hover:text-[#b7934b] transition-colors"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-3 w-3 text-[#b7934b]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
