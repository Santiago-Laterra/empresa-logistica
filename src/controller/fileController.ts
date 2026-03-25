import { Request, Response } from 'express';
import { File } from '../model/fileModel'; // Asegúrate de que la ruta sea correcta


interface CustomRequest extends Request {
  file?: any; // Usamos any para simplificar el acceso a .format y .path de Cloudinary
  user?: {
    _id: string;
    [key: string]: any;
  };
}

const uploadFile = async (req: CustomRequest, res: Response) => {
  try {
    const { title, receiverId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    // 2. Creamos el registro en nuestra DB
    const newFile = await File.create({
      title,
      fileName: req.file.originalname,
      fileUrl: req.file.path, // URL segura de Cloudinary
      fileType: req.file.format || 'unknown', // Accedemos a format de Cloudinary
      receiverId,
      uploaderId: req.user?._id, // Accedemos a user._id inyectado por el middleware
      status: 'active'
    });

    return res.status(201).json(newFile);

  } catch (error) {
    console.error("Error en uploadFile:", error);
    return res.status(500).json({
      message: 'Error al procesar la subida',
      error: error instanceof Error ? error.message : error
    });
  }
};

export default uploadFile