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
    it.only('should return a ride and return 200 status code', (done) => {
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
});
