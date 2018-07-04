import { check } from 'express-validator/check';

export default {
  validOfferRide: [
    check('departure')
      .trim().not().isEmpty()
      .withMessage('Please fill the departures field'),
    check('destination')
      .trim().not().isEmpty()
      .withMessage('Please fill the destination field'),
    check('seats')
      .trim().not().isEmpty()
      .withMessage('Please specify the available seats in car')
      .matches(/\d+/)
      .withMessage('seats contains only numbers'),
    check('date')
      .trim().not().isEmpty()
      .withMessage('Please specify date for the trip')
      .matches(/^\d\d-\d\d-\d\d\d\d$/)
      .withMessage('date should look like 02-07-2018'),
    check('time')
      .trim().not().isEmpty()
      .withMessage('Please specify time for the trip')
      .matches(/^\d\d:\d\d$/)
      .withMessage('Time should look like 18:48'),
    check('cost')
      .trim().not().isEmpty()
      .withMessage('How much for this trip')
  ],

  request: [
    check('action')
      .trim().not().isEmpty()
      .withMessage('Please specify an action for this request'),
  ],

  makeFieldsRequest: [
    check('username')
      .trim().not().isEmpty()
      .withMessage('Please specify your username')
      .matches(/^[a-zA-Z ]+$/)
      .withMessage('username should be letters only')
  ]
};
