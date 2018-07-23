import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const url = process.env.BASE_URL;

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {nothing} returns nothing
   */
  static sendMail({ to, subject, message }) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: '"Ride My Way" <noreply@ride-my-way.com>',
      to,
      subject,
      html: message
    };

    transporter.sendMail(mailOptions);
  }

  /**
   * Sends Mail for user to use to reset his password
   * @method forgotPasswordMail
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static forgotPasswordMail(token, email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>You recently requested to reset your password. If this wasn't you, please ignore this mail.</p>
      <p>You can click on or copy this link: <a href='http://${url}/user/reset-password?token=${token}'>
      http://${url}/user/reset-password?token=${token}</a> to reset your password</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Reset Password',
      message
    });
  }

  /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} email
   * @returns {nothing} returns nothing
   */
  static resetPasswordMail(email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your password was reset succesfully.</p>
      <p><a href='http://${url}/auth/login'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Password Reset Successful',
      message
    });
  }
}

export default Mailer;
