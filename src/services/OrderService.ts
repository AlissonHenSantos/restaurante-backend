import { Order, OrderItem, PrismaClient, Table } from "@prisma/client";
import { IOrderRepository } from "../repository/IOrderRepository";
import { IOrderItemRepository } from "../repository/IOrderItensRepository";
import { Decimal } from "@prisma/client/runtime/library";


import { TableRepositoryImpl } from "../repository/respositoryImpl/TableRepositoryImpl";
import { ProductRepositoryImpl } from "../repository/respositoryImpl/ProductRepositoryImpl";


export class OrderService {

  constructor(private order: IOrderRepository, private itens: IOrderItemRepository) {

  }
  private prismaClient = new PrismaClient();
  private tableRepository = new TableRepositoryImpl(this.prismaClient)
  private productR = new ProductRepositoryImpl(this.prismaClient)

  private async setTableAsOccupied(tableId: string) {
    const table = await this.tableRepository.findById(tableId);
    if (!table) throw new Error("Mesa não encontrada");

    const tableAtt: Omit<Table, "id"> = {
      ...table,
      status: "OCCUPIED",
    };

    await this.tableRepository.update(table.id, tableAtt);
  }

  public async findById(id: string): Promise<Order | null> {
    if (!id) throw new Error("ID do pedido é obrigatório");

    return this.order.findById(id);
  }

  public async createOrder(data: Omit<Order, "id" | "price">): Promise<Order> {
    const order = await this.order.createOrder(data)
    const itens: OrderItem[] = await this.itens.findByOrder(order.id);

    if (itens && itens.length > 0) {
      // inicializa total como Decimal(0)
      let total = new Decimal(0);

      for (const item of itens) {
        // Soma o preço (caso item.price seja null, usa 0)
        total = total.add(item.price ?? 0);
      }

      // Atualiza o total na ordem
      const orderUpdated: Omit<Order, "id"> = {
        ...order,
        total,
      };

      const updated = await this.order.updateOrder(order.id, orderUpdated);

      // Atualiza status da mesa após pedido
      await this.setTableAsOccupied(order.tableId);

      return updated;
    }

    // Se não houver itens ainda assim atualiza mesa
    await this.setTableAsOccupied(order.tableId);

    return order;
  }


  public async getAll() {
    return await this.order.find()
  }
  public async deleteOrder(id: string) {
    await this.order.deleteOrder(id)
  }

  async cancel(id: string) {
    const order = await this.order.findById(id)
    if (!order) {
      throw new Error("Pedido não encontrado")
    }

    const orderAtt: Omit<Order, "id"> = {
      tableId: order.tableId,
      status: "CANCELED",
      total: order.total,
      name: order.name,
      notes: order.notes,
      createdAt: order.createdAt,
      updatedAt: new Date(), // ou deixe o Prisma cuidar com `@updatedAt`
    }

    return await this.order.updateOrder(id, orderAtt)
  }


  async addItemToOrder(orderId: string, item: { productId: string; amount: number }) {
    const order = await this.order.findById(orderId)
    if (!order) throw new Error("Pedido não encontrado")

    const product = await this.productR.findById(item.productId)
    if (!product) throw new Error("Produto não encontrado")

    const unitPrice = new Decimal(product.price)
    const itemPrice = unitPrice.mul(item.amount)

    await this.prismaClient.orderItem.create({
      data: {
        orderId: orderId,
        productId: item.productId,
        amount: item.amount,
        price: itemPrice,
      }
    })

    const allItems = await this.itens.findByOrder(orderId)

    let total = new Decimal(0)
    for (const i of allItems) {
      total = total.add(i.price)
    }

    const updatedOrder = await this.order.updateOrder(orderId, {
      ...order,
      total,
    })

    return updatedOrder
  }

  async removeItemFromOrder(orderId: string, itemId: string) {

    const order = await this.order.findById(orderId)
    if (!order) throw new Error("Pedido não encontrado")


    const item = await this.itens.findById(itemId)
    if (!item) throw new Error("Item não encontrado")
    if (item.orderId !== orderId) throw new Error("Item não pertence ao pedido informado")

    await this.itens.delete(itemId)

    const remainingItems = await this.itens.findByOrder(orderId)

    const newTotal = remainingItems.reduce((acc, current) => {
      return acc.add(current.price)
    }, new Decimal(0))

    const updatedOrder = await this.order.updateOrder(orderId, {
      total: newTotal
    })

    return updatedOrder
  }

  public async findItensByOrder(orderId: string): Promise<OrderItem[]> {
    return await this.itens.findByOrder(orderId)
  }

  public async getOpenOrderForTable(tableId: string) {
    const order = await this.order.findOpenOrderByTableId(tableId)
    if (!order) {
      throw new Error("Nenhum pedido aberto encontrado para esta mesa.")
    }


    return order
  }
  public async finishOrder(orderId: string) {
    const order = await this.order.findById(orderId)
    if (!order) throw new Error("Pedido não encontrado")

    if (order.status === "FINISHED") {
      throw new Error("Pedido já está finalizado")
    }

    // Finaliza o pedido
    const updatedOrder = await this.order.finishOrder(orderId)

    // Libera a mesa
    await this.tableRepository.markTableAsAvailable(order.tableId)

    return updatedOrder
  }

}
