import React from 'react';
import coupleImg from '../assets/images/couple-720.webp';
import coupleImgLarge from '../assets/images/couple-1024.webp';

export const CoupleSection: React.FC = () => {
  return (
    <section className="my-16 space-y-5 text-center">
      <span className="vintage-eyebrow">The beginning of forever</span>
      <h2 className="font-serif text-3xl font-medium text-[#29362d] sm:text-4xl">
        We Can't Wait For This!
      </h2>
      <p className="font-script text-4xl text-[#987a49]">
        Melford & Chiazokam
      </p>

      <div className="vintage-panel relative mx-auto max-w-sm p-3 !rounded-t-[170px]">
        <div className="vintage-media aspect-[4/5] overflow-hidden rounded-t-[158px] rounded-b-2xl">
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
        <div className="py-5">
          <span className="font-cinzel text-xs font-semibold tracking-[0.3em] uppercase text-[#706458]">
            #Melkazom
          </span>
        </div>
      </div>
    </section>
  );
};
