import db from '../connect';

export default {

  dropUserTable() {
    const userModel = `
    DROP TABLE IF EXISTS users CASCADE;`;
    return db.query(userModel);
  },

  dropRideTable() {
    const rideModel = `
    DROP TABLE IF EXISTS rides CASCADE;`;
    return db.query(rideModel);
  },

  dropRequestTable() {
    const requestModal = `
    DROP TABLE IF EXISTS requests CASCADE;`;
    return db.query(requestModal);
  }
};
