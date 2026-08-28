import type { FC } from 'react';

interface LoadingScreenProps {
  isLeaving: boolean;
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ isLeaving }) => (
  <div
    className={`invitation-loader ${isLeaving ? 'is-leaving' : ''}`}
    role="status"
    aria-live="polite"
    aria-label="Preparing the Melkazom 2027 wedding invitation"
  >
    <div className="invitation-loader__wash" aria-hidden="true" />
    <div className="invitation-loader__content">
      <p className="invitation-loader__eyebrow">The wedding invitation of</p>
      <div className="invitation-loader__monogram" aria-hidden="true">
        <span>M</span>
        <i />
        <span>Z</span>
      </div>
      <h1>Melkazom</h1>
      <p className="invitation-loader__year">2027</p>
      <div className="invitation-loader__line" aria-hidden="true">
        <i />
        <b>✦</b>
        <i />
      </div>
      <p className="invitation-loader__message">Preparing your invitation</p>
    </div>
  </div>
);
