import { Category } from "../../generated/prisma";
import { ICategoryRepository } from "../repository/ICategoryRepository";

export class CategoryService{

    constructor(private categoryRepository: ICategoryRepository) {}
    public async findAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }

    public async findById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findById(Number(id));

        if(!category) throw new Error("Usuário não encontrado")
            
        return category
    }

    public async createCategory(data: Partial<Category>): Promise<Category> {
        if (!data.category) {
            throw new Error("Digite o campo obrigatório: category");
        }
        return await this.categoryRepository.createCategory({ category: data.category });
    }

    public async deleteCategory(id: string): Promise<void> {
       
        const category = await this.categoryRepository.findById(Number(id));
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        await this.categoryRepository.deleteCategory(Number(id));
    }

    public async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
        const category = await this.categoryRepository.findById(Number(id));
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        if (!data.category) {
            throw new Error("Digite o campo obrigatório: category");
        }
        return await this.categoryRepository.updateCategory(Number(id), { category: data.category });
    }
}