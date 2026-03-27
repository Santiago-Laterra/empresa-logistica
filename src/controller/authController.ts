import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../model/userModel';

const generateToken = (id: any): string => {

  const SECRET = process.env.JWT_SECRET

  if (!SECRET) {
    throw new Error("Secret debe tener un valor");
  }

  return jwt.sign({ id }, SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req: Request, res: Response) => {
  console.log("1. Entró al controlador");
  try {
    const { name, email, password } = req.body;

    //hasheo de contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const user = await User.create({
      name,
      email,
      password: hashedPassword, // guardamos la contraseña hasheada
      role: 'client',
      active: true
    });

    console.log("3. ✅ USUARIO CREADO EN MONGO:", user._id);

    const token = generateToken(user._id);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    });

  } catch (error: any) {
    console.error("❌ ERROR ESPECÍFICO DE MONGO:", error.message);
    return res.status(500).json({
      message: "Error en la base de datos",
      error: error.message
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }


    const isMatch = await bcrypt.compare(password, user.password); //Comparacion de contraseñas, enviada con la DB

    if (isMatch) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), //generacion del pase, para que entre
      });
    } else {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
  } catch (error) {
    console.error("Error en loginUser:", error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

export { generateToken, loginUser, registerUser }