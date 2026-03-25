import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // Recordá usar bcrypt para el hash
  role: {
    type: String,
    enum: ['super_admin', 'operator', 'client'],
    default: 'client'
  },
  phone: { type: String }, // Útil para logística
  active: { type: Boolean, default: true } // Para "dar de baja" usuarios sin borrarlos
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);