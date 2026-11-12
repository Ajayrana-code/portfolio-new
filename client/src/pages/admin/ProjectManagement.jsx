
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProjectManagement.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingSlug, setDeletingSlug] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');

        const response = await fetch(`${API_URL}/api/projects/admin`, {
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

    const handleDelete = async (project) => {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
        setDeletingSlug(project.slug);
        setError('');

        const token = sessionStorage.getItem('adminToken');

        const response = await fetch(
        `${API_URL}/api/projects/${encodeURIComponent(project.slug)}`,
        {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.message || 'Unable to delete project.');
        }

        setProjects((currentProjects) =>
        currentProjects.filter((item) => item.slug !== project.slug)
        );
    } catch (err) {
        setError(err.message || 'Something went wrong while deleting.');
    } finally {
        setDeletingSlug('');
    }
    };

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

        <Link
            to="/admin/projects/new"
            className="project-management__add"
            >
            + Add Project
        </Link>

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

      {!loading && projects.length > 0 && (
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

              <div className="project-management__actions">
                <span
                    className={
                    project.isPublished
                        ? 'project-management__published'
                        : 'project-management__unpublished'
                    }
                >
                    {project.isPublished ? 'Published' : 'Unpublished'}
                </span>

                <div className="project-management__buttons">
                    <Link
                    to={`/admin/projects/${encodeURIComponent(project.slug)}/edit`}
                    className="project-management__edit"
                    >
                    Edit
                    </Link>

                    <button
                    type="button"
                    className="project-management__delete"
                    onClick={() => handleDelete(project)}
                    disabled={deletingSlug === project.slug}
                    >
                    {deletingSlug === project.slug ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
              </div> 

            </article>
          ))}

        </div>
      )}

    </div>
  );
}

export default ProjectManagement;
