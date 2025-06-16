import { Request, Response } from "express";
import { PrismaClient} from "../../generated/prisma";
import { UserService } from "../services/UserService";

class UserController {
    constructor(private userService: UserService){
    }
    
    

}

export const getUsers = async (req:Request, res:Response): Promise<Response> => {
    try{
        const prisma = new PrismaClient()
        const users = await prisma.user.findMany()
        return res.status(201).send(users)
    }catch(error: any){
        return res.status(500).send(error)
    }
}

export const createUser = async(req: Request, res: Response): Promise<Response> =>{
    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.create({
            data: req.body
        })
        return res.status(201).send(user)
    }catch(error: any){
        return res.status(500).send(error)
    }
}

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.findUnique({
            where: {id: Number(req.params.id)}
        })

        if(!user) return res.status(404).send("Usuário não encontrado")

        return res.status(201).send(user)
    }catch(error: any){
        return res.status(500).send(error)
    }

}

export const updateUser = async(req: Request, res: Response): Promise<Response> => {
    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        })
        return res.status(201).send(user)
    }catch(error: any){
        return res.status(500).send(error)
    }
}

export const deleteUser = async(req: Request, res: Response):  Promise<Response> => {
    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(200).send("Usuário removido com sucesso")
    }catch(erro: any){
        return res.status(500).send(erro)
    }
}