import express from 'express';
import rides from '../controllers/ridesController';
import auth from '../middleware/validation/auth';
import checkInput from '../middleware/validation/inputFields';
import existing from '../middleware/validExist/isExisting';

const router = express.Router();

router.get('/rides', rides.getAllRides);
router.get('/rides/:rideId', rides.getSingleRide);
router.post('/rides', existing.rideOffer, checkInput.validOfferRide, auth.validateInput, rides.createRideOffer);
router.post('/rides/:rideId/request', existing.requestRide, checkInput.validRequestRide, auth.validateInput, rides.requestRide);

export default router;
