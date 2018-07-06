import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import setup from './setup.spec';
import utils from './utils/data';

const { should } = chai;
const { baseUrl, token } = setup;
should();

chai.use(chaiHttp);
describe('Test request APIs', () => {
  describe('/GET route find a request', () => {
    it('should return a requests and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/users/rides/7/requests`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.status.should.be.eql('success');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Found a ride for your request');
          res.body.should.have.property('requests');
          res.body.requests.should.be.an('array');
          done();
        });
    });
    it('should not return a requests and return 200 status code', (done) => {
      chai.request(app)
        .get(`${baseUrl}/users/rides/383736626/requests`)
        .set('x-access-token', token.user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.status.should.be.eql('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Oops Sorry! no available request yet');

          done();
        });
    });
  });
  describe('/POST request a ride', () => {
    // it.only('should request a ride and return 201 status code', (done) => {
    //   chai.request(app)
    //     .post(`${baseUrl}/rides/7/request`)
    //     .set('x-access-token', token.userPlus)
    //     .send(utils.message.request)
    //     .end((err, res) => {
    //         console.log(res.body)
    //       res.should.have.status(201);
    //       res.body.should.have.property('message');
    //       res.body.should.have.property('status');
    //       res.body.message.should.be.a('string');
    //       res.body.status.should.be.a('string');
    //       res.body.status.should.be.eql('pending....');
    //       res.body.message.should.be.eql('Your request has beean successfully sent!');
    //       res.body.should.have.property('request');
    //       res.body.request.should.be.an('object');
    //       res.body.request.should.have.property('username');
    //       res.body.request.should.have.property('message');
    //       res.body.request.should.have.property('userid');
    //       res.body.request.should.have.property('rideid');
    //       done();
    //     });
    // });
    it('should not request ride and return 400 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/rides/565656/request`)
        .set('x-access-token', token.userPlus)
        .send(utils.message.request)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.be.a('string');
          res.body.status.should.be.a('string');
          res.body.status.should.be.eql('fail');
          res.body.message.should.be.eql('No ride with this rideId');
          res.body.should.have.property('error');
          res.body.error.should.be.an('boolean');
          res.body.error.should.be.eql(true);
          done();
        });
    });
  });
  describe('/PUT route update a request', () => {
    it('should not update request and return 422 status code', (done) => {
      chai.request(app)
        .put(`${baseUrl}/users/rides/6656/requests/68098`)
        .set('x-access-token', token.user)
        .send(utils.noData)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.an('object');
          res.body.should.have.property('errors');
          res.body.errors.should.be.a('string');
          done();
        });
    });
    it('should not updata a request and return 400 status code', (done) => {
      chai.request(app)
        .put(`${baseUrl}/users/rides/44444/requests/345556`)
        .set('x-access-token', token.user)
        .send(utils.request.action)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('action can only be accept or reject');
          res.body.should.have.property('status');
          res.body.status.should.be.an('string');
          res.body.status.should.be.eql('failed');
          done();
        });
    });
    // it('should not create a ride and return 422 status code', (done) => {
    //   chai.request(app)
    //     .put(`${baseUrl}/users/rides/7/requests/3`)
    //     .set('x-access-token', token.user)
    //     .send(utils.request.expectedAction.accept)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.be.an('object');
    //       res.body.should.have.property('message');
    //       res.body.message.should.be.a('string');
    //       res.body.message.should.be.eql('Request successfully accepted');
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.an('string');
    //       res.body.status.should.be.eql('Success');
    //       done();
    //     });
    // });
    // it('should not create a ride and return 422 status code', (done) => {
    //   chai.request(app)
    //     .put(`${baseUrl}/users/rides/7/requests/1`)
    //     .set('x-access-token', token.user)
    //     .send(utils.request.expectedAction.reject)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.be.an('object');
    //       res.body.should.have.property('message');
    //       res.body.message.should.be.a('string');
    //       res.body.message.should.be.eql('Request successfully rejected');
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.an('string');
    //       res.body.status.should.be.eql('Success');
    //       done();
    //     });
    // });
  });
});
