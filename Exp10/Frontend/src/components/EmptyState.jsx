/**
 * EmptyState.jsx — Premium empty state
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BellOff } from 'lucide-react';

const EmptyState = ({
  title = 'No alerts yet',
  description = 'When you trigger an SOS alert, it will appear here.',
}) => (
  <motion.div
    className="es-root"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
  >
    {/* Animated icon */}
    <motion.div
      className="es-icon-wrap"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="es-icon-ring es-ring-outer" />
      <div className="es-icon-ring es-ring-inner" />
      <div className="es-icon">
        <BellOff size={28} strokeWidth={1.5} />
      </div>
    </motion.div>

    <div className="es-text">
      <h3 className="es-title">{title}</h3>
      <p className="es-desc">{description}</p>
    </div>

    <style>{`
      .es-root {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-6);
        padding: var(--space-16) var(--space-8);
        text-align: center;
      }

      .es-icon-wrap {
        position: relative;
        width: 96px;
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .es-icon-ring {
        position: absolute;
        border-radius: 50%;
        border: 1px dashed rgba(255,255,255,0.08);
      }
      .es-ring-outer {
        inset: 0;
        animation: spin 20s linear infinite;
      }
      .es-ring-inner {
        inset: 8px;
        animation: spin 12s linear infinite reverse;
        border-color: rgba(229,62,62,0.1);
      }

      .es-icon {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(17,17,32,0.9), rgba(22,22,40,0.6));
        border: 1px solid rgba(255,255,255,0.06);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        box-shadow: 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04);
        position: relative;
        z-index: 1;
      }

      .es-text {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .es-title {
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--text-secondary);
        letter-spacing: -0.01em;
      }

      .es-desc {
        font-size: var(--text-sm);
        color: var(--text-muted);
        max-width: 320px;
        line-height: 1.65;
      }
    `}</style>
  </motion.div>
);

export default EmptyState;
