import {} from "express";
import { RecycleService } from "./RecycleService.js";
export class RecycleController {
    recycleService;
    constructor(recycleService = new RecycleService()) {
        this.recycleService = recycleService;
    }
    async checkRecycle(req, res) {
        try {
            const { userId, date } = req.body;
            const hasRecycled = await this.recycleService.checkRecycle(userId, new Date(date));
            return res.status(200).json({ hasRecycled });
        }
        catch (error) {
            return res.status(500).json({ error: "Error checking recycle status" });
        }
    }
    async create(req, res) {
        try {
            const { userId, doneDate } = req.body;
            const registerRecycle = await this.recycleService.registerRecycle(userId, new Date(doneDate));
            return res.status(200).json({ registerRecycle });
        }
        catch (error) {
            return res.status(500).json({ error: "Failed to create recycle!" });
        }
    }
}
//# sourceMappingURL=RecycleController.js.map