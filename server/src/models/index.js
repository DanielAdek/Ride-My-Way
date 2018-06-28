import db from './connect';

export default {

  createUserTable() {
    const userModel = `
    CREATE TABLE users (
      id SERIAL primary key,
      firstName text NOT NULL,
      lastName text NOT NULL,
      role text NOT NULL,
      email text NOT NULL,
      password text NOT NULL
    );
    `;
    return db.query(userModel);
  },

  createRideTable() {
    const rideModel = `
    CREATE TABLE rides (
      id SERIAL primary key,
      firstName text NOT NULL,
      lastName text NOT NULL,
      role text NOT NULL,
      email text NOT NULL,
      password text NOT NULL
    );
    `;
    return db.query(rideModel);
  },

  createRequestTable() {
    const requestModal = `
    CREATE TABLE request (
      id SERIAL primary key,
      firstName text NOT NULL,
      lastName text NOT NULL,
      role text NOT NULL,
      email text NOT NULL,
      password text NOT NULL
    );
    `;
    return db.query(requestModal);
  }
};

