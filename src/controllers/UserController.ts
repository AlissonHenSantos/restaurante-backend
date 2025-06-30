import { Request, Response } from "express";
import {  User } from "@prisma/client";
import { UserService } from "../services/UserService";



export class UserController {
    constructor(private userService: UserService) {
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const users: User[] = await this.userService.findAll()
            return res.status(201).send(users)
        } catch (error: any) {
            return res.status(500).send(error + ``)
        }
    }
    

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const user: User = req.body
            const createUser = await this.userService.createUser(user)
            return res.status(201).send(createUser)
        } catch (error: any) {
            return res.status(500).json(error + ``)
        }
    }

    public async findById(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.userService.findById(req.params.id)

            if (!user) return res.status(404).send("Usuário não encontrado")

            return res.status(201).send(user)
        } catch (error: any) {
            return res.status(500).send(error + ``)
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const user: User = req.body

            const updatedUser = await this.userService.updateUser(req.params.id, user)
            return res.status(201).send(updatedUser)
        } catch (error: any) {
            return res.status(500).json(error + ``)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response>{
         try {
        await this.userService.deleteUser(req.params.id)
        return res.status(200).send("Usuário removido com sucesso")
    } catch (erro: any) {
        return res.status(500).send(erro + ``)
    }
    }
}
