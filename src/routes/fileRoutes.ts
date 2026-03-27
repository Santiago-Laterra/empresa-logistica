import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware';
import uploadCloud from '../config/cloudinary';
import { uploadFile, getMyFiles } from '../controller/fileController';

const fileRouter = Router();

// Proceso para la subida de archivos
// Middleware de Auth -> Middleware de Rol -> Multer (Cloudinary) -> Controlador

fileRouter.post(
  '/upload',
  authMiddleware,
  authorize('super_admin', 'operator'),
  uploadCloud.single('file'),
  uploadFile
);

// Se obtiene los archivos para el cliente
fileRouter.get('/my-files', authMiddleware, getMyFiles);

export default fileRouter;