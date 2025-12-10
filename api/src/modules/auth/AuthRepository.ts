import { PrismaClient, type User, type InvitationLog } from "@prisma/client";

export type SafeUser = {
    id: number;
    name: string;
    email: string;
    cpf: string;
    invitationCode: string;
    xp: number;
    capibas: number;
}

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

    async getById(id: number): Promise<SafeUser | null> {
        return await this.prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                invitationCode: true,
                xp: true,
                capibas: true,
            },
            where: { id: id }
        });
    }

    async getByInvitationCode(invitationCode: string): Promise<SafeUser | null> {
        return await this.prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                invitationCode: true,
            },
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

    async addReward(
        userId: number,
        xp: number,
        capibas: number
    ) : Promise<User> {
        return await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                xp: {increment: xp},
                capibas: {increment: capibas}
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

    async createInvitationLog(
        inviterId: number,
        invitedId: number,
        xp: number,
        capibas: number
    ): Promise<InvitationLog> {
        return await this.prisma.invitationLog.create({
            data: {
                inviterId: inviterId,
                invitedId: invitedId,
                capibas: capibas,
                xp: xp
            }
        })
    }
}