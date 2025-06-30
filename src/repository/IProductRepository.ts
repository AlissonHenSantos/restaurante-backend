import { Product } from "@prisma/client";

export interface IFindProduct {
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    findByCategory(categoryId: number): Promise<Product[]>
}
export interface ICreateProduct {
    createProduct(data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product>;
}
export interface IDeleteProduct {
    deleteProduct(id: number): Promise<void>;
}
export interface IUpdateProduct {
    updateProduct(id: number, data: Pick<Product, "name" | "price" | "description" | "categoryId" | "image">): Promise<Product>;
}

export interface IProductRepository extends IFindProduct, ICreateProduct, IDeleteProduct, IUpdateProduct {}