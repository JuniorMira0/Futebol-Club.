import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { allMatches, allMatchesInprogessTrue, equalTeams } from '../tests/mocks/matches.mock';
import { token } from './mocks/login.mock';

import MatchesModel from '../database/models/MatchesModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test: Matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(allMatches as MatchesModel[]);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('checks if it is possible to list all matches successfully', async () => {

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  })

  it('checks if it is possible to filter matches in progress', async () => {

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchesInprogessTrue);
  })

  it('checks if it is not possible to add a match without the valid token', async () => {
    beforeEach(async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').set({
            authorization: 'invalidToken',
        });
        expect(chaiHttpResponse).to.have.status(401);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body.message).to.equal('Token must be a valid token');
    });

    it('checks if it is not possible to include a match with two equal teams ', async () => {
      beforeEach(async () => {
          chaiHttpResponse = await chai.request(app).post('/matches').set({
              authorization: token,
              body: equalTeams,

          });
          expect(chaiHttpResponse).to.have.status(401);
          expect(chaiHttpResponse).to.be.json;
          expect(chaiHttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');
      });
  });
});
})