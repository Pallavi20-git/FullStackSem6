/**
 * NotFoundPage.jsx — Premium 404 page
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOff, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="nf-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-grid" />
      <div className="bg-aurora"><div className="aurora-3" /></div>

      <div className="nf-content content-layer">
        {/* Animated icon */}
        <motion.div
          className="nf-icon"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <ShieldOff size={56} strokeWidth={1.2} />
        </motion.div>

        {/* 404 number */}
        <motion.h1
          className="nf-code text-gradient-red"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          404
        </motion.h1>

        <motion.div
          className="nf-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="nf-title">Page Not Found</h2>
          <p className="nf-desc">
            This page doesn't exist or you don't have access. Navigate back to safety.
          </p>
        </motion.div>

        <motion.div
          className="nf-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            className="btn btn-primary"
            style={{ padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-xl)' }}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home size={18} />
            Go Home
          </motion.button>
          <motion.button
            className="btn btn-ghost"
            style={{ padding: 'var(--space-4) var(--space-6)', fontSize: 'var(--text-base)', borderRadius: 'var(--radius-xl)' }}
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .nf-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .nf-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-6);
          text-align: center;
          padding: var(--space-12) var(--space-8);
        }

        .nf-icon {
          color: rgba(229,62,62,0.5);
          filter: drop-shadow(0 0 20px rgba(229,62,62,0.3));
          margin-bottom: var(--space-4);
        }

        .nf-code {
          font-size: 7rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.06em;
        }

        .nf-text {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .nf-title {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .nf-desc {
          font-size: var(--text-base);
          color: var(--text-muted);
          max-width: 400px;
          line-height: 1.7;
        }

        .nf-actions {
          display: flex;
          gap: var(--space-4);
          margin-top: var(--space-4);
          flex-wrap: wrap;
          justify-content: center;
        }

        @media (max-width: 480px) {
          .nf-code { font-size: 5rem; }
          .nf-title { font-size: var(--text-2xl); }
        }
      `}</style>
    </motion.div>
  );
};

export default NotFoundPage;
