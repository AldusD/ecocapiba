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
            where: { id }
        });
    }
    async getByInvitationCode(invitationCode) {
        return await this.prisma.user.findUnique({
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
}
//# sourceMappingURL=AuthRepository.js.map