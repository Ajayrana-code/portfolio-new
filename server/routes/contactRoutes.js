import express from 'express';

import {
  submitContact,
  getAdminMessages,
  getAdminMessageById,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contactController.js';

import authMiddleware from '../middleware/admAuthMiddleware.js';

const router = express.Router();

// Public contact form submission.
router.post('/', submitContact);

// Protected admin message routes.
router.get('/admin', authMiddleware, getAdminMessages);

router.get('/admin/:id', authMiddleware, getAdminMessageById);

router.patch(
  '/admin/:id/status',
  authMiddleware,
  updateMessageStatus
);

router.delete('/admin/:id', authMiddleware, deleteMessage);

export default router;