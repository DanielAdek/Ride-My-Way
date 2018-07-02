import db from '../models/connect';
import destroy from '../queries/delete.json';
import insert from '../queries/insert.json';
import update from '../queries/update.json';
import find from '../queries/find.json';

let availableSeats;
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
    const valuesIntoTable = [userId, rideId, username, message];
    db.query(find.rideById, [rideId]).then((rides) => {
      rides.rows.forEach((ride) => {
        if (ride.rideid === parseInt(rideId, 10)) {
          ride.seats -= 1;
          availableSeats = ride.seats;
          db.query(update.seats, [availableSeats]);
          if (availableSeats < 1) {
            db.query(update.seats, [availableSeats * 0]);
            return res.status(400).json({
              message: 'Sorry no available seat, try another ride'
            });
          }
          if (availableSeats > 0) {
            db.query(insert.userRequest, valuesIntoTable)
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

  /**
   * getRequests();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getRequests(req, res) {
    const { rideId } = req.params;
    db.query(find.requestByRideId, [rideId])
      .then((requests) => {
        if (requests.rows.length < 1) {
          return res.status(200).json({
            message: 'Oops Sorry! no available request yet'
          });
        }
        return res.status(200).json({
          message: `Here You Are!, ${requests.rows.length} requests for You`,
          requests: requests.rows
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * updateRequest();
     * @description get all rides
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static updateRequest(req, res) {
    const { rideId, requestId } = req.params;
    const { action } = req.body;
  
    if (action.toLowerCase() === 'accept') {
      db.query(find.rideById, [rideId]).then((rides) => {
        rides.rows.forEach((ride) => {
          if (ride.rideid === parseInt(rideId, 10)) {
            db.query(update.actionByRequestId, [action, requestId]).then(() => res.status(200).json({
              message: `Request successfully ${action}`
            }));
          }
        });
      })
        .catch(err => res.status(500).json({ message: err.message }));
    }
    if (action.toLowerCase() === 'reject') {
      db.query(find.rideById, [rideId]).then((rides) => {
        rides.rows.forEach((ride) => {
          if (ride.rideid === parseInt(rideId, 10)) {
            db.query(destroy.requestByRequestId, [requestId]).then(() => {
              res.status(200).json({ message: `Request ${action}` });
              db.query(update.seats, [ride.seats += 1]);
            })
              .catch(err => res.status(400).json({ message: err.message }));
          }
        });
      });
    }
  }
}

