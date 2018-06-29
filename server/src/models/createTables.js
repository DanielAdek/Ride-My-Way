import db from './connect';

export default {

  createUserTable() {
    const userModel = `
    CREATE TABLE users (
      userId SERIAL primary key,
      fullName text NOT NULL,
      username text NOT NULL,
      email text NOT NULL,
      password text NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return db.query(userModel);
  },

  createRideTable() {
    const rideModel = `
    CREATE TABLE rides (
      rideId SERIAL primary key,
      userId INTEGER REFERENCES users(userId),
      departure text NOT NULL,
      destination text NOT NULL,
      time text NOT NULL,
      date text NOT NULL,
      seats text NOT NULL,
      cost text NOT NULL,
      message text,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return db.query(rideModel);
  },

  createRequestTable() {
    const requestModal = `
    CREATE TABLE request (
      requestId SERIAL primary key,
      userId INTEGER REFERENCES users(userId),
      rideId INTEGER REFERENCES rides(rideId),
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
