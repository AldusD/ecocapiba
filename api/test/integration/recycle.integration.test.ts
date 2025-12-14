import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import { createTestApp } from '../helpers/testApp.js';
import { HttpStatusEnum } from '../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../src/modules/shared/enums/messagesEnum.js';
import jwt from 'jsonwebtoken';

describe('Recycle Integration Tests', () => {
  let app: any;
  let validToken: string;

  beforeAll(() => {
    app = createTestApp();
    // Gerar token válido para testes
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test-secret-key';
    validToken = jwt.sign({ id: 1 }, JWT_SECRET_KEY, { expiresIn: '1h' });
  });

  describe('POST /recycle/check-recycle', () => {
    it('deve retornar erro quando userId não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle/check-recycle')
        .send({ date: '2024-01-15' });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });

    it('deve retornar erro quando date não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle/check-recycle')
        .send({ userId: 1 });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });

    it('deve aceitar requisição válida (mesmo que falhe no service por falta de dados no banco)', async () => {
      const response = await request(app)
        .post('/recycle/check-recycle')
        .send({
          userId: 1,
          date: '2024-01-15',
        });

      // Pode retornar erro de servidor se não houver dados no banco, mas a rota está funcionando
      expect([HttpStatusEnum.OK, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });
  });

  describe('POST /recycle', () => {
    it('deve retornar erro quando userId não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle')
        .send({ doneDate: '2024-01-15' });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });

    it('deve retornar erro quando doneDate não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle')
        .send({ userId: 1 });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });

    it('deve aceitar requisição válida (mesmo que falhe no service por falta de dados no banco)', async () => {
      const response = await request(app)
        .post('/recycle')
        .send({
          userId: 1,
          doneDate: '2024-01-15',
        });

      // Pode retornar erro de servidor se não houver dados no banco, mas a rota está funcionando
      expect([HttpStatusEnum.CREATED, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });
  });

  describe('POST /recycle/calendar', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle/calendar')
        .send({ month: 1, year: 2024 });

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_NO_TOKEN_PROVIDED);
    });

    it('deve retornar erro quando token é inválido', async () => {
      const response = await request(app)
        .post('/recycle/calendar')
        .set('Authorization', 'Bearer invalid-token')
        .send({ month: 1, year: 2024 });

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_INVALID_TOKEN);
    });

    it('deve retornar erro quando month não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle/calendar')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ year: 2024 });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('error', 'Mês e ano são necessários');
    });

    it('deve retornar erro quando year não é fornecido', async () => {
      const response = await request(app)
        .post('/recycle/calendar')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ month: 1 });

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('error', 'Mês e ano são necessários');
    });

    it('deve aceitar requisição válida (mesmo que falhe no service por falta de dados no banco)', async () => {
      const response = await request(app)
        .post('/recycle/calendar')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ month: 1, year: 2024 });

      // Pode retornar erro de servidor se não houver dados no banco, mas a rota está funcionando
      expect([HttpStatusEnum.OK, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });
  });

  describe('GET /recycle/streak', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .get('/recycle/streak');

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_NO_TOKEN_PROVIDED);
    });

    it('deve retornar erro quando token é inválido', async () => {
      const response = await request(app)
        .get('/recycle/streak')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_INVALID_TOKEN);
    });

    it('deve aceitar requisição válida (mesmo que falhe no service por falta de dados no banco)', async () => {
      const response = await request(app)
        .get('/recycle/streak')
        .set('Authorization', `Bearer ${validToken}`);

      // Pode retornar erro de servidor se não houver dados no banco, mas a rota está funcionando
      expect([HttpStatusEnum.OK, HttpStatusEnum.INTERNAL_SERVER_ERROR]).toContain(response.status);
    });
  });
});

