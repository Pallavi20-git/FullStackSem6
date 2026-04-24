/**
 * LoginPage.jsx — Premium auth page with 3D card
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Lock, ArrowRight, AlertCircle, Fingerprint } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { validateAuthForm, hasErrors } from '../utils/validation';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({ username: null, password: null });
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: null }));
    setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    const errors = validateAuthForm(form);
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    setLoading(true);
    try {
      const token = await loginUser(form);
      login(token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
  };

  return (
    <div className="auth-page">
      {/* Backgrounds */}
      <div className="bg-grid" />
      <div className="bg-aurora"><div className="aurora-3" /></div>

      {/* Centered layout */}
      <div className="auth-layout content-layer">

        {/* Left info panel */}
        <motion.div
          className="auth-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="auth-logo-wrap">
            <motion.div
              className="auth-logo"
              animate={{ boxShadow: ['0 0 20px rgba(229,62,62,0.3)', '0 0 40px rgba(229,62,62,0.6)', '0 0 20px rgba(229,62,62,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Shield size={32} strokeWidth={2} />
            </motion.div>
          </div>
          <h1 className="auth-hero-title">
            Emergency<br />
            <span className="text-gradient-red">Response</span><br />
            Awaits.
          </h1>
          <p className="auth-hero-desc">
            Access the real-time SOS alert dashboard. Respond faster. Save lives.
          </p>
          <div className="auth-features">
            {['Instant SOS dispatch', 'JWT-secured access', 'Real-time alert log'].map((f, i) => (
              <motion.div
                key={f}
                className="auth-feature-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                <div className="auth-feature-dot" />
                <span>{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right form card */}
        <motion.div
          className="auth-card glass-card"
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
          {/* Card header */}
          <motion.div
            className="auth-card-top"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="auth-card-icon" variants={itemVariants}>
              <Fingerprint size={22} strokeWidth={1.8} />
            </motion.div>
            <motion.h2 className="auth-card-title" variants={itemVariants}>
              Sign In
            </motion.h2>
            <motion.p className="auth-card-sub" variants={itemVariants}>
              Enter your credentials to access the dashboard
            </motion.p>
          </motion.div>

          {/* Server error */}
          {serverError && (
            <motion.div
              className="msg-banner error"
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: '1.5rem' }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{serverError}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Username */}
            <div className="input-group">
              <label className="input-label" htmlFor="l-username">Username</label>
              <div className="input-wrap">
                <span className="input-icon-left" style={{ color: focused === 'username' ? 'var(--primary)' : undefined }}>
                  <User size={17} strokeWidth={2} />
                </span>
                <input
                  id="l-username"
                  type="text"
                  name="username"
                  className={`input has-icon${fieldErrors.username ? ' error' : ''}`}
                  placeholder="Your username"
                  value={form.username}
                  onChange={handleChange}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                  autoComplete="username"
                  disabled={loading}
                  autoFocus
                />
              </div>
              {fieldErrors.username && (
                <span className="input-error-msg">
                  <AlertCircle size={12} />{fieldErrors.username}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label" htmlFor="l-password">Password</label>
              <div className="input-wrap">
                <span className="input-icon-left" style={{ color: focused === 'password' ? 'var(--primary)' : undefined }}>
                  <Lock size={17} strokeWidth={2} />
                </span>
                <input
                  id="l-password"
                  type="password"
                  name="password"
                  className={`input has-icon${fieldErrors.password ? ' error' : ''}`}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>
              {fieldErrors.password && (
                <span className="input-error-msg">
                  <AlertCircle size={12} />{fieldErrors.password}
                </span>
              )}
            </div>

            {/* Submit */}
            <motion.button
              id="login-submit-btn"
              type="submit"
              className="btn btn-primary auth-btn"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
            >
              {loading ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, ease: 'linear', repeat: Infinity }}
                    style={{ display: 'inline-flex' }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                  Authenticating...
                </>
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <span className="auth-footer-text">New to the system?</span>
            <Link to="/register" className="auth-footer-link">Create account →</Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }

        .auth-layout {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-16);
          padding: var(--space-12) var(--space-10);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Left panel ── */
        .auth-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          max-width: 420px;
        }

        .auth-logo-wrap {
          display: flex;
        }

        .auth-logo {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-xl);
          background: linear-gradient(145deg, rgba(229,62,62,0.2), rgba(229,62,62,0.05));
          border: 1px solid rgba(229,62,62,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .auth-hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .auth-hero-desc {
          font-size: var(--text-base);
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 360px;
        }

        .auth-features {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .auth-feature-item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-sm);
          color: var(--text-secondary);
          font-weight: 500;
        }

        .auth-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 8px rgba(229,62,62,0.5);
          flex-shrink: 0;
        }

        /* ── Right card ── */
        .auth-card {
          width: 100%;
          max-width: 440px;
          padding: var(--space-10);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .auth-card-top {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-8);
        }

        .auth-card-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          margin-bottom: var(--space-2);
        }

        .auth-card-title {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .auth-card-sub {
          font-size: var(--text-sm);
          color: var(--text-muted);
          line-height: 1.6;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-5);
        }

        .auth-btn {
          width: 100%;
          padding: var(--space-4);
          font-size: var(--text-base);
          margin-top: var(--space-3);
          border-radius: var(--radius-xl);
          letter-spacing: 0.01em;
        }

        .auth-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          margin-top: var(--space-8);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border);
        }

        .auth-footer-text {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .auth-footer-link {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--primary);
          transition: color 0.15s ease;
        }
        .auth-footer-link:hover { color: var(--primary-light); }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .auth-layout {
            flex-direction: column;
            gap: var(--space-10);
            padding: var(--space-10) var(--space-6);
            justify-content: flex-start;
            align-items: center;
            min-height: 100vh;
          }
          .auth-left {
            max-width: 100%;
            gap: var(--space-5);
            align-items: center;
            text-align: center;
          }
          .auth-logo-wrap { justify-content: center; }
          .auth-hero-title { font-size: 2.4rem; }
          .auth-features { align-items: center; }
          .auth-card { max-width: 480px; padding: var(--space-8); }
        }

        @media (max-width: 480px) {
          .auth-layout { padding: var(--space-8) var(--space-5); }
          .auth-hero-title { font-size: 2rem; }
          .auth-card { padding: var(--space-6); border-radius: var(--radius-xl); }
          .auth-card-top { margin-bottom: var(--space-6); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
