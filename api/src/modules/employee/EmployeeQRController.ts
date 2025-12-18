import { type Request, type Response } from "express";
import { EmployeeQRService } from "./EmployeeQRService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { authenticate } from "../../middleware/authenticate.js";

export class EmployeeQRController {
    constructor(private qrService: EmployeeQRService = new EmployeeQRService()) {}

    async createQRCode(req: Request, res: Response) {
        try {
            const employeeId = Number(res.locals.user);
            const { xp, capibas, location, notes, expiresInHours } = req.body;

            if (!xp || xp <= 0) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json({
                    error: "XP deve ser um valor positivo"
                });
            }

            const qrCode = await this.qrService.createQRCode(
                employeeId,
                xp,
                capibas || 250,
                location,
                notes,
                expiresInHours
            );

            res.status(HttpStatusEnum.CREATED).json(qrCode);
        } catch (err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                error: err.message || "Erro ao criar QR Code",
            });
        }
    }

    async getQRHistory(req: Request, res: Response) {
        try {
            const employeeId = Number(res.locals.user);
            const limit = req.query.limit ? Number(req.query.limit) : 20;

            const history = await this.qrService.getEmployeeQRHistory(employeeId, limit);
            res.status(HttpStatusEnum.OK).json({ history });
        } catch (err: any) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
                error: err.message || MessagesEnum.ERROR_SERVER,
            });
        }
    }
}

