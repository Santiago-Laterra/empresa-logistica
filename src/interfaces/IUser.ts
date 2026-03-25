import { Document } from 'mongoose';


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'operator' | 'client';
  phone: string;
  active: boolean;
}