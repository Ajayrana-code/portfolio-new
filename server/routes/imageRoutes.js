
import express from 'express';
import multer from 'multer';

import authMiddleware from '../middleware/admAuthMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { uploadProjectImage } from '../controllers/imageController.js';

const router = express.Router();

// Handle Multer errors with readable JSON responses.
const handleImageUpload = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message:
          error.code === 'LIMIT_FILE_SIZE'
            ? 'Image must not exceed 5 MB.'
            : 'Invalid image upload.'
      });
    }

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Image upload rejected.'
      });
    }

    next();
  });
};

// Admin-only image upload.
router.post(
  '/',
  authMiddleware,
  handleImageUpload,
  uploadProjectImage
);

export default router;
