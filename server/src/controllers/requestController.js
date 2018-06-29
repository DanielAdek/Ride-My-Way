import db from '../models/connect';


/**
 * @class Rides
 */
export default class Rides {
  /**
   * requestRide();
     * @description request ride offers
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static requestRide(req, res) {
    const { rideId } = req.params;
    const queryRide =  'INSERT INTO requests (message) VALUES ($1) returning *';
    const param = [rideId];
    const requestSent = false;
    const noSpace = false;
    let availableSeats;
    db.query(queryRide, param)
      .then((newRequest) => {
        newRequest.forEach((ride) => {
            if (ride.rideId === rideId) {
              ride.seats -= 1;
              availableSeats = ride.seats;
              if (availableSeats < 0) {
                ride.seats = 0;
                noSpace = true;
              } else {
                ride.onRequest.push({ requestId, message });
                requestSent = true;
              }
            }
          });
          if (!requestSent) {
            return res.status(404).json({ message: 'There was a problem sending request. check ride identification' }));
          }
        res.status(201).json({ newRequest });
      })
      .catch(err => res.status(404).json({ error: err.message }));
  }
}
