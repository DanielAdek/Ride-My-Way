// import db from '../dummydb/userdb';
import ridesdb from '../dummydb/ridesdb';

// let id = 2;
const onRequest = [];
/**
 * @class Rides
 */
export default class Rides {
  /**
   * getAllRides();
     * @description get all rides
     * @param {*} req
     * @param {*} res
     * @returns {object} json
     */
  static getAllRides(req, res) {
    return new Promise((resolve, reject) => {
      const offeredRides = ridesdb.map(allAvailableRides => allAvailableRides);
      if (offeredRides.length < 1) {
        reject(new Error('Cannot find any ride offers yet! please, Try Again In 20 Minutes'));
      }
      resolve(offeredRides);
    }).then((rides) => {
      res.status(200).json({
        message: `Here You Are!, ${rides.length} rides for You`,
        rides
      });
    }).catch((err) => {
      res.status(200).json({
        error: 'Oops Sorry!,',
        message: err.message
      });
    });
  }

  /**
   * getSingleRide();
     * @description get one ride
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getSingleRide(req, res) {
    let ride;
    const { rideId } = req.params;
    ridesdb
      .forEach((rides) => {
        if (rides.rideId === rideId) {
          ride = rides;
        }
      });
    return new Promise((resolve, reject) => {
      if (!ride) {
        reject(new Error('Cannot find any ride from this driver'));
      }
      resolve(ride);
    })
      .then((driverRide) => {
        res.status(200).json({
          message: 'Here You Are!',
          driverRide
        });
      })
      .catch((err) => {
        res.status(404).json({
          error: 'Oops Sorry!,',
          message: err.message
        });
      });
  }

  /**
   * createRideOffer();
     * @description Create ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static createRideOffer(req, res) {
    const {
      rideId, departure, destination, time, date, seats, cost
    } = req.body;
    return new Promise((resolve, reject) => {
      ridesdb
        .push({
          rideId, departure, destination, time, date, seats, cost, onRequest
        });
      resolve('new Ride successfully created');
      reject(new Error('There was a problem creating the ride offer, try again'));
    })
      .then(newRideOffer => res.status(201).json({
        message: newRideOffer,
        ride: {
          rideId, departure, destination, time, date, seats, cost
        }
      })).catch(err => res.status(500).json({ message: err.message }));
  }


  /**
   * requestRide();
     * @description request ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static requestRide(req, res) {
    const { rideId } = req.params;
    let requestSent = false;
    const { message } = req.body;
    return new Promise((resolve, reject) => {
      ridesdb
        .forEach((ride) => {
          if (ride.rideId === rideId) {
            ride.seats -= 1;
            ride.onRequest.push({ message });
            requestSent = true;
          }
        });
      if (!requestSent) {
        reject(new Error('There was a problem sending request. check ride identification'));
      }
      resolve({
        message: 'Your request has beean successfully sent!',
        status: 'pending....'
      });
    })
      .then(newRequest => res.status(201).json({ newRequest }))
      .catch(err => res.status(404).json({ error: err.message }));
  }
}
