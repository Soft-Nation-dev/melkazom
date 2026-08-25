import { useEffect } from 'react';
import { StorySection } from '../sections/StorySection';
import { CountdownSection } from '../sections/CountdownSection';
import { VenueSection } from '../sections/VenueSection';
import { CoupleSection } from '../sections/CoupleSection';
import { PaletteSection } from '../sections/PaletteSection';
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
      <StorySection />
      <CountdownSection />
      <VenueSection />
      <CoupleSection />
      <PaletteSection />
      <FaqSection />
      <RSVPSection />
      <MessageSection />
      <FooterSection />
    </>
  );
}
