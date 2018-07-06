import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import setup from './setup.spec';
import utils from './utils/data';

const { should } = chai;
const { baseUrl, token } = setup;
should();

chai.use(chaiHttp);
describe('Test all rides APIs', () => {
  describe('/GET route find all rides', () => {
    it('should return all rides and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/rides`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql(`Here You Are!, ${res.body.availableRides.length} rides for You`);
          res.body.should.have.property('availableRides');
          res.body.availableRides.should.be.an('array');
          done();
        });
    });
    it('should not return any ride and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/rides`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(200);
          if (res.body.availableRides.length === 0) {
            res.body.should.have.property('error');
            res.body.error.should.be.a('string');
            res.body.error.should.be.eql('Oops Sorry!,');
            res.body.should.have.property('message');
            res.body.message.should.be.a('string');
            res.body.message.should.be.eql('Cannot find any ride offers yet! please, Try Again In 20 Minutes');
          }
          done();
        });
    });
  });
  describe('/GET route find a ride', () => {
    it('should return a ride and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/rides/7`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Here You Are! good to go!');
          res.body.should.have.property('ride');
          res.body.ride.should.be.an('array');
          res.body.ride.length.should.be.a('number');
          res.body.ride.length.should.be.eql(1);
          done();
        });
    });
    it('should return a ride and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/rides/12345989`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.be.eql('Oops Sorry!');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Cannot find any ride from this driver');
          done();
        });
    });
  });
  describe('/POST route create a ride', () => {
    it('should create a ride and return 201 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/rides`)
        .set('x-access-token', token.user)
        .send(utils.newRide)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('new ride successfully created');
          res.body.should.have.property('ride');
          res.body.ride.should.be.an('object');
          done();
        });
    });
    it('should not create a ride and return 422 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/rides`)
        .set('x-access-token', token.user)
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          done();
        });
    });
  });
});
