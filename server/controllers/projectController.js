
import Project from '../models/Project.js';

// Fields that administrators are allowed to create or update.
const allowedFields = [
  'number',
  'title',
  'subtitle',
  'category',
  'roleLabel',
  'visual',
  'symbol',
  'visualLabel',
  'description',
  'overview',
  'contribution',
  'highlights',
  'technologies',
  'liveUrl',
  'githubUrl',
  'backgroundImage',
  'isPublished',
  'sortOrder'
];

const pickProjectFields = (body) => {
  const projectData = {};

  for (const field of allowedFields) {
    if (Object.hasOwn(body, field)) {
      projectData[field] = body[field];
    }
  }

  return projectData;
};

const handleProjectError = (res, error, action) => {
  console.error(`${action} error:`, error);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A project with this slug already exists.'
    });
  }

  if (
    error.name === 'ValidationError' ||
    error.name === 'CastError'
  ) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  return res.status(500).json({
    success: false,
    message: `Unable to ${action.toLowerCase()} project.`
  });
};


// PUBLIC: Get all published projects.
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const formattedProjects = projects.map(project => ({
      ...project,
      id: project.slug
    }));

    return res.status(200).json({
      success: true,
      count: formattedProjects.length,
      projects: formattedProjects
    });
  } catch (error) {
    console.error('Get projects error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve projects.'
    });
  }
};


// PUBLIC: Get one published project by slug.
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
      isPublished: true
    }).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    return res.status(200).json({
      success: true,
      project: {
        ...project,
        id: project.slug
      }
    });
  } catch (error) {
    console.error('Get project error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve this project.'
    });
  }
};


// ADMIN: Get all projects, including unpublished projects.
export const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const formattedProjects = projects.map(project => ({
      ...project,
      id: project.slug
    }));

    return res.status(200).json({
      success: true,
      count: formattedProjects.length,
      projects: formattedProjects
    });
  } catch (error) {
    return handleProjectError(res, error, 'Retrieve');
  }
};


// ADMIN: Create a project.
export const createProject = async (req, res) => {
  try {
    const projectData = pickProjectFields(req.body ?? {});

    if (
      typeof req.body?.slug !== 'string' ||
      !req.body.slug.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Project slug is required.'
      });
    }

    const project = await Project.create({
      ...projectData,
      slug: req.body.slug.trim().toLowerCase()
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project: {
        ...project.toObject(),
        id: project.slug
      }
    });
  } catch (error) {
    return handleProjectError(res, error, 'Create');
  }
};


// ADMIN: Update an existing project.
export const updateProject = async (req, res) => {
  try {
    const projectData = pickProjectFields(req.body ?? {});

    if (Object.keys(projectData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide project fields to update.'
      });
    }

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: projectData },
      {
        new: true,
        runValidators: true
      }
    ).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      project: {
        ...project,
        id: project.slug
      }
    });
  } catch (error) {
    return handleProjectError(res, error, 'Update');
  }
};


// ADMIN: Delete a project.
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      slug: req.params.slug
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    return handleProjectError(res, error, 'Delete');
  }
};
