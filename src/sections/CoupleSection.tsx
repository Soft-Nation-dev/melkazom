import React from 'react';
import coupleImg from '../assets/images/couple-720.webp';
import coupleImgLarge from '../assets/images/couple-1024.webp';

export const CoupleSection: React.FC = () => {
  return (
    <section className="my-24 space-y-6 text-center">
      {/* Script Title matching user screenshot */}
      <div>
        <h2 className="font-script text-4xl font-normal text-[#4a2d28] sm:text-5xl">
          We can&apos;t wait for this !
        </h2>
      </div>

      {/* Ornate Double-Line Photo Frame Container matching screenshot */}
      <div className="relative mx-auto max-w-xs sm:max-w-sm px-4">
        {/* Double-line frame with 4-corner ornamental scroll loop ears */}
        <div className="pointer-events-none absolute inset-x-2 -inset-y-2 z-10">
          <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
            {/* Outer line */}
            <rect x="8" y="8" width="304" height="384" rx="2" stroke="#b7934b" strokeWidth="0.8" opacity="0.6" />
            {/* Inner line */}
            <rect x="13" y="13" width="294" height="374" rx="2" stroke="#b7934b" strokeWidth="0.8" opacity="0.6" />

            {/* Top-Left Corner Loop Scroll */}
            <g stroke="#b7934b" strokeWidth="0.9" opacity="0.75" fill="none">
              <path d="M4 22 C4 10, 10 4, 22 4" />
              <path d="M4 22 C14 22, 22 14, 22 4" />
              <circle cx="13" cy="13" r="1.5" fill="#b7934b" />
            </g>

            {/* Top-Right Corner Loop Scroll */}
            <g stroke="#b7934b" strokeWidth="0.9" opacity="0.75" fill="none">
              <path d="M316 22 C316 10, 310 4, 298 4" />
              <path d="M316 22 C306 22, 298 14, 298 4" />
              <circle cx="307" cy="13" r="1.5" fill="#b7934b" />
            </g>

            {/* Bottom-Left Corner Loop Scroll */}
            <g stroke="#b7934b" strokeWidth="0.9" opacity="0.75" fill="none">
              <path d="M4 378 C4 390, 10 396, 22 396" />
              <path d="M4 378 C14 378, 22 386, 22 396" />
              <circle cx="13" cy="387" r="1.5" fill="#b7934b" />
            </g>

            {/* Bottom-Right Corner Loop Scroll */}
            <g stroke="#b7934b" strokeWidth="0.9" opacity="0.75" fill="none">
              <path d="M316 378 C316 390, 310 396, 298 396" />
              <path d="M316 378 C306 378, 298 386, 298 396" />
              <circle cx="307" cy="387" r="1.5" fill="#b7934b" />
            </g>
          </svg>
        </div>

        {/* Real Couple Photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-[0_12px_28px_rgba(40,60,90,0.12)]">
          <img
            src={coupleImg}
            srcSet={`${coupleImg} 720w, ${coupleImgLarge} 1024w`}
            sizes="(max-width: 640px) calc(100vw - 3.5rem), 384px"
            alt="Melford & Chiazokam"
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
