import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('User endpoints (e2e)', () => {
  const userData = {
    email: 'test@test.com',
    first_name: 'test',
    last_name: 'test',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg',
  };
  let id;

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/api/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/user')
      .send(userData)
      .expect(201)
      .expect((res) => {
        expect(typeof res.body.email).toBe('string');
        expect(typeof res.body.first_name).toBe('string');
        expect(typeof res.body.last_name).toBe('string');
        expect(typeof res.body.avatar).toBe('string');
        expect(typeof res.body._id).toBe('string');
        expect(typeof res.body.createdAt).toBe('string');
        id = res.body._id;
      });
  });

  it('/api/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/' + id)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body.email).toBe('string');
        expect(typeof res.body.first_name).toBe('string');
        expect(typeof res.body.last_name).toBe('string');
        expect(typeof res.body.avatar).toBe('string');
        expect(typeof res.body._id).toBe('string');
        expect(typeof res.body.createdAt).toBe('string');
      });
  });

  it('/api/user/:id/avatar (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/' + id + '/avatar')
      .expect(200)
      .expect((res) => {
        expect(typeof res.text).toBe('string');
      });
  });

  it('/api/user/:id/avatar (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/user/' + id + '/avatar')
      .expect(200)
      .expect('');
  });
});
