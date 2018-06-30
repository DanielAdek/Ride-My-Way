import schema from './createTables';

schema.createUserTable()
  .then(() => console.log('User table successfully migrated'))
  .catch(err => console.log(err.message));
schema.createRideTable()
  .then(() => console.log('Ride table successfully migrated'))
  .catch(err => console.log(err.message));
schema.createRequestTable()
  .then(() => console.log('Request table successfully migrated'))
  .catch(err => console.log(err.message));
