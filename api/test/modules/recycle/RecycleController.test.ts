import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { RecycleController } from '../../../src/modules/recycle/RecycleController.js';
import { RecycleService } from '../../../src/modules/recycle/RecycleService.js';
import { HttpStatusEnum } from '../../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../../src/modules/shared/enums/messagesEnum.js';
import { Request, Response } from 'express';

describe('RecycleController', () => {
  let recycleController: RecycleController;
  let mockRecycleService: jest.Mocked<RecycleService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRecycleService = {
      checkRecycle: jest.fn(),
      registerRecycle: jest.fn(),
      getDaysRecycledInMonth: jest.fn(),
      getStreakMultiplier: jest.fn(),
    } as any;

    recycleController = new RecycleController(mockRecycleService);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      locals: {},
    };
  });

  describe('checkRecycle', () => {
    it('deve verificar se usuário reciclou em uma data específica', async () => {
      mockRecycleService.checkRecycle.mockResolvedValue(true);
      mockRequest.body = {
        userId: 1,
        date: '2024-01-15',
      };

      await recycleController.checkRecycle(mockRequest as Request, mockResponse as Response);

      expect(mockRecycleService.checkRecycle).toHaveBeenCalledWith(1, expect.any(Date));
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ hasRecycled: true });
    });

    it('deve retornar false quando usuário não reciclou', async () => {
      mockRecycleService.checkRecycle.mockResolvedValue(false);
      mockRequest.body = {
        userId: 1,
        date: '2024-01-15',
      };

      await recycleController.checkRecycle(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({ hasRecycled: false });
    });
  });

  describe('create', () => {
    it('deve criar um registro de reciclagem com sucesso', async () => {
      const mockRecycle = { id: 1, userId: 1, doneDate: new Date() };
      mockRecycleService.registerRecycle.mockResolvedValue(mockRecycle as any);
      mockRequest.body = {
        userId: 1,
        doneDate: '2024-01-15',
      };

      await recycleController.create(mockRequest as Request, mockResponse as Response);

      expect(mockRecycleService.registerRecycle).toHaveBeenCalledWith(1, expect.any(Date));
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ registerRecycle: mockRecycle });
    });
  });

  describe('getCalendar', () => {
    it('deve retornar dias reciclados no mês', async () => {
      const mockDays = [1, 5, 10, 15, 20];
      mockRecycleService.getDaysRecycledInMonth.mockResolvedValue(mockDays);
      (mockResponse.locals as any).user = '1';
      mockRequest.body = {
        month: 1,
        year: 2024,
      };

      await recycleController.getCalendar(mockRequest as Request, mockResponse as Response);

      expect(mockRecycleService.getDaysRecycledInMonth).toHaveBeenCalledWith(1, 1, 2024);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ days: mockDays });
    });

    it('deve retornar erro quando mês ou ano não são fornecidos', async () => {
      (mockResponse.locals as any).user = '1';
      mockRequest.body = {};

      await recycleController.getCalendar(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Mês e ano são necessários' });
    });
  });

  describe('getStreak', () => {
    it('deve retornar streak e multiplicador do usuário', async () => {
      const mockStreak = { streakWeeks: 3, multiplier: 1.3 };
      mockRecycleService.getStreakMultiplier.mockResolvedValue(mockStreak);
      (mockResponse.locals as any).user = '1';

      await recycleController.getStreak(mockRequest as Request, mockResponse as Response);

      expect(mockRecycleService.getStreakMultiplier).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockStreak);
    });

    it('deve retornar erro quando userId não é fornecido', async () => {
      (mockResponse.locals as any).user = undefined;

      await recycleController.getStreak(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.UNPROCESSABLE_ENTITY);
      expect(mockResponse.json).toHaveBeenCalledWith(MessagesEnum.ERROR_INVALID_BODY);
    });
  });
});

