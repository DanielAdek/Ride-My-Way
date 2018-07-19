/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const departure = document.querySelector('#departure');
const destination = document.querySelector('#destination');
const time = document.querySelector('#time');
const date = document.querySelector('#date');
const cost = document.querySelector('#cost');
const slots = document.querySelector('#slots');
const driverMessage = document.querySelector('#msg');
const message = document.querySelector('.message');
const error = document.querySelector('.error');
const button = document.querySelector('#create-ride-btn');
const owner = document.querySelector('.username');
const mobileOwner = document.querySelector('.usernameMobile');
const formRide = document.querySelector('.form-ride');

const getUserName = window.localStorage.getItem('username');
const split = getUserName.split('');
const username = split[0].toUpperCase() + split.slice(1).join('');
const email = window.localStorage.getItem('email');
owner.textContent = username;
mobileOwner.textContent = username;
owner.setAttribute('title', `${email}`);
mobileOwner.setAttribute('title', `${email}`);

const Ride = {
  /**
   * @returns {*} BOOLEAN
   * @param {*} event
   */
  createRide(event) {
    event.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
      return false;
    }
    if (departure.value.trim() === ''
    || destination.value.trim() === ''
    || time.value.trim() === ''
    || date.value.trim() === ''
    || slots.value.trim() === ''
    || cost.value.trim() === ''
    ) {
      error.textContent = 'Please fill all (*) fields';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }
    formRide.style.cursor = 'progress';
    error.textContent = 'Loading.....';
    setTimeout(() => {
      button.style.cursor = 'pointer';
    }, 5000);
    fetch(`${baseUrl}/users/rides`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        'x-access-token': `${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        departure: departure.value,
        destination: destination.value,
        time: time.value,
        date: date.value,
        seats: slots.value,
        cost: cost.value,
        message: driverMessage.value
      })
    })
      .then(res => res.json())
      .then((ride) => {
        formRide.style.cursor = 'default';
        if (!ride.success) {
          error.textContent = ride.errors || ride.message;
          setTimeout(() => {
            error.textContent = null;
          }, 7000);
        } else {
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            error.textContent = null;
          }, 2000);
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            message.textContent = ride.message;
          }, 2000);
          setTimeout(() => {
            message.textContent = null;
          }, 10000);
        }
      });
  }
};

button.addEventListener('click', Ride.createRide);
