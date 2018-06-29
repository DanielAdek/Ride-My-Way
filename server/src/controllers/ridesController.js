import db from '../models/connect';

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
    const allRides = 'SELECT * FROM rides';
    db.query(allRides)
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
   * getSingleRide();
     * @description get one ride
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getSingleRide(req, res) {
    const { rideId } = req.params;
    const queryRide = 'SELECT * FROM rides WHERE rideId = $1;';
    const param = [rideId];
    db.query(queryRide, param)
      .then((ride) => {
        if (ride.rows.length < 1) {
          return res.status(200).json({
            message: 'Oops Sorry! the requested ride does not exist'
          });
        }
        return res.status(404).json({
          message: 'Here You Are! good to go!',
          ride: ride.rows
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }
}
