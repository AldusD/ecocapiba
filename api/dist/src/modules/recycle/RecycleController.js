import { RecycleService } from "./RecycleService.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
export class RecycleController {
    recycleService;
    constructor(recycleService = new RecycleService()) {
        this.recycleService = recycleService;
    }
    async checkRecycle(req, res) {
        try {
            const { userId, date } = req.body;
            const hasRecycled = await this.recycleService.checkRecycle(userId, new Date(date));
            return res.status(HttpStatusEnum.OK).json({ hasRecycled });
        }
        catch (error) {
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
        }
    }
    async create(req, res) {
        try {
            const { userId, doneDate } = req.body;
            const registerRecycle = await this.recycleService.registerRecycle(userId, new Date(doneDate));
            return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
        }
        catch (error) {
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
        }
    }
    async getCalendar(req, res) {
        try {
            const userId = Number(res.locals.user);
            const { month, year } = req.body;
            if (month === undefined || year === undefined) {
                return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json({ error: "Mês e ano são necessários" });
            }
            const days = await this.recycleService.getDaysRecycledInMonth(userId, month, year);
            return res.status(HttpStatusEnum.OK).json({ days });
        }
        catch (error) {
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CHECKING_RECYCLE);
        }
    }
    async getStreak(req, res) {
        try {
            const userId = Number(res.locals.user);
            if (!userId) {
                return res.status(HttpStatusEnum.UNPROCESSABLE_ENTITY).json(MessagesEnum.ERROR_INVALID_BODY);
            }
            const result = await this.recycleService.getStreakMultiplier(userId);
            return res.status(HttpStatusEnum.OK).json(result);
        }
        catch (error) {
            console.error(error);
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_SERVER);
        }
    }
}
//# sourceMappingURL=RecycleController.js.map