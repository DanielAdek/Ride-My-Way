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
}
