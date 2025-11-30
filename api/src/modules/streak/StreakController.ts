import { type Request, type Response } from "express";
import { StreakService } from "./StreakService.js";

export class StreakController {
  constructor(private streakService: StreakService = new StreakService()) {}

  async getMultiplier(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const result = await this.streakService.calculateMultiplier(userId);

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error calculating streak multiplier" });
    }
  }
}
