import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import setup from './setup.spec';
// import db from '../models/connect';

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
        .get(`${baseUrl}/rides/1`)
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
    // it('should return a ride and return 200 status code', (done) => {
    //   chai.request(app)
    //     .get(`${baseUrl}/rides/498u9`)
    //     .set('x-access-token', token.user)
    //     .end((err, res) => {
    //       if (res.body.ride.length < 1) {
    //         res.should.have.status(404);
    //         res.body.should.have.property('error');
    //         res.body.error.should.be.a('string');
    //         res.body.error.should.be.eql('Oops Sorry!,');
    //         res.body.should.have.property('message');
    //         res.body.message.should.be.a('string');
    //         res.body.message.should.be.eql('Cannot find any ride from this driver');
    //         done();
    //       }
    //     });
    // });
  });
  describe('/POST route create a ride', () => {
    const ran = Math.floor(Math.random() * 9);
    const ran2 = Math.floor(Math.random() * 8);
    const ran3 = Math.floor(Math.random() * 7);
    const ran4 = Math.floor(Math.random() * 6);
    const newRide = {
      departure: 'Unilag',
      destination: 'Andela',
      time: `${ran4}${ran2}:${ran3}${ran}`,
      date: `${ran}${ran4}-${ran2}${ran3}-20${ran}${ran2}`,
      seats: 3,
      cost: '$3.0'
    };
    it('should create a ride and return 201 status code', (done) => {
      chai.request(app)
        .post(`${baseUrl}/users/rides`)
        .set('x-access-token', token.user)
        .send(newRide)
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
  describe('/POST route create a request', () => {
    // const newRequest = {
    //   username: 'danielijni',
    //   message: 'I was hoping to join you on this trip'
    // };
    // it('should create a request and return 201 status code', (done) => {
    //   chai.request(app)
    //     .post(`${baseUrl}/rides/4/request`)
    //     .set('x-access-token', token.user)
    //     .send(newRequest)
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.have.property('request');
    //       res.body.request.should.have.be.an('object');
    //       res.body.should.have.property('message');
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.eql('pending....');
    //       res.body.message.should.be.eql('Your request has beean successfully sent!');
    //       done();
    //     });
    // });
    // it('should not create a ride twice and return 400 status code', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/rides/8a65538d-f862-420e-bcdc-80743df06578/request')
    //     .send(newRequest)
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.have.property('message');
    //       res.body.message.should.be.a('string');
    //       res.body.message.should.be.eql('eh! you cannot request twice');
    //       done();
    //     });
    // });
    // it('should not create a ride and return 422 status code', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/rides/8a65538d-f862-420e-bcdc-80743df06578/request')
    //     .send({})
    //     .end((err, res) => {
    //       res.should.have.status(422);
    //       res.body.should.have.property('errors');
    //       done();
    //     });
    });
//     it('should not create a ride and return 404 status code', (done) => {
//       chai.request(app)
//         .post('/api/v1/rides/a6553d-f862-420e-cdc-80743df068/request')
//         .send({ requestId: 'a6553d-f862' })
//         .end((err, res) => {
//           res.should.have.status(404);
//           res.body.should.have.property('error');
//           res.body.error.should.be.a('string');
//           res.body.error.should.be.eql('There was a problem sending request. check ride identification');
//           done();
//         });
//     });
//   });
});
