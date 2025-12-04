import { type Request, type Response } from "express";
import { RecycleService } from "./RecycleService.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";


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

      return res.status(HttpStatusEnum.OK).json({ hasRecycled });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CHECKING_RECYCLE);
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
      return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CREATING_RECYCLE);
    }
  }
}
