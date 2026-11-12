
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
    throw new Error(
      'Invalid image file. Please upload a genuine JPEG, PNG, WebP or AVIF image.'
    );
  }

  return fileType;
};
