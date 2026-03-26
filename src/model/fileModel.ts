import { Schema, Types, model, models } from "mongoose";
import IFile from "../interfaces/IFile";


const fileSchema = new Schema<IFile>({
  title: { type: String, required: true }, // Nombre que verá el cliente
  fileName: { type: String, required: true }, // Nombre original del archivo
  fileUrl: { type: String, required: true }, // La URL que te dará AWS o Cloudinary
  fileType: { type: String }, // 'pdf', 'xlsx', etc.

  // Relaciones
  receiverId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }, // El Cliente que lo recibe
  uploaderId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }, // El Admin/Operador que lo subió

  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  }
}, { timestamps: true });

export const File = model<IFile>('File', fileSchema);