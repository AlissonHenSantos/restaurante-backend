import { TableService } from "../services/TableService";
import { Request, Response } from "express";
import { Table } from "@prisma/client";

export class TableController {
  constructor(private tableService: TableService) {}

  public async getAllTables(req: Request, res: Response): Promise<Response<Table[]>> {
   try{
      const tables: Table[] = await this.tableService.getAllTables();
      return res.status(200).json(tables);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
   }
  }

  public async getTableById(req: Request, res: Response): Promise<Response<Table>> {
   try{
      const { id } = req.params;
      const table: Table | null = await this.tableService.getTableById(id);
      if (!table) {
        return res.status(404).json({ error: "Mesa não encontrada" });
      }
      return res.status(200).json(table);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
   }
  }

  public async createTable(req: Request, res: Response): Promise<Response<Table>> {
    try{
      const tableData = req.body;
      const newTable = await this.tableService.createTable(tableData);
      return res.status(201).json(newTable);
    }catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async updateTable(req: Request, res: Response): Promise<Response<Table>> {
    try{
      const { id } = req.params;
      const tableData = req.body;
      const updatedTable = await this.tableService.updateTable(id, tableData);
      return res.status(200).json(updatedTable);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public async deleteTable(req: Request, res: Response): Promise<Response<void>> {
    try {
      const { id } = req.params;
      await this.tableService.deleteTable(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}