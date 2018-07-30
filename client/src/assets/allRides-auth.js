/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const cardContainer = document.querySelector('.cards-container');
const rideModalCard = document.querySelector('.modal');
const moreRideDetails = document.querySelector('.modal-card-container');
const reqResMessage = document.querySelector('.response-message');
const reqResMessageNeg = document.querySelector('.response-to-request-neg');
const backdrp = document.querySelector('.backdrop-modal');
const depart = document.querySelector('#departure');
const destin = document.querySelector('#destination');
const dat = document.querySelector('#date');
const searchBtn = document.querySelector('#search-rides');
const subHeadingTitle = document.querySelector('.title > h2');
const owner = document.querySelector('.username');
const mobileOwner = document.querySelector('.usernameMobile');
const body = document.querySelector('body');

const getUserName = window.localStorage.getItem('username');
const split = getUserName.split('');
const username = split[0].toUpperCase() + split.slice(1).join('');
const email = window.localStorage.getItem('email');
owner.textContent = username;
mobileOwner.textContent = username;
owner.setAttribute('title', `${email}`);
mobileOwner.setAttribute('title', `${email}`);

const closeModal = () => {
  rideModalCard.classList.remove('openModal');
  backdrp.classList.remove('openBackdrop');
};

const requestRide = (self) => {
  if (window.navigator.onLine === false) {
    window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
    return false;
  }
  body.style.cursor = 'progress';
  self.innerHTML = 'Processing... <div id="loading-btn"></div>';
  const userRequestMessage = self.previousSibling
    .previousSibling.previousSibling
    .previousSibling.value;
  const rideDetail = self.getAttribute('ride-data');
  const ride = JSON.parse(rideDetail);
  const xheaders = new Headers();
  xheaders.append('Accept', 'application/json');
  xheaders.append('Content-type', 'application/json');
  xheaders.append('x-access-token', `${window.localStorage.getItem('token')}`);
  window.fetch(`${baseUrl}/rides/${ride.rideid}/request`, {
    method: 'POST',
    headers: xheaders,
    body: JSON.stringify({
      message: userRequestMessage
    })
  }).then(res => res.json())
    .then((response) => {
      body.style.cursor = 'default';
      if (response.error || !response.success) {
        reqResMessageNeg.textContent = response.message;
        backdrp.classList.add('openBackdrop');
        reqResMessageNeg.classList.add('open-response-message-neg');
        self.innerHTML = 'Failed';
        setTimeout(() => {
          reqResMessageNeg.classList.remove('open-response-message-neg');
          backdrp.classList.remove('openBackdrop');
          rideModalCard.classList.remove('openModal');
        }, 5000);
        return false;
      }
      reqResMessage.textContent = response.message;
      self.innerHTML = '<div>Message Sent</div>';
      backdrp.classList.add('openBackdrop');
      reqResMessage.classList.add('open-response-message');
      setTimeout(() => {
        reqResMessage.classList.remove('open-response-message');
        backdrp.classList.remove('openBackdrop');
        rideModalCard.classList.remove('openModal');
      }, 5000);
    });
};

const displayRideModal = (self) => {
  if (window.navigator.onLine === false) {
    window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
    return false;
  }
  self.style.cursor = 'progress';
  let rideModal;
  const rideData = self.getAttribute('data-ride');
  const myRide = JSON.parse(rideData);
  fetch(`${baseUrl}/rides/${myRide.rideid}`, { method: 'GET' })
    .then(res => res.json())
    .then((response) => {
      rideModalCard.classList.add('openModal');
      backdrp.classList.add('openBackdrop');
      self.style.cursor = 'default';
      rideModal = response.ride.map(rideDetails => (
        `
        <div class="card-content p-1">
          <span onClick='closeModal()' class="font-md text-danger span" title="Close">&times;</span>
            <h2 class="driver-name text-capitalize">${rideDetails.driver}</h2>
            <h4 class="departure text-capitalize">
              <i class="fas fa-map-marker-alt"></i>
                Departure: ${rideDetails.departure} -- ${rideDetails.time} ${rideDetails.date}
            </h4>
            <h4 class="Destination text-capitalize">
              <i class="fas fa-map-marker-alt"></i>
              Destination: ${rideDetails.destination}
            </h4>
            <h4 class="seat">${rideDetails.seats} Passengers More</h4>
            <h4 class="cost">Cost: $${rideDetails.cost}</h4>
            <h4 class="cost">Message: ${rideDetails.message}</h4>
            <textarea class="p-4 block-xl" name="msg" id="passenger-msg" cols="20" placeholder="What will you like to tell your driver?"
              rows="5"></textarea>
            <br>
            <button onClick='requestRide(this)' ride-data='${JSON.stringify(rideDetails)}' class="btn block-xl btn-success font-md request-ride">Request Ride</a>
           </div>
           `
      ));
      moreRideDetails.innerHTML = rideModal;
    });
  return rideModal;
};

const loadData = () => {
  if (window.navigator.onLine === false) {
    window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
    return false;
  }
  cardContainer.innerHTML = '<div id="loading"></div>';
  fetch(`${baseUrl}/rides`, {
    method: 'GET'
  }).then(res => res.json())
    .then((rides) => {
      const allRides = rides.availableRides.map(ride => (
        `<div class="card card-all-rides flex-row p-3 mb-3 mr-3 ml-3 mr-3 mt-3">
            <div class="card-content text-capitalize">
                <h3 class="driver-name">Driver: ${ride.driver}</h3>
                <p class="departure">
                    <i class="fas fa-map-marker-alt"></i>
                    Departure: ${ride.departure} -- ${ride.time} ${ride.date}
                </p>
                <p class="Destination">
                    <i class="fas fa-map-marker-alt"></i>
                    Destination: ${ride.destination}
                </p>
                <button onClick='displayRideModal(this)' data-ride='${JSON.stringify(ride)}' class="btn">View More Detail</button>
            </div>
        </div>`
      ));
      cardContainer.innerHTML = allRides;
    });
};
const searchHandler = (e) => {
  e.preventDefault();
  if (depart.value.trim() === ''
    || destin.value.trim() === ''
    || dat.value.trim() === '') {
    window.alert('Please enter departure, destination and date'); // eslint-disable-line no-alert
    return false;
  }
  cardContainer.innerHTML = '<div id="loading"></div>';
  fetch(`${baseUrl}/rides?departure=${depart.value}&destination=${destin.value}&date=${dat.value}`, {
    method: 'GET',
  }).then(res => res.json())
    .then((rides) => {
      subHeadingTitle.textContent = 'Search Results';
      if (!rides.success) {
        cardContainer.textContent = `${rides.message}`;
        return false;
      }
      const allRides = rides.result.map(ride => (
        `<div class="card card-all-rides flex-row p-3 mb-3 mr-3 ml-3 mr-3 mt-3">
          <div class="card-content text-capitalize">
              <h3 class="driver-name">Driver: ${ride.driver}</h3>
              <p class="departure">
                  <i class="fas fa-map-marker-alt"></i>
                  Departure: ${ride.departure} -- ${ride.time} ${ride.date}
              </p>
              <p class="Destination">
                  <i class="fas fa-map-marker-alt"></i>
                  Destination: ${ride.destination}
              </p>
              <button onClick='displayRideModal(this)' data-ride='${JSON.stringify(ride)}' class="btn">View More Detail</button>
          </div>
      </div>`
      ));
      cardContainer.innerHTML = allRides;
    });
};

loadData();
searchBtn.addEventListener('click', searchHandler);
