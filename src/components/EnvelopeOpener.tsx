import React, { useEffect, useRef, useState } from 'react';
import botanicalSealImg from '../assets/images/wax-seal-botanical-v2.webp';

interface EnvelopeOpenerProps {
  onOpen: () => void;
  onStart: () => void;
  isOpen: boolean;
}

type OpeningStage = 'idle' | 'illuminating' | 'opening' | 'flooding' | 'revealed';

const OPENING_TIMING = {
  upperGlow: 900,
  flapJourney: 5300,
  finalFlood: 1250,
} as const;

interface BotanicalEmbroideryProps {
  className?: string;
  mirrored?: boolean;
}

const EMBROIDERY_SEGMENTS = [1, 2, 3, 4, 5, 6, 7] as const;

const BotanicalEmbroideryDefinitions: React.FC = () => (
  <svg className="botanical-embroidery-defs" aria-hidden="true" focusable="false">
    <defs>
      <g id="botanical-segment-1">
        <path data-stitch pathLength="1" d="M495 565 C475 492 438 428 388 367 C339 307 309 236 314 124" />
        <path data-stitch pathLength="1" d="M388 367 C327 338 270 290 226 224" />
        <path data-stitch pathLength="1" d="M365 334 C322 323 282 330 247 361" />
        <path data-stitch pathLength="1" d="M414 407 C356 397 309 414 273 454" />
        <path data-stitch pathLength="1" d="M447 465 C393 459 350 478 317 520" />
      </g>

      <g id="botanical-segment-2">
        <path data-stitch pathLength="1" d="M316 130 C294 111 291 86 310 69 C331 85 334 108 316 130Z" />
        <path data-stitch pathLength="1" d="M315 156 C280 151 262 130 269 106 C300 108 318 127 315 156Z" />
        <path data-stitch pathLength="1" d="M319 184 C348 168 374 171 388 194 C363 213 337 207 319 184Z" />
        <path data-stitch pathLength="1" d="M329 224 C292 218 273 195 282 168 C315 171 333 193 329 224Z" />
        <path data-stitch pathLength="1" d="M343 257 C374 236 403 240 417 266 C389 287 360 282 343 257Z" />
        <path data-stitch pathLength="1" d="M249 361 C273 334 302 328 327 347 C309 375 280 381 249 361Z" />
        <path data-stitch pathLength="1" d="M273 454 C299 421 333 414 361 437 C340 472 305 478 273 454Z" />
        <path data-stitch pathLength="1" d="M317 520 C338 487 369 476 398 493 C383 528 350 538 317 520Z" />
        <path data-stitch pathLength="1" d="M226 224 C208 207 207 187 222 173 C241 184 244 205 226 224Z" />
        <path data-stitch pathLength="1" d="M246 247 C219 245 202 229 205 208 C230 206 247 221 246 247Z" />
        <path data-stitch pathLength="1" d="M267 271 C290 253 313 254 326 273 C307 294 283 291 267 271Z" />
      </g>

      <g id="botanical-segment-3">
        <path data-stitch pathLength="1" d="M505 565 C530 493 566 430 610 370 C656 307 679 237 682 114" />
        <path data-stitch pathLength="1" d="M610 370 C667 350 724 310 774 250" />
        <path data-stitch pathLength="1" d="M575 431 C631 414 680 430 720 470" />
        <path data-stitch pathLength="1" d="M545 492 C596 477 640 490 677 526" />
        <path data-stitch pathLength="1" d="M679 172 C723 138 754 101 769 61" />
      </g>

      <g id="botanical-segment-4">
        <path data-stitch pathLength="1" d="M612 371 C642 339 678 333 706 354 C684 389 648 394 612 371Z" />
        <path data-stitch pathLength="1" d="M575 431 C606 399 643 395 671 418 C647 451 610 456 575 431Z" />
        <path data-stitch pathLength="1" d="M545 492 C575 463 610 461 636 482 C613 514 578 517 545 492Z" />
        <path data-stitch pathLength="1" d="M720 470 C688 457 658 468 645 494 C675 510 704 500 720 470Z" />
        <path data-stitch pathLength="1" d="M677 526 C648 515 620 527 609 552 C637 565 663 554 677 526Z" />
        <path data-stitch pathLength="1" d="M769 61 C752 53 740 38 743 24 C760 25 772 41 769 61Z" />
        <path data-stitch pathLength="1" d="M748 92 C723 87 711 72 716 54 C739 56 751 72 748 92Z" />
        <path data-stitch pathLength="1" d="M726 121 C747 103 768 103 781 119 C764 140 741 140 726 121Z" />
        <path data-stitch pathLength="1" d="M704 146 C678 142 665 126 670 107 C694 110 707 126 704 146Z" />
        <path data-stitch pathLength="1" d="M774 250 C754 246 742 232 746 216 C766 218 778 232 774 250Z" />
        <path data-stitch pathLength="1" d="M750 275 C724 272 708 256 711 236 C736 236 752 253 750 275Z" />
        <path data-stitch pathLength="1" d="M724 299 C743 282 764 282 777 298 C760 318 739 318 724 299Z" />
      </g>

      <g id="botanical-segment-5">
        <path data-stitch pathLength="1" d="M649 230 C618 239 587 219 585 187 C584 162 605 142 631 149 C650 160 655 191 649 230Z" />
        <path data-stitch pathLength="1" d="M649 230 C642 196 653 158 680 148 C705 149 722 173 714 198 C704 222 677 233 649 230Z" />
        <path data-stitch pathLength="1" d="M650 230 C671 217 702 221 713 242 C708 267 682 283 659 270 C646 260 644 245 650 230Z" />
        <path data-stitch pathLength="1" d="M649 230 C646 253 626 277 602 269 C579 257 574 229 592 213 C609 205 630 215 649 230Z" />
        <path data-stitch pathLength="1" d="M596 211 C601 184 615 165 634 151 M614 226 C616 195 628 169 642 156" />
        <path data-stitch pathLength="1" d="M666 220 C672 190 685 168 700 162 M682 233 C693 216 704 205 715 199" />
        <path data-stitch pathLength="1" d="M609 255 C621 246 634 237 650 230 M661 270 C658 255 657 243 650 230" />
        <ellipse data-stitch pathLength="1" cx="650" cy="231" rx="13" ry="9" />
        <path data-stitch pathLength="1" d="M650 223 L640 205 M650 223 L652 201 M653 223 L669 207 M646 224 L629 211" />
      </g>

      <g id="botanical-segment-6">
        {[
          [292, 91, 6], [319, 104, 7], [286, 131, 7], [323, 143, 8], [295, 170, 7],
          [205, 196, 6], [228, 211, 7], [199, 230, 6], [244, 236, 7], [226, 259, 6],
          [744, 40, 5], [771, 48, 6], [735, 66, 6], [769, 78, 7], [725, 96, 6],
          [756, 224, 6], [781, 239, 7], [744, 252, 6], [771, 269, 7], [736, 286, 6],
        ].map(([cx, cy, r], index) => (
          <circle data-stitch pathLength="1" key={index} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      <g id="botanical-segment-7">
        <path data-stitch pathLength="1" d="M258 355 L312 350 M288 438 L348 442 M332 512 L386 498" />
        <path data-stitch pathLength="1" d="M624 365 L692 361 M588 424 L658 424 M557 489 L623 487" />
        <path data-stitch pathLength="1" d="M277 349 L294 337 M305 354 L320 365 M311 438 L327 424 M335 445 L349 458" />
        <path data-stitch pathLength="1" d="M642 361 L657 346 M672 363 L687 376 M610 423 L626 407 M637 427 L651 441" />
      </g>
    </defs>
  </svg>
);

const segmentClassName = (segment: number) => {
  const detailClass = segment === 6 ? ' embroidery-buds' : segment === 7 ? ' embroidery-veins' : '';
  return `embroidery-segment embroidery-segment-${segment}${detailClass}`;
};

const BotanicalEmbroidery: React.FC<BotanicalEmbroideryProps> = ({ className = '', mirrored = false }) => {
  const embroidery = (glowing: boolean) => (
    <g className={glowing ? 'embroidery-glow' : 'embroidery-relief'}>
      {EMBROIDERY_SEGMENTS.map((segment) => (
        <use
          key={segment}
          className={segmentClassName(segment)}
          href={`#botanical-segment-${segment}`}
        />
      ))}
    </g>
  );

  return (
    <svg aria-hidden="true" className={`botanical-embroidery ${className}`} viewBox="0 0 1000 600" preserveAspectRatio="none">
      <g transform={mirrored ? 'translate(1000 0) scale(-1 1)' : undefined}>
        {embroidery(false)}
        {embroidery(true)}
      </g>
    </svg>
  );
};

export const EnvelopeOpener: React.FC<EnvelopeOpenerProps> = ({ onOpen, onStart, isOpen }) => {
  const [stage, setStage] = useState<OpeningStage>('idle');
  const timersRef = useRef<number[]>([]);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const handleStartOpen = () => {
    if (stage !== 'idle' || isOpen) return;
    onStart();
    setStage('illuminating');

    const timing = {
      open: OPENING_TIMING.upperGlow,
      flood: OPENING_TIMING.upperGlow + OPENING_TIMING.flapJourney,
      reveal: OPENING_TIMING.upperGlow + OPENING_TIMING.flapJourney + OPENING_TIMING.finalFlood,
    };

    timersRef.current = [
      window.setTimeout(() => setStage('opening'), timing.open),
      window.setTimeout(() => setStage('flooding'), timing.flood),
      window.setTimeout(() => {
        setStage('revealed');
        onOpen();
      }, timing.reveal),
    ];
  };

  if (isOpen || stage === 'revealed') return null;

  return (
    <div
      className="envelope-opener"
      data-stage={stage}
      style={{
        '--flap-journey-duration': `${OPENING_TIMING.flapJourney}ms`,
        '--final-flood-duration': `${OPENING_TIMING.finalFlood}ms`,
      } as React.CSSProperties}
    >
      <div className="invitation-glimpse" aria-hidden="true">
        <div className="invitation-glimpse__content">
          <span>The Holy Matrimony</span>
          <strong>Melford &amp; Chiazokam</strong>
          <i />
          <small>04 · 01 · 2027</small>
        </div>
      </div>

      <div className="envelope-shell">
        <BotanicalEmbroideryDefinitions />

        <div className="envelope-panel envelope-panel--left" aria-hidden="true">
          <BotanicalEmbroidery className="botanical-embroidery--left" mirrored />
        </div>
        <div className="envelope-panel envelope-panel--right" aria-hidden="true">
          <BotanicalEmbroidery className="botanical-embroidery--right" />
        </div>

        <div className="envelope-panel envelope-panel--bottom" aria-hidden="true">
          <BotanicalEmbroidery className="botanical-embroidery--bottom" mirrored />
        </div>

        <div className="envelope-radiance" aria-hidden="true">
          <div className="envelope-radiance__core" />
          <div className="envelope-radiance__beam" />
        </div>

        <svg className="envelope-seams" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path className="envelope-seam envelope-seam--shadow" d="M0 270 L500 560 L1000 270" />
          <path className="envelope-seam envelope-seam--light envelope-seam--upper-light" pathLength="1" d="M0 270 L500 560 L1000 270" />
          <path className="envelope-seam envelope-seam--lower envelope-seam--lower-mobile" d="M0 1000 L500 560 L1000 1000" />
          <path className="envelope-seam envelope-seam--light envelope-seam--lower-light envelope-seam--lower-mobile" pathLength="1" d="M0 1000 L500 560 L1000 1000" />
          <path className="envelope-seam envelope-seam--lower envelope-seam--lower-landscape" d="M0 1000 L500 610 L1000 1000" />
          <path className="envelope-seam envelope-seam--light envelope-seam--lower-light envelope-seam--lower-landscape" pathLength="1" d="M0 1000 L500 610 L1000 1000" />
        </svg>

        <div className="envelope-flap envelope-flap--upper">
          <div className="envelope-flap__surface" aria-hidden="true" />
          <div className="envelope-flap__artwork" aria-hidden="true">
            <BotanicalEmbroidery className="botanical-embroidery--upper" />
          </div>

          <div className="wax-seal-wrap">
            <button
              type="button"
              onClick={handleStartOpen}
              disabled={stage !== 'idle'}
              className="wax-seal-button"
              aria-label="Open Melford and Chiazokam's wedding invitation"
            >
              <span className="wax-seal-aura" aria-hidden="true" />
              <span className="wax-seal">
                <img src={botanicalSealImg} alt="" decoding="async" />
                <span className="wax-seal__bevel" aria-hidden="true" />
                <span className="wax-seal__glint" aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>

        <div className="envelope-prompt" aria-live="polite">
          <span>{stage === 'idle' ? 'Touch the seal' : stage === 'illuminating' ? 'Made with love' : 'Opening for you'}</span>
          <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
