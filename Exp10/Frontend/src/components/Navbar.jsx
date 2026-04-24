/**
 * Navbar.jsx — Premium top navigation bar
 */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ShieldAlert, LogOut, Radio } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.header
      className="nav-root"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <motion.div
            className="nav-logo"
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <ShieldAlert size={20} strokeWidth={2.5} />
          </motion.div>
          <div className="nav-brand-text">
            <span className="nav-name">SOS Alert</span>
            <span className="nav-sub">Emergency System</span>
          </div>
        </Link>

        {/* Right side */}
        <div className="nav-right">
          {isAuthenticated && (
            <>
              {/* Live indicator */}
              <div className="nav-live">
                <span className="nav-live-dot" />
                <span>LIVE</span>
              </div>

              <motion.button
                className="nav-logout"
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <LogOut size={15} strokeWidth={2.5} />
                <span>Sign Out</span>
              </motion.button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .nav-root {
          position: sticky;
          top: 0;
          z-index: var(--z-nav);
          border-bottom: 1px solid var(--border);
          background: rgba(5,5,10,0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
        }

        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 var(--space-8);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          color: inherit;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-logo {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(229,62,62,0.2), rgba(229,62,62,0.06));
          border: 1px solid var(--primary-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          box-shadow: 0 0 16px rgba(229,62,62,0.15);
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .nav-brand:hover .nav-logo {
          box-shadow: 0 0 24px rgba(229,62,62,0.3);
          border-color: rgba(229,62,62,0.45);
        }

        .nav-brand-text {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .nav-name {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .nav-sub {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          line-height: 1.2;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .nav-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #4ade80;
          padding: 4px 10px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius-full);
        }

        .nav-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
        }
        .nav-live-dot::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: #4ade80;
          opacity: 0.3;
          animation: statusPing 1.5s ease-in-out infinite;
        }

        .nav-logout {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(229,62,62,0.06);
          border: 1px solid rgba(229,62,62,0.18);
          border-radius: var(--radius-lg);
          color: rgba(229,62,62,0.85);
          font-size: var(--text-sm);
          font-weight: 600;
          padding: var(--space-2) var(--space-4);
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
        }
        .nav-logout:hover {
          background: rgba(229,62,62,0.12);
          border-color: rgba(229,62,62,0.35);
          color: var(--primary-light);
          box-shadow: 0 0 16px rgba(229,62,62,0.15);
        }

        @media (max-width: 640px) {
          .nav-inner { padding: 0 var(--space-5); height: 56px; }
          .nav-sub { display: none; }
          .nav-live span:last-child { display: none; }
          .nav-logout span { display: none; }
          .nav-logout { padding: var(--space-2) var(--space-3); }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
