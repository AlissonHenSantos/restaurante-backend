import { PrismaClient } from "../../generated/prisma";
import { Category } from "../../generated/prisma";
import { ICategoryRepository } from "../repository/ICategoryRepository";

export class CategoryService{
    constructor(private categoryRepository: ICategoryRepository) {}
    public async findAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }
    public async findById(id: string): Promise<Category> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new Error("O ID especificado não é válido.");
        }
        return await this.categoryRepository.findById(idNumber);
    }
    public async createCategory(data: Partial<Category>): Promise<Category> {
        if (!data.category) {
            throw new Error("Digite o campo obrigatório: category");
        }
        return await this.categoryRepository.createCategory({ category: data.category });
    }
    public async deleteCategory(id: string): Promise<void> {
        const idNumber = Number(id);

        const category = await this.categoryRepository.findById(idNumber);
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        if (isNaN(idNumber)) {
            throw new Error("O ID especificado não é válido.");
        }
        await this.categoryRepository.deleteCategory(idNumber);
    }
    
    public async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        const idNumber = Number(id);
        if (isNaN(idNumber)) {
            throw new Error("O ID especificado não é válido.");
        }
        if (!data.category) {
            throw new Error("Digite o campo obrigatório: category");
        }
        return await this.categoryRepository.updateCategory(idNumber, { category: data.category });
    }
}