import React from 'react';
import { ExternalLink, Hotel, MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import hotelWatercolour from '../assets/images/hotel-watercolour.jpg';

export const AccommodationsSection: React.FC = () => {
  return (
    <section className="my-20 space-y-8 text-center">
      <div>
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-[#34516d]">
          <Hotel className="h-6 w-6 stroke-[1.5]" />
        </div>
        <h2 className="font-script text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          Accommodations
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          Recommended lodging in Enugu for our beloved travelling guests
        </p>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      {/* Floating Watercolour Hotel Illustration */}
      <div className="reference-media relative mx-auto aspect-[4/3] max-w-sm overflow-hidden sm:max-w-md">
        <img
          src={hotelWatercolour}
          alt="Enugu Luxury Accommodations"
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-left text-white">
          <p className="font-serif text-xs font-semibold tracking-wider uppercase drop-shadow">
            Curated Stays
          </p>
          <p className="font-script text-lg text-[#f0f5fa] drop-shadow">
            Rest in comfort & style
          </p>
        </div>
      </div>

      {/* Frosted Hotel Cards */}
      <div className="mx-auto grid max-w-md grid-cols-1 gap-4 text-left px-4 sm:grid-cols-2">
        {WEDDING_CONFIG.accommodations.map((hotel, i) => (
          <div
            key={i}
            className="reference-stay flex flex-col justify-between p-4 transition-all"
          >
            <div>
              <h3 className="font-serif text-xs font-bold tracking-wide text-[#2c3e50] uppercase">
                {hotel.name}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#556987]">
                {hotel.description}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-[#34516d]">
                <MapPin className="h-3 w-3" />
                <span>{hotel.distance}</span>
              </p>
            </div>
            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="reference-link mt-3 inline-flex items-center justify-center gap-1 px-3 py-1.5 font-serif text-[10px] font-semibold tracking-wider text-[#34516d] uppercase transition-all"
            >
              <span>View details</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
