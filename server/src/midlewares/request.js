import db from '../models/connect';
import find from '../queries/find.json';
/**
 * @class Verify
 */
export default class Verify {
  /**
       * validateInputFields()
       * @desc user does not input any data
       * @param {object} req express request object
       * @param {object} res express request object
       * @param {function} next
       * @returns {json} json
       */
  static validateRequestAction(req, res, next) {
    const { action } = req.body;
    if (action.trim().toLowerCase() === 'accept' || action.trim().toLowerCase() === 'reject') {
      next();
    } else {
      return res.status(400).json({ message: 'action can only be accept or reject' });
    }
  }

  /**
       * validateRequestMessage()
       * @desc user does not input any data
       * @param {object} req express request object
       * @param {object} res express request object
       * @param {function} next
       * @returns {json} json
       */
  static validateRequestMessage(req, res, next) {
    const { message } = req.body;
    const regex = /^[a-zA-Z ]+$/;
    if (message) {
      const test = regex.test(message);
      if (test) {
        next();
      } else {
        return res.status(400).json({ message: 'message can only contain letters' });
      }
    } else {
      next();
    }
  }

  /**
     * @desc Check if an user has already requested
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next
     * @returns {function} json
     */
  static requestExit(req, res, next) {
    const { username } = req.body;
    db.query(find.requestByUsername, [username]).then((request) => {
      if (request.rows.length > 0) {
        return res.status(400).json({
          message: 'You cannot request twice'
        });
      }
      next();
    }).catch(err => console.log(err.message));
  }
}

