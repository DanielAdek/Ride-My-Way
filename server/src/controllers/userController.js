import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from '../models/connect';
import find from '../queries/find.json';
import insert from '../queries/insert.json';

config();
const secret = process.env.SECRET;
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

    const valuesIntoTable = [fullName.toLowerCase(),
      username.toLowerCase(),
      email, password];
    db
      .query(insert.userSignup, valuesIntoTable)
      .then((newUser) => {
        const { userid } = newUser.rows[0];
        const token = jwt.sign({ userid, email, username }, secret, { expiresIn: '24h' });
        res.status(201).json({
          message: newUser.rows[0],
          token
        });
      })
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
          const { userid, username } = user.rows[0];
          const token = jwt.sign({ userid, email, username }, secret, { expiresIn: '24h' });
          return res.status(200).json({
            success: true,
            message: `${username} is successfully logged in`,
            token
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Your email or password is incorrect'
        });
      }).catch((err) => {
        res.status(500).json({ message: `server error ${err.message} ` });
      });
  }
}
