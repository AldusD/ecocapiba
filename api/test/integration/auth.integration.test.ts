import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import { createTestApp } from '../helpers/testApp.js';
import { HttpStatusEnum } from '../../src/modules/shared/enums/httpStatusEnum.js';
import { MessagesEnum } from '../../src/modules/shared/enums/messagesEnum.js';
import jwt from 'jsonwebtoken';

describe('Auth Integration Tests', () => {
  let app: any;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('POST /auth/login', () => {
    it('deve retornar erro quando credenciais não são fornecidas', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({});

      expect(response.status).toBe(HttpStatusEnum.INVALID_CREDENTIALS);
    });

    it('deve retornar erro quando email não é fornecido', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: 'password123' });

      expect(response.status).toBe(HttpStatusEnum.INVALID_CREDENTIALS);
    });
  });

  describe('POST /auth/register', () => {
    it('deve retornar erro quando dados obrigatórios não são fornecidos', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({});

      expect(response.status).toBe(HttpStatusEnum.INTERNAL_SERVER_ERROR);
    });
  });

  describe('GET /auth/profile', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .get('/auth/profile');

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_NO_TOKEN_PROVIDED);
    });

    it('deve retornar erro quando token é inválido', async () => {
      const response = await request(app)
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
      expect(response.body).toHaveProperty('message', MessagesEnum.ERROR_INVALID_TOKEN);
    });
  });

  describe('GET /auth/getxp', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .get('/auth/getxp');

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
    });
  });

  describe('POST /auth/addxp', () => {
    it('deve retornar erro quando token não é fornecido', async () => {
      const response = await request(app)
        .post('/auth/addxp')
        .send({ amount: 50 });

      expect(response.status).toBe(HttpStatusEnum.UNAUTHORIZED);
    });
  });
});

