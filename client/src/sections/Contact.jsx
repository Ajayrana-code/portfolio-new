
import { useState } from 'react';
import './Contact.css';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value
    }));

    if (status) setStatus('');
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('Sending your message...');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.errors?.join(', ') || data.message;
        throw new Error(errorMessage || 'Something went wrong.');
      }

      setStatus(data.message || 'Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);

      setStatus(
        error.message ||
        'Unable to send your message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="contact__container container">

        <div className="contact__header">
          <p className="contact__eyebrow">
            <span />
            GET IN TOUCH
          </p>

          <h2 className="contact__heading">
            Have an idea?
            <br />
            <span>Let's talk.</span>
          </h2>

          <p className="contact__intro">
            Have a project in mind, an opportunity to discuss,
            or simply want to connect? I'd love to hear from you.
          </p>
        </div>

        <div className="contact__layout">

          <div className="contact__info">
            <span className="contact__info-label">
              START A CONVERSATION
            </span>

            <h3>
              Let's create
              <br />
              something meaningful.
            </h3>

            <p>
              I'm open to opportunities where I can learn,
              contribute and build useful digital products.
            </p>

            <div className="contact__availability">
              <span />
              OPEN TO OPPORTUNITIES
            </div>

            <div className="contact__info-bottom">
              <span>BASED IN INDIA</span>
              <span>AVAILABLE WORLDWIDE</span>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-heading">
              <h3>Send a message</h3>
              <span>ALL FIELDS REQUIRED</span>
            </div>

            <div className="contact__field-row">
              <div className="contact__field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-email">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="What would you like to discuss?"
                value={formData.subject}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={120}
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me a little about your idea..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={3000}
              />
            </div>

            <button
              className="contact__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <span aria-hidden="true">↗</span>
            </button>

            <p
              className="contact__form-note"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          </form>

        </div>

        <div className="contact__footer">
          <span>HAVE A GREAT IDEA? LET'S MAKE IT HAPPEN.</span>
          <span>THANKS FOR STOPPING BY.</span>
        </div>

      </div>
    </section>
  );
}

export default Contact;
