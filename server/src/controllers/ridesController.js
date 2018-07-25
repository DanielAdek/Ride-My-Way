import db from '../models/connect';
import insert from '../queries/insert.json';
import find from '../queries/find.json';

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
    db.query(find.allRides)
      .then((rides) => {
        if (rides.rows.length < 1) {
          return res.status(200).json({
            message: 'Oops Sorry! no available rides yet'
          });
        }
        return res.status(200).json({
          message: `Here You Are!, ${rides.rows.length} rides for You`,
          availableRides: rides.rows
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getOneUserRides();
     * @description get all rides
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getOneUserRides(req, res) {
    const { userid } = req.decoded;
    db.query(find.ridesByUserId, [userid])
      .then((rides) => {
        if (rides.rows.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: rides.rows.length,
            message: 'No Ride Found'
          });
        }
        return res.status(200).json({
          found: true,
          message: 'Success!',
          availableRides: rides.rows,
          count: rides.rows.length
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getSingleRide();
     * @description get one ride
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getSingleRide(req, res) {
    const { rideId } = req.params;
    db.query(find.rideById, [rideId])
      .then((ride) => {
        if (ride.rows.length < 1) {
          return res.status(404).json({
            error: 'Oops Sorry!',
            message: 'Cannot find any ride from this driver'
          });
        }
        return res.status(200).json({
          message: 'Here You Are! good to go!',
          ride: ride.rows
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * createRideOffer();
     * @description Create ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static createRideOffer(req, res) {
    const { userid, username } = req.decoded;
    const {
      departure, destination, time, date, seats, cost, message
    } = req.body;
    const valuesIntoTable = [userid, username.trim().toLowerCase(),
      departure.trim().toLowerCase(), destination.trim().toLowerCase(),
      time, date, seats, cost, message];
    db.query(insert.rideOffer, valuesIntoTable)
      .then(() => res.status(201).json({
        success: true,
        message: 'Successfully created!',
        ride: {
          userid,
          driver: username,
          departure,
          destination,
          time,
          date,
          seats,
          cost,
          message
        }
      })).catch(err => res.status(500).json({ message: err.message }));
  }
}
