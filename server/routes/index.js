import express from 'express';
import rides from '../controllers/driversController';

const router = express.Router();

router.get('/rides', rides.getAllRides);

export default router;
