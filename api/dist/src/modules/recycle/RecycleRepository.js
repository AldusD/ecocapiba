import { PrismaClient } from "@prisma/client";
export class RecycleRepository {
    prisma = new PrismaClient();
    async getRecylesById(id) {
        const recycleById = await this.prisma.recyclesMade.findUnique({
            where: { id: Number(id) },
            select: { userId: true },
        });
        return recycleById ? recycleById.userId : null;
    }
    async getRecyclesByDate(userId, doneDate) {
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
    async getRecyclesByUserId(userId) {
        return await this.prisma.recyclesMade.findMany({
            where: { userId: Number(userId) },
            orderBy: { doneDate: "desc" },
        });
    }
    async getDaysRecycledInMonth(userId, month, year) {
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
    async create(userId, doneDate) {
        return await this.prisma.recyclesMade.create({
            data: {
                userId: Number(userId),
                doneDate: doneDate,
            },
        });
    }
    async delete(id) {
        return await this.prisma.recyclesMade.delete({
            where: { id: Number(id) },
        });
    }
    // Método usado pela Streak
    async hasRecycleInPeriod(userId, startDate, endDate) {
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
//# sourceMappingURL=RecycleRepository.js.map