import { User } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded:User = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as User;
        req.user = decoded; // Adiciona o usuário decodificado ao objeto de requisição
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}