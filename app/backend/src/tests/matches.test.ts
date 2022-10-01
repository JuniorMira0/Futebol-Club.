import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import { allMatches, allMatchesInprogessTrue } from '../tests/mocks/matches.mock';
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

  it('', async () => {

  })
})