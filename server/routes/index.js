import express from 'express';
import passengers from '../controllers/passengersController';

const router = express.Router();

router.get('/rides', passengers.getAllRides);
router.get('/rides/:rideId', passengers.getSingleRide);

export default router;
