
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminMessages.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function AdminMessages() {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const selectedMessage = messages.find(
    (message) => message._id === selectedId
  );

  const newCount = messages.filter(
    (message) => message.status === 'new'
  ).length;

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError('');

      const token = sessionStorage.getItem('adminToken');

      const response = await fetch(`${API_URL}/api/contact/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load messages.');
      }

      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (status) => {
    if (!selectedMessage || updating) return;

    try {
      setUpdating(true);
      setError('');

      const token = sessionStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/contact/admin/${selectedMessage._id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to update status.');
      }

      setMessages((current) =>
        current.map((message) =>
          message._id === selectedMessage._id
            ? data.data
            : message
        )
      );
    } catch (err) {
      setError(err.message || 'Unable to update message.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage || updating) return;

    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this message?'
    );

    if (!confirmed) return;

    try {
      setUpdating(true);
      setError('');

      const token = sessionStorage.getItem('adminToken');

      const response = await fetch(
        `${API_URL}/api/contact/admin/${selectedMessage._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to delete message.');
      }

      setMessages((current) =>
        current.filter((message) => message._id !== selectedMessage._id)
      );

      setSelectedId(null);
    } catch (err) {
      setError(err.message || 'Unable to delete message.');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-dashboard messages-dashboard">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">A.</span>
          <span>ADMIN PANEL</span>
        </Link>

        <div className="admin-sidebar__section">
          <span className="admin-sidebar__label">WORKSPACE</span>

          <div className="admin-sidebar__nav">
            <Link
              to="/admin"
              className={`admin-sidebar__item ${
                location.pathname === '/admin' ? 'active' : ''
              }`}
            >
              <span>▦</span>
              Overview
            </Link>

            <Link
              to="/admin/projects"
              className={`admin-sidebar__item ${
                location.pathname.startsWith('/admin/projects')
                  ? 'active'
                  : ''
              }`}
            >
              <span>◈</span>
              Projects
            </Link>

            <Link
              to="/admin/messages"
              className={`admin-sidebar__item ${
                location.pathname === '/admin/messages' ? 'active' : ''
              }`}
            >
              <span>✉</span>
              Messages
            </Link>
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

      <main className="admin-main messages-main">
        <header className="admin-header">
          <div>
            <span className="admin-header__eyebrow">
              WORKSPACE / MESSAGES
            </span>
            <h1>Messages</h1>
          </div>

          <div className="admin-header__status">
            <span />
            Admin session active
          </div>
        </header>

        <section className="messages-intro">
          <div>
            <span className="admin-activity__eyebrow">
              YOUR INBOX
            </span>
            <h2>Contact messages</h2>
            <p>Manage and respond to messages received through your portfolio.</p>
          </div>

          <div className="messages-count">
            <strong>{messages.length}</strong>
            <span>Total messages</span>
            <small>{newCount} new</small>
          </div>
        </section>

        {error && (
          <div className="messages-error" role="alert">
            {error}
          </div>
        )}

        <section className="messages-layout">
          <div className="messages-list-panel">
            <div className="messages-panel-heading">
              <h3>Inbox</h3>
              <button
                type="button"
                onClick={fetchMessages}
                disabled={loading}
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
              <p className="messages-empty">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="messages-empty">
                No messages received yet.
              </p>
            ) : (
              <div className="messages-list">
                {messages.map((message) => (
                  <button
                    type="button"
                    key={message._id}
                    className={`message-list-item ${
                      selectedId === message._id ? 'selected' : ''
                    } ${message.status === 'new' ? 'unread' : ''}`}
                    onClick={() => setSelectedId(message._id)}
                  >
                    <div className="message-list-item__top">
                      <strong>{message.name}</strong>
                      <span className={`message-status ${message.status}`}>
                        {message.status}
                      </span>
                    </div>

                    <span className="message-list-item__subject">
                      {message.subject}
                    </span>

                    <span className="message-list-item__preview">
                      {message.message}
                    </span>

                    <time>{formatDate(message.createdAt)}</time>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="messages-detail-panel">
            {!selectedMessage ? (
              <div className="messages-detail-empty">
                <span>✉</span>
                <h3>Select a message</h3>
                <p>Choose a message from your inbox to view its details.</p>
              </div>
            ) : (
              <article className="message-detail">
                <div className="message-detail__top">
                  <span className="admin-activity__eyebrow">
                    MESSAGE DETAILS
                  </span>

                  <span className={`message-status ${selectedMessage.status}`}>
                    {selectedMessage.status}
                  </span>
                </div>

                <h2>{selectedMessage.subject}</h2>

                <div className="message-sender">
                  <div className="message-sender__avatar">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{selectedMessage.name}</strong>
                    <a href={`mailto:${selectedMessage.email}`}>
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>

                <div className="message-detail__date">
                  Received {formatDate(selectedMessage.createdAt)}
                </div>

                <div className="message-detail__body">
                  {selectedMessage.message}
                </div>

                <div className="message-detail__actions">
                  <span>UPDATE STATUS</span>

                  <div className="message-status-actions">
                    <button
                      type="button"
                      disabled={updating || selectedMessage.status === 'new'}
                      onClick={() => handleStatusChange('new')}
                    >
                      Mark new
                    </button>

                    <button
                      type="button"
                      disabled={updating || selectedMessage.status === 'read'}
                      onClick={() => handleStatusChange('read')}
                    >
                      Mark read
                    </button>

                    <button
                      type="button"
                      disabled={updating || selectedMessage.status === 'replied'}
                      onClick={() => handleStatusChange('replied')}
                    >
                      Mark replied
                    </button>
                  </div>

                    <a
                    className="message-reply-link"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        selectedMessage.email
                    )}&su=${encodeURIComponent(
                        `Re: ${selectedMessage.subject}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    ↗ Reply using Gmail
                    </a>

                  <button
                    type="button"
                    className="message-delete-button"
                    disabled={updating}
                    onClick={handleDelete}
                  >
                    Delete message
                  </button>
                </div>
              </article>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminMessages;
