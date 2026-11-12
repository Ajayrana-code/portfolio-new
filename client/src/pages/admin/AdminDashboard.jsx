
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function AdminDashboard() {
  const navigate = useNavigate();
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');

        const response = await fetch(`${API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setProjectCount(data.count ?? data.projects?.length ?? 0);
        }
      } catch (error) {
        console.error('Dashboard data error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-dashboard">

      <aside className="admin-sidebar">

        <Link to="/" className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">A.</span>
          <span>ADMIN PANEL</span>
        </Link>

        <div className="admin-sidebar__section">
          <span className="admin-sidebar__label">WORKSPACE</span>

          <div className="admin-sidebar__nav">
            <div className="admin-sidebar__item active">
              <span>▦</span>
              Overview
            </div>

            <div className="admin-sidebar__item">
              <span>◈</span>
              Projects
            </div>

            <div className="admin-sidebar__item">
              <span>✉</span>
              Messages
            </div>
          </div>
        </div>

        <div className="admin-sidebar__bottom">
          <Link to="/" className="admin-sidebar__portfolio">
            ↗ View Portfolio
          </Link>

          <button
            className="admin-sidebar__logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Sign Out
          </button>
        </div>

      </aside>

      <main className="admin-main">

        <header className="admin-header">
          <div>
            <span className="admin-header__eyebrow">
              WORKSPACE / OVERVIEW
            </span>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-header__status">
            <span />
            Admin session active
          </div>
        </header>

        <section className="admin-welcome">
          <span>YOUR PORTFOLIO WORKSPACE</span>
          <h2>Welcome back.</h2>
          <p>
            Manage your portfolio content and keep everything up to date.
          </p>
        </section>

        <section className="admin-stats">

          <article className="admin-stat-card">
            <div className="admin-stat-card__top">
              <span>Total Projects</span>
              <span className="admin-stat-card__icon">◈</span>
            </div>

            <strong>
              {loading ? '—' : projectCount}
            </strong>

            <p>Projects currently published</p>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-card__top">
              <span>Messages</span>
              <span className="admin-stat-card__icon">✉</span>
            </div>

            <strong>—</strong>
            <p>Message management coming next</p>
          </article>

        </section>

        <section className="admin-activity">
          <div>
            <span className="admin-activity__eyebrow">
              QUICK OVERVIEW
            </span>
            <h3>Your workspace is ready.</h3>
            <p>
              Project management and contact message management
              will be available here.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
