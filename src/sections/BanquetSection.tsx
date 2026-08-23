import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';
import banquetImg from '../assets/images/menu-banquet-720.webp';
import banquetImgLarge from '../assets/images/menu-banquet-1200.webp';

export const BanquetSection: React.FC = () => {
  return (
    <section className="vintage-panel my-16">
      <div className="vintage-media relative h-56 overflow-hidden sm:h-72">
        <img
          src={banquetImg}
          srcSet={`${banquetImg} 720w, ${banquetImgLarge} 1200w`}
          sizes="(max-width: 640px) calc(100vw - 2rem), 616px"
          alt="Wedding Dining Experience"
          width={1200}
          height={896}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-[#1c2923]/88 via-transparent to-transparent p-7">
          <div>
            <span className="font-cinzel text-[10px] tracking-[.28em] text-[#d9bd7a] uppercase">At the table</span>
          <h2 className="mt-1 font-serif text-3xl text-[#f7ebc8] drop-shadow">
            The Banquet Experience
          </h2>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-7 sm:p-9">
        <div className="vintage-reveal-item">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-[#d4af37] mb-1">
            Starter Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1a2520]">
            {WEDDING_CONFIG.menu.starter.title}
          </h4>
          <p className="text-xs text-[#6e6359]">
            {WEDDING_CONFIG.menu.starter.desc}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#b39769]/45 to-transparent" />

        <div className="vintage-reveal-item">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-[#d4af37] mb-1">
            Main Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1a2520]">
            {WEDDING_CONFIG.menu.main.title}
          </h4>
          <p className="text-xs text-[#6e6359]">
            {WEDDING_CONFIG.menu.main.desc}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#b39769]/45 to-transparent" />

        <div className="vintage-reveal-item">
          <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-[#d4af37] mb-1">
            Dessert
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1a2520]">
            {WEDDING_CONFIG.menu.dessert.title}
          </h4>
          <p className="text-xs text-[#6e6359]">
            {WEDDING_CONFIG.menu.dessert.desc}
          </p>
        </div>
      </div>
    </section>
  );
};
