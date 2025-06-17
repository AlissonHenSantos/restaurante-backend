import { Request, Response } from "express";
import { Category } from "../../generated/prisma";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const categories: Category[] = await this.categoryService.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    public async findById(req: Request, res: Response): Promise<void> {
        try {
            const category: Category = await this.categoryService.findById(req.params.id);
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    public async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryData: Category = req.body;
            const newCategory: Category = await this.categoryService.createCategory(categoryData);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            await this.categoryService.deleteCategory(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    public async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryData: Category = req.body;
            const updatedCategory: Category = await this.categoryService.updateCategory(req.params.id, categoryData);
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json(error instanceof Error ? error.message : "Internal Server Error");
        }
    }
    

}