/**
 * AlertCard.jsx — Premium alert card with 3D hover tilt
 */
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Hash, Zap } from 'lucide-react';

const formatTimestamp = (raw) => {
  if (!raw) return '—';
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    return d.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  } catch { return String(raw); }
};

const AlertCard = ({ alert, index = 0 }) => {
  const id        = alert?.id ?? alert?.alertId ?? null;
  const message   = alert?.message ?? alert?.msg ?? alert?.description ?? 'SOS Alert Triggered';
  const timestamp = alert?.timestamp ?? alert?.createdAt ?? alert?.alertTime ?? alert?.created_at;

  return (
    <motion.article
      className="ac-root"
      initial={{ opacity: 0, x: -20, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.065, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Left accent bar */}
      <div className="ac-bar" />

      {/* Content */}
      <div className="ac-body">
        {/* Top row */}
        <div className="ac-top">
          <div className="ac-badge">
            <Zap size={11} strokeWidth={3} />
            SOS ALERT
          </div>
          {id !== null && (
            <span className="ac-id">
              <Hash size={11} />
              {String(id).padStart(4, '0')}
            </span>
          )}
        </div>

        {/* Message */}
        <p className="ac-message">{message}</p>

        {/* Timestamp */}
        <div className="ac-footer">
          <Clock size={12} strokeWidth={2} />
          <span>{formatTimestamp(timestamp)}</span>
        </div>
      </div>

      {/* Right icon */}
      <div className="ac-icon">
        <AlertTriangle size={20} strokeWidth={2} />
      </div>

      <style>{`
        .ac-root {
          display: flex;
          align-items: stretch;
          background: linear-gradient(
            135deg,
            rgba(17, 17, 32, 0.9) 0%,
            rgba(22, 22, 40, 0.7) 100%
          );
          border: 1px solid rgba(255,255,255,0.06);
          border-left: none;
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.35);
          cursor: default;
        }
        .ac-root:hover {
          background: linear-gradient(
            135deg,
            rgba(22, 22, 40, 0.95) 0%,
            rgba(28, 28, 50, 0.8) 100%
          );
          border-color: rgba(229,62,62,0.15);
          box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(229,62,62,0.08);
        }

        .ac-bar {
          width: 4px;
          flex-shrink: 0;
          background: linear-gradient(
            to bottom,
            var(--primary) 0%,
            #9b2c2c 100%
          );
          border-radius: var(--radius-sm) 0 0 var(--radius-sm);
          box-shadow: 2px 0 12px rgba(229,62,62,0.3);
        }

        .ac-body {
          flex: 1;
          padding: var(--space-4) var(--space-5);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          min-width: 0;
        }

        .ac-top {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .ac-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--primary-light);
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          border-radius: var(--radius-full);
          padding: 3px 8px;
        }

        .ac-id {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-weight: 500;
          margin-left: auto;
        }

        .ac-message {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.55;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ac-footer {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .ac-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          flex-shrink: 0;
          color: rgba(229,62,62,0.25);
          transition: color 0.2s ease;
        }
        .ac-root:hover .ac-icon { color: rgba(229,62,62,0.45); }

        @media (max-width: 480px) {
          .ac-body { padding: var(--space-3) var(--space-4); }
          .ac-icon  { width: 40px; }
          .ac-message { font-size: var(--text-xs); }
        }
      `}</style>
    </motion.article>
  );
};

export default AlertCard;
