import randomStr from 'random-string';
import db from '../models/connect';
import find from '../queries/find.json';
import update from '../queries/update.json';
import mailSender from '../utils/mailer';

/**
 * @class Users
 */
export default class SingleRouteHandler {
  /**
    * forgetPassword()
     * @returns {object} json
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @param {function} next
     */
  static forgetPassword(req, res, next) {
    const queryToken = req.query.token;
    if (queryToken) {
      next();
    } else {
      const { email } = req.body;
      const token = randomStr({ length: 50 });
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
          mailSender.forgotPasswordMail(token, email);
          db
            .query(update.passwordResetToken, [token]).then(() => res.status(200).json({
              success: true,
              passwordResetToken: token,
              message: 'A reset token has been sent to your email address'
            })).catch(err => res.status(500).json({ message: `Internal error ${err.message}` }));
        }).catch((err) => {
          res.status(500).json({
            success: false,
            message: `There was an internal problem ${err.message} `
          });
        });
    }
  }
}
