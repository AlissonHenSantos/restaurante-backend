import { Order, OrderItem, Product } from "@prisma/client";


interface IFindOrder{
    find(): Promise<Order[]>
    findById(id: string): Promise<Order>
    findOpenOrderByTableId(tableId: string): Promise<Order | null>
}

interface ICreateOrder{
    createOrder(data: Omit<Order, "id">): Promise<Order>
}

interface IDeleteOrder{
    deleteOrder(id: string): Promise<void>
}
interface IUpdateOrder{
   updateOrder(id: string, data: Partial<Omit<Order, "id">>) 
   finishOrder(orderId: string): Promise<Order>
}

export interface IOrderRepository extends IFindOrder, ICreateOrder, IDeleteOrder, IUpdateOrder{
    
}