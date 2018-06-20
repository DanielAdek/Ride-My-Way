import express from 'express';
import rides from '../controllers/ridesController';

const router = express.Router();

router.get('/drivers/rides', rides.getAllRides);
router.get('/rides', rides.AllRides);
router.get('/rides/:rideId', rides.getSingleRide);
router.post('/rides', rides.createRideOffer);

export default router;
