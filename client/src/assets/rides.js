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

const getUserName = window.localStorage.getItem('username');
const split = getUserName.split('');
const username = split[0].toUpperCase() + split.slice(1).join('');
const email = window.localStorage.getItem('email');
owner.textContent = username;
owner.setAttribute('title', `${email}`);

const Ride = {
  /**
   * @returns {*} BOOLEAN
   * @param {*} event
   */
  createRide(event) {
    event.preventDefault();
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
    button.style.cursor = 'progress';
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
        if (!ride.success) {
          error.textContent = ride.errors || ride.message;
          setTimeout(() => {
            error.textContent = null;
          }, 7000);
        } else {
          message.textContent = ride.message;
          setTimeout(() => {
            message.textContent = null;
          }, 10000);
        }
      });
  }
};

button.addEventListener('click', Ride.createRide);
