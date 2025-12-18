import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { QuizRepository } from '../../../src/modules/quiz/QuizRepository.js';
import { QuizAttempt } from '../../../src/modules/quiz/models/QuizAttempt.js';
import { QuizAttemptStatusEnum } from '../../../src/modules/shared/enums/quizAttemptStatusEnum.js';
import PrismaService from '../../../src/db/PrismaService.js';

// Mock PrismaService
const mockGetClient = jest.fn();
jest.mock('../../../src/db/PrismaService.js', () => ({
  __esModule: true,
  default: {
    getClient: mockGetClient,
  },
}));

describe('QuizRepository', () => {
  let quizRepository: QuizRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      quizAttempt: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };

    mockGetClient.mockReturnValue(mockPrismaClient);
    // Reset static property
    (QuizRepository as any).dbClient = mockPrismaClient;
    quizRepository = new QuizRepository();
  });

  describe('getLastAttempt', () => {
    it('deve retornar a última tentativa do usuário', async () => {
      const mockAttempt = {
        id: 1,
        userId: 1,
        quizId: 1,
        status: QuizAttemptStatusEnum.PASSED,
        createdAt: new Date('2024-01-15'),
      };

      mockPrismaClient.quizAttempt.findFirst.mockResolvedValue(mockAttempt);

      const result = await quizRepository.getLastAttempt(1);

      expect(mockPrismaClient.quizAttempt.findFirst).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(result).toBeInstanceOf(QuizAttempt);
      expect(result?.getUserId()).toBe(1);
      expect(result?.getQuizId()).toBe(1);
      expect(result?.getStatus()).toBe(QuizAttemptStatusEnum.PASSED);
    });

    it('deve retornar undefined quando não há tentativas', async () => {
      mockPrismaClient.quizAttempt.findFirst.mockResolvedValue(null);

      const result = await quizRepository.getLastAttempt(1);

      expect(result).toBeUndefined();
    });
  });

  describe('saveAttempt', () => {
    it('deve salvar uma tentativa de quiz com sucesso', async () => {
      const quizAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED);
      const mockCreated = {
        id: 1,
        userId: 1,
        quizId: 1,
        status: QuizAttemptStatusEnum.PASSED,
        createdAt: new Date('2024-01-15'),
      };

      mockPrismaClient.quizAttempt.create.mockResolvedValue(mockCreated);

      const result = await quizRepository.saveAttempt(quizAttempt);

      expect(mockPrismaClient.quizAttempt.create).toHaveBeenCalledWith({
        data: {
          userId: 1,
          quizId: 1,
          status: QuizAttemptStatusEnum.PASSED,
        },
      });
      expect(result).toBeInstanceOf(QuizAttempt);
      expect(result?.getId()).toBe(1);
      expect(result?.getUserId()).toBe(1);
      expect(result?.getQuizId()).toBe(1);
    });

    it('deve lançar erro quando falha ao salvar', async () => {
      const quizAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED);
      mockPrismaClient.quizAttempt.create.mockRejectedValue(new Error('Database error'));

      await expect(quizRepository.saveAttempt(quizAttempt)).rejects.toThrow('Database error');
    });
  });
});

