import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { Product } from "@prisma/client";


export class ProductController {
    constructor(private productService: ProductService){}

    public async findAll(req: Request, res: Response): Promise<Response>{
        try{
            const products: Product[] = await this.productService.findAll()
            return res.status(200).send(products)
        } catch(error){
            return res.status(500).send(error instanceof Error ? error.message : "problema interno no servidor")
        }
    }
    public async findByCategory(req: Request, res: Response): Promise<void> {
        try {
            const products: Product[] = await this.productService.findByCategory(req.params.categoryId);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    public async findById(req: Request, res: Response): Promise<Response>{
        try{
            const product: Product = await this.productService.findById(req.params.id)
            return res.status(200).send(product)
        } catch(error){
            return res.status(500).send(error instanceof Error ? error.message : "problema interno no servidor")
        }
    }

    public async createProduct(req: Request, res: Response): Promise<Response>{
        try{
            const product: Product =  await this.productService.createProduct(req.body)
            return res.status(200).send(product)
        }catch(error){
            return res.status(500).send(error instanceof Error ? error.message : "problema interno no servidor")
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<Response> {
        try{
            const product: Product =  await this.productService.updateProduct(req.params.id, req.body)
            return res.status(200).send(product)
        }catch(error){
            return res.status(500).send(error instanceof Error ? error.message : "problema interno no servidor")
        }
    }
    public async deleteProduct(req: Request, res: Response): Promise<Response>{
        try{
            await this.productService.deleteProduct(req.params.id)
            return res.status(202).send("Produto deletado com sucesso")
        }catch(error){
            return res.status(500).send(error instanceof Error ? error.message : "problema interno no servidor")
        }
    }
}