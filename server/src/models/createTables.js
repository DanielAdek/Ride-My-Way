import db from './connect';

export default {

  createUserTable() {
    const userModel = `
    CREATE TABLE IF NOT EXISTS users (
      userId SERIAL PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      username VARCHAR(80) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password VARCHAR(80) NOT NULL,
      passwordResetToken TEXT,
      notification TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
    `;
    return db.query(userModel);
  },

  createRideTable() {
    const rideModel = `
    CREATE TABLE IF NOT EXISTS rides (
      rideId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      driver TEXT NOT NULL,
      departure TEXT NOT NULL,
      destination TEXT NOT NULL,
      time VARCHAR(30) NOT NULL,
      date VARCHAR(30) NOT NULL,
      seats INTEGER NOT NULL,
      cost NUMERIC NOT NULL,
      message TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
    `;
    return db.query(rideModel);
  },

  createRequestTable() {
    const requestModal = `
    CREATE TABLE IF NOT EXISTS requests (
      requestId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      rideId INTEGER REFERENCES rides(rideId),
      passenger VARCHAR(80) NOT NULL,
      driver TEXT,
      departure TEXT,
      destination TEXT,
      time VARCHAR(30),
      date VARCHAR(30),
      cost NUMERIC NOT NULL,
      message TEXT,
      action VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
    `;
    return db.query(requestModal);
  }
};
