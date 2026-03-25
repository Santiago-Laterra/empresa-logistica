import { Router } from 'express';
import { getClients } from '../controller/userController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';


const router = Router();

router.get('/clients', authMiddleware, authorize('super_admin', 'operator'), getClients);

export default router;