/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { app, server } = require('../../app');

describe('GET /me', () => {
  let authToken;

  beforeAll(async () => {
    const req = await request(app).post('/login').send({ email: 'demo@usuario.com', password: 'pipjY7-guknaq-nancex' });
    authToken = req.body.token;
  });

  it('should return status code 401 if not is passed JWT of authorization', async (done) => {
    request(app)
      .get('/me')
      .set('Authorization', 'Bearer ')
      .expect(401, done);
  });
  it('should return status code 200 if is passed JWT of authorization', async (done) => {
    request(app)
      .get('/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
  it('Body of response should be contain email', async (done) => {
    const response = await request(app)
      .get('/me')
      .set('Authorization', `Bearer ${authToken}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ email: 'demo@usuario.com' });
    done();
  });
});

describe('POST /get-links', () => {
  let authToken;

  beforeAll(async () => {
    const req = await request(app).post('/login').send({ email: 'demo@usuario.com', password: 'pipjY7-guknaq-nancex' });
    authToken = req.body.token;
  });

  it('should return status code 401 if not is passed JWT of authorization', async (done) => {
    request(app)
      .post('/get-links')
      .set('Authorization', 'Bearer ')
      .expect(401, done);
  });
  it('should return status code 400 if is passed JWT of authorization without url page', async (done) => {
    request(app)
      .post('/get-links')
      .send({ url: '' })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400, done);
  });
  it('should return status code 400 if are passed JWT of authorization and wrong url page', async (done) => {
    request(app)
      .post('/get-links')
      .send({ url: 'mylink' })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400, done);
  });
  it('should return status code 200 if are passed JWT of authorization and correct url page', async (done) => {
    request(app)
      .post('/get-links')
      .send({ url: 'https://www.google.com.mx/' })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200, done);
  });
});

afterAll(() => server.close());
