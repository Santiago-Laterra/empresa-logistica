import { Request, Response } from 'express';
import { User } from '../model/userModel';

/**
 * @desc    Obtener todos los clientes
 * @route   GET /api/users/clients
 * @access  Privado (Solo Admin y Operador)
 */
const getClients = async (req: Request, res: Response): Promise<void> => {
  try {

    const clients = await User.find({ role: 'client' })

      .select('-password')  //excluye la contraseña por seguridad
      .sort({ name: 1 });   //ordena 

    res.status(200).json(clients);

  } catch (error) {
    console.error("Error al obtener clientes:", error);

    res.status(500).json({
      success: false,
      message: 'Error al obtener los clientes'
    });
  }
};

export { getClients }