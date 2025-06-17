import { PrismaClient, Category } from "../../../generated/prisma";
import { IFindCategory, ICreateCategory, IDeleteCategory, IUpdateCategory } from "../ICategoryRepository";

export class CategoryRepositoryImpl implements IFindCategory, ICreateCategory, IDeleteCategory, IUpdateCategory {

    constructor(private prisma: PrismaClient) {
    }
    public async findAll(): Promise<Category[]> {
        return await this.prisma.category.findMany();
    }
    public async findById(id: number): Promise<Category> {
        return await this.prisma.category.findUnique({ where: { id: id } });
    }
    public async createCategory(data: Pick<Category, "category">): Promise<Category> {
        return await this.prisma.category.create({ data: data });
    }
    public async deleteCategory(id: number): Promise<void> {
        await this.prisma.category.delete({ where: { id: id }});
    }
    public async updateCategory(id: number, data: Pick<Category, "category">): Promise<Category> {
        return await this.prisma.category.update({ where: { id: id }, data: data });
    }
}