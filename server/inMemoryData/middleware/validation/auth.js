import { validationResult } from 'express-validator/check';

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
}
