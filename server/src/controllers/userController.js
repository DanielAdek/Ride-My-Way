import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import randomStr from 'random-string';
import db from '../models/connect';
import find from '../queries/find.json';
import insert from '../queries/insert.json';
import update from '../queries/update.json';
import mailSender from '../utils/mailer';

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

    const valuesIntoTable = [fullName.trim().toLowerCase(),
      username.trim().toLowerCase(),
      email.trim(), password.trim()];
    db
      .query(insert.userSignup, valuesIntoTable)
      .then((newUser) => {
        const { userid } = newUser.rows[0];
        const token = jwt.sign({ userid, email, username }, secret, { expiresIn: '24h' });
        res.status(201).json({
          success: true,
          message: 'Success',
          user: { username, email, token }
        });
      })
      .catch(err => res.status(500).json({
        success: false,
        message: `There was an internal error! ${err.message}`
      }));
  }

  /**
     * @returns {object} loginUser
     * @param {*} req
     * @param {*} res
     */
  static loginUser(req, res) {
    const { email, password } = req.body;
    const userEmail = [email.trim()];
    db
      .query(find.userByEmail, userEmail)
      .then((user) => {
        if (user.rows[0] && bcrypt.compareSync(password.trim(), user.rows[0].password)) {
          const { userid, username } = user.rows[0];
          const token = jwt.sign({ userid, email, username }, secret, { expiresIn: '24h' });
          return res.status(200).json({
            success: true,
            message: `${username} is successfully logged in`,
            result: { username, email, token },
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Your email or password is incorrect'
        });
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: `There was an internal/server error ${err.message} `
        });
      });
  }

  /**
    * forgetPassword()
     * @returns {object} json
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @param {function} next
     */
  static forgetPassword(req, res) {
    const { email } = req.body;
    db
      .query(find.userByEmail, [email])
      .then((user) => {
        if (user.rows.length < 1) {
          return res.status(400).json({
            success: false,
            userEmail: email,
            message: 'This Email is either incorrect or not yet registered'
          });
        }
        const token = randomStr({ length: 10 });
        mailSender.forgotPasswordMail(token, email);
        db
          .query(update.passwordResetToken, [token, email]).then(() => res.status(200).json({
            success: true,
            passwordResetToken: token,
            message: 'A Reset Token Has Been Sent To Your Mail Account'
          })).catch(err => res.status(500).json({ message: `Internal error ${err.message}` }));
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: `There was an internal problem ${err.message} `
        });
      });
  }

  /**
    * resetPassword()
     * @returns {object} json
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     */
  static resetPassword(req, res) {
    const { token } = req.query;
    const password = bcrypt.hashSync(req.body.password, 10);
    const userPassword = [password.trim(), token.trim()];
    db.query(find.userByResetToken, [token.trim()]).then((user) => {
      if (user.rows.length < 1) {
        return res.status(400).json({
          success: false,
          message: 'Token incorrect, please copy token from your mail'
        });
      }
      mailSender.resetPasswordMail(user.rows[0].email);
      db
        .query(update.password, userPassword).then(() => res.status(200).json({
          success: true,
          message: 'New password is successfully created'
        }))
        .catch(error => res.status(500).json({ message: `Internal error ${error.message}` }));
    }).catch(err => res.status(500).json({ message: `Internal error ${err.message}` }));
  }
}
