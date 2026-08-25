import React from 'react';

interface TornPaperEdgeProps {
  position?: 'top' | 'bottom';
  paperColor?: string;
  className?: string;
}

/**
 * TornPaperEdge — Realistic vintage deckle/gallop torn paper boundary edge.
 * Uses SVG feTurbulence and feDisplacementMap to create hand-torn paper deckle edges with subtle 3D drop-shadows and fiber highlights.
 */
export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position = 'top',
  paperColor = '#dfd7cf',
  className = '',
}) => {
  const filterId = `deckle-${position}-${paperColor.replace('#', '')}`;
  const gradId = `fiberGrad-${position}-${paperColor.replace('#', '')}`;

  return (
    <div
      className={`torn-paper-edge torn-paper-edge--${position} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="torn-paper-svg"
      >
        <defs>
          <filter id={filterId} x="-2%" y="-60%" width="104%" height="220%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035 0.18"
              numOctaves="6"
              seed="42"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffaf2" stopOpacity="1" />
            <stop offset="45%" stopColor="#f3ecde" stopOpacity="1" />
            <stop offset="100%" stopColor="#dcd1bf" stopOpacity="1" />
          </linearGradient>
        </defs>

        {position === 'top' ? (
          <>
            {/* 3D drop shadow cast by edge above onto section */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,0 L1220,0 L1220,28 Q1050,40 900,28 Q780,38 660,26 Q540,38 420,27 Q300,38 180,27 Q90,36 -20,26 Z"
              fill="rgba(60, 38, 28, 0.14)"
              transform="translate(0,6)"
            />
            {/* Inner fibre highlight */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,0 L1220,0 L1220,28 Q1050,40 900,28 Q780,38 660,26 Q540,38 420,27 Q300,38 180,27 Q90,36 -20,26 Z"
              fill={`url(#${gradId})`}
              transform="translate(0,2)"
            />
            {/* Main paper body */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,0 L1220,0 L1220,28 Q1050,40 900,28 Q780,38 660,26 Q540,38 420,27 Q300,38 180,27 Q90,36 -20,26 Z"
              fill={paperColor}
            />
          </>
        ) : (
          <>
            {/* 3D drop shadow cast downward */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,60 L1220,60 L1220,32 Q1050,20 900,32 Q780,22 660,34 Q540,22 420,33 Q300,22 180,33 Q90,24 -20,34 Z"
              fill="rgba(60, 38, 28, 0.14)"
              transform="translate(0,-6)"
            />
            {/* Inner fibre highlight */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,60 L1220,60 L1220,32 Q1050,20 900,32 Q780,22 660,34 Q540,22 420,33 Q300,22 180,33 Q90,24 -20,34 Z"
              fill={`url(#${gradId})`}
              transform="translate(0,-2)"
            />
            {/* Main paper body */}
            <path
              filter={`url(#${filterId})`}
              d="M-20,60 L1220,60 L1220,32 Q1050,20 900,32 Q780,22 660,34 Q540,22 420,33 Q300,22 180,33 Q90,24 -20,34 Z"
              fill={paperColor}
            />
          </>
        )}
      </svg>
    </div>
  );
};
