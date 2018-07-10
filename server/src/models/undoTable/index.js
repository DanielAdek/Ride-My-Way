import schema from './dropTable';

const { log } = console;
schema.dropUserTable().then(() => {
  log('Users table droped');
}).catch((err) => {
  log(err.messagge);
});
schema.dropRideTable().then(() => {
  log('Rides table droped');
}).catch((err) => {
  log(err.messagge);
});
schema.dropRequestTable().then(() => {
  log('Request table droped');
  process.exit();
}).catch((err) => {
  log(err.messagge);
});
