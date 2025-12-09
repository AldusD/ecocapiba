import { RecycleRepository } from "./RecycleRepository.js";
export class RecycleService {
    recycleRepository = new RecycleRepository();
    async checkRecycle(userId, dateToCheck) {
        const hasRecycled = await this.recycleRepository.getRecyclesByDate(userId, dateToCheck);
        return hasRecycled !== null;
    }
    async registerRecycle(userId, dateToCheck) {
        try {
            const registerRecyle = await this.recycleRepository.create(userId, dateToCheck);
        }
        catch (error) {
            throw new Error("Failed to register recycle!");
        }
    }
}
//# sourceMappingURL=RecycleService.js.map