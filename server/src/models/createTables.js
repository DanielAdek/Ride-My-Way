import db from './connect';

export default {

  createUserTable() {
    const userModel = `
    CREATE TABLE users (
      userId SERIAL PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      username VARCHAR(80) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password VARCHAR(80) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return db.query(userModel);
  },

  createRideTable() {
    const rideModel = `
    CREATE TABLE rides (
      rideId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      departure TEXT NOT NULL,
      destination TEXT NOT NULL,
      time VARCHAR(30) NOT NULL,
      date VARCHAR(30) NOT NULL,
      seats INTEGER NOT NULL,
      cost TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return db.query(rideModel);
  },

  createRequestTable() {
    const requestModal = `
    CREATE TABLE requests (
      requestId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      rideId INTEGER REFERENCES rides(rideId),
      username VARCHAR(80) NOT NULL,
      message TEXT,
      action VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    return db.query(requestModal);
  }
};
