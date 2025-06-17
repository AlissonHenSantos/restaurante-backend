import { Category } from "../../generated/prisma";

export interface ICategoryRepository {
    findAll(): Promise<Category[]>;
    findById(id: number): Promise<Category>;
    createCategory(data: Pick<Category, "category">): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
    updateCategory(id: number, data: Pick<Category, "category">): Promise<Category>;
}