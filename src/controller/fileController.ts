import { Request, Response } from 'express';
import { File } from '../model/fileModel';


interface CustomRequest extends Request {
  file?: any;
  user?: any;
}

const uploadFile = async (req: CustomRequest, res: Response) => {
  try {
    const { title, receiverId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    const newFile = await File.create({
      title,
      fileName: req.file.originalname,
      fileUrl: req.file.path, // URL de Cloudinary
      fileType: req.file.mimetype.split('/')[1], // 'pdf', 'png', etc.
      receiverId,
      uploaderId: req.user._id,
      status: 'active'
    });

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar subida' });
  }
};

const getMyFiles = async (req: CustomRequest, res: Response) => {
  try {
    const files = await File.find({
      receiverId: req.user._id,
      status: 'active'
    }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener archivos' });
  }
};

export { uploadFile, getMyFiles }