import { User } from "../../generated/prisma";

export interface IUserRepository{
    findById(id: number): Promise<User>
    findAll(): Promise<User[]>
    createUser(data:Pick<User,"name" | "email" | "password" | "role">): Promise<User>
}