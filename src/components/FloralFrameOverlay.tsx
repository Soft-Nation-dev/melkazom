import floralFrame from '../assets/images/floral-frame.jpg';

/**
 * A quiet botanical frame keeps the post-opening invitation in the same
 * visual language as the extracted reference screens. It lives behind the
 * document rather than becoming another floating UI layer.
 */
export const FloralFrameOverlay = () => (
  <div aria-hidden="true" className="reference-floral-frame">
    <img src={floralFrame} alt="" width={768} height={1365} decoding="async" />
  </div>
);
