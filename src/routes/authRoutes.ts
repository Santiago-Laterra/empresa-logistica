import { Router } from 'express';
import { loginUser, registerUser } from '../controller/authController';

const authRouter = Router();

// Ruta: POST /api/auth/register
// Propósito: Crear un nuevo usuario (por defecto rol 'client')
authRouter.post('/register', registerUser);

// Ruta: POST /api/auth/login
// Propósito: Validar credenciales y devolver el Token + Rol
authRouter.post('/login', loginUser);

export default authRouter;