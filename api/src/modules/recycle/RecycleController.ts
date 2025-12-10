import { type Request, type Response } from "express";
import { RecycleService } from "./RecycleService.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";


export class RecycleController {
  constructor(private recycleService: RecycleService = new RecycleService()) {}

  async checkRecycle(req: Request, res: Response) {
    try {
      const { userId, date } = req.body;

      const hasRecycled = await this.recycleService.checkRecycle(
        userId,
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

      const registerRecycle = await this.recycleService.registerRecycle(
        userId,
        new Date(doneDate)
      );
      return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CREATING_RECYCLE);
    }
  }

  async getCalendar(req: Request, res: Response) {
    try {
      const userId = Number(res.locals.user);
      const { month, year } = req.body;

      if (month === undefined || year === undefined) {
        return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: "Month and year are required" });
      }

      const days = await this.recycleService.getDaysRecycledInMonth(
        userId,
        month,
        year
      );
      return res.status(HttpStatusEnum.OK).json({ days });
    } catch (error) {
      return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CHECKING_RECYCLE);
    }
  }
}
