import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../model/userModel';

// generar el Token

const generateToken = (id: any): string => {
  const SECRET = process.env.JWT_SECRET;

  if (!SECRET) {
    throw new Error("JWT_SECRET no está configurado en el entorno");
  }

  return jwt.sign({ id }, SECRET, {
    expiresIn: '30d',
  });
};


const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });


    if (user && (await bcrypt.compare(password, user.password))) {


      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Clave para el Dashboard
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Email o contraseña incorrectos'
      });
    }
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};


export { generateToken, loginUser }