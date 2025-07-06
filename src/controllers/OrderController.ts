import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { Order } from "@prisma/client";

export class OrderController {
  constructor(private orderService: OrderService) { }

  async createOrder(req: Request, res: Response) {
    try {
      const order: Order = await this.orderService.createOrder(req.body)
      return res.status(200).send(order)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async updateOrder(req: Request, res: Response) {
    try {
      const orderUpdated = await this.orderService.updateOrder(req.params.id, req.body)
      return res.status(200).send(orderUpdated)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findOrder(req: Request, res: Response) {
    try {
      const order = await this.orderService.getAll()
      return res.status(200).send(order)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const order = await this.orderService.findById(req.params.id)
      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }
      return res.status(200).send(order)
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async deleteOrder(req: Request, res: Response) {
    try {
      await this.orderService.deleteOrder(req.params.id)
      return res.status(204).end("Pedido removido")
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async addProduct(req: Request, res: Response) {
    try {
      const productAdded = await this.orderService.addItemToOrder(req.params.idOrder, req.body)
      return res.status(200).send(productAdded)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async removeProduct(req: Request, res: Response) {

    try {
      const orderProductRemoved = await this.orderService.removeItemFromOrder(req.params.idOrder, req.params.idItens)
      return res.status(200).send(orderProductRemoved)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  async findItensByOrder(req: Request, res: Response) {
    try {
      const orderItens = await this.orderService.findItensByOrder(req.params.idOrder)
      return res.status(200).send(orderItens)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async findOpenOrderByTableId(req: Request, res: Response) {
    try {
      const openOrder = await this.orderService.getOpenOrderForTable(req.params.tableId)
      return res.status(200).send(openOrder)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async finishOrder(req: Request, res: Response) {
    try {
      const orderFinished = await this.orderService.finishOrder(req.params.orderId)
      return res.status(200).send(orderFinished)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}