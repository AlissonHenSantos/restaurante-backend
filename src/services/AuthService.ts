import { IUserRepository } from "../repository/IUserRepository";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt"
import { User } from "@prisma/client";


export class AuthService {
    constructor(private userRepository: IUserRepository) { }

    async login(email: string, password: string): Promise<string | null> {
        const user: User = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Usuário não encontrado");

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new Error("Senha inválida");

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
        return token;
    }
}