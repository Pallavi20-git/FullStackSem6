/**
 * Loader.jsx — Premium spinner
 */
import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ size = 40, label = 'Loading...' }) => (
  <div className="ld-wrap" role="status" aria-label={label}>
    <div className="ld-ring-container" style={{ width: size, height: size }}>
      <motion.div
        className="ld-ring ld-outer"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        className="ld-ring ld-inner"
        style={{ width: size * 0.65, height: size * 0.65 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
      />
      <div className="ld-dot" style={{ width: size * 0.18, height: size * 0.18 }} />
    </div>
    {label && <span className="ld-label">{label}</span>}

    <style>{`
      .ld-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        padding: var(--space-12);
      }

      .ld-ring-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ld-ring {
        position: absolute;
        border-radius: 50%;
        border: 2px solid transparent;
        flex-shrink: 0;
      }

      .ld-outer {
        border-top-color: var(--primary);
        border-right-color: rgba(229,62,62,0.3);
        box-shadow: 0 0 16px rgba(229,62,62,0.25);
      }

      .ld-inner {
        border-bottom-color: rgba(229,62,62,0.6);
        border-left-color: rgba(229,62,62,0.2);
      }

      .ld-dot {
        border-radius: 50%;
        background: var(--primary);
        box-shadow: 0 0 8px rgba(229,62,62,0.6);
        animation: sosBreath 1s ease-in-out infinite;
      }

      .ld-label {
        font-size: var(--text-sm);
        color: var(--text-muted);
        font-weight: 500;
      }
    `}</style>
  </div>
);

export default Loader;
