import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js'; // Cloudinary config import

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png'], // Set allowed file formats
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique file name
  },
});

// Set up Multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 100MB
});

export default upload;
