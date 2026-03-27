export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'operator' | 'client';
  phone?: string;
  active: boolean;
}