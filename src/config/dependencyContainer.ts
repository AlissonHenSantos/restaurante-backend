import { PrismaClient } from "../../generated/prisma";

import { UserService } from "../services/UserService";
import { UserRepositoryImpl } from "../repository/respositoryImpl/UserRepositoryImpl";
import { IUserRepository } from "../repository/IUserRepository";
import { UserController } from "../controllers/UserController";
import { ICategoryRepository } from "../repository/ICategoryRepository";
import { CategoryRepositoryImpl } from "../repository/respositoryImpl/CategoryRepositoryImpl";
import { CategoryService } from "../services/CategoryService";
import { CategoryController } from "../controllers/CategoryController";
import { IProductRepository } from "../repository/IProductRepository";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";
import { ProductRepositoryImpl } from "../repository/respositoryImpl/ProductRepositoryImpl";

class DependencyContainer {
    private static instace : DependencyContainer

    private prisma: PrismaClient;

    private userRepository: IUserRepository;
    private userService: UserService;
    private userController: UserController;

    private categoryRepository: ICategoryRepository
    private categoryService: CategoryService
    private categoryController: CategoryController

    private productRepository: IProductRepository
    private productService: ProductService  
    private productContorller: ProductController

    private constructor() {
        this.prisma = new PrismaClient();

        this.userRepository = new UserRepositoryImpl(this.prisma)
        this.categoryRepository =  new CategoryRepositoryImpl(this.prisma)
        this.productRepository =  new ProductRepositoryImpl(this.prisma)

        this.userService =  new UserService(this.userRepository)
        this.categoryService =  new CategoryService(this.categoryRepository)
        this.productService =  new ProductService(this.productRepository)

        this.userController =  new UserController(this.userService)
        this.categoryController = new CategoryController(this.categoryService)
        this.productContorller =  new ProductController(this.productService)
    }

    public static getInstance(): DependencyContainer{
        if(!DependencyContainer.instace){
            DependencyContainer.instace = new DependencyContainer()
        }return DependencyContainer.instace
    }

    public getUserController(): UserController {
        return this.userController
    }
    public getCategoryController(): CategoryController{
        return this.categoryController
    }
    public getProductController(): ProductController{
        return this.productContorller
    }
}

const container = DependencyContainer.getInstance()
export default container