import { type Request, type Response } from "express";
import { AuthService } from "./AuthService.js";

export class AuthController {
    constructor(private authService: AuthService = new AuthService()) {}

    async login (req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authUser(email, password);
            res.status(200).json({token});
        } catch {
            res.status(400).send({ error: "Invalid credentials" });
        }
    };

    async register (req: Request, res: Response) {
        try {
            const { email, password, cpf, name, invitationCode } = req.body;
            const token = await this.authService.registerUser(email, password, cpf, name, invitationCode);
            res.status(200).json({ token });
        } catch(err: any) {
            res.status(400).send({ error: err.message });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const userId = Number(res.locals.user);
            const userData = await this.authService.profileData(userId);
            res.status(200).json(userData);
        } catch (err: any) {
            res.status(400).send({error: err.message });
        }
    }
}