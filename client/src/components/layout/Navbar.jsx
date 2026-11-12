
import { useEffect, useState } from 'react';
import './Navbar.css';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect the currently visible section
  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visibleSections.length) {
          setActiveSection(visibleSections[0].id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Close menu when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menu after navigation
  const handleNavigation = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__container">

        {/* Logo */}
        <a
          href="#home"
          className="navbar__logo"
          onClick={() => handleNavigation('home')}
          aria-label="Go to homepage"
        >
          DEV<span>.</span>
        </a>

        {/* Desktop navigation */}
        <nav
          id="mobile-navigation"
          className={`navbar__links ${
            menuOpen ? 'navbar__links--open' : ''
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const section = link.href.slice(1);

            return (
              <a
                key={link.name}
                href={link.href}
                className={`navbar__link ${
                  activeSection === section
                    ? 'navbar__link--active'
                    : ''
                }`}
                aria-current={
                  activeSection === section ? 'location' : undefined
                }
                onClick={() => handleNavigation(section)}
              >
                {link.name}
              </a>
            );
          })}

          <a
            href="#contact"
            className="navbar__mobile-cta"
            onClick={() => handleNavigation('contact')}
          >
            Let's Talk <span>↗</span>
          </a>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="navbar__cta"
          onClick={() => handleNavigation('contact')}
        >
          Let's Talk <span>↗</span>
        </a>

        {/* Mobile menu button */}
        <button
          className={`navbar__toggle ${
            menuOpen ? 'navbar__toggle--active' : ''
          }`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>

      </div>
    </header>
  );
}

export default Navbar;
