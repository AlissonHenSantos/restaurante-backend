import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export const productRoutes = (productController: ProductController)=> {
    const router =  Router()

    router.get("/products", productController.findAll.bind(productController))
    router.get("/products/:id", productController.findById.bind(productController))
    router.post("/products", productController.createProduct.bind(productController))
    router.get("/products/category/:categoryId", productController.findByCategory.bind(productController))
    router.delete("/products/:id", productController.deleteProduct.bind(productController))
    router.put("/products/:id", productController.updateProduct.bind(productController))
    
    return router
}