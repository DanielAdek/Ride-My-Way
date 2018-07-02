import bcrypt from 'bcrypt';
import db from '../models/connect';
import find from '../queries/find.json';
import insert from '../queries/insert.json';

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
    const valuesIntoTable = [fullName, username, email, password];
    db
      .query(insert.userSignup, valuesIntoTable)
      .then(newUser => res.status(201).json({ message: newUser.rows }))
      .catch(err => res.status(500).json({ message: err.message }));
  }

  /**
     * @returns {object} loginUser
     * @param {*} req
     * @param {*} res
     */
  static loginUser(req, res) {
    const { email, password } = req.body;
    const userEmail = [email];
    db
      .query(find.userByEmail, userEmail)
      .then((user) => {
        if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].password)) {
          return res.status(200).json({ message: 'user logged in' });
        }
        return res.status(400).json({ message: 'email/password incorrect' });
      }).catch((err) => {
        res.status(500).json({ message: `server error ${err.message} ` });
      });
  }
}
