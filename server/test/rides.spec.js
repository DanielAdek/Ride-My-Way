import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const request = chai.request(app);
const { should } = chai;
should();

describe('Test all rides APIs', () => {
  describe('/GET route find all rides', () => {
    const rides = [{}, {}];
    it('should return all rides and return 200 status code', (done) => {
      request
        .get('/api/v1/rides')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql(`Here You Are!, ${rides.length} rides for You`);
          res.body.should.have.property('rides');
          res.body.rides.should.be.an('array');
          done();
        });
    });
  });
  describe('/GET route find a ride', () => {
    it('should return a ride and return 200 status code', (done) => {
      request
        .get('/api/v1/rides/46ced7aa-eed5-4462-b2c0-153f31589bdd')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Here You Are!');
          res.body.should.have.property('driverRide');
          res.body.driverRide.should.be.an('object');
          done();
        });
    });
    it('should return a ride and return 200 status code', (done) => {
      request
        .get('/api/v1/rides/419-thief')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.be.eql('Oops Sorry!,');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Cannot find any ride from this driver');
          done();
        });
    });
  });
  describe('/POST route create a ride', () => {
    const newRide = {
      rideId: '3#4744b-6%888-3',
      departure: 'Unilag',
      arrival: 'Andela',
      time: '04:49AM',
      date: '25/06/2018',
      spotInCar: 3,
      cost: '$3.0'
    };
    it('should create a ride and return 200 status code', (done) => {
      request
        .post('/api/v1/rides')
        .send(newRide)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('new Ride successfully created');
          done();
        });
    });
    it('should not create a ride and return 422 status code', (done) => {
      request
        .post('/api/v1/rides')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('errors');
          done();
        });
    });
  });
  describe('/POST route create a request', () => {
    const newRequest = { message: 'I was hoping to join you on this trip' };
    it('should create a request and return 201 status code', (done) => {
      request
        .post('/api/v1/rides/8a65538d-f862-420e-bcdc-80743df06578/request')
        .send(newRequest)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('newRequest');
          res.body.should.have.be.an('object');
          res.body.newRequest.should.have.property('message');
          res.body.newRequest.should.have.property('status');
          res.body.newRequest.should.have.property('status');
          res.body.newRequest.status.should.be.eql('pending....');
          res.body.newRequest.message.should.be.eql('Your request has beean successfully sent!');
          done();
        });
    });
    it.only('should not create a ride and return 404 status code', (done) => {
      request
        .post('/api/v1/rides/419/request')
        .send(newRequest)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.be.eql('There was a problem sending request. check ride identification');
          done();
        });
    });
  });
});
