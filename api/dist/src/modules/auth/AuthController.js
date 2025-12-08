import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { AuthService } from "./AuthService.js";
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
        }
    }
}
//# sourceMappingURL=AuthController.js.map