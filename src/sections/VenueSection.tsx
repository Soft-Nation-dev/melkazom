import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import churchImg from '../assets/images/church image.jpg';
import hallImg from '../assets/images/Hall image.webp';
import { VintageHeading } from '../components/VintageHeading';

export const VenueSection: React.FC = () => {
  return (
    <section className="my-16 space-y-7">
      <VintageHeading eyebrow="The Celebration" title="Venues & Locations" subtitle="Join us as we take our vows and celebrate" />

      {/* Church Venue Card */}
      <div className="vintage-panel vintage-reveal-item">
        <div className="vintage-media relative h-52 overflow-hidden sm:h-64">
          <img
            src={churchImg}
            alt={WEDDING_CONFIG.event.church.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4 z-10 rounded-full border border-[#c6a45d]/45 bg-[#26372f]/88 px-3 py-1 font-serif text-[10px] tracking-widest text-[#f4e6bd] uppercase backdrop-blur-sm">
            Church Solemnization
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1a2520] font-semibold">
              {WEDDING_CONFIG.event.church.name}
            </h3>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0e3b2e]/10 px-3 py-1 font-sans text-xs font-bold text-[#0e3b2e]">
              {WEDDING_CONFIG.event.church.time}
            </span>
          </div>
          <p className="text-xs text-[#5c544d] mb-4 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <span>{WEDDING_CONFIG.event.church.address}</span>
          </p>
          <a
            href={WEDDING_CONFIG.event.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-button inline-flex min-h-12 w-full items-center justify-center gap-1.5 px-3 py-3 text-center font-serif text-[10px] leading-relaxed font-semibold tracking-[.14em] uppercase sm:gap-2 sm:text-xs sm:tracking-widest"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
            <span>Get Directions to Church</span>
            <ExternalLink className="ml-1 h-3.5 w-3.5 shrink-0 opacity-70" />
          </a>
        </div>
      </div>

      {/* Reception Hall Venue Card */}
      <div className="vintage-panel vintage-reveal-item">
        <div className="vintage-media relative h-52 overflow-hidden sm:h-64">
          <img
            src={hallImg}
            alt={WEDDING_CONFIG.event.reception.center}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4 z-10 rounded-full border border-[#c6a45d]/45 bg-[#26372f]/88 px-3 py-1 font-serif text-[10px] tracking-widest text-[#f4e6bd] uppercase backdrop-blur-sm">
            Grand Reception
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1a2520] font-semibold">
              {WEDDING_CONFIG.event.reception.hall}
            </h3>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#d4af37]/20 px-3 py-1 font-sans text-xs font-bold text-[#8a6e14]">
              {WEDDING_CONFIG.event.reception.time}
            </span>
          </div>
          <p className="text-xs text-[#5c544d] mb-4 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <span>{WEDDING_CONFIG.event.reception.address}</span>
          </p>
          <a
            href={WEDDING_CONFIG.event.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vintage-button inline-flex min-h-12 w-full items-center justify-center gap-1.5 px-3 py-3 text-center font-serif text-[10px] leading-relaxed font-semibold tracking-[.14em] uppercase sm:gap-2 sm:text-xs sm:tracking-widest"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#d4af37]" />
            <span>Get Directions to Reception</span>
            <ExternalLink className="ml-1 h-3.5 w-3.5 shrink-0 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
