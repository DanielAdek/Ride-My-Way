/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import configPath from '../config/config';

// const env = process.env.NODE_ENV;
const local = configPath.development;
const config = configPath.production;
console.log(config, 'sadfsdf');
let dbConnection;
if (!config) {
  console.log('no config seen')
  dbConnection = new Pool({
    user: local.username,
    host: local.host,
    database: local.database,
    password: local.password,
    port: local.port
  });
} else {
  console.log('config seen');
  dbConnection = new Pool(config);
}


dbConnection
  .connect()
  .then(() => {
    console.log('connection is established');
  })
  .catch(err => console.log(`unable to connect to the database ${err.message}`));

export default dbConnection;
