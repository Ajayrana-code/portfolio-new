
import express from 'express';

import {
  getProjects,
  getProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

import authMiddleware from '../middleware/admAuthMiddleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/', getProjects);

// ADMIN ROUTES — authentication required
router.get('/admin', authMiddleware, getAdminProjects);
router.post('/', authMiddleware, createProject);
router.put('/:slug', authMiddleware, updateProject);
router.delete('/:slug', authMiddleware, deleteProject);

// Keep this after /admin to avoid matching "admin" as a project slug.
router.get('/:slug', getProjectBySlug);

export default router;
