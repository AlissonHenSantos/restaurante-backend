import { User } from "../../generated/prisma";

export interface ICreateUser{
    createUser(data:Pick<User,"name" | "email" | "password" | "role">): Promise<User>
}

export interface IFindUser {
    findByEmail(email: string): Promise<User>
    findById(id: number): Promise<User>
    findAll(): Promise<User[]>
}
export interface IDeleteUser {
    deleteUser(id: number): Promise<void>
}

export interface IUpdateUser {
    updateUser(id: number, data: Pick<User, "name" | "email" | "password" | "role">): Promise<User>
}
export interface IUserRepository extends IFindUser, ICreateUser, IDeleteUser, IUpdateUser {
    
}