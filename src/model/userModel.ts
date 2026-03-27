import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['super_admin', 'operator', 'client'],
    default: 'client'
  },
  phone: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);