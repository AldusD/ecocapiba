import { PrismaClient, type Employee } from "@prisma/client";

export type SafeEmployee = {
    id: number;
    name: string;
    email: string;
    employeeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class EmployeeRepository {
    private prisma = new PrismaClient();

    async getByEmail(email: string): Promise<(SafeEmployee & { password: string }) | null> {
        const employee = await this.prisma.employee.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                employeeId: true,
                password: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!employee) return null;

        return employee as SafeEmployee & { password: string };
    }

    async getByEmployeeId(employeeId: string): Promise<(SafeEmployee & { password: string }) | null> {
        const employee = await this.prisma.employee.findUnique({
            where: { employeeId },
            select: {
                id: true,
                name: true,
                email: true,
                employeeId: true,
                password: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!employee) return null;

        return employee as SafeEmployee & { password: string };
    }

    async getById(id: number): Promise<SafeEmployee | null> {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                employeeId: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return employee;
    }

    async create(
        email: string,
        password: string,
        name: string,
        employeeId: string,
    ): Promise<Employee> {
        return await this.prisma.employee.create({
            data: {
                email,
                password,
                name,
                employeeId,
            },
        });
    }

    async update(id: number, data: Partial<Employee>): Promise<Employee> {
        return await this.prisma.employee.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Employee> {
        return await this.prisma.employee.delete({
            where: { id },
        });
    }
}

