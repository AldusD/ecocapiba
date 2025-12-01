import { RecycleRepository } from "./RecycleRepository.js";

export class RecycleService {
  private recycleRepository = new RecycleRepository();

  async checkRecycle(userId: number, currentDate: Date) {
    const hasRecycled = await this.recycleRepository.getRecyclesByDate(
      userId,
      currentDate
    );
    return hasRecycled !== null;
  }

  async registerRecycle(userId: number, currentDate: Date) {
    try {
      const registerRecyle = await this.recycleRepository.create(
        userId,
        currentDate
      );
    } catch (error) {
      throw new Error("Failed to register recycle!");
    }
  }
}