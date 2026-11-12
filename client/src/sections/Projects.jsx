
import { useEffect, useRef, useState } from 'react';
import { projectCategories } from '../data/projects';
import './Projects.css';

const API_URL =

import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const closeButtonRef = useRef(null);

  // Fetch projects from MongoDB through the backend API.
  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`${API_URL}/api/projects`, {
          signal: controller.signal
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Unable to load projects.'
          );
        }

        setProjects(data.projects || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Projects API error:', error);
          setError('Unable to load projects. Please try again later.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          project => project.category === activeCategory
        );

  // Keyboard support and scroll locking for project dialog.
  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const previousElement = document.activeElement;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      if (previousElement instanceof HTMLElement) {
        previousElement.focus();
      }
    };
  }, [selectedProject]);

  return (
    <section id="work" className="projects section">
      <div className="projects__container container">

        {/* Heading */}

        <div className="projects__header">
          <p className="projects__eyebrow">
            <span />
            SELECTED WORK
          </p>

          <div className="projects__heading-row">
            <h2 className="projects__heading">
              Things I've
              <br />
              <span>built.</span>
            </h2>

            <p className="projects__intro">
              A selection of projects, experiments and ideas
              brought to life through design, development
              and problem-solving.
            </p>
          </div>
        </div>

        {/* Project filters */}

        <div className="projects__toolbar">
          <div
            className="projects__filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map(category => (
              <button
                key={category}
                type="button"
                className={`projects__filter ${
                  activeCategory === category
                    ? 'projects__filter--active'
                    : ''
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="projects__count" aria-live="polite">
            {String(filteredProjects.length).padStart(2, '0')}
            <span> PROJECTS</span>
          </span>
        </div>

        {/* Project loading, error and empty states */}

        {isLoading && (
          <p className="projects__status" role="status">
            Loading projects...
          </p>
        )}

        {!isLoading && error && (
          <p className="projects__status" role="alert">
            {error}
          </p>
        )}

        {!isLoading && !error && filteredProjects.length === 0 && (
          <p className="projects__status">
            No projects found in this category.
          </p>
        )}

        {/* Project cards */}

        {!isLoading && !error && filteredProjects.length > 0 && (
          <div className="projects__grid" aria-live="polite">
            {filteredProjects.map((project, index) => (
              <article
                className="project-card"
                key={project.id}
                style={{ '--project-index': index }}
              >
                {/* Project visual with optional background image */}

                <div
                  className={`project-card__visual project-card__visual--${project.visual || 'default'}`}
                  style={
                    project.backgroundImage
                      ? {
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url("${project.backgroundImage}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : undefined
                  }
                  aria-hidden="true"
                >
                  <div className="project-card__visual-top">
                    <span>PROJECT / {project.number}</span>
                    <span>↗</span>
                  </div>

                  <div className="project-card__visual-center">
                    <span className="project-card__visual-symbol">
                      {project.symbol}
                    </span>
                    <span className="project-card__visual-name">
                      {project.title}
                    </span>
                  </div>

                  <div className="project-card__visual-bottom">
                    <span>{project.visualLabel}</span>
                    <span>PORTFOLIO / 2026</span>
                  </div>
                </div>

                {/* Project information */}

                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span>{project.category}</span>
                    <span>{project.roleLabel}</span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-card__subtitle">
                    {project.subtitle}
                  </p>

                  <p className="project-card__description">
                    {project.description}
                  </p>

                  <div className="project-card__tags">
                    {(project.technologies || []).map(technology => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <div className="project-card__footer">
                    <button
                      type="button"
                      className="project-card__details"
                      onClick={() => setSelectedProject(project)}
                      aria-haspopup="dialog"
                    >
                      Explore project
                      <span>↗</span>
                    </button>

                    <span className="project-card__number">
                      / {project.number}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom statement */}

        <div className="projects__bottom">
          <span>IDEAS INTO REALITY</span>
          <span className="projects__bottom-line" />
          <span>ONE PROJECT AT A TIME</span>
        </div>

      </div>

      {/* Project details dialog */}

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={event => event.stopPropagation()}
          >
            <div className="project-modal__header">
              <span>PROJECT DETAILS / {selectedProject.number}</span>

              <button
                ref={closeButtonRef}
                type="button"
                className="project-modal__close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                ×
              </button>
            </div>

            <div className="project-modal__content">
              <p className="project-modal__eyebrow">
                {selectedProject.category}
              </p>

              <h2 id="project-modal-title">
                {selectedProject.title}
                <span>.</span>
              </h2>

              <p className="project-modal__subtitle">
                {selectedProject.subtitle}
              </p>

              <div className="project-modal__divider" />

              <h3>Overview</h3>
              <p className="project-modal__description">
                {selectedProject.overview}
              </p>

              <h3>My contribution</h3>
              <p className="project-modal__description">
                {selectedProject.contribution}
              </p>

              <h3>Highlights</h3>

              <ul className="project-modal__highlights">
                {(selectedProject.highlights || []).map(item => (
                  <li key={item}>
                    <span>↗</span>
                    {item}
                  </li>
                ))}
              </ul>

              {(selectedProject.technologies || []).length > 0 && (
                <>
                  <h3>Technologies / Methods</h3>

                  <div className="project-modal__tags">
                    {selectedProject.technologies.map(technology => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>
                </>
              )}

              <div className="project-modal__links">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__link project-modal__link--primary"
                  >
                    Live Demo <span>↗</span>
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a 
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__link project-modal__link--secondary"
                  >
                    GitHub Repository <span>↗</span>
                  </a>
                )}
              </div>

              {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                <p className="project-modal__notice">
                  Project links will be added once the live demo
                  and repository URLs are verified.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
