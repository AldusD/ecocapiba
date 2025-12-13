import { type Request, type Response } from "express";
import { RecycleService } from "./RecycleService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";

export class RecycleController {
  constructor(private recycleService: RecycleService = new RecycleService()) {}

  async create(req: Request, res: Response) {
    try {
      const { userId, doneDate } = req.body;

      const registerRecycle = await this.recycleService.registerRecycle(
        userId,
        new Date(doneDate)
      );
      
      return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
    } catch (error) {
      
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({error: true, message: MessagesEnum.ERROR_SERVER});
    }
  }

  async getCalendar(req: Request, res: Response) {
    try {
      const userId = Number(res.locals.user);
      const { month, year } = req.body;

      if (month === undefined || year === undefined) {
        return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({error: true, message: MessagesEnum.ERROR_INVALID_MONTH_YEAR});
      }

      const days = await this.recycleService.getDaysRecycledInMonth(
        userId,
        month,
        year
      );
      return res.status(HttpStatusEnum.OK).json({ days });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({error: true, message: MessagesEnum.ERROR_CHECKING_RECYCLE});
    }
  }

  async getStreak(req: Request, res: Response) {
    try {
      const userId = Number(res.locals.user)

      if (!userId) {
        return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json({error: true, message: MessagesEnum.ERROR_INVALID_BODY});
      }

      const result = await this.recycleService.getStreakMultiplier(userId);

      return res.status(HttpStatusEnum.OK).json(result);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({error: true, message: MessagesEnum.ERROR_SERVER});
    }
  }
}
