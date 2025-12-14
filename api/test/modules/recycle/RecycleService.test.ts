import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RecycleService } from '../../../src/modules/recycle/RecycleService.js';
import { RecycleRepository } from '../../../src/modules/recycle/RecycleRepository.js';

// Mock RecycleRepository
jest.mock('../../../src/modules/recycle/RecycleRepository.js');

describe('RecycleService', () => {
  let recycleService: RecycleService;
  let mockRecycleRepository: jest.Mocked<RecycleRepository>;

  beforeEach(() => {
    mockRecycleRepository = {
      getRecyclesByDate: jest.fn(),
      create: jest.fn(),
      getDaysRecycledInMonth: jest.fn(),
      hasRecycleInPeriod: jest.fn(),
    } as any;

    recycleService = new RecycleService();
    (recycleService as any).recycleRepository = mockRecycleRepository;
  });

  describe('checkRecycle', () => {
    it('deve retornar true quando usuário reciclou na data', async () => {
      const testDate = new Date('2024-01-15');
      mockRecycleRepository.getRecyclesByDate.mockResolvedValue(testDate);

      const result = await recycleService.checkRecycle(1, testDate);

      expect(mockRecycleRepository.getRecyclesByDate).toHaveBeenCalledWith(1, testDate);
      expect(result).toBe(true);
    });

    it('deve retornar false quando usuário não reciclou na data', async () => {
      const testDate = new Date('2024-01-15');
      mockRecycleRepository.getRecyclesByDate.mockResolvedValue(null);

      const result = await recycleService.checkRecycle(1, testDate);

      expect(result).toBe(false);
    });
  });

  describe('registerRecycle', () => {
    it('deve registrar reciclagem com sucesso', async () => {
      const testDate = new Date('2024-01-15');
      const mockRecycle = {
        id: 1,
        userId: 1,
        doneDate: testDate,
      };
      mockRecycleRepository.create.mockResolvedValue(mockRecycle as any);

      const result = await recycleService.registerRecycle(1, testDate);

      expect(mockRecycleRepository.create).toHaveBeenCalledWith(1, testDate);
      expect(result).toEqual(mockRecycle);
    });

    it('deve lançar erro quando falha ao registrar', async () => {
      const testDate = new Date('2024-01-15');
      mockRecycleRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(recycleService.registerRecycle(1, testDate))
        .rejects.toThrow('Failed to register recycle!');
    });
  });

  describe('getStreakMultiplier', () => {
    it('deve calcular streak e multiplicador corretamente', async () => {
      // Mock para retornar true para a semana atual e 2 semanas anteriores
      mockRecycleRepository.hasRecycleInPeriod
        .mockResolvedValueOnce(true)  // Semana atual
        .mockResolvedValueOnce(true)  // Semana -1
        .mockResolvedValueOnce(true)  // Semana -2
        .mockResolvedValueOnce(false); // Semana -3 (para parar o loop)

      const result = await recycleService.getStreakMultiplier(1);

      expect(result.streakWeeks).toBe(3);
      expect(result.multiplier).toBe(1.3); // 1.0 + (3 * 0.1)
    });

    it('deve limitar multiplicador ao máximo de 1.7', async () => {
      // Mock para retornar true para 8 semanas (que resultaria em 1.8, mas deve ser limitado a 1.7)
      mockRecycleRepository.hasRecycleInPeriod
        .mockResolvedValueOnce(true)  // Semana atual
        .mockResolvedValueOnce(true)  // Semana -1
        .mockResolvedValueOnce(true)  // Semana -2
        .mockResolvedValueOnce(true)  // Semana -3
        .mockResolvedValueOnce(true)  // Semana -4
        .mockResolvedValueOnce(true)  // Semana -5
        .mockResolvedValueOnce(true)  // Semana -6
        .mockResolvedValueOnce(true)  // Semana -7
        .mockResolvedValueOnce(false); // Semana -8 (para parar)

      const result = await recycleService.getStreakMultiplier(1);

      expect(result.multiplier).toBe(1.7); // Limitado ao máximo
    });

    it('deve retornar multiplicador base quando não há streak', async () => {
      mockRecycleRepository.hasRecycleInPeriod.mockResolvedValue(false);

      const result = await recycleService.getStreakMultiplier(1);

      expect(result.streakWeeks).toBe(0);
      expect(result.multiplier).toBe(1.0);
    });
  });

  describe('getDaysRecycledInMonth', () => {
    it('deve retornar dias reciclados no mês', async () => {
      const mockDays = [1, 5, 10, 15, 20];
      mockRecycleRepository.getDaysRecycledInMonth.mockResolvedValue(mockDays);

      const result = await recycleService.getDaysRecycledInMonth(1, 0, 2024);

      expect(mockRecycleRepository.getDaysRecycledInMonth).toHaveBeenCalledWith(1, 0, 2024);
      expect(result).toEqual(mockDays);
    });
  });
});

