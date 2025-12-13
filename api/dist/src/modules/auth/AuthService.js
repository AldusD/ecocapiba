import { AuthRepository } from "./AuthRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js";
import { generateInvitationCode } from "../../utils/invitationCode.utils.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { SystemConstantsEnum } from "../shared/enums/systemConstantsEnum.js";
import { PrismaErrorEnum } from "../shared/enums/prismaErrorEnum.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const CAPIBA_REWARD = Number(process.env.CAPIBA_REWARD);
const XP_REWARD = Number(process.env.XP_REWARD);
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
<<<<<<< HEAD
    getXpByEmail(email) {
        const dbUser = this.authRepository.getByEmail(email);
        return User.ofDbUser(dbUser);
    }
    updateXp(email, newXp) {
        const dbUser = this.authRepository.updateXp(email, newXp);
        return User.ofDbUser(dbUser);
=======
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
        let inviterUser = null;
        if (invitationCode) {
            inviterUser = await this.authRepository.getByInvitationCode(invitationCode);
            if (!inviterUser) {
                throw new Error(MessagesEnum.ERROR_INVALID_INVITATION_CODE);
            }
        }
        let attempts = 0;
        while (attempts < SystemConstantsEnum.INVITATION_MAX_ATTEMPTS) {
            try {
                const invitationCode = generateInvitationCode();
                password = await bcrypt.hash(password, SystemConstantsEnum.BCRYPT_SALT_ROUNDS);
                const user = await this.authRepository.create(email, password, cpf, name, invitationCode);
                // User inviter rewards
                if (inviterUser) {
                    await this.authRepository.addReward(inviterUser.id, XP_REWARD, CAPIBA_REWARD);
                    await this.authRepository.createInvitationLog(inviterUser.id, user.id, XP_REWARD, CAPIBA_REWARD);
                }
                const token = generateAccessToken(user.id);
                return token;
            }
            catch (err) {
                // Erro de 'unique constraint' do prisma
                if (err.code === PrismaErrorEnum.UNIQUE_CONSTRAINT) {
                    attempts++;
                    continue;
                }
                throw new Error(MessagesEnum.ERROR_GENERATING_INVITATION_CODE);
            }
        }
        throw new Error(MessagesEnum.ERROR_GENERATING_INVITATION_CODE);
    }
    async profileData(userId) {
        const user = await this.authRepository.getById(userId);
        if (!user) {
            throw new Error(MessagesEnum.ERROR_USER_NOT_FOUND);
        }
        return user;
>>>>>>> b509defe8054189460f3895086c162d1bb49bfc8
    }
}
//# sourceMappingURL=AuthService.js.map