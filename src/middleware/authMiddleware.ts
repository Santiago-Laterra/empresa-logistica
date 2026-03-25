import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/userModel';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    return res.status(500).json({ success: false, message: "Error de configuración: JWT_SECRET no definido" });
  }

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "No autorizado, no hay token" });
  }

  const token = header.split(" ")[1]; //Bearer

  try {

    const decoded = jwt.verify(token, SECRET_KEY) as any;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    (req as any).user = user; //Evitar errores de tipos en Express

    next();
  } catch (error: any) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "El token ha expirado" });
    }
    return res.status(401).json({ success: false, message: "Token inválido o fallido" });

  }



}

const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `El rol ${user?.role || 'desconocido'} no tiene permiso para acceder a esta ruta`
      });
    }
    next();
  };
};


export { authMiddleware, authorize }