import { User } from "@prisma/client";
import { IUserRepository } from "../repository/IUserRepository";
import bcript from "bcrypt-ts";

export class UserService{
   constructor( private userRepository: IUserRepository){
   }

   public async findAll(): Promise<User[]> {
      return this.userRepository.findAll();
   }

   public async createUser(data: Partial<User>): Promise<User>{
      if (!data.name || !data.email || !data.password || !data.role) {
         throw new Error("Digite todos os campos obrigatórios: name, email, password e role");
      }
      const passwordHash =  bcript.hashSync(data.password, 10);
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser) {
         throw new Error("Usuário já existe com esse email");
      }

      const user: User = {
         id: data.id, 
         name: data.name,
         email: data.email,
         password: passwordHash, 
         role: data.role
      }
      return await this.userRepository.createUser(user);
   }
   
   public async findById(id: string): Promise<User>{
      return await this.userRepository.findById(id);
   }

   public async findByEmail(email: string): Promise<User | null>{
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
         throw new Error("Usuário não encontrado com esse email");
      }
      return user
   }

   public async updateUser(id: string, data: Partial<User>): Promise<User>{
      if (!data.name || !data.email || !data.password || !data.role) {
         throw new Error("Digite todos os campos obrigatórios: name, email, password e role");
      }
      const passwordHash =  bcript.hashSync(data.password, 10);
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
         throw new Error("Usuário já existe com esse email");
      }
      const user: User = {
         id: id, 
         name: data.name,
         email: data.email,
         password: passwordHash, 
         role: data.role
      }
      return await this.userRepository.updateUser(id, user);
   }

   public async deleteUser(id: string): Promise<void>{
   const user = await this.userRepository.findById(id);
   if (!user) {
      throw new Error("Usuário não encontrado");
   }
   await this.userRepository.deleteUser(id);
   }
}