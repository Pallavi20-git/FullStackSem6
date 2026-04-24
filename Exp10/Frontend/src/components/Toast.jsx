/**
 * Toast.jsx — Premium toast notification system
 */
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';

const CONFIGS = {
  success: {
    icon: CheckCircle2,
    bg: 'linear-gradient(135deg, rgba(22,163,74,0.15), rgba(22,163,74,0.08))',
    border: 'rgba(34,197,94,0.3)',
    text: '#86efac',
    glow: 'rgba(34,197,94,0.2)',
  },
  error: {
    icon: XCircle,
    bg: 'linear-gradient(135deg, rgba(229,62,62,0.15), rgba(229,62,62,0.08))',
    border: 'rgba(229,62,62,0.3)',
    text: '#fca5a5',
    glow: 'rgba(229,62,62,0.2)',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))',
    border: 'rgba(245,158,11,0.3)',
    text: '#fcd34d',
    glow: 'rgba(245,158,11,0.15)',
  },
};

const Toast = ({ message, type = 'success', onClose, duration = 4500 }) => {
  const [progress, setProgress] = useState(100);
  const cfg = CONFIGS[type] || CONFIGS.success;
  const Icon = cfg.icon;

  useEffect(() => {
    if (!duration) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(tick);
        onClose();
      }
    }, 50);
    return () => clearInterval(tick);
  }, [duration, onClose]);

  return (
    <motion.div
      className="toast-root"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${cfg.glow}`,
      }}
      initial={{ opacity: 0, x: 80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      role="alert"
    >
      <div className="toast-icon">
        <Icon size={18} strokeWidth={2} />
      </div>
      <p className="toast-msg">{message}</p>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Dismiss"
        style={{ color: cfg.text }}
      >
        <X size={15} />
      </button>

      {/* Progress bar */}
      <div className="toast-bar-track">
        <motion.div
          className="toast-bar"
          style={{ background: cfg.text, width: `${progress}%` }}
        />
      </div>

      <style>{`
        .toast-root {
          position: relative;
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-5);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          min-width: 300px;
          max-width: 420px;
          overflow: hidden;
        }

        .toast-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          opacity: 0.9;
        }

        .toast-msg {
          flex: 1;
          font-size: var(--text-sm);
          font-weight: 500;
          line-height: 1.45;
        }

        .toast-close {
          flex-shrink: 0;
          background: transparent;
          border: none;
          padding: 4px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          opacity: 0.6;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }
        .toast-close:hover { opacity: 1; }

        .toast-bar-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255,255,255,0.08);
        }

        .toast-bar {
          height: 100%;
          border-radius: 0 var(--radius-full) var(--radius-full) 0;
          opacity: 0.7;
          transition: width 0.05s linear;
        }

        @media (max-width: 480px) {
          .toast-root { min-width: unset; max-width: 100%; border-radius: var(--radius-lg); }
        }
      `}</style>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => (
  <div className="toast-container">
    <AnimatePresence>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </AnimatePresence>

    <style>{`
      .toast-container {
        position: fixed;
        bottom: var(--space-8);
        right: var(--space-8);
        z-index: var(--z-toast);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        align-items: flex-end;
        pointer-events: none;
      }
      .toast-container > * { pointer-events: all; }

      @media (max-width: 480px) {
        .toast-container {
          bottom: var(--space-5);
          right: var(--space-4);
          left: var(--space-4);
          align-items: stretch;
        }
      }
    `}</style>
  </div>
);

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

export default Toast;
