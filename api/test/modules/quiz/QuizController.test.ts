import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { QuizController } from '../../../src/modules/quiz/QuizController.js';
import { QuizService } from '../../../src/modules/quiz/QuizService.js';
import { HttpStatusEnum } from '../../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../../src/modules/shared/enums/messagesEnum.js';
import { Request, Response } from 'express';

describe('QuizController', () => {
  let quizController: QuizController;
  let mockQuizService: jest.Mocked<QuizService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockQuizService = {
      handleAttempt: jest.fn(),
    } as any;

    quizController = new QuizController(mockQuizService);

    mockRequest = {
      params: {},
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any,
      send: jest.fn().mockReturnThis() as any,
      locals: {},
    };
  });

  describe('registerAttempt', () => {
    it('deve registrar uma tentativa de quiz com sucesso', async () => {
      mockQuizService.handleAttempt.mockResolvedValue(undefined);
      (mockRequest.params as any).quizId = '1';
      mockRequest.body = { correctCount: 5 };
      (mockResponse.locals as any).user = '1';

      await quizController.registerAttempt(mockRequest as Request, mockResponse as Response);

      expect(mockQuizService.handleAttempt).toHaveBeenCalledWith(1, 1, 5);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.CREATED);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('deve retornar erro quando limite de tentativas é excedido', async () => {
      mockQuizService.handleAttempt.mockRejectedValue(MessagesEnum.ERROR_QUIZ_LIMIT_EXCEED);
      (mockRequest.params as any).quizId = '1';
      mockRequest.body = { correctCount: 5 };
      (mockResponse.locals as any).user = '1';

      await quizController.registerAttempt(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.TOO_MANY_REQUESTS);
      expect(mockResponse.json).toHaveBeenCalledWith(MessagesEnum.ERROR_QUIZ_LIMIT_EXCEED);
    });

    it('deve retornar erro quando body é inválido', async () => {
      mockQuizService.handleAttempt.mockRejectedValue(MessagesEnum.ERROR_INVALID_BODY);
      (mockRequest.params as any).quizId = '1';
      mockRequest.body = {};
      (mockResponse.locals as any).user = '1';

      await quizController.registerAttempt(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.UNPROCESSABLE_ENTITY);
      expect(mockResponse.json).toHaveBeenCalledWith(MessagesEnum.ERROR_INVALID_BODY);
    });

    it('deve retornar erro de servidor em caso de erro genérico', async () => {
      mockQuizService.handleAttempt.mockRejectedValue(new Error('Erro desconhecido'));
      (mockRequest.params as any).quizId = '1';
      mockRequest.body = { correctCount: 5 };
      (mockResponse.locals as any).user = '1';

      await quizController.registerAttempt(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith(MessagesEnum.ERROR_SERVER);
    });
  });
});

