import { PrismaClient, User } from "../../../generated/prisma";
import { IUserRepository } from "../IUserRepository";


export class UserRepositoryImpl implements IUserRepository{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }

    public async findById(id: number): Promise<User> {
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
    public async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {id: id}
        })
    }
    public async updateUser(id: number, data: Pick<User, "name" | "email" | "password" | "role">): Promise<User> {
        return  await this.prisma.user.update({
            where: {id: id},
            data: data
        })
    }
}
