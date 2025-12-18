// import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// // Mock AuthRepository
// jest.mock('../../../src/modules/auth/AuthRepository.js');

// import { AuthService } from '../../../src/modules/auth/AuthService.js';
// import { AuthRepository } from '../../../src/modules/auth/AuthRepository.js';
// import { MessagesEnum } from '../../../src/modules/shared/enums/messagesEnum.js';
// import { PrismaErrorEnum } from '../../../src/modules/shared/enums/prismaErrorEnum.js';
// import { mockUser, mockSafeUser, mockInviterUser } from '../../helpers/mockData.js';
// import bcrypt from 'bcrypt';

// describe('AuthService', () => {
//   let authService: AuthService;
//   let mockAuthRepository: jest.Mocked<AuthRepository>;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
//     jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password' as never);
    
//     mockAuthRepository = {
//       getByEmail: jest.fn(),
//       getByCPF: jest.fn(),
//       getById: jest.fn(),
//       getByInvitationCode: jest.fn(),
//       create: jest.fn(),
//       addReward: jest.fn(),
//       createInvitationLog: jest.fn(),
//     } as any;

//     // Injetar mock repository
//     authService = new AuthService();
//     (authService as any).authRepository = mockAuthRepository;
//   });

//   describe('authUser', () => {
//     it('deve autenticar usuário com credenciais válidas', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(mockUser);
//       (bcrypt.compare as jest.Mock).mockResolvedValue(true);

//       const token = await authService.authUser('test@example.com', 'password123');

//       expect(mockAuthRepository.getByEmail).toHaveBeenCalledWith('test@example.com');
//       expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
//       expect(token).toBeTruthy();
//       expect(typeof token).toBe('string');
//     });

//     it('deve lançar erro quando usuário não existe', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(null);

//       await expect(authService.authUser('test@example.com', 'password123'))
//         .rejects.toThrow(MessagesEnum.ERROR_INVALID_CREDENTIALS);
//     });

//     it('deve lançar erro quando senha está incorreta', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(mockUser);
//       (bcrypt.compare as jest.Mock).mockResolvedValue(false);

//       await expect(authService.authUser('test@example.com', 'wrongpassword'))
//         .rejects.toThrow(MessagesEnum.ERROR_INVALID_CREDENTIALS);
//     });
//   });

//   describe('registerUser', () => {
//     it('deve registrar usuário sem código de convite', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(null);
//       mockAuthRepository.getByCPF.mockResolvedValue(null);
//       mockAuthRepository.create.mockResolvedValue(mockUser);
//       (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

//       const token = await authService.registerUser(
//         'new@example.com',
//         'password123',
//         '12345678900',
//         'New User',
//         '',
//         0,
//         0
//       );

//       expect(mockAuthRepository.getByEmail).toHaveBeenCalledWith('new@example.com');
//       expect(mockAuthRepository.getByCPF).toHaveBeenCalledWith('12345678900');
//       expect(mockAuthRepository.create).toHaveBeenCalled();
//       expect(token).toBeTruthy();
//       expect(typeof token).toBe('string');
//     });

//     it('deve registrar usuário com código de convite válido', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(null);
//       mockAuthRepository.getByCPF.mockResolvedValue(null);
//       mockAuthRepository.getByInvitationCode.mockResolvedValue(mockInviterUser);
//       mockAuthRepository.create.mockResolvedValue(mockUser);
//       mockAuthRepository.addReward.mockResolvedValue(mockInviterUser as any);
//       mockAuthRepository.createInvitationLog.mockResolvedValue({} as any);
//       (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

//       process.env.CAPIBA_REWARD = '10';
//       process.env.XP_REWARD = '50';

//       const token = await authService.registerUser(
//         'new@example.com',
//         'password123',
//         '12345678900',
//         'New User',
//         'INVITE123',
//         0,
//         0
//       );

//       expect(mockAuthRepository.getByInvitationCode).toHaveBeenCalledWith('INVITE123');
//       expect(mockAuthRepository.addReward).toHaveBeenCalled();
//       expect(mockAuthRepository.createInvitationLog).toHaveBeenCalled();
//       expect(token).toBeTruthy();
//       expect(typeof token).toBe('string');
//     });

//     it('deve lançar erro quando email já está registrado', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(mockUser);

//       await expect(authService.registerUser(
//         'test@example.com',
//         'password123',
//         '12345678900',
//         'Test User',
//         '',
//         0,
//         0
//       )).rejects.toThrow(MessagesEnum.ERROR_EMAIL_ALREADY_REGISTERED);
//     });

//     it('deve lançar erro quando CPF já está registrado', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(null);
//       mockAuthRepository.getByCPF.mockResolvedValue(mockUser);

//       await expect(authService.registerUser(
//         'new@example.com',
//         'password123',
//         '12345678900',
//         'Test User',
//         '',
//         0,
//         0
//       )).rejects.toThrow(MessagesEnum.ERROR_CPF_ALREADY_REGISTERED);
//     });

//     it('deve lançar erro quando código de convite é inválido', async () => {
//       mockAuthRepository.getByEmail.mockResolvedValue(null);
//       mockAuthRepository.getByCPF.mockResolvedValue(null);
//       mockAuthRepository.getByInvitationCode.mockResolvedValue(null);

//       await expect(authService.registerUser(
//         'new@example.com',
//         'password123',
//         '12345678900',
//         'Test User',
//         'INVALID',
//         0,
//         0
//       )).rejects.toThrow(MessagesEnum.ERROR_INVALID_INVITATION_CODE);
//     });
//   });

//   describe('profileData', () => {
//     it('deve retornar dados do perfil do usuário', async () => {
//       mockAuthRepository.getById.mockResolvedValue(mockSafeUser);

//       const result = await authService.profileData(1);

//       expect(mockAuthRepository.getById).toHaveBeenCalledWith(1);
//       expect(result).toEqual(mockSafeUser);
//     });

//     it('deve lançar erro quando usuário não é encontrado', async () => {
//       mockAuthRepository.getById.mockResolvedValue(null);

//       await expect(authService.profileData(999))
//         .rejects.toThrow(MessagesEnum.ERROR_USER_NOT_FOUND);
//     });
//   });

//   describe('addUserReward', () => {
//     it('deve adicionar recompensa ao usuário', async () => {
//       const updatedUser = { ...mockUser, xp: 150, capibas: 60 };
//       mockAuthRepository.addReward.mockResolvedValue(updatedUser);

//       const result = await authService.addUserReward(1, 50, 10);

//       expect(mockAuthRepository.addReward).toHaveBeenCalledWith(1, 50, 10);
//       expect(result).toEqual(updatedUser);
//     });
//   });
// });

