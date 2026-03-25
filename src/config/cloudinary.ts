import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Definimos el storage con tipos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (__, file) => {
    return {
      folder: 'logistica_archivos',
      resource_type: 'auto', // Permite PDF, Excel, etc.
      allowed_formats: ['pdf', 'xlsx', 'xls', 'docx', 'doc', 'png', 'jpg'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

const uploadCloud = multer({ storage });

export default uploadCloud;