import { type Request, type Response } from "express";
import { RecycleService } from "./RecycleService.js";

export class RecycleController {
  constructor(private recycleService: RecycleService = new RecycleService()) {}

  async checkRecycle(req: Request, res: Response) {
    try {
      const { userId, date } = req.body;

      const parsedUserId = Number(userId);

      if (isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      const hasRecycled = await this.recycleService.checkRecycle(
        parsedUserId,
        new Date(date)
      );

      return res.status(200).json({ hasRecycled });
    } catch (error) {
      return res.status(500).json({ error: "Error checking recycle status" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userId, doneDate } = req.body;

      const parsedUserId = Number(userId);

      if (isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      const registerRecycle = await this.recycleService.registerRecycle(
        userId,
        new Date(doneDate)
      );
      return res.status(200).json({ registerRecycle });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create recycle!" });
    }
  }
}
