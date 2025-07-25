import { PrismaClient, User } from "@prisma/client";
import { IFindUser, ICreateUser, IDeleteUser, IUpdateUser } from "../IUserRepository";



export class UserRepositoryImpl implements IFindUser, ICreateUser, IDeleteUser, IUpdateUser {
    constructor(private prisma: PrismaClient){}

    public async findById(id: string): Promise<User> {
        return await this.prisma.user.findUnique({where: { id: id } })
    }

    public async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany()
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({where: {email: email}})
    }

    public async createUser(data: Pick<User,"name" | "email" | "password" | "role" | "id">): Promise<User> {
        return await this.prisma.user.create({data: data})
    }
    public async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({ where: {id: id} })
    }
    public async updateUser(id: string, data: Pick<User, "name" | "email" | "password" | "role">): Promise<User> {
        return  await this.prisma.user.update({ where: {id: id}, data: data })
    }
}
