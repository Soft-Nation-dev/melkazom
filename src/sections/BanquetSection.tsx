import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { WEDDING_CONFIG } from '../weddingData';
import banquetImg from '../assets/images/menu-banquet-720.webp';
import banquetImgLarge from '../assets/images/menu-banquet-1200.webp';

export const BanquetSection: React.FC = () => {
  return (
    <section className="my-20 space-y-8 text-center">
      <div>
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center text-[#34516d]">
          <UtensilsCrossed className="h-6 w-6 stroke-[1.5]" />
        </div>
        <h2 className="font-script text-4xl font-normal text-[#2c3e50] sm:text-5xl">
          The Banquet Experience
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic tracking-wider text-[#556987]">
          A celebration of fine culinary craftsmanship and Nigerian delicacies
        </p>
        <div className="mx-auto mt-2.5 flex w-16 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#6c829c]/40" />
          <span className="h-1 w-1 rotate-45 bg-[#4c6580]" />
          <span className="h-px flex-1 bg-[#6c829c]/40" />
        </div>
      </div>

      {/* Floating Dining Image */}
      <div className="reference-media relative mx-auto aspect-[16/9] max-w-sm overflow-hidden sm:max-w-md">
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
      </div>

      {/* Menu Courses */}
      <div className="mx-auto max-w-md space-y-4 px-4 text-center">
        <div className="reference-listing p-4">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#34516d]">
            Starter Course
          </h3>
          <h4 className="font-serif text-sm font-semibold text-[#2c3e50] mt-1">
            {WEDDING_CONFIG.menu.starter.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.starter.desc}
          </p>
        </div>

        <div className="reference-listing p-4">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#34516d]">
            Main Course
          </h3>
          <h4 className="font-serif text-sm font-semibold text-[#2c3e50] mt-1">
            {WEDDING_CONFIG.menu.main.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.main.desc}
          </p>
        </div>

        <div className="reference-listing p-4">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-[#34516d]">
            Dessert
          </h3>
          <h4 className="font-serif text-sm font-semibold text-[#2c3e50] mt-1">
            {WEDDING_CONFIG.menu.dessert.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.dessert.desc}
          </p>
        </div>
      </div>
    </section>
  );
};
