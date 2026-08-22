import React from 'react';
import { ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import { VintageHeading } from '../components/VintageHeading';

export const AccommodationsSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6">
      <VintageHeading eyebrow="Stay Awhile" title="Accommodations" subtitle="Recommended lodging in Enugu for our guests" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WEDDING_CONFIG.accommodations.map((hotel, i) => (
          <div
            key={i}
            className="vintage-panel vintage-reveal-item flex flex-col justify-between p-6"
          >
            <div>
              <h3 className="font-serif font-bold text-base text-[#1a2520]">
                {hotel.name}
              </h3>
              <p className="text-xs text-[#6e6359] mt-1">
                {hotel.description}
              </p>
              <p className="text-[10px] text-[#0e3b2e] font-semibold mt-2">
                📍 {hotel.distance}
              </p>
            </div>
            <a
              href={hotel.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="vintage-button mt-5 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 font-serif text-[11px] font-semibold tracking-wider uppercase"
            >
              <span>View Hotel</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
