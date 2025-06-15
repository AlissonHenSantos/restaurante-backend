import { User } from "../../generated/prisma";

export interface IUserRepository{
    findById(id: string): Promise<User>
    findAll(): Promise<User[]>
    
}