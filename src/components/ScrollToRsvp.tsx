import React, { useState, useEffect } from 'react';

export const ScrollToRsvp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight * 0.45) {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 transition-all duration-300">
      <button
        onClick={handleScrollClick}
        type="button"
        className="flex flex-col items-center gap-1 rounded-full border border-[#8a7190]/18 bg-[#fffaf7]/82 px-4 py-1.5 text-[#4d4151] shadow-[0_4px_20px_rgba(74,61,83,0.11)] backdrop-blur-md transition-all duration-300 group cursor-pointer hover:bg-white"
        aria-label="Scroll to RSVP section"
      >
          <span className="text-[9px] font-sans font-semibold tracking-[0.22em] text-[#73607a] group-hover:text-[#4d4151] uppercase">
          SCROLL TO RSVP
        </span>
        <div className="w-4 h-6 rounded-full border border-[#73607a]/70 flex items-start justify-center p-0.5 group-hover:border-[#4d4151]">
          <span className="w-1 h-1.5 bg-[#8d6e88] rounded-full animate-bounce" />
        </div>
      </button>
    </div>
  );
};
