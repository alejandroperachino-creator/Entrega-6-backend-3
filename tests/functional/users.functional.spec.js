import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/app.js';

const createUserPayload = () => {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  return {
    firstName: 'Ana',
    lastName: 'Gomez',
    email: `ana.${unique}@example.com`,
    password: 'Secret123!',
    role: 'user'
  };
};

describe('Functional - Users API', () => {
  it('GET /api/users devuelve listado con estructura esperada', async () => {
    const payload = createUserPayload();
    const createResponse = await request(app).post('/api/users').send(payload);
    expect(createResponse.status).to.equal(201);

    const response = await request(app).get('/api/users');

    expect(response.status).to.equal(200);
    expect(response.body).to.include({
      status: 'success',
      message: 'Usuarios obtenidos exitosamente'
    });
    expect(response.body.payload).to.be.an('array').with.length.greaterThan(0);
    expect(response.body.payload[0]).to.include.keys('_id', 'firstName', 'lastName', 'email', 'role');
    expect(response.body.payload[0]).to.not.have.property('password');
  });
});
