
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed.');
      }

      // Temporary session-based token storage.
      sessionStorage.setItem('adminToken', data.token);

      navigate('/admin', { replace: true });

    } catch (error) {
      setError(
        error.message === 'Failed to fetch'
          ? 'Unable to connect to the server. Please try again.'
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <div className="admin-login__card">

        <Link to="/" className="admin-login__brand">
          <span className="admin-login__brand-icon">A.</span>
          <span>
            PORTFOLIO<span className="admin-login__dot">.</span>
          </span>
        </Link>

        <div className="admin-login__heading">
          <span className="admin-login__eyebrow">
            PRIVATE ACCESS
          </span>

          <h1>Welcome back.</h1>

          <p>
            Sign in to manage your portfolio and projects.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login__form">

          <div className="admin-login__field">
            <label htmlFor="admin-email">Email address</label>

            <input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="admin-password">Password</label>

            <div className="admin-login__password">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="admin-login__toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {error && (
            <p className="admin-login__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login__submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
            {!loading && <span aria-hidden="true">→</span>}
          </button>

        </form>

        <div className="admin-login__footer">
          <span className="admin-login__status-dot" />
          SECURE ADMIN ACCESS
        </div>

        <Link to="/" className="admin-login__back">
          ← Back to portfolio
        </Link>

      </div>
    </main>
  );
}

export default AdminLogin;
