import { AuthRepository } from "./AuthRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js";
import { generateInvitationCode } from "../../utils/invitationCode.utils.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import bcrypt from "bcrypt";
export class AuthService {
    authRepository = new AuthRepository();
    async authUser(email, password) {
        const dbUser = await this.authRepository.getByEmail(email);
        if (!dbUser || !await bcrypt.compare(password, dbUser.password)) {
            throw new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS);
        }
        const userId = dbUser.id;
        const token = generateAccessToken(userId);
        return token;
    }
    async registerUser(email, password, cpf, name, invitationCode) {
        // Validação de email
        let dbUser = await this.authRepository.getByEmail(email);
        if (dbUser)
            throw new Error(MessagesEnum.ERROR_EMAIL_ALREADY_REGISTERED);
        // Validação de CPF
        dbUser = await this.authRepository.getByCPF(cpf);
        if (dbUser)
            throw new Error(MessagesEnum.ERROR_CPF_ALREADY_REGISTERED);
        // Validação do código de convite
        if (invitationCode) {
            const inviterUser = await this.authRepository.getByInvitationCode(invitationCode);
            if (!inviterUser) {
                throw new Error(MessagesEnum.ERROR_INVALID_INVITATION_CODE);
            }
        }
        let attempts = 0;
        const maxAttempts = 5;
        while (attempts < maxAttempts) {
            try {
                const invitationCode = generateInvitationCode();
                password = await bcrypt.hash(password, 10);
                const user = await this.authRepository.create(email, password, cpf, name, invitationCode);
                const token = generateAccessToken(user.id);
                return token;
            }
            catch (err) {
                // Erro de 'unique constraint' do prisma
                if (err.code === 'P2002') {
                    attempts++;
                    continue;
                }
                throw new Error(MessagesEnum.ERROR_GENERATING_INVITATION_CODE);
            }
        }
        throw new Error(MessagesEnum.ERROR_GENERATING_INVITATION_CODE);
    }
}
//# sourceMappingURL=AuthService.js.map