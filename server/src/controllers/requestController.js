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
    const { username, message, userId } = req.body;
    const findRideById = 'SELECT * FROM rides WHERE rideId = $1';
    const queryRequest = 'INSERT INTO requests (userId, rideId, username, message) VALUES ($1, $2, $3, $4) returning *';
    let availableSeats;
    db.query(findRideById, [rideId]).then((rides) => {
      rides.rows.forEach((ride) => {
        if (ride.rideid === parseInt(rideId, 10)) {
          ride.seats -= 1;
          availableSeats = ride.seats;
          db.query('UPDATE rides SET seats=$1', [availableSeats]);
          if (availableSeats < 1) {
            db.query('UPDATE rides SET seats=$1', [ride.seats = 0]);
            return res.status(400).json({
              message: 'Sorry no available seat, try another ride'
            });
          }
          if (availableSeats > 0) {
            db.query(queryRequest, [userId, rideId, username, message])
              .then(() => {
                res.status(201).json({
                  message: 'Your request has beean successfully sent!',
                  status: 'pending....',
                  request: {
                    username, message, userId, rideId
                  }
                });
              })
              .catch(err => res.status(404).json({ error: err.message }));
          }
        }
      });
    })
      .catch(err => res.status(400).json({ message: err.message }));
  }
}
