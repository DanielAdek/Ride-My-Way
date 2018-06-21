import express from 'express';
import rides from '../controllers/ridesController';
import auth from '../middleware/validation/auth';
import checkInput from '../middleware/validation/inputFields';

const router = express.Router();

router.get('/rides', rides.getAllRides);
router.get('/rides/:rideId', rides.getSingleRide);
router.post('/rides', checkInput.checker, auth.validateInput, rides.createRideOffer);
router.post('/rides/:rideId/request', rides.requestRide);

export default router;
