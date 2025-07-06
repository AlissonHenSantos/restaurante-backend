import { Category } from "@prisma/client";

export interface IFindCategory {
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category>;
}

export interface ICreateCategory {
    createCategory(data: Pick<Category, "category">): Promise<Category>;
}
export interface IDeleteCategory {
    deleteCategory(id: string): Promise<void>;
}
export interface IUpdateCategory {
    updateCategory(id: string, data: Pick<Category, "category">): Promise<Category>;
}
export interface ICategoryRepository extends IFindCategory, ICreateCategory, IDeleteCategory, IUpdateCategory {}