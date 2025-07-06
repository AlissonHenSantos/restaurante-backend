import { Product } from "@prisma/client";

export interface IFindProduct {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    findByCategory(categoryId: string): Promise<Product[]>
}
export interface ICreateProduct {
    createProduct(data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product>;
}
export interface IDeleteProduct {
    deleteProduct(id: string): Promise<void>;
}
export interface IUpdateProduct {
    updateProduct(id: string, data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product>;
}

export interface IProductRepository extends IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct {}