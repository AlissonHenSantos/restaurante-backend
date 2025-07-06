import { ITableRepository } from "../ITableRepository";
import { PrismaClient, Table } from "@prisma/client";

export class TableRepositoryImpl implements ITableRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findById(id: string): Promise<Table | null> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  async create(table: Omit<Table, "id">): Promise<Table> {
    return this.prisma.table.create({ data: table });
  }

  async update(id: string, data: Omit<Table, "id">): Promise<Table> {
    return this.prisma.table.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.table.delete({ where: { id } });
  }
  async markTableAsAvailable(tableId: string): Promise<Table> {
  return this.prisma.table.update({
    where: { id: tableId },
    data: {
      status: "AVALIABLE"
    }
  })
}
}