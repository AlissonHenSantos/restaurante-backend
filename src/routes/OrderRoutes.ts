import { Router } from "express";
import { OrderController } from "../controllers/OrderController"; 


export const orderRoutes = (orderController: OrderController) => {
    const router = Router();

    router.post("/order", orderController.createOrder.bind(orderController));
    router.get("/order", orderController.findOrder.bind(orderController))
    router.get("/order/:id", orderController.findById.bind(orderController));
    router.delete("/order/:id", orderController.deleteOrder.bind(orderController))

    router.post("/order/:idOrder/addproduct", orderController.addProduct.bind(orderController))
    router.delete("/order/:idOrder/removeproduct/:idItens", orderController.removeProduct.bind(orderController))
    
    router.get("/order/:idOrder/itens", orderController.findItensByOrder.bind(orderController))
    router.get("/tables/:tableId/order", orderController.findOpenOrderByTableId.bind(orderController));
    router.patch("/order/:orderId/finish", orderController.finishOrder.bind(orderController));

    return router;
};