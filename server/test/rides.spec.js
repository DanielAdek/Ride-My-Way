import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const request = chai.request(app);
const { should } = chai;
should();

describe('Test all rides APIs', () => {
  describe('/GET route find all rides', () => {
    it('should not return any ride and return 404 status code', (done) => {
      request
        .get('/api/v1/rides')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.be.eql('Oops Sorry!');
          done();
        });
    });

    // it('should return a business and return 200 status code', (done) => {
    //   request
    //     .get('/api/v1/business/3')
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.have.property('business');
    //       done();
    //     });
    // });
  });
});
