import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import assert from 'assert';

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
          done();
        });
    });
  });
});
