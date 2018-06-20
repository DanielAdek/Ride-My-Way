import db from '../dummydb/driverdb';
import ridesdb from '../dummydb/ridesdb';

// let id = 2;
let rideId = 0;
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
      const offeredRides = db.map(drivers => drivers.rideOffer)
        .filter(rides => rides !== undefined || rides != null);
      if (offeredRides.length < +true) {
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
    const requestId = parseInt(req.params.rideId, 10);
    db
      .forEach((driver) => {
        if (driver.id === requestId) {
          ride = driver.rideOffer;
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
        res.status(200).json({
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
      departure, arrival, time, date, spotInCar, cost
    } = req.body;
    rideId += 1;
    return new Promise((resolve, reject) => {
      ridesdb
        .push({
          rideId, departure, arrival, time, date, spotInCar, cost
        });
      resolve('new Ride successfully created');
      reject(new Error('There was a problem creating the ride offer, try again'));
    })
      .then(newRideOffer => res.status(201).json({
        message: newRideOffer
      })).catch(err => res.status(500).json({ message: err.message }));
  }
  /**
   * getAllRides();
     * @description get all rides
     * @param {*} req
     * @param {*} res
     * @returns {object} json
     */
  static AllRides(req, res) {
    return new Promise((resolve, reject) => {
      const allRides = ridesdb.map(rides => rides);
      if (allRides.length < +true) {
        reject(new Error('Cannot find any ride offers yet! please, Try Again In 20 Minutes'));
      }
      resolve(allRides);
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
}
