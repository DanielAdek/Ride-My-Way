import schema from './createTables';

schema.createUserTable()
  .then(() => console.log('successfully migrated'))
  .catch(err => console.log(err.message));
schema.createRideTable();
schema.createRequestTable();
