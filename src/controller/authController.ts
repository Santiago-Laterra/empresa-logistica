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

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const user = await User.create({
    name,
    email,
    password, // El pre-save hook de Mongoose lo va a encriptar
    role: 'client' // Por defecto siempre cliente por seguridad
  });

  if (user) {
    res.status(201).json({ message: "Usuario creado" });
  } else {
    res.status(400).json({ message: 'Datos inválidos' });
  }
};

export { generateToken, loginUser, registerUser }