import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const BanquetSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6 text-center px-4">
      <div>
        <p className="font-sans text-[10px] font-bold tracking-[0.28em] text-[#b28a46] uppercase">
          Culinary Feast
        </p>
        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#2c3e50] sm:text-4xl mt-1">
          The Banquet Experience
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic text-[#556987]">
          A celebration of fine culinary craftsmanship and rich Nigerian delicacies
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b28a46]/40" />
          <span className="text-[10px] text-[#b28a46]">✦</span>
          <span className="h-px flex-1 bg-[#b28a46]/40" />
        </div>
      </div>

      {/* Menu Courses */}
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div>
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28a46]">
            Starter Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1e2f42] mt-0.5">
            {WEDDING_CONFIG.menu.starter.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.starter.desc}
          </p>
        </div>

        <div className="mx-auto flex w-12 items-center justify-center" aria-hidden="true">
          <span className="h-px w-full bg-[#b28a46]/25" />
        </div>

        <div>
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28a46]">
            Main Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1e2f42] mt-0.5">
            {WEDDING_CONFIG.menu.main.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.main.desc}
          </p>
        </div>

        <div className="mx-auto flex w-12 items-center justify-center" aria-hidden="true">
          <span className="h-px w-full bg-[#b28a46]/25" />
        </div>

        <div>
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b28a46]">
            Dessert &amp; Toasts
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#1e2f42] mt-0.5">
            {WEDDING_CONFIG.menu.dessert.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#556987]">
            {WEDDING_CONFIG.menu.dessert.desc}
          </p>
        </div>
      </div>
    </section>
  );
};
