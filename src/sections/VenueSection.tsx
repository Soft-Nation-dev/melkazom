import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import churchImg from '../assets/images/church-1280.webp';
import churchImgSmall from '../assets/images/church-720.webp';
import hallImg from '../assets/images/Hall image.webp';

export const VenueSection: React.FC = () => {
  return (
    <section className="my-24 space-y-16 text-center">
      {/* Section Header */}
      <div className="space-y-1">
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Join Us
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl">
          Venues &amp; Directions
        </h2>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Church Solemnization */}
      <div className="space-y-5">
        <p className="font-serif text-[10px] font-bold tracking-[0.28em] text-[#b7934b] uppercase">Holy Matrimony</p>

        {/* Church Venue Artwork with rounded edges and soft shadow */}
        <div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(60,40,30,0.1)] sm:max-w-md border border-[#b7934b]/20">
          <img
            src={churchImg}
            srcSet={`${churchImgSmall} 720w, ${churchImg} 1280w`}
            sizes="(max-width: 640px) calc(100vw - 3.5rem), 448px"
            alt={WEDDING_CONFIG.event.church.name}
            width={1280}
            height={853}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto flex h-10 w-10 items-center justify-center text-[#b7934b]">
          <MapPin className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-script text-3xl text-[#4a2d28] sm:text-4xl">
            {WEDDING_CONFIG.event.church.name}
          </h3>
          <p className="mt-1 font-serif text-xs italic tracking-wider text-[#6b4c46]">
            {WEDDING_CONFIG.event.church.address}
          </p>
          <p className="mt-2 font-serif text-xs font-semibold tracking-[0.2em] text-[#b7934b] uppercase">
            {WEDDING_CONFIG.event.church.time}
          </p>
        </div>

        <div>
          <a
            href={WEDDING_CONFIG.event.church.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b7934b]/30 bg-white/70 px-6 py-2.5 text-center font-serif text-xs font-semibold tracking-wider text-[#4a2d28] shadow-xs transition-all hover:bg-white hover:border-[#b7934b]/60"
          >
            <Navigation className="h-3.5 w-3.5 rotate-45 text-[#b7934b]" />
            <span>Get directions · Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Reception Hall */}
      <div className="space-y-5 pt-4">
        <p className="font-serif text-[10px] font-bold tracking-[0.28em] text-[#b7934b] uppercase">Grand Reception</p>

        {/* Reception Artwork */}
        <div className="relative mx-auto aspect-[16/9] max-w-sm overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(60,40,30,0.1)] sm:max-w-md border border-[#b7934b]/20">
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

        <div className="mx-auto flex h-10 w-10 items-center justify-center text-[#b7934b]">
          <MapPin className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-script text-3xl text-[#4a2d28] sm:text-4xl">
            {WEDDING_CONFIG.event.reception.hall}
          </h3>
          <p className="mt-1 font-serif text-xs italic tracking-wider text-[#6b4c46]">
            {WEDDING_CONFIG.event.reception.address}
          </p>
          <p className="mt-2 font-serif text-xs font-semibold tracking-[0.2em] text-[#b7934b] uppercase">
            {WEDDING_CONFIG.event.reception.time}
          </p>
        </div>

        <div>
          <a
            href={WEDDING_CONFIG.event.reception.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b7934b]/30 bg-white/70 px-6 py-2.5 text-center font-serif text-xs font-semibold tracking-wider text-[#4a2d28] shadow-xs transition-all hover:bg-white hover:border-[#b7934b]/60"
          >
            <Navigation className="h-3.5 w-3.5 rotate-45 text-[#b7934b]" />
            <span>Get directions · Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
};
