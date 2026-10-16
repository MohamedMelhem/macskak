import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { App } from 'supertest/types';
import { join } from 'node:path';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: NestExpressApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useStaticAssets(join(import.meta.dirname, '..', 'public'));
    app.setBaseViewsDir(join(import.meta.dirname, '..', 'views'));
    app.setViewEngine('ejs');
    await app.init();
  });

  it('/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((response) => {
        expect(response.text).toContain('<h1>My First NestJS App</h1>');
        expect(response.text).toContain('href="/macskak"');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
