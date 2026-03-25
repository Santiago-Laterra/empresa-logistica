import { Document, Types } from 'mongoose';


export interface IFile extends Document {
  title: string;
  fileName: string;
  fileUrl: string;
  fileType?: string;
  receiverId: Types.ObjectId;
  uploaderId: Types.ObjectId;
  status: 'active' | 'archived' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

export default IFile