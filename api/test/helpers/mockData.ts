export const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: '$2b$10$hashedpassword', // bcrypt hash
  cpf: '12345678900',
  name: 'Test User',
  invitationCode: 'TEST123',
  xp: 100,
  capibas: 50,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockSafeUser = {
  id: 1,
  email: 'test@example.com',
  cpf: '12345678900',
  name: 'Test User',
  invitationCode: 'TEST123',
  xp: 100,
  capibas: 50,
};

export const mockInviterUser = {
  id: 2,
  email: 'inviter@example.com',
  cpf: '98765432100',
  name: 'Inviter User',
  invitationCode: 'INVITE123',
  xp: 200,
  capibas: 100,
};

export const mockQuiz = {
  id: 1,
  type: 'BASIC',
  questions: [],
};

export const mockQuizAttempt = {
  id: 1,
  userId: 1,
  quizId: 1,
  correctCount: 5,
  status: 'COMPLETED',
  createdAt: new Date(),
};

export const mockRecycle = {
  id: 1,
  userId: 1,
  doneDate: new Date(),
  createdAt: new Date(),
};

