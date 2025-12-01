import { type Request, type Response } from "express";
import { StreakService } from "./StreakService.js";

export class StreakController {
  constructor(private streakService: StreakService = new StreakService()) {}

  async getMultiplier(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const parsedUserId = Number(userId);
      
      if (isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid User ID" });
      }

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await this.streakService.calculateMultiplier(parsedUserId);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error calculating streak multiplier" });
    }
  }
}
