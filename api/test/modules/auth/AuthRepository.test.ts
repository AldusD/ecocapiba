import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AuthRepository } from '../../../src/modules/auth/AuthRepository.js';
import { mockUser, mockSafeUser } from '../../helpers/mockData.js';

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    invitationLog: {
      create: jest.fn(),
    },
  })),
}));

describe('AuthRepository', () => {
  let authRepository: AuthRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      invitationLog: {
        create: jest.fn(),
      },
      rewardLog: {
        create: jest.fn(),
      },
      // todo roque $transaction: jest.fn((queries) => Promise.all(queries)),
    };

    authRepository = new AuthRepository();
    (authRepository as any).prisma = mockPrismaClient;
  });

  describe('getByEmail', () => {
    it('deve retornar usuário quando email existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

      const result = await authRepository.getByEmail('test@example.com');

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando email não existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await authRepository.getByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('getByCPF', () => {
    it('deve retornar usuário quando CPF existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

      const result = await authRepository.getByCPF('12345678900');

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { cpf: '12345678900' },
      });
      expect(result).toEqual(mockUser);
    });

    it('deve retornar null quando CPF não existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await authRepository.getByCPF('00000000000');

      expect(result).toBeNull();
    });
  });

  describe('getById', () => {
    it('deve retornar usuário seguro quando ID existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockSafeUser);

      const result = await authRepository.getById(1);

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          invitationCode: true,
          xp: true,
          capibas: true,
        },
        where: { id: 1 },
      });
      expect(result).toEqual(mockSafeUser);
    });

    it('deve retornar null quando ID não existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await authRepository.getById(999);

      expect(result).toBeNull();
    });
  });

  describe('getByInvitationCode', () => {
    it('deve retornar usuário quando código de convite existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(mockSafeUser);

      const result = await authRepository.getByInvitationCode('TEST123');

      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          invitationCode: true,
          xp: true,
          capibas: true,
        },
        where: { invitationCode: 'TEST123' },
      });
      expect(result).toEqual(mockSafeUser);
    });

    it('deve retornar null quando código de convite não existe', async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const result = await authRepository.getByInvitationCode('INVALID');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      mockPrismaClient.user.create.mockResolvedValue(mockUser);

      const result = await authRepository.create(
        'new@example.com',
        'hashed-password',
        '12345678900',
        'New User',
        'NEWCODE123',
        0,
        0
      );

      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: {
          email: 'new@example.com',
          password: 'hashed-password',
          cpf: '12345678900',
          name: 'New User',
          invitationCode: 'NEWCODE123',
        },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('addReward', () => {
    it('deve adicionar recompensa ao usuário', async () => {
      const updatedUser = { ...mockUser, xp: 150, capibas: 60 };
      mockPrismaClient.user.update.mockResolvedValue(updatedUser);

      const result = await authRepository.addReward(1, 50, 10);

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          xp: { increment: 50 },
          capibas: { increment: 10 },
        },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('update', () => {
    it('deve atualizar dados do usuário', async () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      mockPrismaClient.user.update.mockResolvedValue(updatedUser);

      const result = await authRepository.update(1, { name: 'Updated Name' });

      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Updated Name' },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('delete', () => {
    it('deve deletar usuário', async () => {
      mockPrismaClient.user.delete.mockResolvedValue(mockUser);

      const result = await authRepository.delete(1);

      expect(mockPrismaClient.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('createInvitationLog', () => {
    it('deve criar log de convite', async () => {
      const mockLog = {
        id: 1,
        inviterId: 2,
        invitedId: 1,
        xp: 50,
        capibas: 10,
      };
      mockPrismaClient.invitationLog.create.mockResolvedValue(mockLog);

      const result = await authRepository.createInvitationLog(2, 1, 50, 10);

      expect(mockPrismaClient.invitationLog.create).toHaveBeenCalledWith({
        data: {
          inviterId: 2,
          invitedId: 1,
          capibas: 10,
          xp: 50,
        },
      });
      expect(result).toEqual(mockLog);
    });
  });
});

