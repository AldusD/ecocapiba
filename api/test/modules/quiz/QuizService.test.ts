// import { describe, it, expect, beforeEach, jest } from '@jest/globals';
// import { QuizService } from '../../../src/modules/quiz/QuizService.js';
// import { QuizRepository } from '../../../src/modules/quiz/QuizRepository.js';
// import { QuizAttempt } from '../../../src/modules/quiz/models/QuizAttempt.js';
// import { MessagesEnum } from '../../../src/modules/shared/enums/messagesEnum.js';
// import { QuizAttemptStatusEnum } from '../../../src/modules/shared/enums/quizAttemptStatusEnum.js';

// // Mock QuizRepository
// jest.mock('../../../src/modules/quiz/QuizRepository.js');

// describe('QuizService', () => {
//   let quizService: QuizService;
//   let mockQuizRepository: jest.Mocked<QuizRepository>;

//   beforeEach(() => {
//     mockQuizRepository = {
//       getLastAttempt: jest.fn(),
//       saveAttempt: jest.fn(),
//     } as any;

//     quizService = new QuizService();
//     (quizService as any).quizRepository = mockQuizRepository;
//   });

//   describe('handleAttempt', () => {
//     it('deve processar tentativa com sucesso quando aprovado', async () => {
//       mockQuizRepository.getLastAttempt.mockResolvedValue(undefined);
//       const mockQuizAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED);
//       mockQuizRepository.saveAttempt.mockResolvedValue(mockQuizAttempt);

//       await quizService.handleAttempt(1, 1, 5);

//       expect(mockQuizRepository.getLastAttempt).toHaveBeenCalledWith(1);
//       expect(mockQuizRepository.saveAttempt).toHaveBeenCalled();
//       const savedAttempt = mockQuizRepository.saveAttempt.mock.calls[0][0];
//       expect(savedAttempt.getStatus()).toBe(QuizAttemptStatusEnum.PASSED);
//     });

//     it('deve processar tentativa como reprovado quando correctCount < 3', async () => {
//       mockQuizRepository.getLastAttempt.mockResolvedValue(undefined);
//       const mockQuizAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.FAILED);
//       mockQuizRepository.saveAttempt.mockResolvedValue(mockQuizAttempt);

//       await quizService.handleAttempt(1, 1, 2);

//       const savedAttempt = mockQuizRepository.saveAttempt.mock.calls[0][0];
//       expect(savedAttempt.getStatus()).toBe(QuizAttemptStatusEnum.FAILED);
//     });

//     it('deve lançar erro quando quizId não é fornecido', async () => {
//       await expect(quizService.handleAttempt(1, 0, 5))
//         .rejects.toBe(MessagesEnum.ERROR_INVALID_BODY);
//     });

//     it('deve lançar erro quando limite de tentativas é excedido', async () => {
//       const today = new Date();
//       const lastAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED, today);
//       mockQuizRepository.getLastAttempt.mockResolvedValue(lastAttempt);

//       await expect(quizService.handleAttempt(1, 1, 5))
//         .rejects.toBe(MessagesEnum.ERROR_QUIZ_LIMIT_EXCEED);
//     });

//     it('deve permitir tentativa quando última tentativa foi em outro dia', async () => {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       const lastAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED, yesterday);
//       mockQuizRepository.getLastAttempt.mockResolvedValue(lastAttempt);
//       const mockQuizAttempt = new QuizAttempt(1, 1, QuizAttemptStatusEnum.PASSED);
//       mockQuizRepository.saveAttempt.mockResolvedValue(mockQuizAttempt);

//       await quizService.handleAttempt(1, 1, 5);

//       expect(mockQuizRepository.saveAttempt).toHaveBeenCalled();
//     });
//   });
// });

