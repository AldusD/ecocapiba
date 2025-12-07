import {} from "express";
import { XpService } from "./XpService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
export class XpController {
    xpService;
    constructor(xpService = new XpService()) {
        this.xpService = xpService;
    }
    getXp(req, res) {
        try {
            const userId = req.userId; // Assuming userId is set by auth middleware
            if (!userId) {
                res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: "User not authenticated" });
                return;
            }
            const xp = this.xpService.getXpByUserId(userId);
            res.status(HttpStatusEnum.OK).json({ xp: xp.getXp() });
        }
        catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: "Error fetching XP" });
        }
    }
    addXp(req, res) {
        try {
            const userId = req.userId; // Assuming userId is set by auth middleware
            const { amount } = req.body;
            if (!userId) {
                res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: "User not authenticated" });
                return;
            }
            if (!amount || amount <= 0) {
                res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: "Invalid XP amount" });
                return;
            }
            const currentXp = this.xpService.getXpByUserId(userId);
            const newXpValue = currentXp.addXp(amount);
            this.xpService.updateXp(userId, newXpValue);
            res.status(HttpStatusEnum.OK).json({ xp: newXpValue });
        }
        catch (error) {
            res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ message: "Error adding XP" });
        }
    }
}
//# sourceMappingURL=XpController.js.map