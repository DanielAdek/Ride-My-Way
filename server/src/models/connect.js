/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import configPath from '../config/config';

const env = process.env.NODE_ENV;
const local = configPath.development;
const config = configPath[env];
let dbConnection;

if (!config) {
  dbConnection = new Pool({
    user: local.user,
    host: local.host,
    database: local.database,
    password: local.password,
    port: local.port
  });
} else if (config === 'test') {
  dbConnection = new Pool(config.test);
} else {
  dbConnection = new Pool(config);
}

const { log } = console;
dbConnection
  .connect()
  .then(() => {
    log('connection is established');
  })
  .catch(err => log(`unable to connect to the database ${err.message}`));

export default dbConnection;
