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
    // Start non-critical work immediately, but never make a guest wait for it.
    // The envelope is fully self-contained, so it can be shown while the hero,
    // the remainder of the document, and fonts continue preparing in the background.
    void loadInvitationBody();
    void preloadImage(heroSwanLake);
    void preloadImage(botanicalSeal);
    void document.fonts?.ready;

    // Keep the prelude intentional on a fast connection without turning it into
    // a loading gate on a slow mobile network.
    const timer = window.setTimeout(() => {
      if (!isMounted) return;
      setIsBooting(false);
      window.setTimeout(() => {
        if (isMounted) setShowLoader(false);
      }, 280);
    }, 1200);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
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

    // The document has been warming in the background since first paint. Yield
    // one frame after the envelope handoff, then reveal it as soon as it is ready.
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void loadInvitationBody().then(() => {
        if (!cancelled) setIsDocumentReady(true);
      });
    }, 320);

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
