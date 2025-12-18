import { PrismaClient, type RecycleQRCode } from "@prisma/client";

export class EmployeeQRRepository {
    private prisma = new PrismaClient();

    async create(
        code: string,
        employeeId: number,
        xp: number,
        capibas: number,
        location?: string,
        notes?: string,
        expiresAt?: Date
    ): Promise<RecycleQRCode> {
        return await this.prisma.recycleQRCode.create({
            data: {
                code,
                employeeId,
                xp,
                capibas,
                location: location ?? null,
                notes: notes ?? null,
                expiresAt: expiresAt ?? null,
            },
        });
    }

    async findByCode(code: string): Promise<RecycleQRCode | null> {
        return await this.prisma.recycleQRCode.findUnique({
            where: { code },
            include: {
                Employee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async markAsUsed(code: string, userId: number): Promise<RecycleQRCode> {
        return await this.prisma.recycleQRCode.update({
            where: { code },
            data: {
                used: true,
                usedBy: userId,
                usedAt: new Date(),
            },
        });
    }

    async getByEmployee(employeeId: number, limit = 20) {
        return await this.prisma.recycleQRCode.findMany({
            where: { employeeId },
            orderBy: { createdAt: "desc" },
            take: limit,
            select: {
                id: true,
                code: true,
                xp: true,
                capibas: true,
                location: true,
                notes: true,
                used: true,
                usedBy: true,
                usedAt: true,
                createdAt: true,
            },
        });
    }
}

