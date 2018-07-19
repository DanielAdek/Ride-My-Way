/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const passengerName = document.querySelector('.passenger-name');
const departureLocation = document.querySelector('.departure a');
const arrivalLocation = document.querySelector('.destination a');
const passengerMsg = document.querySelector('.passenger-msg');
const body = document.querySelector('body');

const userRequests = {
  loadRequest() {
    if (window.navigator.onLine === false) {
      window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
      return false;
    }
    console.log('please wait...');
    body.style.cursor = 'progress';
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-type', 'application/json');
    myHeaders.append('x-access-token', `${window.localStorage.token}`);
    fetch(`${baseUrl}/users/rides/1/requests`, {
      method: 'GET',
      headers: myHeaders
    }).then(res => res.json())
      .then((requests) => {
        body.style.cursor = 'default';
        console.log(requests);
      });
  }
};

window.onload = userRequests.loadRequest;
