import React from 'react';
import { ExternalLink, Hotel, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';

export const AccommodationsSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6 text-center px-4">
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          Guest Lodging
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          Recommended Accommodations
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic text-[#556987]">
          Curated hotels in Enugu for our beloved travelling family and friends
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
      </div>

      {/* Borderless Hotel Listings */}
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 text-left px-2 sm:grid-cols-2">
        {WEDDING_CONFIG.accommodations.map((hotel, i) => (
          <div
            key={i}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-sm font-semibold tracking-wide text-[#1e2f42] uppercase">
                {hotel.name}
              </h3>
              <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#556987]">
                {hotel.description}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-serif text-xs font-semibold text-[#b28a46]">
                {hotel.rate}
              </span>
              <a
                href={hotel.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-serif text-[11px] font-semibold text-[#1e2f42] hover:text-[#b28a46] transition-colors"
              >
                <span>View Details</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
