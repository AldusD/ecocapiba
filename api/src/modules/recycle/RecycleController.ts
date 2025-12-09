import { type Request, type Response } from "express";
import { RecycleService } from "./RecycleService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";

export class RecycleController {
  constructor(private recycleService: RecycleService = new RecycleService()) {}

  public async checkRecycle(req: Request, res: Response) {
    try {
      const { userId, date } = req.body;

      const hasRecycled = await this.recycleService.checkRecycle(
        userId,
        new Date(date)
      );

      return res.status(HttpStatusEnum.OK).json({ hasRecycled });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { userId, doneDate } = req.body;

      const registerRecycle = await this.recycleService.registerRecycle(
        userId,
        new Date(doneDate)
      );
      
      return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
    } catch (error) {
      
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
    }
  }

  public async getStreak(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json(MessagesEnum.ERROR_INVALID_BODY);
      }

      const result = await this.recycleService.getStreakMultiplier(userId);

      return res.status(HttpStatusEnum.OK).json(result);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
    }
  }
}