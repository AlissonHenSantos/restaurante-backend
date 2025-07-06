import { PrismaClient, Order} from "@prisma/client";
import { IOrderRepository } from "../IOrderRepository";


export class OrderRepositoy implements IOrderRepository{
    constructor(private prisma: PrismaClient){}
    

    public async find(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

   public async findById(id: string): Promise<Order | null> {
  if (!id) throw new Error("ID do pedido é obrigatório")

  return this.prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      table: true
    }
  })
}
    public async findOrderByTable(tableId: string) {
        return this.prisma.order.findFirst({
            where: { 
                tableId: tableId,
                status: "PENDING"
             }
        });
    }

    public async createOrder(data: Omit<Order, "id">): Promise<Order> {
        return this.prisma.order.create({
            data
        });
    }

    public async deleteOrder(id: string): Promise<void> {
        await this.prisma.order.delete({
            where: { id }
        });
    }

 public async updateOrder(id: string, data: Omit<Order, "id">): Promise<Order> {
  const { items, table, ...pureData } = data as any // remove os relacionamentos

  return this.prisma.order.update({
    where: { id },
    data: pureData
  })
}

async findOpenOrderByTableId(tableId: string): Promise<Order | null> {
  return this.prisma.order.findFirst({
    where: {
      tableId,
      status: {
        in: ["PENDING", "PREPARING", "READY"] 
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      },
      table: true
    },
    orderBy: {
      createdAt: "desc" 
    }
  })
}

async finishOrder(orderId: string): Promise<Order> {
  return this.prisma.order.update({
    where: { id: orderId },
    data: {
      status: "FINISHED"
    }
  })
}
    
}