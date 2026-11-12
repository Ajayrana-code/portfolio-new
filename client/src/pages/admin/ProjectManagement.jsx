
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectManagement.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');

        const response = await fetch(`${API_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load projects.');
        }

        setProjects(data.projects || []);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-management">

      <header className="project-management__header">
        <div>
          <Link to="/admin" className="project-management__back">
            ← Dashboard
          </Link>

          <h1>Projects</h1>

          <p>Manage the projects displayed on your portfolio.</p>
        </div>

        <button
          className="project-management__add"
          disabled
          title="Project creation will be enabled in the next step"
        >
          + Add Project
        </button>
      </header>

      <div className="project-management__summary">
        <span>Total projects</span>
        <strong>{projects.length}</strong>
      </div>

      {loading && (
        <p className="project-management__message">
          Loading projects...
        </p>
      )}

      {error && (
        <p className="project-management__error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="project-management__empty">
          No projects found.
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="project-management__list">

          {projects.map((project) => (
            <article
              className="project-management__card"
              key={project.id || project.slug}
            >
              <div className="project-management__visual">
                {project.backgroundImage ? (
                  <img
                    src={project.backgroundImage}
                    alt=""
                  />
                ) : (
                  <span>{project.symbol || '◈'}</span>
                )}
              </div>

              <div className="project-management__details">
                <span className="project-management__category">
                  {project.category || 'Project'}
                </span>

                <h2>{project.title}</h2>

                <p>{project.subtitle}</p>

                <div className="project-management__technologies">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-management__status">
                <span className="project-management__published">
                  Published
                </span>
              </div>
            </article>
          ))}

        </div>
      )}

    </div>
  );
}

export default ProjectManagement;
