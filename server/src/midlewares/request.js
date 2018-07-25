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
    if (action.trim().toLowerCase() === 'Request Accepted' || action.trim().toLowerCase() === 'Request Rejected') {
      next();
    } else {
      return res.status(400).json({
        error: true,
        status: 'failed',
        message: 'Action can only be "Request Accepted" or "Request Rejected"'
      });
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
    if (message) {
      const regex = /^[a-zA-Z ]+$/ig;
      const test = regex.test(message);
      if (!test) {
        return res.status(400).json({
          error: true,
          status: 'failed',
          message: 'Message can only contain letters'
        });
      }
      next();
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
    const { userid } = req.decoded;
    const rideId = parseInt(req.params.rideId, 10);
    db.query(find.requestByUserId, [userid]).then((request) => {
      const found = request.rows.map(ride => ride.rideid === rideId);
      if (found.indexOf(true) !== -1) {
        return res.status(400).json({
          error: true,
          message: 'You have already requested for this ride'
        });
      }
      next();
    });
  }
}

