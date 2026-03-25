import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userSchema from '../model/userModel';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {


}


export default authMiddleware