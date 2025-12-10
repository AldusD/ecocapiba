import { type User } from "../../generated/prisma/client.js";
export declare class AuthRepository {
    private prisma;
    getByEmail(email: string): Promise<User | null>;
    getByCPF(cpf: string): Promise<User | null>;
    getById(id: string): Promise<User | null>;
    getByInvitationCode(invitationCode: string): Promise<User | null>;
    create(email: string, password: string, cpf: string, name: string, invitationCode: string): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<User>;
}
//# sourceMappingURL=AuthRepository.d.ts.map