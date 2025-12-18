import { type Request, type Response } from "express";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { AuthService } from "./AuthService.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";

export class AuthController {
    constructor(private authService: AuthService = new AuthService()) {}

    async login (req: Request, res: Response) {
        try {
            const { cpf, password } = req.body;
            const token = await this.authService.authUser(cpf, password);
            res.status(HttpStatusEnum.OK).json({token});
        } catch(err: any) {
            res.status(HttpStatusEnum.INVALID_CREDENTIALS).send({ error: err.message });
        }
    };

    async register (req: Request, res: Response) {
        try {
            const { email, password, cpf, name, invitationCode, xp, capibas } = req.body;
            const token = await this.authService.registerUser(email, password, cpf, name, invitationCode, xp, capibas);
            res.status(HttpStatusEnum.CREATED).json({ token });
        } catch(err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).send({ error: err.message });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user);
            const userData = await this.authService.profileData(userId);
            res.status(HttpStatusEnum.OK).json(userData);
        } catch (err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).send({error: err.message });
        }
    }

    async getXp(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user);
            const user = await this.authService.profileData(userId);
            res.status(HttpStatusEnum.OK).json({ xp: user.xp });
        } catch (error: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    async addXp(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user);
            const { amount } = req.body;

            if (!amount || amount <= 0) {
                res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: true, message: MessagesEnum.ERROR_INVALID_XP_AMOUNT });
                return;
            }

            const updatedUser = await this.authService.addUserReward(userId, amount, 0);
            res.status(HttpStatusEnum.OK).json({ xp: updatedUser.xp });
        } catch (error: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    async capibasHistory(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user);
            const limit = req.query.limit ? Number(req.query.limit) : 20;

            if (!userId) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json(MessagesEnum.ERROR_INVALID_BODY);
            }

            const history = await this.authService.capibasHistory(userId, limit);
            return res.status(HttpStatusEnum.OK).json({ history });
        } catch (error: any) {
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
        }
    }
}
