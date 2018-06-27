import ridedb from '../../dummydb/ridesdb';

/**
 * @class CheckExistence
 */
export default class CheckExistence {
  /**
     * @desc Check existence
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static rideOffer(req, res, next) {
    const { rideId } = req.body;
    let existingRide = false;
    ridedb
      .forEach((ride) => {
        if (ride.rideId === rideId) {
          existingRide = true;
        }
      });
    if (existingRide) {
      return res.status(400).json({
        message: 'Oops! this ride is offered already'
      });
    }
    next();
  }

  /**
     * @desc Check existence
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static requestRide(req, res, next) {
    const { requestId } = req.body;
    let requested = false;
    for (let ride of ridedb) {
      ride.onRequest.forEach((request) => {
        if (request.requestId === requestId) {
          requested = true;
        }
      })
    };
    if (requested) {
      return res.status(400).json({
        message: 'eh! you cannot request twice'
      });
    }
    next();
  }
}
