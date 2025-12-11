<<<<<<< HEAD
import { UserSchema } from "./models/UserSchema.js";
import { UserRolerEnum } from "../shared/enums/userRolesEnum.js";
// In-memory storage for mock data (replace with actual database later)
let userXpStorage = {
    'aa@aa.com': 0
};
export class AuthRepository {
    getByEmail(email) {
        const xp = userXpStorage[email] || 0;
        return new UserSchema(1, email, 'senha', UserRolerEnum.COMMON, xp);
    } // TODO switch for actual query
    updateXp(email, newXp) {
        userXpStorage[email] = newXp;
        return new UserSchema(1, email, 'senha', UserRolerEnum.COMMON, newXp);
    } // TODO switch for actual query
=======
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
            },
            where: { invitationCode: invitationCode }
        });
    }
    async create(email, password, cpf, name, invitationCode) {
        return await this.prisma.user.create({
            data: {
                email: email,
                password: password,
                cpf: cpf,
                name: name,
                invitationCode: invitationCode
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
>>>>>>> b509defe8054189460f3895086c162d1bb49bfc8
}
//# sourceMappingURL=AuthRepository.js.map