import { Product } from "@prisma/client";
import { IProductRepository } from "../repository/IProductRepository";

export class ProductService{
    
    constructor(private productRepository: IProductRepository){}
     
    public async findAll(): Promise<Product[]>{
        return this.productRepository.findAll()
    }

    public async findById(id: string): Promise<Product>{
        const user = await this.productRepository.findById(Number(id))

        if(!user) throw new Error("Produto não encontrado")
        return user
    }

    public async findByCategory(categoryId: string): Promise<Product[]>{
        const categoryIdN = Number(categoryId)

        const category = await this.productRepository.findById(categoryIdN)
        if(!category) throw new Error("Categoria não encontrada")

        return await this.productRepository.findByCategory(categoryIdN)
    }

    public async createProduct(data: Partial<Product>): Promise<Product>{
        if(!data.name || !data.price || !data.categoryId ) 
            throw new Error ("Digite todos os campos obrigatórios: Nome, preço, categoria")

        const product: Product = {
            name: data.name,
            price: data.price,
            categoryId: data.categoryId,
            description: data.description,
            image: data.image,
            id: data.id
        }
        
        return this.productRepository.createProduct(product)
    }

    public async updateProduct(id: string, data: Partial<Product>): Promise<Product>{
        const idN = Number(id)
        const product = this.productRepository.findById(idN)
        if(!product) throw new Error("Produto não encontrado")
        
        const productUpdated: Product = {
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
            image: data.image
        }
        return await this.productRepository.updateProduct(idN, productUpdated)
    }
    public async deleteProduct(id: string): Promise<void> {

        const idN = Number(id)
        const product = this.productRepository.findById(idN)
        if(!product) throw new Error("Produto não encontrado")
        await this.productRepository.deleteProduct(idN)
    }
}