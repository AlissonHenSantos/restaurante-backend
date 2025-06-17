import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

export const categoryRoutes = (categoryController: CategoryController) => {
    const router = Router();
    router.get("/category", categoryController.findAll.bind(categoryController));
    router.post("/category", categoryController.createCategory.bind(categoryController));
    router.get("/category/:id", categoryController.findById.bind(categoryController));
    router.put("/category/:id", categoryController.updateCategory.bind(categoryController));
    router.delete("/category/:id", categoryController.deleteCategory.bind(categoryController));
    return router;
}