import { useEffect } from 'react';
import { StorySection } from '../sections/StorySection';
import { CountdownSection } from '../sections/CountdownSection';
import { ItinerarySection } from '../sections/ItinerarySection';
import { VenueSection } from '../sections/VenueSection';
import { CoupleSection } from '../sections/CoupleSection';
import { PaletteSection } from '../sections/PaletteSection';
import { BanquetSection } from '../sections/BanquetSection';
import { AccommodationsSection } from '../sections/AccommodationsSection';
import { ParentsSection } from '../sections/ParentsSection';
import { FaqSection } from '../sections/FaqSection';
import { RSVPSection } from './RSVPSection';
import { MessageSection } from '../sections/MessageSection';
import { FooterSection } from '../sections/FooterSection';

export default function InvitationBody() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.invitation-document > section:not(:first-child), .invitation-document > footer'),
    );

    sections.forEach((section, index) => {
      section.classList.add('invitation-section');
      section.style.setProperty('--section-delay', `${Math.min(index % 3, 2) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ParentsSection />
      <StorySection />
      <CountdownSection />
      <ItinerarySection />
      <VenueSection />
      <CoupleSection />
      <PaletteSection />
      <BanquetSection />
      <AccommodationsSection />
      <FaqSection />
      <RSVPSection />
      <MessageSection />
      <FooterSection />
    </>
  );
}
