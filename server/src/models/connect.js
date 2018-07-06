/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import configPath from '../config/config';

const env = process.env.NODE_ENV;
const local = configPath.development;

let dbConnection;

if (!config) {
  dbConnection = new Pool({
    user: local.user,
    host: local.host,
    database: local.database,
    password: local.password,
    port: local.port
  });
} else {
  dbConnection = new Pool(config);
}


dbConnection
  .connect()
  .then(() => {
    console.log('connection is established');
  })
  .catch(err => console.log(`unable to connect to the database ${err.message}`));

export default dbConnection;
