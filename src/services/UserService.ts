import { IUserRepository } from "../repository/IUserRepository";

export class UserService{
   constructor( private userRepository: IUserRepository){

   }

}