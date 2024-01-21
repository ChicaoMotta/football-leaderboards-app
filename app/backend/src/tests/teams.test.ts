import * as chai from 'chai';
import * as Sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
// import { App } from '../app';
import { app } from '../app';
import teamsMock from './mocks/teams.mock';
import Team from '../database/models/teams.models';

chai.use(chaiHttp);

const { expect } = chai;

// const app = new App()
// console.log(app)
describe('Integration test team', function () {
  afterEach(function () {
    Sinon.restore();
  });

  it('Testing GET method', async function () {
    Sinon.stub(Team, 'findAll').resolves(teamsMock as any);

    const appResponse = await chai.request(app).get('/teams');
    // const appResponse = await chai.request(app.app).get('/teams');

    // console.log(appResponse);

    expect(appResponse.body).to.have.length(16);
  });
});
