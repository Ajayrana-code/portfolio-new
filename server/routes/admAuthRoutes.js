
import express from 'express';
import rateLimit from 'express-rate-limit';
import { loginAdmin } from '../controllers/admAuthController.js';
import admAuthMiddleware from '../middleware/admAuthMiddleware.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 6,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.'
  }
});

// Public login endpoint
router.post('/login', loginLimiter, loginAdmin);

// Protected admin verification endpoint
router.get('/me', admAuthMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Authenticated admin.',
    admin: req.admin
  });
});

export default router;
