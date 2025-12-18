import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthController } from '../../../src/modules/auth/AuthController.js';
import { AuthService } from '../../../src/modules/auth/AuthService.js';
import { HttpStatusEnum } from '../../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../../src/modules/shared/enums/messagesEnum.js';
import { mockSafeUser } from '../../helpers/mockData.js';
import { Request, Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = {
      authUser: jest.fn(),
      registerUser: jest.fn(),
      profileData: jest.fn(),
      addUserReward: jest.fn(),
    } as any;

    authController = new AuthController(mockAuthService);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any,
      send: jest.fn().mockReturnThis() as any,
      locals: {},
    };
  });

  describe('login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const token = 'mock-jwt-token';
      mockAuthService.authUser.mockResolvedValue(token);
      mockRequest.body = {
        cpf: '12345678900',
        password: 'password123',
      };

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.authUser).toHaveBeenCalledWith('12345678900', 'password123');
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ token });
    });

    it('deve retornar erro com credenciais inválidas', async () => {
      mockAuthService.authUser.mockRejectedValue(new Error(MessagesEnum.ERROR_INVALID_CREDENTIALS));
      mockRequest.body = {
        cpf: '12345678900',
        password: 'wrongpassword',
      };

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INVALID_CREDENTIALS);
      expect(mockResponse.send).toHaveBeenCalledWith({ error: MessagesEnum.ERROR_INVALID_CREDENTIALS });
    });
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const token = 'mock-jwt-token';
      mockAuthService.registerUser.mockResolvedValue(token);
      mockRequest.body = {
        email: 'newuser@example.com',
        password: 'password123',
        cpf: '12345678900',
        name: 'New User',
        invitationCode: 'TEST123',
        xp: 0,
        capibas: 0,
      };

      await authController.register(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.registerUser).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.CREATED);
      expect(mockResponse.json).toHaveBeenCalledWith({ token });
    });

    it('deve retornar erro quando email já está registrado', async () => {
      mockAuthService.registerUser.mockRejectedValue(
        new Error(MessagesEnum.ERROR_EMAIL_ALREADY_REGISTERED)
      );
      mockRequest.body = {
        email: 'existing@example.com',
        password: 'password123',
        cpf: '12345678900',
        name: 'Existing User',
        invitationCode: '',
        xp: 0,
        capibas: 0,
      };

      await authController.register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(mockResponse.send).toHaveBeenCalledWith({ error: MessagesEnum.ERROR_EMAIL_ALREADY_REGISTERED });
    });
  });

  describe('profile', () => {
    it('deve retornar dados do perfil do usuário autenticado', async () => {
      mockAuthService.profileData.mockResolvedValue(mockSafeUser);
      (mockResponse.locals as any).user = '1';

      await authController.profile(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.profileData).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(mockSafeUser);
    });
  });

  describe('getXp', () => {
    it('deve retornar XP do usuário autenticado', async () => {
      mockAuthService.profileData.mockResolvedValue(mockSafeUser);
      (mockResponse.locals as any).user = '1';

      await authController.getXp(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ xp: 100 });
    });
  });

  describe('addXp', () => {
    it('deve adicionar XP ao usuário autenticado', async () => {
      const updatedUser = { ...mockSafeUser, xp: 150 };
      mockAuthService.addUserReward.mockResolvedValue(updatedUser as any);
      (mockResponse.locals as any).user = '1';
      mockRequest.body = { amount: 50 };

      await authController.addXp(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.addUserReward).toHaveBeenCalledWith(1, 50, 0);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith({ xp: 150 });
    });

    it('deve retornar erro quando amount é inválido', async () => {
      (mockResponse.locals as any).user = '1';
      mockRequest.body = { amount: -10 };

      await authController.addXp(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Quantidade de xp inválida' });
    });

    it('deve retornar erro quando amount não é fornecido', async () => {
      (mockResponse.locals as any).user = '1';
      mockRequest.body = {};

      await authController.addXp(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });
  });
});

