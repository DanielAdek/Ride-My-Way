import schema from './dropTable';

schema.dropUserTable()
  .then(() => console.log('User table successfully deleted'))
  .catch(err => console.log(err.message));
schema.dropRideTable()
  .then(() => console.log('Ride table successfully deleted'))
  .catch(err => console.log(err.message));
schema.dropRequestTable()
  .then(() => console.log('Request table successfully deleted'))
  .catch(err => console.log(err.message));
