import { PrismaClient } from "@prisma/client";
import { IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct } from "../IProductRepository";
import { Product } from "@prisma/client";

export class ProductRepositoryImpl implements IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct{
    
    constructor(private prisma: PrismaClient){} 

    public async findAll(): Promise<Product[]> {
        return await this.prisma.product.findMany({
            include: {
                category: true
            }
        })
    }

   public async findById(id: string): Promise<Product> {
  if (!id) {
    throw new Error("ID do produto é obrigatório")
  }

  const product = await this.prisma.product.findUnique({
    where: { id }
  })

  if (!product) {
    throw new Error("Produto não encontrado")
  }

  return product
}
    public async findByCategory(categoryId: string): Promise<Product[]> {
        return this.prisma.product.findMany({ where: {categoryId: categoryId} })
    }

    public async createProduct(data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product> {
        return await this.prisma.product.create({ data: data })
    }

    public async updateProduct(id: string, data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product> {
        return this.prisma.product.update({where: {id: id}, data: data})
    }
    public async deleteProduct(id: string): Promise<void> {
        await this.prisma.product.delete({ where: {id: id} })
    }

}