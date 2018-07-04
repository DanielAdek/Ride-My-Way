import db from '../models/connect';
import find from '../queries/find.json';
/**
 * @class Exting
 */
export default class Exting {
  /**
     * @desc Check if an email is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static email(req, res, next) {
    const { email } = req.body;
    db.query(find.userByEmail, [email]).then((user) => {
      if (user.rows.length > 0) {
        return res.status(400).json({
          message: 'Email already existed'
        });
      }
      next();
    }).catch(err => console.log(err.message));
  }

  /**
     * @desc Check if an username is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static username(req, res, next) {
    const { username } = req.body;
    db.query(find.userByUsername, [username]).then((user) => {
      if (user.rows.length > 0) {
        return res.status(400).json({
          message: 'Username already existed, choose another username'
        });
      }
      next();
    }).catch(err => console.log(err.message));
  }

  /**
     * @desc Check if an ride is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static ride(req, res, next) {
    const { time, date } = req.body;
    db.query(find.rideByTimeAndDate, [time, date]).then((ride) => {
      if (ride.rows.length > 0) {
        return res.status(400).json({
          message: 'You cannot create a ride that has the same date and time'
        });
      }
      next();
    }).catch(err => console.log(err.message));
  }
}
