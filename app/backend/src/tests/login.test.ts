import * as chai from 'chai';
import * as Sinon from 'sinon';
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/users.models';

chai.use(chaiHttp);

const { expect }   = chai;

const invalidMessage = 'Invalid email or password';

describe('Integration test login', function (){

    afterEach(function(){
        Sinon.restore();
    })
    it('login successful',async function ( ) {
        Sinon.stub(User, 'findOne').resolves({
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
            role: 'admin'
        } as any)

        const validUser = {
            email: 'admin@admin.com',
            password: 'secret_admin'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)
        // console.log(appResponse.body);
        

        expect(appResponse.body).to.have.property('token')
    })
    it('login missing field - email',async function ( ) {

        const validUser = {
            
            password: 'secret_admin'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(400)
        expect(appResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
    it('login missing field - password',async function ( ) {

        const validUser = {
            email: 'test@email.com'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(400)
        expect(appResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
    it('login invalid field - email',async function ( ) {

        const validUser = {
            email: 'test@email',
            password: 'validPassword'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(401)
        expect(appResponse.body).to.deep.equal({ message: invalidMessage })
    })
    it('login invalid field - password',async function ( ) {

        const validUser = {
            email: 'test@email.com',
            password: '12345'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(401)
        expect(appResponse.body).to.deep.equal({ message: invalidMessage})
    })
    it('User not found in DB',async function ( ) {
        Sinon.stub(User, 'findOne').resolves( null )

        const validUser = {
            email: 'UserNotFoundInDB@admin.com',
            password: 'secret_admin'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(401)
        expect(appResponse.body).to.deep.equal({ message: invalidMessage})
    })
    it('Password does not match',async function ( ) {
        Sinon.stub(User, 'findOne').resolves( {
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        } as any )

        const validUser = {
            email: 'admin@admin.com',
            password: 'Wrong_Password'
        }

        const appResponse = await chai.request(app).post('/login').send(validUser)

        expect(appResponse.status).to.have.equal(401)
        expect(appResponse.body).to.deep.equal({ message: invalidMessage})
    })
})

describe('Integration test token', function (){
    afterEach(function(){
        Sinon.restore();
    })
    it('token valida',async function ( ) {
        Sinon.stub(User, 'findOne').resolves({
            email: 'admin@admin.com',
            role: 'admin'
        } as any)

        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

        const appResponse = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${validToken}`)

        expect(appResponse.body).to.have.deep.equal({
            role: "admin"
          })
    })
    it('token missing',async function ( ) {
        Sinon.stub(User, 'findOne').resolves({
            email: 'admin@admin.com',
            role: 'admin'
        } as any)

        const validUser = {
            email: 'admin@admin.com',
            role: 'admin'
        }

        const validToken = jwt.sign(validUser, "jwt_secret")

        const appResponse = await chai.request(app).get('/login/role')

        expect(appResponse.status).to.have.equal(401)
    })
    it('invalid token',async function ( ) {
        Sinon.stub(User, 'findOne').resolves({
            email: 'admin@admin.com',
            role: 'admin'
        } as any)

        const invalidUser = {
            email: 'admin@admin.com',
            role: 'wrongRole'
        }

        const invalidToken = jwt.sign(invalidUser, "jwt_secret")

        const appResponse = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${invalidToken}`)

        expect(appResponse.status).to.have.equal(401)
    })
})