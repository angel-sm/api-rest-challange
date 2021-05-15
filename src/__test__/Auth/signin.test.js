/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { app, server } = require('../../app');

describe('POST /login', () => {
  it('should return status code 500 if not are passed email or password', async (done) => {
    request(app)
      .post('/login')
      .send({})
      .expect(400, done);
  });
  it('should return status code 400 if is passed wrong email', async (done) => {
    request(app)
      .post('/login')
      .send({ email: 'demo1@usuario.com', password: 'pipjY7-guknaq-nancex' })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('should return status code 400 if is passed wrong password', async (done) => {
    request(app)
      .post('/login')
      .send({ email: 'demo@usuario.com', password: 'pipjY7-guknaq-nancex1' })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
  it('should return status code 200 if are passed correct email and password', async (done) => {
    request(app)
      .post('/login')
      .send({ email: 'demo@usuario.com', password: 'pipjY7-guknaq-nancex' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

afterAll(() => server.close());
