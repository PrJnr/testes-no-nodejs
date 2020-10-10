import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factories';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Deve ser possivel se cadastrar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Paulo Ricardo',
        email: 'paulo@teste.com.br',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('Usuario nao deve poder se registrar com email duplicado', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Paulo Ricardo',
        email: 'paulo@teste.com.br',
        password: '123456',
      });
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Paulo Ricardo',
        email: 'paulo@teste.com.br',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('Quando cria o usuario a senha dele deve ser criptografada', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });
    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
