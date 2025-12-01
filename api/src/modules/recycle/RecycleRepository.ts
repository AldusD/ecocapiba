import type { RecyclesMade } from "@prisma/client";
import PrismaService from "../../db/PrismaService.js"; 

export class RecycleRepository {
  private prisma = PrismaService.getClient();

  async getRecylesById(id: number): Promise<number | null> {
    const recycleById = await this.prisma.recyclesMade.findUnique({
      where: { id },
      select: { userId: true },
    });

    return recycleById ? recycleById.userId : null;
  }

  async getRecyclesByDate(
    userId: number,
    doneDate: Date
  ): Promise<Date | null> {

    const startOfDay = new Date(doneDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(doneDate);
    endOfDay.setHours(23, 59, 59, 999);

    const recycleByDate = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: userId,
        doneDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return recycleByDate ? recycleByDate.doneDate : null;
  }

  async getRecyclesByUserId(userId: number): Promise<RecyclesMade[] | null> {

    return await this.prisma.recyclesMade.findMany({
      where: { userId: userId },
      orderBy: { doneDate: "desc" },
    });
  }

  async getDaysRecycledInMonth(
    userId: number,
    month: number,
    year: number
  ): Promise<number[]> {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const recycles = await this.prisma.recyclesMade.findMany({
      where: {
        userId: userId,
        doneDate: { gte: startDate, lte: endDate },
      },
      select: { doneDate: true },
    });

    return recycles.map((r) => r.doneDate.getDate());
  }

  async create(userId: number, doneDate: Date): Promise<RecyclesMade> {
    
    return await this.prisma.recyclesMade.create({
      data: {
        userId: userId,
        doneDate: doneDate,
      },
    });
  }

  async delete(id: number): Promise<RecyclesMade> {

    return await this.prisma.recyclesMade.delete({
      where: { id: id },
    });
  }

  async hasRecycleInPeriod(
    userId: number,
    startDate: Date,
    endDate: Date
  ): Promise<boolean> {
   
    const recycle = await this.prisma.recyclesMade.findFirst({
      where: {
        userId: userId,
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