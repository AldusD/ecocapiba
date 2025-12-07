import { type Request, type Response } from "express";
import { AuthService } from "./AuthService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";

export class AuthController {
    constructor(private authService: AuthService = new AuthService()) {}

    login (req: Request, res: Response) {
        try {
            const email = "aa@aa.com";
            const password = "topSecret";
            const token = this.authService.authUser(email, password);
            res.json({ token });
        } catch (error) {
            res.status(HttpStatusEnum.INVALID_CREDENTIALS).send({ error: MessagesEnum.ERROR_INVALID_CREDENTIALS });
        }
    }

    getXp(req: Request, res: Response) {
        try {
            const email = "aa@aa.com";
            const user = this.authService.getXpByEmail(email);
            res.status(HttpStatusEnum.OK).json({ xp: user.getXp() });
        } catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: MessagesEnum.ERROR_FETCHING_XP });
        }
    }

    addxp(req: Request, res: Response) {
        try {
            const email = "aa@aa.com";
            const { amount } = req.body;

            const user = this.authService.getXpByEmail(email);
            const newXp = user.addXp(amount);
            this.authService.updateXp(email, newXp);

            res.status(HttpStatusEnum.OK).json({ xp: newXp });
        } catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: MessagesEnum.ERROR_ADDING_XP });
        }
    }
}