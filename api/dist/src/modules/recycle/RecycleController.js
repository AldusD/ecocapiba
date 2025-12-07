import { RecycleService } from "./RecycleService.js";
import { MessagesEnum } from "../shared/enums/messagesEnum.js";
import { HttpStatusEnum } from "../shared/enums/httpStatusEnum.js";
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
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CHECKING_RECYCLE);
        }
    }
    async create(req, res) {
        try {
            const { userId, doneDate } = req.body;
            const registerRecycle = await this.recycleService.registerRecycle(userId, new Date(doneDate));
            return res.status(HttpStatusEnum.CREATED).json({ registerRecycle });
        }
        catch (error) {
            return res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).json(MessagesEnum.ERROR_CREATING_RECYCLE);
        }
    }
}
//# sourceMappingURL=RecycleController.js.map