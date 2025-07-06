import { ITableRepository } from "../repository/ITableRepository";
import { Table } from "@prisma/client";

export class TableService {
  constructor(private tableRepository: ITableRepository) {}

  async getAllTables(): Promise<Table[]> {
    return await this.tableRepository.findAll();
  }

  async getTableById(id: string): Promise<Table | null> {
    const table: Table = await this.tableRepository.findById(id);
    if (!table) {
      throw new Error("Mesa não encontrada");
    }
    return table;
  }

  async createTable(tableData: Omit<Table, "id">): Promise<Table> {
    return  await this.tableRepository.create(tableData);
  }

  async updateTable(id: string, tableData: Omit<Table, "id">): Promise<Table> {
    return  await this.tableRepository.update(id, tableData);
  }

  async deleteTable(id: string): Promise<void> {
    await this.tableRepository.delete(id);
  }
  
}