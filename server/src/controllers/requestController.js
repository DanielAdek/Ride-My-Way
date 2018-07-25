import db from '../models/connect';
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
    db.query(find.rideById, [rideId]).then((rides) => {
      if (rides.rows.length === 0) {
        return res.status(404).json({
          success: false,
          status: 'fail',
          message: 'No ride with this rideId'
        });
      }
      if (userid === rides.rows[0].userid) {
        return res.status(400).json({
          success: false,
          status: 'fail',
          message: 'You cannnot request your own ride'
        });
      }
      if (rides.rows[0].rideid === parseInt(rideId, 10)) {
        const {
          driver, departure, destination, time, date, cost
        } = rides.rows[0];
        const valuesIntoTable = [userid, rideId, username.toLowerCase(),
          driver.toLowerCase(), departure, destination, time, date, cost, message];
        db.query(insert.userRequest, valuesIntoTable)
          .then(() => {
            res.status(201).json({
              message: 'Your request has beean successfully sent!',
              success: true,
              status: 'pending....',
              request: {
                userid,
                rideId,
                time,
                date,
                cost,
                driver,
                passenger: username,
                startLocation: departure,
                stopLocation: destination,
                message
              }
            });
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
            status: 'success',
            message: 'Oops Sorry! no available request yet'
          });
        }
        return res.status(200).json({
          status: 'success',
          message: 'Found a ride for your request',
          requests: requests.rows
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getOneUserRequests();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getOneUserRequests(req, res) {
    const { userid } = req.decoded;
    db.query(find.requestByUserId, [userid])
      .then((requests) => {
        if (requests.rows.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: requests.rows.length,
            message: 'You have not request any ride'
          });
        }
        return res.status(200).json({
          status: 'success',
          found: true,
          message: 'All your requests',
          requests: requests.rows,
          count: requests.rows.length
        });
      }).catch(err => res.status(500).json({ message: err.message }));
  }

  /**
   * getAllRequestsToARide();
     * @description get all requests
     * @param {*} req HTTP request object
     * @param {*} res HTTP response object
     * @returns {object} json
     */
  static getAllRequestsToARide(req, res) {
    const { username } = req.decoded;
    db.query(find.requestByDriverName, [username])
      .then((requests) => {
        if (requests.rows.length < 1) {
          return res.status(200).json({
            status: 'success',
            found: false,
            count: requests.rows.length,
            message: 'No passenger\'s requests to your ride'
          });
        }
        return res.status(200).json({
          status: 'success',
          found: true,
          message: 'Passengers requests',
          requests: requests.rows,
          count: requests.rows.length
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
    const { userid } = req.decoded;
    const { action } = req.body;
    let availableSeats;
    db.query(find.requestByReqId, [requestId]).then(((request) => {
      if (request.rows[0].userid === userid) {
        return res.status(400).json({
          status: 'fail',
          message: 'This ride does not belong to you',
        });
      }
      if (!request.rows[0].rideid || !request.rows[0].requestid) {
        return res.status(400).json({
          status: 'fail',
          message: 'No request found!'
        });
      }
      if (action.toLowerCase() === 'accept' && request.rows[0].userid !== userid) {
        if (request.rows[0].action === 'accept') {
          res.status(400).json({
            status: 'fail',
            message: 'Cannot accept a request twice'
          });
        } else {
          db.query(update.actionByRequestId, [action, rideId, requestId]).then(() => {
            // QUERY TO DECREMENT SEATS
            db.query(find.rideByIdAndUserid, [rideId, userid]).then((rides) => {
              availableSeats = rides.rows[0].seats;
              availableSeats -= 1;
              if (availableSeats > 1) {
                db.query(update.seats, [availableSeats, rideId, userid]);
              } else {
                db.query(update.seats, [rides.rows[0].seats = 0, rideId, userid]);
                return res.json({
                  status: 'fail',
                  message: 'no more slot in your car'
                });
              }
              res.status(201).json({
                status: 'Success',
                message: 'Request successfully accepted'
              });
            });
          });
        }
      } if (action.toLowerCase() === 'reject' && request.rows[0].action !== null) {
        if (request.rows[0].action === 'reject') {
          res.status(400).json({
            status: 'fail',
            message: 'Cannot reject a request twice'
          });
        } else {
          db.query(find.rideByIdAndUserid, [rideId, userid]).then((rides) => {
            db.query(update.actionByRequestId, [action, rideId, requestId]);
            db.query(update.seats, [rides.rows[0].seats += 1, rideId, userid]);
            return res.status(201).json({
              status: 'Success',
              message: 'Request successfully rejected'
            });
          });
        }
      }
    })).catch(err => res.status(400).json({
      status: 'fail',
      message: err.message
    }));
  }
}

