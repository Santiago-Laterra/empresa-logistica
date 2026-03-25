import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware';
import uploadCloud from '../config/cloudinary';
import uploadFile from '../controller/fileController';

const router = Router();

// Ruta para SUBIR archivos (Solo Admin y Operador)
router.post('/upload', authMiddleware, authorize('super_admin', 'operator'), (req, res) => {
  res.send('Archivo subido con éxito');
});

// Ruta para que el CLIENTE vea sus archivos
router.get('/my-files', authMiddleware, (__, res) => {
  res.send('Lista de tus archivos');
});

router.post('/upload', authMiddleware, authorize('super_admin', 'operator'), uploadCloud.single('archivo'), uploadFile);


export default router;