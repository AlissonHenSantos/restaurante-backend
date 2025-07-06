import { User } from "@prisma/client";

export interface ICreateUser{
    createUser(data:Pick<User,"name" | "email" | "password" | "role">): Promise<User>
}

export interface IFindUser {
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
    findAll(): Promise<User[]>
}
export interface IDeleteUser {
    deleteUser(id: string): Promise<void>
}

export interface IUpdateUser {
    updateUser(id: string, data: Pick<User, "name" | "email" | "password" | "role">): Promise<User>
}
export interface IUserRepository extends IFindUser, ICreateUser, IDeleteUser, IUpdateUser {}