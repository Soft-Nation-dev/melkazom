import React, { useState, useEffect } from 'react';

export const ScrollToRsvp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 0.55) {
        setIsVisible(false);
        return;
      }

      const rsvpEl = document.getElementById('rsvp-section');
      if (rsvpEl) {
        const rect = rsvpEl.getBoundingClientRect();
        // Hide pill when user is already at or past RSVP section
        if (rect.top <= window.innerHeight * 0.7) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollClick = () => {
    const rsvpEl = document.getElementById('rsvp-section');
    if (rsvpEl) {
      rsvpEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 transition-all duration-300 sm:block">
      <button
        onClick={handleScrollClick}
        type="button"
        className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#d4af37]/40 shadow-[0_4px_20px_rgba(0,0,0,0.1)] text-[#3a322c] hover:bg-white hover:border-[#d4af37] transition-all duration-300 group cursor-pointer"
        aria-label="Scroll to RSVP section"
      >
        <span className="text-[10px] font-serif font-bold tracking-[0.25em] text-[#8e7f6e] group-hover:text-[#1a2520] uppercase">
          Scroll to RSVP
        </span>
        <div className="w-5 h-7 rounded-full border-2 border-[#8e7f6e] flex items-start justify-center p-1 group-hover:border-[#d4af37]">
          <span className="w-1 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
        </div>
      </button>
    </div>
  );
};
