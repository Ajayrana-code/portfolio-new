import { education, experience } from '../data/journey';
import './Journey.css';

function Journey() {
  return (
    <section id="journey" className="journey section">
      <div className="journey__container container">

        <div className="journey__header">
          <p className="journey__eyebrow">
            <span />
            THE JOURNEY
          </p>

          <div className="journey__heading-row">
            <h2 className="journey__heading">
              Learning.
              <br />
              <span>Growing.</span>
              <br />
              Building.
            </h2>

            <p className="journey__intro">
              Every step has been part of the process.
              Here's a look at my academic background
              and professional journey so far.
            </p>
          </div>
        </div>

        <div className="journey__content">

          <div className="journey__column">
            <div className="journey__column-heading">
              <span className="journey__column-icon">01</span>
              <h3>Education</h3>
            </div>

            <div className="journey__timeline">
              {education.map(item => (
                <article className="journey-card" key={item.id}>
                  <div className="journey-card__marker">
                    <span />
                  </div>

                  <div className="journey-card__content">
                    <div className="journey-card__top">
                      <span>{item.period}</span>
                      <span>{item.number}</span>
                    </div>

                    <span className="journey-card__degree">
                      {item.shortName}
                    </span>

                    <h4>{item.degree}</h4>

                    <p className="journey-card__institution">
                      {item.institution}
                    </p>

                    <p className="journey-card__location">
                      {item.location}
                    </p>

                    <p className="journey-card__description">
                      {item.description}
                    </p>

                    <div className="journey-card__score">
                      <span>{item.scoreLabel}</span>
                      <strong>{item.score}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="journey__column">
            <div className="journey__column-heading">
              <span className="journey__column-icon">02</span>
              <h3>Experience</h3>
            </div>

            {experience.length > 0 ? (
              <div className="journey__timeline">
                {experience.map(item => (
                  <article className="journey-card" key={item.id}>
                    <div className="journey-card__marker">
                      <span />
                    </div>

                    <div className="journey-card__content">
                      <div className="journey-card__top">
                        <span>{item.period}</span>
                        <span>{item.type}</span>
                      </div>

                      <h4>{item.role}</h4>

                      <p className="journey-card__institution">
                        {item.company}
                      </p>

                      <p className="journey-card__description">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="journey__experience-empty">
                <span className="journey__empty-symbol">+</span>
                <h4>What's next?</h4>
                <p>
                  My professional journey is evolving.
                  New opportunities, challenges and experiences
                  are part of the story ahead.
                </p>
                <span className="journey__empty-caption">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
            )}
          </div>

        </div>

        <div className="journey__resume">
          <div className="journey__resume-content">
            <span>WANT TO KNOW MORE?</span>
            <h3>Let's take a closer look.</h3>
            <p>
              Explore my resume for a more detailed overview
              of my education, skills and background.
            </p>
          </div>

          <a
            href="/resume.pdf"
            className="journey__resume-button"
            download
          >
            Download Resume
            <span aria-hidden="true">↓</span>
          </a>
        </div>

      </div>
    </section>
  );
}

export default Journey;