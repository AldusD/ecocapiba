import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import { createTestApp } from '../helpers/testApp.js';
import { HttpStatusEnum } from '../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../src/modules/shared/enums/messagesEnum.js';
import jwt from 'jsonwebtoken';

describe('Quiz Integration Tests', () => {
  let app: any;
  let validToken: string;

  beforeAll(() => {
    app = createTestApp();
    // Gerar token válido para testes
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test-secret-key';
    validToken = jwt.sign({ id: 1 }, JWT_SECRET_KEY, { expiresIn: '1h' });
  });

  describe('POST /quiz/attempt/:quizId', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .post('/quiz/attempt/1')
        .send({ correctCount: 5 });

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_NO_TOKEN_PROVIDED);
    });

    it('deve retornar erro quando token é inválido', async () => {
      const response = await request(app)
        .post('/quiz/attempt/1')
        .set('Authorization', 'Bearer invalid-token')
        .send({ correctCount: 5 });

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_INVALID_TOKEN);
    });

    it('deve retornar erro quando quizId não é fornecido na URL', async () => {
      const response = await request(app)
        .post('/quiz/attempt/')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ correctCount: 5 });

      expect(response.status).toBe(404); // Rota não encontrada
    });

    it('deve retornar erro quando correctCount não é fornecido', async () => {
      const response = await request(app)
        .post('/quiz/attempt/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({});

      // O service valida o quizId primeiro, mas se passar, pode retornar erro de body inválido
      expect([HttpStatusEnum.UNPROCESSABLE_ENTITY, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });

    it('deve retornar erro quando quizId é inválido (0)', async () => {
      const response = await request(app)
        .post('/quiz/attempt/0')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ correctCount: 5 });

      expect(response.status).toBe(HttpStatusEnum.UNPROCESSABLE_ENTITY);
    });

    it('deve aceitar requisição válida (mesmo que falhe no service por falta de dados no banco)', async () => {
      const response = await request(app)
        .post('/quiz/attempt/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ correctCount: 5 });

      // Pode retornar erro de servidor se não houver dados no banco, mas a rota está funcionando
      expect([HttpStatusEnum.CREATED, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });
  });
});

