import bcrypt from 'bcrypt';
import db from '../models/connect';

/**
 * @class Users
 */
export default class Users {
  /**
   * createUser();
     * @description Create ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static createUser(req, res) {
    const password = bcrypt.hashSync(req.body.password, 10);
    const {
      fullName, username, email
    } = req.body;
    const query = 'INSERT INTO users (fullName, username, email, password) VALUES ($1, $2, $3, $4) returning *';
    const params = [fullName, username, email, password];
    db
      .query(query, params)
      .then(newUser => res.status(201).json({ message: newUser.rows }))
      .catch(err => res.status(500).json({ message: err.message }));
  }
}
