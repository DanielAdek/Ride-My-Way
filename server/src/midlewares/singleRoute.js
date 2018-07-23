import db from '../models/connect';
import find from '../queries/find.json';

/**
 * @class Search
 */
export default class Search {
  /**
    * searchRide()
     * @returns {object} json
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @param {function} next
     */
  static searchRide(req, res, next) {
    const { departure, destination, date } = req.query;
    if (!departure || !destination || !date) {
      next();
    } else {
      const userRequest = [
        departure.trim().toLowerCase(),
        destination.trim().toLowerCase(), date
      ];
      db
        .query(find.rideByD3, userRequest)
        .then((rides) => {
          if (rides.rows.length < 1) {
            return res.status(200).json({
              success: false,
              message: 'No Record Found'
            });
          }
          return res.status(200).json({
            success: true,
            message: 'Success',
            result: rides.rows,
            count: rides.rows.length
          });
        }).catch((err) => {
          res.status(500).json({
            success: false,
            message: `There was an internal problem ${err.message}`
          });
        });
    }
  }
}
