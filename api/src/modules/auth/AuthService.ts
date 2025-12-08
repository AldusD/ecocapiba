import { AuthRepository } from "./AuthRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js"
import { generateInvitationCode } from "../../utils/invitationCode.utils.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { SystemConstantsEnum } from "../shared/enums/systemConstantsEnum.js";
import { PrismaErrorEnum } from "../shared/enums/prismaErrorEnum.js";
import bcrypt from "bcrypt";

export class AuthService {
    private authRepository = new AuthRepository();

    async authUser (email: string, password: string) : Promise<string> {
        const dbUser = await this.authRepository.getByEmail(email);

        if (!dbUser || !await bcrypt.compare(password, dbUser.password)) {
            throw new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS);
        }
        const userId = dbUser.id;

        const token = generateAccessToken(userId);
        return token;
    }

    async registerUser(
        email: string,
        password: string,
        cpf: string,
        name: string,
        invitationCode: string
    ) : Promise<string> {

        // Validação de email
        let dbUser = await this.authRepository.getByEmail(email);
        if (dbUser) throw new Error(MessagesEnum.ERROR_EMAIL_ALREADY_REGISTERED);

        // Validação de CPF
        dbUser = await this.authRepository.getByCPF(cpf);
        if (dbUser) throw new Error(MessagesEnum.ERROR_CPF_ALREADY_REGISTERED)
        
        // Validação do código de convite
        if (invitationCode) {
            const inviterUser = await this.authRepository.getByInvitationCode(invitationCode);
            
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
            
                const token = generateAccessToken(user.id);
                return token;
            } catch (err: any) {
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
}