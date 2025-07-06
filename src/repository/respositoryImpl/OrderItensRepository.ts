import { PrismaClient, OrderItem } from "@prisma/client";
import { IOrderItemRepository } from "../IOrderItensRepository";

const prisma = new PrismaClient();

export class OrderItemRepository implements IOrderItemRepository {
    constructor(private prismaClient: PrismaClient){}

    
    async findByOrder(orderId: string): Promise<OrderItem[]> {
        return this.prismaClient.orderItem.findMany({
            where: { orderId },
            include: {
                product: true, // Inclui os detalhes do produto
            },
        });
    }

    async addProduct(item: Omit<OrderItem, "id">): Promise<OrderItem> {
        return this.prismaClient.orderItem.create({ data: item })

    }

    async removeProduct(id: string): Promise<OrderItem | null> {
        return await prisma.orderItem.delete({
            where: { id },
        });
    }

     async findById(id: string): Promise<OrderItem | null> {
    return prisma.orderItem.findUnique({
      where: { id }
    })
  }
 async delete(id: string): Promise<void> {
    await prisma.orderItem.delete({
      where: { id }
    })
  }
}