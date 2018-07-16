import model from './createTables';

const { log } = console;
model.createUserTable()
  .then(() => log('User table successfully migrated'))
  .catch(err => log(err.message));
setTimeout(() => {
  model.createRideTable()
    .then(() => log('Ride table successfully migrated'))
    .catch(err => log(err.message));
}, 4000);
setTimeout(() => {
  model.createRequestTable()
    .then(() => {
      log('Request table successfully migrated');
      process.exit();
    })
    .catch(err => log(err.message));
}, 6000);
