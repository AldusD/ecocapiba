import { PrismaClient } from "@prisma/client";
import type { RecyclesMade } from "@prisma/client";

export class RecycleRepository {
  private prisma = new PrismaClient();

  async getRecylesById(id: string): Promise<number | null> {
    const recycleById = await this.prisma.recyclesMade.findUnique({
      where: { id: Number(id) },
      select: { userId: true },
    });

    return recycleById ? recycleById.userId : null;
  }

  async getRecyclesByDate(
    userId: string,
    doneDate: Date
  ): Promise<Date | null> {
    const startOfDay = new Date(doneDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(doneDate);
    endOfDay.setHours(23, 59, 59, 999);

    const recycleByDate = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: Number(userId),
        doneDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return recycleByDate ? recycleByDate.doneDate : null;
  }

  async getRecyclesByUserId(userId: string): Promise<RecyclesMade[] | null> {
    return await this.prisma.recyclesMade.findMany({
      where: { userId: Number(userId) },
      orderBy: { doneDate: "desc" },
    });
  }

  async getDaysRecycledInMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<number[]> {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const recycles = await this.prisma.recyclesMade.findMany({
      where: {
        userId: Number(userId),
        doneDate: { gte: startDate, lte: endDate },
      },
      select: { doneDate: true },
    });

    return recycles.map((r) => r.doneDate.getDate());
  }

  async create(userId: string, doneDate: Date): Promise<RecyclesMade> {
    return await this.prisma.recyclesMade.create({
      data: {
        userId: Number(userId),
        doneDate: doneDate,
      },
    });
  }

  async delete(id: string): Promise<RecyclesMade> {
    return await this.prisma.recyclesMade.delete({
      where: { id: Number(id) },
    });
  }

  // Método usado pela Streak
  async hasRecycleInPeriod(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
    const recycle = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: Number(userId),
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