import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';
import { token, userLoginBody, userLoginMailFail, userMock, userLoginPassFail, userLoginEmpryBody } from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de integração: Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se é possivel fazer login com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginBody);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Verifica se é possivel fazer login com email invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginMailFail);

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Verifica se é possivel fazer login com senha invalida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginPassFail);

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Verifica se é possivel fazer login com um campo vazio', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginEmpryBody);

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Verifica se é possivel fazer login com um token invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      authorization: "aaa"
  });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Token not found');
  });

  it('Verifica se é possível realizar um login com token válido', async () => {
        beforeEach(async () => {
            chaiHttpResponse = await chai.request(app).get('/login/validate').set({
                authorization: token
            });
            expect(chaiHttpResponse).to.have.status(200);
            expect(chaiHttpResponse).to.be.json;
            expect(chaiHttpResponse.body).to.have.property('role');
            expect(chaiHttpResponse.body.role).to.equal('admin');
        });
      });
});
