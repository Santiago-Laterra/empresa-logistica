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

  } catch (error: any) {


  }

}


export default authMiddleware