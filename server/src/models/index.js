import schema from './createTables';

const { log } = console;
schema.createUserTable()
  .then(() => log('User table successfully migrated'))
  .catch(err => log(err.message));
schema.createRideTable()
  .then(() => log('Ride table successfully migrated'))
  .catch(err => log(err.message));
schema.createRequestTable()
  .then(() => log('Request table successfully migrated'))
  .catch(err => log(err.message));
