import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import beautifulPeopleTrack from '../assets/Chike - Beautiful People.mp3';

export interface AudioPlayerHandle {
  play: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle>(function AudioPlayer(_, ref) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  useImperativeHandle(ref, () => ({ play: playAudio }), [playAudio]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playAudio();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio
        ref={audioRef}
        src={beautifulPeopleTrack}
        loop
        preload="auto"
      />
      <button
        onClick={toggleAudio}
        type="button"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#171a17]/92 p-0 text-[#f5e8b8] shadow-[0_8px_20px_rgba(0,0,0,.3)] backdrop-blur-md transition-all duration-300 hover:border-[#d4af37] hover:bg-[#25352e] sm:h-auto sm:w-auto sm:gap-2.5 sm:px-3.5 sm:py-2.5"
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      >
        {isPlaying ? <Volume2 className="h-5 w-5 text-[#e4cc76]" /> : <VolumeX className="h-5 w-5 text-[#e4cc76]" />}
        <span className="text-[11px] font-sans tracking-wider uppercase pr-1 font-medium hidden sm:inline-block">
          {isPlaying ? 'Music On' : 'Play Music'}
        </span>
      </button>
    </div>
  );
});
