import { PrismaClient } from "@prisma/client";
import { IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct } from "../IProductRepository";
import { Product } from "@prisma/client";

export class ProductRepositoryImpl implements IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct{
    
    constructor(private prisma: PrismaClient){} 

    public async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany()
    }

    public async findById(id: number): Promise<Product>{
        return this.prisma.product.findUnique({ where: {id: id} })
    }
    public async findByCategory(categoryId: number): Promise<Product[]> {
        return this.prisma.product.findMany({ where: {categoryId: categoryId} })
    }

    public async createProduct(data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product> {
        return await this.prisma.product.create({ data: data })
    }

    public async updateProduct(id: number, data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product> {
        return this.prisma.product.update({where: {id: id}, data: data})
    }
    public async deleteProduct(id: number): Promise<void> {
        await this.prisma.product.delete({ where: {id: id} })
    }

}