
import Project from '../models/Project.js';

// Get all published projects.
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

// Get one published project by its slug.
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
