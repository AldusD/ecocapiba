import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { AuthService } from "./AuthService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
export class AuthController {
    authService;
    constructor(authService = new AuthService()) {
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authUser(email, password);
            res.status(HttpStatusEnum.OK).json({ token });
        }
<<<<<<< HEAD
        catch (error) {
            res.status(HttpStatusEnum.INVALID_CREDENTIALS).send({ error: MessagesEnum.ERROR_INVALID_CREDENTIALS });
        }
    }
    getXp(req, res) {
        try {
            const email = "aa@aa.com";
            const user = this.authService.getXpByEmail(email);
            res.status(HttpStatusEnum.OK).json({ xp: user.getXp() });
        }
        catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: MessagesEnum.ERROR_FETCHING_XP });
        }
    }
    addXp(req, res) {
        try {
            const email = "aa@aa.com";
            const { amount } = req.body;
            const user = this.authService.getXpByEmail(email);
            const newXp = user.addXp(amount);
            this.authService.updateXp(email, newXp);
            res.status(HttpStatusEnum.OK).json({ xp: newXp });
        }
        catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: MessagesEnum.ERROR_ADDING_XP });
=======
        catch (err) {
            res.status(HttpStatusEnum.INVALID_CREDENTIALS).send({ error: err.message });
        }
    }
    ;
    async register(req, res) {
        try {
            const { email, password, cpf, name, invitationCode } = req.body;
            const token = await this.authService.registerUser(email, password, cpf, name, invitationCode);
            res.status(HttpStatusEnum.CREATED).json({ token });
        }
        catch (err) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).send({ error: err.message });
        }
    }
    async profile(req, res) {
        try {
            const userId = Number(res.locals.user);
            const userData = await this.authService.profileData(userId);
            res.status(HttpStatusEnum.OK).json(userData);
        }
        catch (err) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).send({ error: err.message });
>>>>>>> b509defe8054189460f3895086c162d1bb49bfc8
        }
    }
}
//# sourceMappingURL=AuthController.js.map