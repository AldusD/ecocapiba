import { AuthRepository } from "./AuthRepository.js";
import { generateAccessToken } from "../../utils/jwt.utils.js"
import { generateInvitationCode } from "../../utils/invitationCode.utils.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const CAPIBA_REWARD = Number(process.env.CAPIBA_REWARD as string);
const XP_REWARD = Number(process.env.XP_REWARD as string);


export class AuthService {
    private authRepository = new AuthRepository();

    async authUser (email: string, password: string) : Promise<string> {
        const dbUser = await this.authRepository.getByEmail(email);

        if (!dbUser || !await bcrypt.compare(password, dbUser.password)) {
            throw new Error("Invalid credentials!");
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

        // Email validation
        let dbUser = await this.authRepository.getByEmail(email);
        if (dbUser) throw new Error("Email already registered!");

        // CPF validation
        dbUser = await this.authRepository.getByCPF(cpf);
        if (dbUser) throw new Error("CPF already registered!")
        
        let inviterUser = null
        if (invitationCode) {
            inviterUser = await this.authRepository.getByInvitationCode(invitationCode);
            
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
        
                // User inviter rewards
                if (inviterUser) {
                    await this.authRepository.addReward(inviterUser.id, XP_REWARD, CAPIBA_REWARD)

                    await this.authRepository.createInvitationLog(inviterUser.id, user.id, XP_REWARD, CAPIBA_REWARD);
                }

                const token = generateAccessToken(user.id);
                return token;
            } catch (err: any) {
                if (err.code === 'P2002') {
                    attempts++;
                    continue;
                }
                throw err;
            }
        }
        
        throw new Error('Could not generate unique invitation code');
    }

    async profileData(userId: number) {
        const user = await this.authRepository.getById(userId);

        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    }
}