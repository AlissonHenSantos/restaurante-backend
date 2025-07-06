import { Table } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export interface ITableRepository {
  findAll(): Promise<Table[]>;
  findById(id: string): Promise<Table | null>;
  create(table: Omit<Table, "id">, ): Promise<Table>;
  update(id: string, data: Omit<Table, "id">): Promise<Table>;
  delete(id: string): Promise<void>;
  markTableAsAvailable(tableId: string): Promise<Table>
}
