import { check } from 'express-validator/check';

export default {
  checker: [
    check('rideId')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please specify an Id for this ride'),
    check('departure')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please fill the departures field'),
    check('destination')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please fill the destination field'),
    check('seats')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please specify the available seats in car'),
    check('date')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please specify date for the trip'),
    check('time')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please specify time for the trip')
  ]
};
