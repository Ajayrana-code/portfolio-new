
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">

      {/* Animated background */}
      <div className="hero__background" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--one" />
        <div className="hero__glow hero__glow--two" />
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
      </div>

      <div className="hero__container">

        {/* Availability status */}
        <div className="hero__status">
          <span className="hero__status-dot" />
          <span>AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        {/* Main content */}
        <div className="hero__content">

          <p className="hero__eyebrow">
            HELLO, I'M A DEVELOPER
          </p>

          <h1 className="hero__title">
            Creating
            <br />
            <span className="hero__title-accent">
              digital
            </span>{' '}
            experiences
            <span className="hero__title-period">.</span>
          </h1>

          <p className="hero__description">
            I'm a full-stack developer passionate about
            building thoughtful digital experiences,
            solving meaningful problems and turning
            creative ideas into reality.
          </p>

          {/* Actions */}
          <div className="hero__actions">
            <a href="#work" className="hero__button hero__button--primary">
              Explore My Work
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#contact" className="hero__button hero__button--secondary">
              Let's Connect
            </a>
          </div>

          {/* Technology labels */}
          <div className="hero__technologies">
            <span>JAVA</span>
            <i />
            <span>REACT</span>
            <i />
            <span>NODE.JS</span>
            <i />
            <span>MONGODB</span>
          </div>

        </div>

        {/* Bottom scroll indicator */}
        <a href="#about" className="hero__scroll">
          <span className="hero__scroll-line" />
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>

        <div className="hero__index">
          <span>01</span> / 04
        </div>

      </div>
    </section>
  );
}

export default Hero;
