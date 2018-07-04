import express from 'express';
import user from '../src/controllers/userController';
import rides from '../src/controllers/ridesController';
import request from '../src/controllers/requestController';
import auth from '../src/midlewares/auth';
import checkInput from '../src/validations/rides';
import validateInput from '../src/validations/users';
import existing from '../src/midlewares/validation';
import requestAction from '../src/midlewares/request';

const { verifyUser } = auth;
const { email, username, ride } = existing;
const { userSignUpDetails, userLoginDetails } = validateInput;
const { validateRequestAction, validateRequestMessage, requestExit } = requestAction;

// import existing from '../middleware/validExist/isExisting';

const router = express.Router();

/* dummy db routes
 router.get('/rides', rides.getAllRides);
 router.get('/rides/:rideId', rides.getSingleRide);
 router.post('/rides', existing.rideOffer, checkInput.validOfferRide,
  auth.validateInput, rides.createRideOffer);
 router.post('/rides/:rideId/request', existing.requestRide,
 checkInput.validRequestRide, auth.validateInput, rides.requestRide);
*/

router.post(
  '/auth/signup', userSignUpDetails,
  auth.validateInput, email, username, user.createUser
);

router.post(
  '/auth/login', userLoginDetails,
  auth.validateInput, user.loginUser
);

router.get('/rides', verifyUser, rides.getAllRides);

router.get('/rides/:rideId', verifyUser, rides.getSingleRide);

router.post(
  '/users/rides', verifyUser, checkInput.validOfferRide,
  auth.validateInput, ride, rides.createRideOffer
);

router.post(
  '/rides/:rideId/request', verifyUser, checkInput.makeFieldsRequest,
  auth.validateInput, validateRequestMessage, requestExit, request.requestRide
);

router.get('/users/rides/:rideId/requests', verifyUser, request.getRequests);

router.put(
  '/users/rides/:rideId/requests/:requestId',
  verifyUser,
  checkInput.request, auth.validateInput,
  validateRequestAction, request.updateRequest
);

export default router;
