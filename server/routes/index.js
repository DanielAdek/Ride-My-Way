import express from 'express';
import user from '../src/controllers/userController';
import rides from '../src/controllers/ridesController';
import request from '../src/controllers/requestController';
// import auth from '../middleware/validation/auth';
// import checkInput from '../middleware/validation/inputFields';
// import existing from '../middleware/validExist/isExisting';

const router = express.Router();

// router.get('/rides', rides.getAllRides);
// router.get('/rides/:rideId', rides.getSingleRide);
// router.post('/rides', existing.rideOffer, checkInput.validOfferRide, auth.validateInput, rides.createRideOffer);
// router.post('/rides/:rideId/request', existing.requestRide, checkInput.validRequestRide, auth.validateInput, rides.requestRide);

router.post('/auth/signup', user.createUser);
router.post('/auth/login', user.loginUser);
router.get('/rides', rides.getAllRides);
router.get('/rides/:rideId', rides.getSingleRide);
router.post('/users/rides', rides.createRideOffer);
router.post('/rides/:rideId/request', request.requestRide);
router.get('/users/rides/:rideId/requests', request.getRequests);
router.put('/users/rides/:rideId/requests/:requestId', request.updateRequest);

export default router;
