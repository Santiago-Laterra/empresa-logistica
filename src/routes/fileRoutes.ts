import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware';
import uploadCloud from '../config/cloudinary';
import { uploadFile, getMyFiles } from '../controller/fileController';

const fileRouter = Router();

// Ruta para SUBIR archivos (Solo Admin y Operador)
fileRouter.post('/upload', authMiddleware, authorize('super_admin', 'operator'), (req, res) => {
  res.send('Archivo subido con éxito');
});

// Ruta para que el CLIENTE vea sus archivos
fileRouter.get('/my-files', authMiddleware, (__, res) => {
  res.send('Lista de tus archivos');
});

fileRouter.post('/upload', authMiddleware, authorize('super_admin', 'operator'), uploadCloud.single('archivo'), uploadFile);
fileRouter.get('/my-files', authMiddleware, getMyFiles);

export default fileRouter;