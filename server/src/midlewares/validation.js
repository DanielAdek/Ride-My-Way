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
    });
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
    const userNme = username.toLowerCase();
    db.query(find.userByUsername, [userNme]).then((user) => {
      if (user.rows.length > 0) {
        return res.status(400).json({
          status: 'fail',
          message: 'Username already existed, choose another username'
        });
      }
      next();
    });
  }

  /**
     * @desc Check if an ride is already existing
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static ride(req, res, next) {
    const { userid } = req.decoded;
    const { time, date } = req.body;
    db.query(find.timeAndDateByUserId, [userid]).then((ride) => {
      const existRide = ride.rows.filter(val => val.time === time && val.date === date);
      if (existRide.join('')) {
        return res.status(400).json({
          status: 'fail',
          message: 'You cannot create a ride that has the same date and time'
        });
      }
      next();
    });
  }
}
