import schema from './dropTable';

const { log } = console;
schema.dropUserTable().then(() => {
  log('Users table droped');
}).catch((err) => {
  log(err.messagge);
});

setTimeout(() => {
  schema.dropRideTable().then(() => {
    log('Rides table droped');
  }).catch((err) => {
    log(err.messagge);
  });
}, 4000);

setTimeout(() => {
  schema.dropRequestTable().then(() => {
    log('Request table droped');
    process.exit();
  }).catch((err) => {
    log(err.messagge);
  });
}, 4000);
