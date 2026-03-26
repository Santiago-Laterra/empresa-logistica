import { Router } from 'express';
import { getClients } from '../controller/userController';
import { authMiddleware, authorize } from '../middleware/authMiddleware';


const userRouter = Router();

userRouter.get('/clients', authMiddleware, authorize('super_admin', 'operator'), getClients);

export default userRouter;