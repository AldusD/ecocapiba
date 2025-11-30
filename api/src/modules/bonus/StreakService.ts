import { RecycleRepository } from "../recycle/RecycleRepository.js"; 

export class StreakService {
  private recycleRepository = new RecycleRepository();

  // Configurações da Regra de Negócio
  private readonly BASE_MULTIPLIER = 1.0;
  private readonly WEEKLY_BONUS = 0.1;
  private readonly MAX_MULTIPLIER = 1.7;

  async calculateMultiplier(userId: string): Promise<{ streakWeeks: number, multiplier: number }> {
    let streakWeeks = 0;
    let keepChecking = true;
    
    let checkDate = new Date();

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
    const day = current.getDay(); // 0 (Dom) a 6 (Sab)
    
    const diffToSunday = current.getDate() - day; 
    
    const startOfWeek = new Date(current.setDate(diffToSunday));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { start: startOfWeek, end: endOfWeek };
  }
}