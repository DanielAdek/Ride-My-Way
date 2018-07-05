import db from '../models/connect';
import destroy from '../queries/delete.json';
import insert from '../queries/insert.json';
import update from '../queries/update.json';
import find from '../queries/find.json';

// let availableSeats;
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
    const { userid, username } = req.decoded;
    const { rideId } = req.params;
    const { message } = req.body;
    const valuesIntoTable = [userid, rideId, username, message];
    db.query(find.rideById, [rideId]).then((rides) => {
      if (rides.rows[0].rideid === parseInt(rideId, 10)) {
        db.query(insert.userRequest, valuesIntoTable)
          .then(() => {
            res.status(201).json({
              message: 'Your request has beean successfully sent!',
              status: 'pending....',
              request: {
                userid, rideId, username, message
              }
            });
          });
      } else {
        return res.status(400).json({
          error: true,
          message: 'No ride with this rideId'
        });
      }
    }).catch(err => res.status(500).json({ message: err.message }));
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
    let availableSeats;
    db.query(find.rideById, [rideId]).then((rides) => {
      if (rides.rows[0].rideid === parseInt(rideId, 10)) {
        if (action.toLowerCase() === 'accept') {
          db.query(update.actionByRequestId, [action, requestId]).then(() => {
          // QUERY TO DECREMENT SEATS
            availableSeats = rides.rows[0].seats;
            db.query(update.seats, [availableSeats -= 1, rideId]);
            if (availableSeats < 1) {
              db.query(update.seats, [rides.rows[0].seats = 0, rideId]);
              return res.json({ message: 'no more slot in your car' });
            }
            res.status(200).json({
              status: 200,
              message: 'Request successfully accepted'
            });
          });
        } if (action.toLowerCase() === 'reject' && rides.rows[0].action === 'accept') {

        }
      } else {
        return res.status(404).json({
          error: true,
          message: 'cannot find request'
        });
      }
    })
      .catch(err => res.status(500).json({ message: err.message }));

    if (action.toLowerCase() === 'reject') {
      db.query(find.rideById, [rideId]).then((rides) => {
        if (rides.rows[0].rideid === parseInt(rideId, 10)) {
          db.query(destroy.requestByRequestId, [requestId]).then(() => {
            res.status(200).json({ message: `Request ${action}` });
            db.query(update.seats, [ride.seats += 1]);
          })
            .catch(err => res.status(400).json({ message: err.message }));
        }
      });
    }
  }
}

