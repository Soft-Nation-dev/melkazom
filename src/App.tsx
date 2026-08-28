import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { EnvelopeOpener } from './components/EnvelopeOpener';
import { AudioPlayer, type AudioPlayerHandle } from './components/AudioPlayer';
import { ScrollToRsvp } from './components/ScrollToRsvp';
import { LoadingScreen } from './components/LoadingScreen';
import heroSwanLake from './assets/images/hero-swan-lake-v2.jpg';
import botanicalSeal from './assets/images/wax-seal-botanical-v2.webp';

// Modular Subfolder Sections for Easy Editing
import { HeroSection } from './sections/HeroSection';

let invitationBodyPromise: ReturnType<typeof importInvitationBody> | undefined;

function importInvitationBody() {
  return import('./components/InvitationBody');
}

const loadInvitationBody = () => {
  invitationBodyPromise ??= importInvitationBody();
  return invitationBodyPromise;
};

const InvitationBody = lazy(loadInvitationBody);

const preloadImage = (src: string) => new Promise<void>((resolve) => {
  const image = new Image();
  image.onload = () => resolve();
  image.onerror = () => resolve();
  image.src = src;
});

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle>(null);

  useEffect(() => {
    let isMounted = true;
    const minimumDisplayTime = new Promise<void>((resolve) => window.setTimeout(resolve, 1050));
    const appReady = Promise.all([
      loadInvitationBody(),
      preloadImage(heroSwanLake),
      preloadImage(botanicalSeal),
      document.fonts?.ready ?? Promise.resolve(),
    ]).then(() => undefined);

    // Slow networks should never leave a guest looking at a static loader.
    const safetyRelease = new Promise<void>((resolve) => window.setTimeout(resolve, 5000));

    void Promise.all([minimumDisplayTime, Promise.race([appReady, safetyRelease])]).then(() => {
      if (!isMounted) return;
      setIsBooting(false);
      window.setTimeout(() => {
        if (isMounted) setShowLoader(false);
      }, 620);
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
  }, [isOpened]);

  useEffect(() => {
    if (!isOpened) return;

    // Keep the hero entrance free from the cost of mounting the full document.
    // Guests naturally remain on the full-height hero while the remaining
    // sections are prepared below the fold.
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void loadInvitationBody().then(() => {
        if (!cancelled) setIsDocumentReady(true);
      });
    }, 2600);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isOpened]);

  return (
    <div className="invitation-canvas relative min-h-screen overflow-x-hidden font-sans text-[#382f28] antialiased selection:bg-[#b7899a]/20 selection:text-[#38485d]">
      {showLoader && <LoadingScreen isLeaving={!isBooting} />}

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
          <Suspense fallback={null}>
            <InvitationBody />
          </Suspense>
        )}
      </main>
    </div>
  );
}
