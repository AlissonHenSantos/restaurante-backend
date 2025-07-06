import { OrderItem } from "@prisma/client"

export interface IOrderItemRepository{
    addProduct(item: Omit<OrderItem, "id">): Promise<OrderItem>
    findByOrder(orderId: string)
    removeProduct(id: string)
    findById(id: string): Promise<OrderItem>
    delete(id: string): Promise<void>
}
