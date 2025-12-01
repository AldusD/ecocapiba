import { RecycleRepository } from "./RecycleRepository.js";
export class RecycleService {
    recycleRepository = new RecycleRepository();
    async checkRecycle(userId, currentDate) {
        const hasRecycled = await this.recycleRepository.getRecyclesByDate(userId, currentDate);
        return hasRecycled !== null;
    }
    async registerRecycle(userId, currentDate) {
        try {
            const registerRecyle = await this.recycleRepository.create(userId, currentDate);
        }
        catch (error) {
            throw new Error("Failed to register recycle!");
        }
    }
}
//# sourceMappingURL=RecycleService.js.map