import React from 'react';

interface VintageHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const VintageHeading: React.FC<VintageHeadingProps> = ({ eyebrow, title, subtitle }) => {
  let characterIndex = 0;

  return (
    <div className="vintage-section-heading text-center">
      {eyebrow && <span className="vintage-eyebrow">{eyebrow}</span>}
      <h2 className="vintage-heading" aria-label={title}>
        {title.split(' ').map((word, wordIndex) => (
          <React.Fragment key={`${word}-${wordIndex}`}>
            <span className="vintage-word" aria-hidden="true">
              {Array.from(word).map((character) => {
                const delay = 120 + characterIndex * 34;
                characterIndex += 1;

                return (
                  <span
                    key={`${character}-${characterIndex}`}
                    className="vintage-letter"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
            {wordIndex < title.split(' ').length - 1 && ' '}
          </React.Fragment>
        ))}
      </h2>
      <div className="vintage-divider" aria-hidden="true">
        <i />
        <b>◆</b>
        <i />
      </div>
      {subtitle && <p className="vintage-subtitle">{subtitle}</p>}
    </div>
  );
};
