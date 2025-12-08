import { type Request, type Response } from "express";
import { AuthService } from "./AuthService.js";
export declare class AuthController {
    private authService;
    constructor(authService?: AuthService);
    login(req: Request, res: Response): Promise<void>;
    register(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map