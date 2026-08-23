import { useEffect, useRef, useState } from 'react';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { AudioPlayer, type AudioPlayerHandle } from './components/AudioPlayer';
import { ScrollToRsvp } from './components/ScrollToRsvp';

// Modular Subfolder Sections for Easy Editing
import { HeroSection } from './sections/HeroSection';
import { ParentsSection } from './sections/ParentsSection';
import { VenueSection } from './sections/VenueSection';
import { StorySection } from './sections/StorySection';
import { ItinerarySection } from './sections/ItinerarySection';
import { CountdownSection } from './sections/CountdownSection';
import { BanquetSection } from './sections/BanquetSection';
import { CoupleSection } from './sections/CoupleSection';
import { PaletteSection } from './sections/PaletteSection';
import { FaqSection } from './sections/FaqSection';
import { AccommodationsSection } from './sections/AccommodationsSection';
import { RSVPSection } from './components/RSVPSection';
import { FooterSection } from './sections/FooterSection';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);

  useEffect(() => {
    if (!isOpened) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('.invitation-document > section, .invitation-document > footer'));
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
  }, [isOpened, isDocumentReady]);

  useEffect(() => {
    if (!isOpened) return;

    // Keep the hero entrance free from the cost of mounting the full document.
    // Guests naturally remain on the full-height hero while the remaining
    // sections are prepared below the fold.
    const timer = window.setTimeout(() => setIsDocumentReady(true), 2600);
    return () => window.clearTimeout(timer);
  }, [isOpened]);

  return (
    <div className="invitation-canvas relative min-h-screen overflow-x-hidden bg-[#eee5d7] font-sans text-[#382f28] antialiased selection:bg-[#a8874b]/30 selection:text-[#26342b]">
      {/* 1. Full-Screen Origami Envelope Opener */}
      <EnvelopeOpener
        isOpen={isOpened}
        onStart={() => audioPlayerRef.current?.play()}
        onOpen={() => setIsOpened(true)}
      />

      {/* 2. Floating Bottom Controls */}
      <AudioPlayer ref={audioPlayerRef} />
      {isDocumentReady && <ScrollToRsvp />}

      {/* Main Wedding Invitation Document */}
      <main className={`invitation-document relative z-10 mx-auto max-w-2xl px-4 py-4 sm:px-7 sm:py-8 ${isDocumentReady ? 'is-ready' : ''}`}>
        {/* Section 1: Hero matching screenshot with corner floral foliage */}
        <HeroSection isVisible={isOpened} />

        {isDocumentReady && (
          <>
            {/* Section 2: Parents' Blessing & Hometowns (Nsukka & Igbo-Etiti) */}
            <ParentsSection />

            {/* Section 3: Venues (Christ the King Church & Amadeo Event Center) */}
            <VenueSection />

            {/* Section 4: Why This Is Special / Couple Quote */}
            <StorySection />

            {/* Section 5: Order of Events Timeline */}
            <ItinerarySection />

            {/* Section 6: Live Countdown to January 4, 2027 */}
            <CountdownSection />

            {/* Section 7: Banquet & Dining Experience */}
            <BanquetSection />

            {/* Section 8: Romantic Couple Portrait */}
            <CoupleSection />

            {/* Section 9: Dress Code & Colors of the Day */}
            <PaletteSection />

            {/* Section 10: Frequently Asked Questions Accordion */}
            <FaqSection />

            {/* Section 11: Accommodations in Enugu */}
            <AccommodationsSection />

            {/* Section 12: Interactive RSVP Form */}
            <RSVPSection />

            {/* Section 13: Footer */}
            <FooterSection />
          </>
        )}
      </main>
    </div>
  );
}
