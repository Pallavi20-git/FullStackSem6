/**
 * DashboardPage.jsx — Advanced command center dashboard
 */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ShieldCheck, Activity, Clock, Radio, Zap, AlertOctagon, BarChart3 } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { triggerSOS, fetchAlerts } from '../services/api';
import { useToast, ToastContainer } from '../components/Toast';
import SOSButton from '../components/SOSButton';
import AlertCard from '../components/AlertCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import Navbar from '../components/Navbar';

/* ── System Status Panel ── */
const SystemStatus = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <motion.div
      className="sys-status"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Online indicator */}
      <div className="sys-item sys-online">
        <span className="sys-ping" />
        <span className="sys-online-label">SYSTEM ONLINE</span>
      </div>

      <div className="sys-divider" />

      {/* Stats */}
      <div className="sys-item">
        <Radio size={13} strokeWidth={2.5} />
        <span>Ready to broadcast</span>
      </div>

      <div className="sys-divider" />

      {/* Live clock */}
      <div className="sys-item sys-clock">
        <Clock size={13} strokeWidth={2.5} />
        <span className="sys-time">{timeStr}</span>
      </div>

      <style>{`
        .sys-status {
          display: inline-flex;
          align-items: center;
          gap: var(--space-4);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-full);
          padding: var(--space-2) var(--space-5);
          flex-wrap: wrap;
          justify-content: center;
        }

        .sys-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          text-transform: uppercase;
          white-space: nowrap;
        }

        .sys-online {
          color: #4ade80;
        }

        .sys-ping {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          position: relative;
          flex-shrink: 0;
          box-shadow: 0 0 6px #4ade80;
        }
        .sys-ping::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1.5px solid #4ade80;
          opacity: 0.5;
          animation: statusPing 1.5s ease-in-out infinite;
        }

        .sys-online-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .sys-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .sys-clock { color: var(--text-secondary); }

        .sys-time {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          text-transform: none;
        }

        @media (max-width: 600px) {
          .sys-item:not(.sys-online):not(.sys-clock) { display: none; }
          .sys-divider:last-of-type { display: none; }
        }
      `}</style>
    </motion.div>
  );
};

/* ── Stat Card ── */
const StatCard = ({ icon: Icon, value, label, color = 'var(--primary)', delay = 0 }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.19, 1, 0.22, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
  >
    <div className="stat-icon" style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
      <Icon size={18} strokeWidth={2} />
    </div>
    <div className="stat-text">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>

    <style>{`
      .stat-card {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        background: linear-gradient(135deg, rgba(17,17,32,0.8), rgba(12,12,20,0.6));
        border: 1px solid var(--border-card);
        border-radius: var(--radius-xl);
        padding: var(--space-5) var(--space-6);
        cursor: default;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .stat-card:hover {
        border-color: rgba(255,255,255,0.1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      }
      .stat-icon {
        width: 44px; height: 44px;
        border-radius: var(--radius-lg);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .stat-text { display: flex; flex-direction: column; gap: 2px; }
      .stat-value {
        font-size: var(--text-2xl); font-weight: 800;
        color: var(--text-primary); letter-spacing: -0.03em; line-height: 1;
      }
      .stat-label { font-size: var(--text-xs); color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
    `}</style>
  </motion.div>
);

