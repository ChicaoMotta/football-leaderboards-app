import chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken'
// import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/matches.models';
import {allMatches, filteredMatches} from './mocks/matches.mock'
import MatchesModel from '../models/match.model';

chai.use(chaiHttp);

const { expect }   = chai;

describe('Integration test matches', function ( ){
    beforeEach(function(){
        Sinon.restore();
    })

    it('Get All Matches', async function(){
        const getAllTeamsSpy = Sinon.spy(MatchesModel.prototype, 'getAllTeams');
        Sinon.stub(Matches, 'findAll').resolves(allMatches as any)

        const appResponse = await chai.request(app).get('/matches')

        expect(appResponse.body).to.deep.equal(allMatches)
        expect(getAllTeamsSpy.called).to.be.true;
        expect(appResponse.body.length).to.equal(48);
    })

    it('Get All Filtered matches', async function(){
        const getFilteredTeamsSpy = Sinon.spy(MatchesModel.prototype, 'getFilteredTeams');
        Sinon.stub(Matches, 'findAll').resolves(filteredMatches as any)

        const appResponse = await chai.request(app).get('/matches?inProgress=true')

        expect(appResponse.body).to.deep.equal(filteredMatches)
        expect(getFilteredTeamsSpy.called).to.be.true;
        expect(appResponse.body.length).to.equal(8);
    })
    it('Bad Params', async function(){
        const getFilteredTeamsSpy = Sinon.spy(MatchesModel.prototype, 'getFilteredTeams');
        const getAllTeamsSpy = Sinon.spy(MatchesModel.prototype, 'getAllTeams');
        Sinon.stub(Matches, 'findAll').resolves(allMatches as any)

         await chai.request(app).get('/matches?inProgress=invalid')


        expect(getFilteredTeamsSpy.called).to.be.false;
        expect(getAllTeamsSpy.called).to.be.true;
    })
    it('Finish Match' , async function(){
        const endMatchSpy = Sinon.spy(MatchesModel.prototype, 'endMatch');
        Sinon.stub(Matches, 'update').resolves([1])
        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

         await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${validToken}`)


        expect(endMatchSpy.called).to.be.true;
    })
    it('Change Score' , async function(){
        const changeScoreSpy = Sinon.spy(MatchesModel.prototype, 'changeScore');
        Sinon.stub(Matches, 'update').resolves([1])
        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

         await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${validToken}`)


        expect(changeScoreSpy.called).to.be.true;
    })
    it('Add Match' , async function(){
        Sinon.stub(Matches, 'create').resolves({
            "id": 51,
            "homeTeamId": 16,
            "homeTeamGoals": 2,
            "awayTeamId": 8,
            "awayTeamGoals": 2
          } as any)

        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

       const validBody = {
            "homeTeamId": 16,
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2
          }

        const appResponse =  await chai.request(app).post('/matches/').set('Authorization', `Bearer ${validToken}`).send(validBody)


        expect(appResponse.status).to.be.equal(201);
        expect(appResponse.body).to.be.deep.equal({
            "id": 51,
            "homeTeamId": 16,
            "homeTeamGoals": 2,
            "awayTeamId": 8,
            "awayTeamGoals": 2
          });
    })
    it('Same Team Match Params' , async function(){
        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

       const invalidBody = {
            "homeTeamId": 8,
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2
          }

        const appResponse =  await chai.request(app).post('/matches/').set('Authorization', `Bearer ${validToken}`).send(invalidBody)


        expect(appResponse.status).to.be.equal(422);
        expect(appResponse.body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });
    })
    it('Invalid Team Match Params' , async function(){
        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

       const invalidBody = {
            "homeTeamId": 100,
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2
          }

        const appResponse =  await chai.request(app).post('/matches/').set('Authorization', `Bearer ${validToken}`).send(invalidBody)


        expect(appResponse.status).to.be.equal(404);
        expect(appResponse.body).to.deep.equal({ "message": "There is no team with such id!" });
    })
    
})