import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import venueWatercolour from '../assets/images/venue-watercolour.jpg';
import hallImg from '../assets/images/Hall image.webp';

export const VenueSection: React.FC = () => {
  return (
    <section className="my-20 space-y-16 text-center">
      {/* Church Solemnization */}
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-3xl font-normal tracking-[0.25em] text-[#2c3e50] uppercase sm:text-4xl">
            VENUE
          </h2>
          <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px flex-1 bg-[#6c829c]/40" />
            <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
            <span className="h-px flex-1 bg-[#6c829c]/40" />
          </div>
        </div>

        {/* Floating Watercolor Artwork */}
        <div className="reference-media relative mx-auto aspect-[4/3] max-w-sm overflow-hidden sm:max-w-md">
          <img
            src={venueWatercolour}
            alt={WEDDING_CONFIG.event.church.name}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Location Pin Icon */}
        <div className="reference-mark mx-auto flex h-11 w-11 items-center justify-center text-[#34516d]">
          <MapPin className="h-5 w-5" />
        </div>

        {/* Venue Title & Address in Script / Italic */}
        <div>
          <h3 className="font-script text-3xl text-[#2c3e50] sm:text-4xl">
            {WEDDING_CONFIG.event.church.name}
          </h3>
          <p className="mt-1 font-serif text-xs italic tracking-wider text-[#556987]">
            {WEDDING_CONFIG.event.church.address}
          </p>
          <p className="mt-2 text-xs font-semibold tracking-wider text-[#34516d]">
            {WEDDING_CONFIG.event.church.time}
          </p>
        </div>

        {/* Frosted Pill Button */}
        <div>
          <a
            href={WEDDING_CONFIG.event.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-link inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-center font-sans text-xs font-semibold tracking-wide text-[#344d66] transition-all"
          >
            <Navigation className="h-3.5 w-3.5 rotate-45 text-[#34516d]" />
            <span>Get directions · Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Reception Hall */}
      <div className="space-y-6 pt-4">
        {/* Floating Reception Artwork */}
        <div className="reference-media relative mx-auto aspect-[16/9] max-w-sm overflow-hidden sm:max-w-md">
          <img
            src={hallImg}
            alt={WEDDING_CONFIG.event.reception.center}
            width={474}
            height={315}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Location Pin Icon */}
        <div className="reference-mark mx-auto flex h-11 w-11 items-center justify-center text-[#34516d]">
          <MapPin className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-script text-3xl text-[#2c3e50] sm:text-4xl">
            {WEDDING_CONFIG.event.reception.hall}
          </h3>
          <p className="mt-1 font-serif text-xs italic tracking-wider text-[#556987]">
            {WEDDING_CONFIG.event.reception.address}
          </p>
          <p className="mt-2 text-xs font-semibold tracking-wider text-[#34516d]">
            {WEDDING_CONFIG.event.reception.time}
          </p>
        </div>

        <div>
          <a
            href={WEDDING_CONFIG.event.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-link inline-flex min-h-11 items-center justify-center gap-2 px-6 py-2.5 text-center font-sans text-xs font-semibold tracking-wide text-[#344d66] transition-all"
          >
            <Navigation className="h-3.5 w-3.5 rotate-45 text-[#34516d]" />
            <span>Get directions · Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};
