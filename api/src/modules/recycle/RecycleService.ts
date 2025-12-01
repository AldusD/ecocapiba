import { RecycleRepository } from "./RecycleRepository.js";

export class RecycleService {
  private recycleRepository = new RecycleRepository();

  async checkRecycle(userId: string, dateToCheck: Date) {
    const hasRecycled = await this.recycleRepository.getRecyclesByDate(
      userId,
      dateToCheck
    );
    return hasRecycled !== null;
  }

  async registerRecycle(userId: string, dateToCheck: Date) {
    try {
      const registerRecyle = await this.recycleRepository.create(
        userId,
        dateToCheck
      );
    } catch (error) {
      throw new Error("Failed to register recycle!");
    }
  }
}