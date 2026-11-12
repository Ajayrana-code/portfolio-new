
import cloudinary from '../config/cloudinary.js';
import { validateImageBuffer } from '../utils/validateImage.js';

const uploadProjectImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image to upload.'
      });
    }

    // Verify the actual file format.
    await validateImageBuffer(req.file.buffer);

    // Upload the image to Cloudinary.
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/projects',
          resource_type: 'image',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif']
        },
        (error, uploadResult) => {
          if (error) {
            return reject(error);
          }

          resolve(uploadResult);
        }
      );

      uploadStream.end(req.file.buffer);
    });

    return res.status(201).json({
      success: true,
      message: 'Project image uploaded successfully.',
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height
      }
    });
  } catch (error) {
    console.error('Project image upload error:', error);

    return res.status(500).json({
      success: false,
      message: 'Image upload failed. Please try again.'
    });
  }
};

export { uploadProjectImage };
