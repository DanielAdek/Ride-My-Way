import model from './dropTable';

const { log } = console;
model.dropUserTable().then(() => {
  log('Users table droped');
}).catch((err) => {
  log(err.messagge);
});

setTimeout(() => {
  model.dropRideTable().then(() => {
    log('Rides table droped');
  }).catch((err) => {
    log(err.messagge);
  });
}, 4000);

setTimeout(() => {
  model.dropRequestTable().then(() => {
    log('Request table droped');
    process.exit();
  }).catch((err) => {
    log(err.messagge);
  });
}, 6000);
