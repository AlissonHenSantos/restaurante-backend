import { PrismaClient, User } from "../../../generated/prisma";
import { IUserRepository } from "../IUserRepository";


class UserRepositoryImpl implements IUserRepository{
    private prisma: PrismaClient

    constructor(prisma: PrismaClient){
        this.prisma = prisma
    }
    public async findById(id: number): Promise<User> {
        return 
    }

    public async findAll(): Promise<User[]> {
        return
    }

    public async createUser(data: Pick<User,"name" | "email" | "password" | "role">): Promise<User> {
        return  this.prisma.user.create({data: data})
    }
}
