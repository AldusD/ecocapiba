import type { RecyclesMade } from "@prisma/client";
import PrismaService from "../../db/PrismaService.js"; 

export class RecycleRepository {
  private prisma = PrismaService.getClient();

  private validateId(id: string): number | null {
    const parsed = Number(id);
    return isNaN(parsed) ? null : parsed;
  }

  async getRecylesById(id: string): Promise<number | null> {
    const parsedId = this.validateId(id);
    
    if (parsedId === null) return null;

    const recycleById = await this.prisma.recyclesMade.findUnique({
      where: { 
        id: parsedId 
      },
      select: { userId: true },
    });

    return recycleById ? recycleById.userId : null;
  }

  async getRecyclesByDate(
    userId: string,
    doneDate: Date
  ): Promise<Date | null> {
    const parsedUserId = this.validateId(userId);
    if (parsedUserId === null) return null; 

    const startOfDay = new Date(doneDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(doneDate);
    endOfDay.setHours(23, 59, 59, 999);

    const recycleByDate = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: parsedUserId,
        doneDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return recycleByDate ? recycleByDate.doneDate : null;
  }

  async getRecyclesByUserId(userId: string): Promise<RecyclesMade[] | null> {
    const parsedUserId = this.validateId(userId);
    
    // Se o ID for inválido, retorna lista vazia ou null
    if (parsedUserId === null) return null;

    return await this.prisma.recyclesMade.findMany({
      where: { userId: parsedUserId },
      orderBy: { doneDate: "desc" },
    });
  }

  async getDaysRecycledInMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<number[]> {
    const parsedUserId = this.validateId(userId);
    if (parsedUserId === null) return []; // Retorna array vazio

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const recycles = await this.prisma.recyclesMade.findMany({
      where: {
        userId: parsedUserId,
        doneDate: { gte: startDate, lte: endDate },
      },
      select: { doneDate: true },
    });

    return recycles.map((r) => r.doneDate.getDate());
  }

  async create(userId: string, doneDate: Date): Promise<RecyclesMade> {
    const parsedUserId = this.validateId(userId);
    
    // No create, se o ID for inválido, aqui devemos lançar ERRO
    if (parsedUserId === null) {
      throw new Error("Invalid User ID provided for creation");
    }

    return await this.prisma.recyclesMade.create({
      data: {
        userId: parsedUserId,
        doneDate: doneDate,
      },
    });
  }

  async delete(id: string): Promise<RecyclesMade> {
    const parsedId = this.validateId(id);
    
    if (parsedId === null) {
       throw new Error("Invalid Recycle ID provided for deletion");
    }

    return await this.prisma.recyclesMade.delete({
      where: { id: parsedId },
    });
  }

  async hasRecycleInPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    const parsedUserId = this.validateId(userId);
    if (parsedUserId === null) return false; // ID inválido nunca reciclou

    const recycle = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: parsedUserId,
        doneDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { id: true },
    });

    return recycle !== null;
  }
}