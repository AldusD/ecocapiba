import { RecycleRepository } from "./RecycleRepository.js";

export class RecycleService {
  private recycleRepository = new RecycleRepository();

  async checkRecycle(userId: number, dateToCheck: Date) {
    const hasRecycled = await this.recycleRepository.getRecyclesByDate(
      userId,
      dateToCheck
    );
    return hasRecycled !== null;
  }

  async registerRecycle(userId: number, dateToCheck: Date) {
    try {
      const registerRecyle = await this.recycleRepository.create(
        userId,
        dateToCheck
      );
    } catch (error) {
      throw new Error("Failed to register recycle!");
    }
  }

  async getDaysRecycledInMonth(userId: number, month: number, year: number) {
    return await this.recycleRepository.getDaysRecycledInMonth(userId, month, year);
  }
}