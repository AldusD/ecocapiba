import { type Request, type Response } from "express";
import { EmployeeService } from "./EmployeeService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { authenticate } from "../../middleware/authenticate.js";

export class EmployeeController {
    constructor(private employeeService: EmployeeService = new EmployeeService()) {}

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json({
                    error: "Email e senha são obrigatórios"
                });
            }

            const token = await this.employeeService.authEmployee(email, password);
            res.status(HttpStatusEnum.OK).json({
                token: token,
                accessToken: token, // Compatibilidade com o frontend
            });
        } catch (err: any) {
            res.status(HttpStatusEnum.INVALID_CREDENTIALS).json({
                error: err.message || MessagesEnum.ERROR_INVALID_CREDENTIALS,
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { email, password, name, employeeId } = req.body;

            if (!email || !password || !name || !employeeId) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json({
                    error: "Todos os campos são obrigatórios"
                });
            }

            const token = await this.employeeService.registerEmployee(
                email,
                password,
                name,
                employeeId
            );

            res.status(HttpStatusEnum.CREATED).json({
                token: token,
                accessToken: token, // Compatibilidade com o frontend
            });
        } catch (err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                error: err.message || "Erro ao cadastrar funcionário",
            });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const employeeId = Number(res.locals.user);

            if (!employeeId) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json(
                    MessagesEnum.ERROR_INVALID_BODY
                );
            }

            const employee = await this.employeeService.profileData(employeeId);
            res.status(HttpStatusEnum.OK).json(employee);
        } catch (err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                error: err.message || MessagesEnum.ERROR_SERVER,
            });
        }
    }
}

