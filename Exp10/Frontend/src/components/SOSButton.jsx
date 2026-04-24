/**
 * SOSButton.jsx — 3D animated emergency button
 */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Loader2, Wifi } from 'lucide-react';

const SOSButton = ({ onTrigger, loading = false }) => {
  return (
    <div className="sos-scene">
      {/* Outer radar rings */}
      {!loading && (
        <>
          <div className="sos-ring sos-ring-1" />
          <div className="sos-ring sos-ring-2" />
          <div className="sos-ring sos-ring-3" />
        </>
      )}

      {/* Radar sweep overlay */}
      {!loading && (
        <div className="sos-radar">
          <div className="sos-radar-sweep" />
          {/* Cross-hairs */}
          <div className="sos-crosshair sos-ch-h" />
          <div className="sos-crosshair sos-ch-v" />
        </div>
      )}

      {/* Main button */}
      <motion.button
        id="sos-trigger-btn"
        className={`sos-btn${loading ? ' sos-btn--busy' : ''}`}
        onClick={!loading ? onTrigger : undefined}
        disabled={loading}
        aria-label="Trigger SOS Alert"
        aria-busy={loading}
        animate={loading
          ? { scale: [1, 1.02, 1] }
          : { scale: [1, 1.025, 1] }
        }
        transition={{ duration: loading ? 0.6 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={!loading ? { scale: 1.07 } : {}}
        whileTap={!loading ? { scale: 0.93 } : {}}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 3D top face shine */}
        <div className="sos-shine" />

        {/* Button content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="sos-content"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
              >
                <Loader2 size={44} strokeWidth={2} />
              </motion.div>
              <span className="sos-label">SENDING</span>
              <span className="sos-sublabel">Transmitting...</span>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              className="sos-content"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <div className="sos-icon-wrap">
                <Radio size={42} strokeWidth={2} style={{ animation: 'heartbeat 2.2s ease-in-out infinite' }} />
              </div>
              <span className="sos-label">SOS</span>
              <span className="sos-sublabel">TAP TO ALERT</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <style>{`
        .sos-scene {
          position: relative;
          width: 260px;
          height: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 600px;
        }

        /* ── Radar rings ── */
        .sos-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(229,62,62,0.4);
          animation: sosPulseRing 2.8s ease-out infinite;
          pointer-events: none;
        }
        .sos-ring-1 { width: 220px; height: 220px; animation-delay: 0s; }
        .sos-ring-2 { width: 220px; height: 220px; animation-delay: 0.9s; border-color: rgba(229,62,62,0.25); }
        .sos-ring-3 { width: 220px; height: 220px; animation-delay: 1.8s; border-color: rgba(229,62,62,0.15); }

        /* ── Radar overlay ── */
        .sos-radar {
          position: absolute;
          width: 205px;
          height: 205px;
          border-radius: 50%;
          pointer-events: none;
          overflow: hidden;
          border: 1px solid rgba(229,62,62,0.1);
        }
        .sos-radar-sweep {
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 50%;
          transform-origin: bottom left;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(229,62,62,0.15) 30deg,
            transparent 60deg
          );
          animation: radarSweep 3s linear infinite;
        }
        .sos-crosshair {
          position: absolute;
          background: rgba(229,62,62,0.12);
        }
        .sos-ch-h { width: 100%; height: 1px; top: 50%; left: 0; transform: translateY(-50%); }
        .sos-ch-v { width: 1px; height: 100%; left: 50%; top: 0; transform: translateX(-50%); }

        /* ── Main button ── */
        .sos-btn {
          position: relative;
          z-index: 2;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transform-style: preserve-3d;

          /* 3D layered gradient */
          background:
            radial-gradient(circle at 38% 32%, rgba(255,255,255,0.22) 0%, transparent 45%),
            radial-gradient(circle at 60% 72%, rgba(0,0,0,0.25) 0%, transparent 50%),
            linear-gradient(145deg, #f56565, #e53e3e 40%, #c53030 70%, #822727);

          /* Deep 3D shadow */
          box-shadow:
            0 0 0 6px rgba(229,62,62,0.15),
            0 0 0 12px rgba(229,62,62,0.06),
            0 8px 0 rgba(100,10,10,0.9),
            0 12px 24px rgba(0,0,0,0.7),
            0 0 40px rgba(229,62,62,0.5),
            0 0 80px rgba(229,62,62,0.2),
            inset 0 -6px 12px rgba(0,0,0,0.4),
            inset 0 4px 8px rgba(255,255,255,0.15);

          animation: sosGlow 3s ease-in-out infinite;
          transition: box-shadow 0.25s ease;
        }

        .sos-btn:hover:not(:disabled) {
          box-shadow:
            0 0 0 8px rgba(229,62,62,0.2),
            0 0 0 16px rgba(229,62,62,0.08),
            0 10px 0 rgba(100,10,10,0.9),
            0 14px 28px rgba(0,0,0,0.8),
            0 0 60px rgba(229,62,62,0.7),
            0 0 120px rgba(229,62,62,0.35),
            inset 0 -6px 12px rgba(0,0,0,0.4),
            inset 0 4px 8px rgba(255,255,255,0.2);
        }

        .sos-btn--busy {
          animation: sosBreath 0.6s ease-in-out infinite;
          box-shadow:
            0 0 0 4px rgba(229,62,62,0.1),
            0 6px 0 rgba(100,10,10,0.8),
            0 10px 20px rgba(0,0,0,0.6),
            0 0 30px rgba(229,62,62,0.35),
            inset 0 -4px 8px rgba(0,0,0,0.35),
            inset 0 3px 6px rgba(255,255,255,0.1);
        }

        /* ── Shine overlay (3D top highlight) ── */
        .sos-shine {
          position: absolute;
          top: 12%;
          left: 18%;
          width: 48%;
          height: 36%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255,255,255,0.35) 0%,
            rgba(255,255,255,0.10) 50%,
            transparent 100%
          );
          transform: rotate(-25deg);
          pointer-events: none;
        }

        /* ── Content ── */
        .sos-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: white;
          position: relative;
          z-index: 1;
          height: 100%;
        }

        .sos-icon-wrap {
          display: flex;
          align-items: center;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
        }

        .sos-label {
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-shadow:
            0 2px 4px rgba(0,0,0,0.5),
            0 0 20px rgba(255,255,255,0.2);
          line-height: 1;
        }

        .sos-sublabel {
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
        }

        @media (max-width: 480px) {
          .sos-scene  { width: 220px; height: 220px; }
          .sos-btn    { width: 170px; height: 170px; }
          .sos-radar  { width: 170px; height: 170px; }
          .sos-ring-1, .sos-ring-2, .sos-ring-3 { width: 185px; height: 185px; }
          .sos-label  { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
};

export default SOSButton;
