import { PrismaClient, type User } from "@prisma/client";

export class AuthRepository {
    private prisma = new PrismaClient();

    async getByEmail (email: string) : Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email: email }
        })
    }

    async getByCPF (cpf: string) : Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { cpf: cpf }
        })
    }

    async getById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }

    async getByInvitationCode(invitationCode: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { invitationCode: invitationCode }
        });
    }

    async create (
        email: string,
        password: string,
        cpf: string,
        name: string,
        invitationCode: string
    ) : Promise<User>  {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password,
                cpf: cpf,
                name: name,
                invitationCode: invitationCode
            }
        })
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        return await this.prisma.user.update({
        where: { id },
        data
        });
    }

    async delete(id: number): Promise<User> {
        return await this.prisma.user.delete({
        where: { id }
        });
    }
}