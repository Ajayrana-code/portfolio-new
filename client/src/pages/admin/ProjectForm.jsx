
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './ProjectForm.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const initialForm = {
  slug: '',
  number: '',
  title: '',
  subtitle: '',
  category: 'Full Stack',
  roleLabel: '',
  visual: '',
  symbol: '',
  visualLabel: '',
  description: '',
  overview: '',
  contribution: '',
  highlights: '',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  backgroundImage: '',
  isPublished: true,
  sortOrder: 0
};

function ProjectForm() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const isEditMode = Boolean(slug);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Load existing project when editing.
  useEffect(() => {
    if (!isEditMode) return;

    let cancelled = false;

    const fetchProject = async () => {
      try {
        const token = sessionStorage.getItem('adminToken');

        if (!token) {
          throw new Error('Your session has expired. Please log in again.');
        }

        const response = await fetch(`${API_URL}/api/projects/admin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Unable to load project.');
        }

        const project = (data.projects || []).find(
          (item) => item.slug === slug
        );

        if (!project) {
          throw new Error('Project not found.');
        }

        if (cancelled) return;

        setForm({
          slug: project.slug || '',
          number: project.number || '',
          title: project.title || '',
          subtitle: project.subtitle || '',
          category: project.category || 'Full Stack',
          roleLabel: project.roleLabel || '',
          visual: project.visual || '',
          symbol: project.symbol || '',
          visualLabel: project.visualLabel || '',
          description: project.description || '',
          overview: project.overview || '',
          contribution: project.contribution || '',
          highlights: (project.highlights || []).join('\n'),
          technologies: (project.technologies || []).join('\n'),
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          backgroundImage: project.backgroundImage || '',
          isPublished: project.isPublished ?? true,
          sortOrder: project.sortOrder ?? 0
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load project.');
        }
      } finally {
        if (!cancelled) {
          setFetching(false);
        }
      }
    };

    fetchProject();

    return () => {
      cancelled = true;
    };
  }, [isEditMode, slug]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif'
  ];

  if (!allowedTypes.includes(file.type)) {
    setError('Only JPEG, PNG, WebP and AVIF images are allowed.');
    event.target.value = '';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError('Image size must not exceed 5 MB.');
    event.target.value = '';
    return;
  }

  try {
    setError('');
    setUploading(true);

    const token = sessionStorage.getItem('adminToken');

    if (!token) {
      throw new Error('Your session has expired. Please log in again.');
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/api/images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Image upload failed.');
    }

    setForm((previous) => ({
      ...previous,
      backgroundImage: data.image.url
    }));
  } catch (err) {
    setError(err.message || 'Unable to upload image.');
  } finally {
    setUploading(false);
    event.target.value = '';
  }
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploading) {
     setError('Please wait until the image upload finishes.');
  return;
}
    setError('');
    setLoading(true);

    try {
      const token = sessionStorage.getItem('adminToken');

      if (!token) {
        throw new Error('Your session has expired. Please log in again.');
      }

      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase(),
        number: form.number.trim(),
        title: form.title.trim(),
        highlights: form.highlights
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        technologies: form.technologies
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
        sortOrder: Number(form.sortOrder)
      };

      const url = isEditMode
        ? `${API_URL}/api/projects/${encodeURIComponent(slug)}`
        : `${API_URL}/api/projects`;

      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || `Unable to ${isEditMode ? 'update' : 'create'} project.`
        );
      }

      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="project-form-page">
        <p className="project-form__message">Loading project details...</p>
      </div>
    );
  }

  return (
    <div className="project-form-page">
      <header className="project-form-page__header">
        <div>
          <Link to="/admin/projects" className="project-form-page__back">
            ← Back to Projects
          </Link>

          <h1>{isEditMode ? 'Edit Project' : 'Add Project'}</h1>

          <p>
            {isEditMode
              ? 'Update your project information.'
              : 'Add a new project to your portfolio.'}
          </p>
        </div>
      </header>

      <form className="project-form" onSubmit={handleSubmit}>

        <section className="project-form__section">
          <h2>Basic Information</h2>

          <div className="project-form__grid">
            <label>
              Project title *
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </label>

            <label>
              Project slug *
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="project-name"
                readOnly={isEditMode}
                required
              />
              {isEditMode && (
                <small>The project slug cannot be changed.</small>
              )}
            </label>

            <label>
              Project number *
              <input
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="01"
                required
              />
            </label>

            <label>
              Category *
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="Full Stack">Full Stack</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Web Application">Web Application</option>
              </select>
            </label>

            <label className="project-form__full">
              Subtitle
              <input
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                maxLength={150}
              />
            </label>

            <label className="project-form__full">
              Short description *
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                required
              />
            </label>
          </div>
        </section>

        <section className="project-form__section">
          <h2>Project Details</h2>

          <div className="project-form__grid">
            <label className="project-form__full">
              Overview
              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                maxLength={2000}
                rows={5}
              />
            </label>

            <label className="project-form__full">
              Your contribution
              <textarea
                name="contribution"
                value={form.contribution}
                onChange={handleChange}
                maxLength={1500}
                rows={4}
              />
            </label>

            <label>
              Role label
              <input
                name="roleLabel"
                value={form.roleLabel}
                onChange={handleChange}
              />
            </label>

            <label>
              Visual label
              <input
                name="visualLabel"
                value={form.visualLabel}
                onChange={handleChange}
              />
            </label>

            <label>
              Visual
              <input
                name="visual"
                value={form.visual}
                onChange={handleChange}
              />
            </label>

            <label>
              Symbol
              <input
                name="symbol"
                value={form.symbol}
                onChange={handleChange}
                placeholder="◈"
              />
            </label>

            <label className="project-form__full">
              Technologies
              <textarea
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder={'React\nNode.js\nMongoDB'}
                rows={4}
              />
              <small>Enter one technology per line.</small>
            </label>

            <label className="project-form__full">
              Highlights
              <textarea
                name="highlights"
                value={form.highlights}
                onChange={handleChange}
                placeholder={'Responsive design\nAuthentication\nREST API'}
                rows={4}
              />
              <small>Enter one highlight per line.</small>
            </label>
          </div>
        </section>

        <section className="project-form__section">
          <h2>Links and Background Image</h2>

          <div className="project-form__grid">
            <label>
              Live demo URL
              <input
                type="url"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </label>

            <label>
              GitHub URL
              <input
                type="url"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
              />
            </label>


<div className="project-form__full project-form__image-upload">
  <label htmlFor="project-background-image">
    Upload project background image
  </label>

  <input
    id="project-background-image"
    type="file"
    accept="image/jpeg,image/png,image/webp,image/avif"
    onChange={handleImageUpload}
    disabled={uploading}
  />

  <small>
    JPEG, PNG, WebP or AVIF. Maximum file size: 5 MB.
  </small>

  {uploading && (
    <p role="status">Uploading image to Cloudinary...</p>
  )}

  {form.backgroundImage && (
    <div className="project-form__image-preview">
      <img
        src={form.backgroundImage}
        alt="Project background preview"
      />

      <button
        type="button"
        onClick={() =>
          setForm((previous) => ({
            ...previous,
            backgroundImage: ''
          }))
        }
        disabled={uploading}
      >
        Remove image
      </button>
    </div>
  )}

  <label htmlFor="backgroundImageUrl">
    Or enter an image URL manually
  </label>

  <input
    id="backgroundImageUrl"
    type="url"
    name="backgroundImage"
    value={form.backgroundImage}
    onChange={handleChange}
    placeholder="https://..."
    disabled={uploading}
  />
</div>

          </div>
        </section>

        <section className="project-form__section">
          <h2>Publishing Settings</h2>

          <div className="project-form__grid">
            <label>
              Display order
              <input
                type="number"
                name="sortOrder"
                value={form.sortOrder}
                onChange={handleChange}
              />
            </label>

            <label className="project-form__checkbox">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
              />
              Publish this project
            </label>
          </div>
        </section>

        {error && (
          <p className="project-form__error" role="alert">
            {error}
          </p>
        )}

        <div className="project-form__actions">
          <Link to="/admin/projects" className="project-form__cancel">
            Cancel
          </Link>

          <button type="submit" disabled={loading || uploading}>
            {loading
              ? 'Saving...'
              : isEditMode
                ? 'Update Project'
                : 'Save Project'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ProjectForm;
