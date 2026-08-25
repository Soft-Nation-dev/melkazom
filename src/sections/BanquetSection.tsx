import React from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export const BanquetSection: React.FC = () => {
  return (
    <section className="my-16 space-y-6 text-center px-4">
      <div>
        <p className="font-script text-3xl leading-none text-[#b7934b] sm:text-4xl">
          Culinary Feast
        </p>
        <h2 className="font-serif text-2xl font-normal tracking-wide text-[#4a2d28] sm:text-3xl mt-1">
          The Banquet Experience
        </h2>
        <p className="mx-auto mt-2 max-w-md font-serif text-xs italic text-[#6b4c46]">
          A celebration of fine culinary craftsmanship and rich Nigerian delicacies
        </p>
        <div className="mx-auto mt-2.5 flex w-20 items-center justify-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#b7934b]/40" />
          <span className="text-[10px] text-[#b7934b]">✦</span>
          <span className="h-px flex-1 bg-[#b7934b]/40" />
        </div>
      </div>

      {/* Menu Courses with subtle 3D same-color cards */}
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="paper-emboss-card rounded-2xl p-5">
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7934b]">
            Starter Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#4a2d28] mt-0.5">
            {WEDDING_CONFIG.menu.starter.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
            {WEDDING_CONFIG.menu.starter.desc}
          </p>
        </div>

        <div className="paper-emboss-card rounded-2xl p-5">
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7934b]">
            Main Course
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#4a2d28] mt-0.5">
            {WEDDING_CONFIG.menu.main.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
            {WEDDING_CONFIG.menu.main.desc}
          </p>
        </div>

        <div className="paper-emboss-card rounded-2xl p-5">
          <h3 className="font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-[#b7934b]">
            Dessert &amp; Toasts
          </h3>
          <h4 className="font-serif text-base font-semibold text-[#4a2d28] mt-0.5">
            {WEDDING_CONFIG.menu.dessert.title}
          </h4>
          <p className="mt-1 font-serif text-xs italic leading-relaxed text-[#6b4c46]">
            {WEDDING_CONFIG.menu.dessert.desc}
          </p>
        </div>
      </div>
    </section>
  );
};
