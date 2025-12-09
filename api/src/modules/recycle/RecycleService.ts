import { RecycleRepository } from "./RecycleRepository.js";

export class RecycleService {
  private recycleRepository = new RecycleRepository();

  private readonly BASE_MULTIPLIER = 1.0;
  private readonly WEEKLY_BONUS = 0.1;
  private readonly MAX_MULTIPLIER = 1.7;

  // Alterado para receber string
  async checkRecycle(userId: number, currentDate: Date) {
    const hasRecycled = await this.recycleRepository.getRecyclesByDate(
      userId,
      currentDate
    );
    return hasRecycled !== null;
  }

  // Alterado para receber string
  async registerRecycle(userId: string, currentDate: Date) {
    try {
      return await this.recycleRepository.create(
        userId,
        currentDate
      );
    } catch (error) {
      throw new Error("Failed to register recycle!");
    }
  }

  // Alterado para receber string
  async getStreakMultiplier(userId: string): Promise<{ streakWeeks: number, multiplier: number }> {
    let streakWeeks = 0;
    let checkDate = new Date();

    const currentWeekRange = this.getWeekRange(checkDate);
    const recycledThisWeek = await this.recycleRepository.hasRecycleInPeriod(
      userId,
      currentWeekRange.start,
      currentWeekRange.end
    );

    if (recycledThisWeek) {
      streakWeeks++;
    }

    checkDate.setDate(checkDate.getDate() - 7);
    let keepChecking = true;

    while (keepChecking && streakWeeks < 10) {
      const { start, end } = this.getWeekRange(checkDate);

      const hasRecycled = await this.recycleRepository.hasRecycleInPeriod(
        userId,
        start,
        end
      );

      if (hasRecycled) {
        streakWeeks++;
        checkDate.setDate(checkDate.getDate() - 7);
      } else {
        keepChecking = false;
      }
    }

    let multiplier = this.BASE_MULTIPLIER + (streakWeeks * this.WEEKLY_BONUS);
    
    if (multiplier > this.MAX_MULTIPLIER) {
      multiplier = this.MAX_MULTIPLIER;
    }

    multiplier = Math.round(multiplier * 10) / 10;

    return { streakWeeks, multiplier };
  }

  private getWeekRange(date: Date) {
    const current = new Date(date);
    const day = current.getDay(); 
    
    const diffToSunday = current.getDate() - day; 
    
    const startOfWeek = new Date(current.setDate(diffToSunday));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { start: startOfWeek, end: endOfWeek };
  }
}