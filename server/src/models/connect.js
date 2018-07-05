/* eslint-disable import/no-mutable-exports */
import { Client } from 'pg';
import configPath from '../config/config';

// const env = process.env.NODE_ENV;
const local = configPath.development;
const config = configPath.production.connectionString;
console.log(config);
let dbConnection;
if (!config) {
  dbConnection = new Client({
    user: local.username,
    host: local.host,
    database: local.database,
    password: local.password,
    port: local.port
  });
} else {
  dbConnection = new Client(config);
}


dbConnection
  .connect()
  .then(() => {
    console.log('connection is established');
  })
  .catch(err => console.log(`unable to connect to the database ${err.message}`));

export default dbConnection;
