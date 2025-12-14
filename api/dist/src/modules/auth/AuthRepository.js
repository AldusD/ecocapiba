import { PrismaClient } from "@prisma/client";
export class AuthRepository {
    prisma = new PrismaClient();
    async getByEmail(email) {
        return await this.prisma.user.findUnique({
            where: { email: email }
        });
    }
    async getByCPF(cpf) {
        return await this.prisma.user.findUnique({
            where: { cpf: cpf }
        });
    }
    async getById(id) {
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
    async getByInvitationCode(invitationCode) {
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
            where: { invitationCode: invitationCode }
        });
    }
    async create(email, password, cpf, name, invitationCode, xp, capibas) {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password,
                cpf: cpf,
                name: name,
                invitationCode: invitationCode,
            }
        });
    }
    async addReward(userId, xp, capibas) {
        return await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                xp: { increment: xp },
                capibas: { increment: capibas }
            }
        });
    }
    async update(id, data) {
        return await this.prisma.user.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return await this.prisma.user.delete({
            where: { id }
        });
    }
    async createInvitationLog(inviterId, invitedId, xp, capibas) {
        return await this.prisma.invitationLog.create({
            data: {
                inviterId: inviterId,
                invitedId: invitedId,
                capibas: capibas,
                xp: xp
            }
        });
    }
}
//# sourceMappingURL=AuthRepository.js.map