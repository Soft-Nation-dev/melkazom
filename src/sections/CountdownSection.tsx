import React from 'react';
import { CountdownTimer } from '../components/CountdownTimer';

export const CountdownSection: React.FC = () => {
  return (
    <section className="floral-section floral-section--amber my-16 py-8">
      <CountdownTimer />
    </section>
  );
};
