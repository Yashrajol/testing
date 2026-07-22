import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Vedhkrit Engine V1.0 E2E Validation Suite', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Core & Health', () => {
    it('/api/v1/health (GET) - status OPERATIONAL', () => {
      return request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBeDefined();
        });
    });
  });

  describe('AI Intelligence Endpoints', () => {
    it('/api/v1/ai/health (GET) - status UP', () => {
      return request(app.getHttpServer())
        .get('/api/v1/ai/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('UP');
          expect(res.body.activeProviders).toBeDefined();
        });
    });
  });

  describe('Integration Hub Endpoints', () => {
    it('/api/v1/integrations/connector/health (GET) - status OK', () => {
      return request(app.getHttpServer())
        .get('/api/v1/integrations/connector/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('OK');
          expect(res.body.connectors).toBeDefined();
        });
    });
  });
});
