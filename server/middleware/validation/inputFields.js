import { check } from 'express-validator/check';

export default {
  checker: [
    check('departure')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please fill the departures field'),
    check('arrival')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please fill the arrival field'),
    check('spotInCar')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please specify spot in car field'),
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
