import express from 'express';
import user from '../src/controllers/userController';
import rides from '../src/controllers/ridesController';
import request from '../src/controllers/requestController';
import auth from '../src/midlewares/auth';
import checkInput from '../src/validations/rides';
import validateInput from '../src/validations/users';
import existing from '../src/midlewares/validation';
import requestAction from '../src/midlewares/request';
import search from '../src/midlewares/singleRoute';

const { verifyUser } = auth;
const { searchRide } = search;
const { email, username, ride } = existing;
const { userSignUpDetails, userLoginDetails } = validateInput;
const { validateRequestAction, validateRequestMessage, requestExit } = requestAction;

const router = express.Router();

router.get(
  '/user/rides', verifyUser,
  rides.getOneUserRides
);
router.get(
  '/user/requests', verifyUser,
  request.getOneUserRequests
);

router.get('/rides', searchRide, rides.getAllRides);

router.get('/rides/:rideId', rides.getSingleRide);

router.get('/users/rides/:rideId/requests', verifyUser, request.getRequests);

router.post(
  '/auth/login', userLoginDetails,
  auth.validateInput, user.loginUser
);

router.post(
  '/auth/signup', userSignUpDetails,
  auth.validateInput, email, username, user.createUser
);

router.post(
  '/rides/:rideId/request', verifyUser,
  validateRequestMessage, requestExit, request.requestRide
);

router.post(
  '/users/rides', verifyUser, checkInput.validOfferRide,
  auth.validateInput, ride, rides.createRideOffer
);

router.put('/user/forgot-password', user.forgetPassword);
router.put('/user/reset-password', user.resetPassword);

router.put(
  '/users/rides/:rideId/requests/:requestId',
  verifyUser,
  checkInput.request, auth.validateInput,
  validateRequestAction, request.updateRequest
);

export default router;
