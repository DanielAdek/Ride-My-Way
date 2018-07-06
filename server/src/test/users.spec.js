import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import setup from './setup.spec';
import utils from './utils/data';

const { should } = chai;
const { baseUrl } = setup;
should();

chai.use(chaiHttp);
describe('Test users APIs', () => {
  describe('/POSt route create user', () => {
    // it('should create a new user and return 201 status code', (done) => {
    //   chai.request(app)
    //     .post(`${baseUrl}/auth/signup`)
    //     .send(utils.signup.rightDetails)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.have.property('message');
    //       res.body.message.should.be.an('object');
    //       res.body.should.have.property('token');
    //       res.body.token.should.be.an('string');
    //       done();
    //     });
    // });
    it('should not create a new user and return 422 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(utils.signup.wrongDetails)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('string');
          done();
        });
    });
  });
  describe('/POST route login user', () => {
    it('should login an authenticated user and return 200 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/login`)
        .send(utils.login.existingUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('user logged in');
          res.body.should.have.property('token');
          res.body.token.should.be.an('string');
          done();
        });
    });
    it('should not login an unauth user and return 400 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/login`)
        .send(utils.login.nonExistingUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message');
          res.body.message.should.be.eql('email/password incorrect');
          done();
        });
    });
    it('should not login a user without correct details and return 422 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/login`)
        .send(utils.login.wrongData)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('string');
          done();
        });
    });
  });
});