/* ── Main Dashboard ── */
const DashboardPage = () => {
  const { token, logout } = useAuth();
  const { toasts, addToast, removeToast } = useToast();

  const [sosLoading, setSosLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [alertsError, setAlertsError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [sosCount, setSosCount] = useState(0);

  const loadAlerts = useCallback(async (showToast = false) => {
    setAlertsLoading(true);
    setAlertsError(null);
    try {
      const data = await fetchAlerts(token);
      setAlerts(data);
      setSosCount(data.length);
      setLastFetched(new Date());
      if (showToast) addToast('Alert history refreshed.', 'success');
    } catch (err) {
      if (err.code === 'AUTH_EXPIRED') {
        addToast('Session expired. Logging out...', 'error');
        setTimeout(logout, 1500);
        return;
      }
      setAlertsError(err.message || 'Failed to load alerts.');
    } finally {
      setAlertsLoading(false);
    }
  }, [token, logout, addToast]);

  useEffect(() => {
    loadAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSOS = async () => {
    setSosLoading(true);
    try {
      await triggerSOS(token);
      addToast('🚨 SOS Alert dispatched successfully!', 'success');
      await loadAlerts();
    } catch (err) {
      if (err.code === 'AUTH_EXPIRED') {
        addToast('Session expired. Logging out...', 'error');
        setTimeout(logout, 1500);
        return;
      }
      addToast(err.message || 'Failed to send SOS. Try again.', 'error');
    } finally {
      setSosLoading(false);
    }
  };

  const handleRefresh = () => loadAlerts(true);

  const formatTime = (d) => d
    ? d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  return (
    <div className="db-page">
      <div className="bg-grid" />
      <div className="bg-aurora"><div className="aurora-3" /></div>

      <Navbar />

      <main className="db-main content-layer">

        {/* ── Hero SOS Section ── */}
        <section className="db-hero">

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="db-status-row"
          >
            <SystemStatus />
          </motion.div>

          {/* Hero title */}
          <motion.div
            className="db-hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <h1 className="db-hero-title">
              Emergency<br />
              <span className="text-gradient">Command Center</span>
            </h1>
            <p className="db-hero-sub">
              Activate emergency services instantly with one press. Your location and identity are securely transmitted.
            </p>
          </motion.div>

          {/* SOS Button — centrepiece */}
          <motion.div
            className="db-sos-stage"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <SOSButton onTrigger={handleSOS} loading={sosLoading} />
          </motion.div>

          {/* Hint */}
          <motion.p
            className="db-sos-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {sosLoading ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ color: 'var(--primary-light)' }}
                >
                  ⚡ Transmitting emergency alert to services...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Press once to dispatch an emergency alert
                </motion.span>
              )}
            </AnimatePresence>
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="db-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <StatCard
              icon={AlertOctagon}
              value={alertsLoading ? '—' : sosCount}
              label="Total Alerts"
              color="var(--primary)"
              delay={0.4}
            />
            <StatCard
              icon={ShieldCheck}
              value="SECURE"
              label="Connection"
              color="#22c55e"
              delay={0.45}
            />
            <StatCard
              icon={Zap}
              value="< 1s"
              label="Dispatch Time"
              color="#f59e0b"
              delay={0.5}
            />
          </motion.div>
        </section>

        {/* ── Gradient Divider ── */}
        <motion.div
          className="divider-glow"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* ── Alerts Section ── */}
        <motion.section
          className="db-alerts"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          {/* Header */}
          <div className="db-alerts-header">
            <div className="db-alerts-title-group">
              <div className="db-alerts-title-icon">
                <BarChart3 size={18} strokeWidth={2} />
              </div>
              <div>
                <h2 className="db-alerts-title">Alert History</h2>
                <p className="db-alerts-sub">Your dispatched SOS records</p>
              </div>
              {!alertsLoading && (
                <span className="badge badge-red">
                  {alerts.length} {alerts.length === 1 ? 'record' : 'records'}
                </span>
              )}
            </div>

            <div className="db-alerts-controls">
              {lastFetched && (
                <span className="db-last-sync">
                  <Clock size={12} />
                  Synced {formatTime(lastFetched)}
                </span>
              )}
              <motion.button
                className="btn btn-ghost"
                style={{ gap: 'var(--space-2)', fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }}
                onClick={handleRefresh}
                disabled={alertsLoading}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Refresh alerts"
              >
                <motion.span
                  animate={alertsLoading ? { rotate: 360 } : { rotate: 0 }}
                  transition={alertsLoading
                    ? { duration: 0.8, ease: 'linear', repeat: Infinity }
                    : { duration: 0 }
                  }
                  style={{ display: 'inline-flex' }}
                >
                  <RefreshCw size={14} />
                </motion.span>
                Refresh
              </motion.button>
            </div>
          </div>

          {/* Alerts panel */}
          <div className="db-alerts-panel">
            {alertsLoading ? (
              <Loader label="Fetching alert records..." />
            ) : alertsError ? (
              <div className="db-alerts-error" role="alert">
                <AlertOctagon size={22} />
                <div>
                  <p className="db-error-title">Couldn't load alerts</p>
                  <p className="db-error-msg">{alertsError}</p>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)' }} onClick={handleRefresh}>
                  Retry
                </button>
              </div>
            ) : alerts.length === 0 ? (
              <EmptyState
                title="No alerts dispatched yet"
                description="Press the SOS button above to send your first emergency alert. All records appear here."
              />
            ) : (
              <div className="db-alerts-list">
                <AnimatePresence>
                  {[...alerts].reverse().map((alert, i) => (
                    <AlertCard
                      key={alert.id ?? alert.alertId ?? i}
                      alert={alert}
                      index={i}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.section>

      </main>

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <style>{`
        .db-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .db-main {
          flex: 1;
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          padding: var(--space-12) var(--space-8) var(--space-20);
          display: flex;
          flex-direction: column;
          gap: var(--space-12);
        }

        /* ── Hero ── */
        .db-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-8);
          text-align: center;
        }

        .db-status-row {
          display: flex;
          justify-content: center;
        }

        .db-hero-copy {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          align-items: center;
        }

        .db-hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .db-hero-sub {
          font-size: var(--text-base);
          color: var(--text-muted);
          max-width: 480px;
          line-height: 1.7;
        }

        .db-sos-stage {
          padding: var(--space-6) 0;
          display: flex;
          justify-content: center;
        }

        .db-sos-hint {
          font-size: var(--text-sm);
          color: var(--text-muted);
          min-height: 1.5em;
          display: flex;
          align-items: center;
        }

        /* ── Stats ── */
        .db-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          width: 100%;
          max-width: 640px;
        }

        /* ── Alerts section ── */
        .db-alerts {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .db-alerts-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6);
          flex-wrap: wrap;
        }

        .db-alerts-title-group {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .db-alerts-title-icon {
          width: 40px; height: 40px;
          border-radius: var(--radius-lg);
          background: var(--primary-dim);
          border: 1px solid var(--primary-border);
          display: flex; align-items: center; justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .db-alerts-title {
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .db-alerts-sub {
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-top: 2px;
        }

        .db-alerts-controls {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .db-last-sync {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        /* ── Alerts panel ── */
        .db-alerts-panel {
          background: linear-gradient(135deg, rgba(12,12,20,0.8), rgba(8,8,16,0.6));
          border: 1px solid var(--border-card);
          border-radius: var(--radius-2xl);
          min-height: 220px;
          overflow: hidden;
          box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.03);
        }

        .db-alerts-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-5);
        }

        .db-alerts-error {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-8);
          color: var(--danger);
        }

        .db-error-title {
          font-size: var(--text-sm); font-weight: 600;
          color: var(--text-primary); margin-bottom: var(--space-1);
        }
        .db-error-msg {
          font-size: var(--text-sm); color: var(--text-muted);
        }

        /* ── Responsive ── */
        @media (max-width: 700px) {
          .db-main { padding: var(--space-8) var(--space-5) var(--space-16); gap: var(--space-10); }
          .db-stats { grid-template-columns: repeat(3, 1fr); gap: var(--space-3); max-width: 100%; }
          .db-alerts-header { flex-direction: column; align-items: flex-start; gap: var(--space-4); }
          .db-last-sync { display: none; }
        }

        @media (max-width: 480px) {
          .db-stats { grid-template-columns: 1fr; max-width: 320px; }
          .db-hero-sub { font-size: var(--text-sm); }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
