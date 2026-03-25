import { Router } from 'express';
import { authMiddleware, authorize } from '../middleware/authMiddleware';


const router = Router();

// Ruta para SUBIR archivos (Solo Admin y Operador)
router.post('/upload', authMiddleware, authorize('super_admin', 'operator'), (req, res) => {
  res.send('Archivo subido con éxito');
});

// Ruta para que el CLIENTE vea sus archivos
router.get('/my-files', authMiddleware, (__, res) => {
  res.send('Lista de tus archivos');
});


export default router;