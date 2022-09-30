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

describe('Integration test: Login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Should login successfully', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginBody);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Checks if it is possible to login with invalid email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginMailFail);

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Check if it is possible to login with invalid password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginPassFail);

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
  });

  it('Checks if it is possible to login with an empty field', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(userLoginEmpryBody);

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('All fields must be filled');
  });

  it('Checks if it is possible to login with an invalid token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      authorization: "aaa"
  });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse).to.be.json;
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.equal('Token not found');
  });

  it('Checks if it is possible to perform a login with a valid token', async () => {
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
