/* eslint-disable import/no-mutable-exports */
import { Client } from 'pg';
import configPath from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configPath[env];
// const basename = path.basename(module.filename);

let dbConnection;
if (config.use_env_variables) {
  dbConnection = new Client(process.env[config.use_env_variables]);
} else {
  dbConnection = new Client({
    user: config.username,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port
  });
}


dbConnection
  .connect()
  .then(() => {
    console.log('connection is established');
  })
  .catch(err => console.log(`unable to connect to the database ${err.message}`));

export default dbConnection;
