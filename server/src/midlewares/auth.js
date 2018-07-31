import { validationResult } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secret = process.env.SECRET;
/**
 * @class auth
 */
export default class Auth {
  /**
     * @desc Check authentication
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static validateInput(req, res, next) {
    const error = validationResult(req);
    let message;
    error.array().forEach((messages) => {
      message = messages.msg;
    });
    if (!error.isEmpty()) {
      return res.status(422).json({ errors: message });
    }
    next();
  }

  /**
     * verifyUser()
     * @desc verify a user
     * @param {object} req express request object
     * @param {object} res express request object
     * @param {function} next
     * @returns {json} json
     */
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'] || req.query.token || req.headers.authorization;
    if (!token) {
      res.status(403).json({
        success: false,
        message: 'Authentication failed, please login'
      });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      res.status(401).json({ message: 'Authentication failed' });
    }
    req.decoded = decoded;
    next();
  }
}
