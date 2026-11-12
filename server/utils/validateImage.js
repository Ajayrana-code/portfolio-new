
import { fileTypeFromBuffer } from 'file-type';

const allowedImageTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
];

export const validateImageBuffer = async (buffer) => {
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType || !allowedImageTypes.includes(fileType.mime)) {
    const error = new Error(
          'Invalid image file. Please upload a genuine JPEG, PNG, WebP or AVIF image.'
        );

        error.code = 'INVALID_IMAGE_SIGNATURE';

        throw error;
  }

  return fileType;
};
