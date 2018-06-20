import express from 'express';
import rides from '../controllers/ridesController';

const router = express.Router();

router.get('/rides', rides.getAllRides);
router.get('/rides/:rideId', rides.getSingleRide);

export default router;
