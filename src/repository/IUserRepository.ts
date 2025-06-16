import { User } from "../../generated/prisma";

export interface IUserRepository{
    findById(id: number): Promise<User>
    findAll(): Promise<User[]>
    createUser(data:Pick<User,"name" | "email" | "password" | "role">): Promise<User>
    updateUser(id: number, data: Pick<User,"name" | "email" | "password" | "role">): Promise<User>
    deleteUser(id: number): Promise<void>
    findByEmail(email: string): Promise<User | null>
}