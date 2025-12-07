import { AuthRepository } from "./AuthRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js";
import { generateInvitationCode } from "../../utils/invitationCode.utils.js";
import bcrypt from "bcrypt";
export class AuthService {
    authRepository = new AuthRepository();
    async authUser(email, password) {
        const dbUser = await this.authRepository.getByEmail(email);
        if (!dbUser || !await bcrypt.compare(password, dbUser.password)) {
            throw new Error("Invalid credentials!");
        }
        const userId = dbUser.id;
        const token = generateAccessToken(userId);
        return token;
    }
    async registerUser(email, password, cpf, name, invitationCode) {
        // Email validation
        let dbUser = await this.authRepository.getByEmail(email);
        if (dbUser)
            throw new Error("Email already registered!");
        // CPF validation
        dbUser = await this.authRepository.getByCPF(cpf);
        if (dbUser)
            throw new Error("CPF already registered!");
        if (invitationCode) {
            const inviterUser = await this.authRepository.getByInvitationCode(invitationCode);
            if (!inviterUser) {
                throw new Error("Invalid invitation code!");
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
                if (err.code === 'P2002') {
                    attempts++;
                    continue;
                }
                throw err;
            }
        }
        throw new Error('Could not generate unique invitation code');
    }
    async profileData(userId) {
        const user = await this.authRepository.getById(userId);
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    }
}
//# sourceMappingURL=AuthService.js.map