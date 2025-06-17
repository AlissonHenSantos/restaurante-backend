import { Category } from "../../generated/prisma";

export interface IFindCategory {
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category>;
}

export interface ICreateCategory {
    createCategory(data: Pick<Category, "category">): Promise<Category>;
}
export interface IDeleteCategory {
    deleteCategory(id: number): Promise<void>;
}
export interface IUpdateCategory {
    updateCategory(id: number, data: Pick<Category, "category">): Promise<Category>;
}
export interface ICategoryRepository extends IFindCategory, ICreateCategory, IDeleteCategory, IUpdateCategory {

}