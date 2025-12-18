import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RecycleRepository } from '../../../src/modules/recycle/RecycleRepository.js';

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    recyclesMade: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe('RecycleRepository', () => {
  let recycleRepository: RecycleRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      recyclesMade: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
    };

    recycleRepository = new RecycleRepository();
    (recycleRepository as any).prisma = mockPrismaClient;
  });

  describe('getRecylesById', () => {
    it('deve retornar userId quando reciclagem existe', async () => {
      mockPrismaClient.recyclesMade.findUnique.mockResolvedValue({ userId: 1 });

      const result = await recycleRepository.getRecylesById(1);

      expect(mockPrismaClient.recyclesMade.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { userId: true },
      });
      expect(result).toBe(1);
    });

    it('deve retornar null quando reciclagem não existe', async () => {
      mockPrismaClient.recyclesMade.findUnique.mockResolvedValue(null);

      const result = await recycleRepository.getRecylesById(999);

      expect(result).toBeNull();
    });
  });

  describe('getRecyclesByDate', () => {
    it('deve retornar data quando reciclagem existe na data', async () => {
      const testDate = new Date('2024-01-15');
      const mockRecycle = { doneDate: testDate };
      mockPrismaClient.recyclesMade.findFirst.mockResolvedValue(mockRecycle);

      const result = await recycleRepository.getRecyclesByDate(1, testDate);

      expect(result).toEqual(testDate);
    });

    it('deve retornar null quando não há reciclagem na data', async () => {
      const testDate = new Date('2024-01-15');
      mockPrismaClient.recyclesMade.findFirst.mockResolvedValue(null);

      const result = await recycleRepository.getRecyclesByDate(1, testDate);

      expect(result).toBeNull();
    });
  });

  describe('getRecyclesByUserId', () => {
    it('deve retornar lista de reciclagens do usuário', async () => {
      const mockRecycles = [
        { id: 1, userId: 1, doneDate: new Date('2024-01-15') },
        { id: 2, userId: 1, doneDate: new Date('2024-01-14') },
      ];
      mockPrismaClient.recyclesMade.findMany.mockResolvedValue(mockRecycles);

      const result = await recycleRepository.getRecyclesByUserId(1);

      expect(mockPrismaClient.recyclesMade.findMany).toHaveBeenCalledWith({
        where: { userId: 1 },
        orderBy: { doneDate: 'desc' },
      });
      expect(result).toEqual(mockRecycles);
    });
  });

  describe('getDaysRecycledInMonth', () => {
    it('deve retornar dias do mês em que houve reciclagem', async () => {
      // Usar datas específicas para evitar problemas de timezone
      const date1 = new Date(2024, 0, 5); // Janeiro 5
      const date2 = new Date(2024, 0, 15); // Janeiro 15
      const date3 = new Date(2024, 0, 20); // Janeiro 20
      const mockRecycles = [
        { doneDate: date1 },
        { doneDate: date2 },
        { doneDate: date3 },
      ];
      mockPrismaClient.recyclesMade.findMany.mockResolvedValue(mockRecycles);

      const result = await recycleRepository.getDaysRecycledInMonth(1, 0, 2024);

      expect(result).toHaveLength(3);
      expect(result).toContain(5);
      expect(result).toContain(15);
      expect(result).toContain(20);
    });

    it('deve retornar array vazio quando não há reciclagens no mês', async () => {
      mockPrismaClient.recyclesMade.findMany.mockResolvedValue([]);

      const result = await recycleRepository.getDaysRecycledInMonth(1, 0, 2024);

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('deve criar uma nova reciclagem', async () => {
      const testDate = new Date('2024-01-15');
      const mockRecycle = {
        id: 1,
        userId: 1,
        doneDate: testDate,
      };
      mockPrismaClient.recyclesMade.create.mockResolvedValue(mockRecycle);

      const result = await recycleRepository.create(1, testDate);

      expect(mockPrismaClient.recyclesMade.create).toHaveBeenCalledWith({
        data: {
          userId: 1,
          doneDate: testDate,
        },
      });
      expect(result).toEqual(mockRecycle);
    });
  });

  describe('delete', () => {
    it('deve deletar uma reciclagem', async () => {
      const mockRecycle = { id: 1, userId: 1, doneDate: new Date() };
      mockPrismaClient.recyclesMade.delete.mockResolvedValue(mockRecycle);

      const result = await recycleRepository.delete('1');

      expect(mockPrismaClient.recyclesMade.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockRecycle);
    });
  });

  describe('hasRecycleInPeriod', () => {
    it('deve retornar true quando há reciclagem no período', async () => {
      mockPrismaClient.recyclesMade.findFirst.mockResolvedValue({ id: 1 });

      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      const result = await recycleRepository.hasRecycleInPeriod(1, startDate, endDate);

      expect(result).toBe(true);
    });

    it('deve retornar false quando não há reciclagem no período', async () => {
      mockPrismaClient.recyclesMade.findFirst.mockResolvedValue(null);

      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      const result = await recycleRepository.hasRecycleInPeriod(1, startDate, endDate);

      expect(result).toBe(false);
    });
  });
});

