/* eslint-env browser */
const baseUrl = 'https://ridemyway-danieladek.herokuapp.com/api/v1';
const requestCard = document.querySelector('.request-container');
const owner = document.querySelector('.username');
const mobileOwner = document.querySelector('.usernameMobile');
const body = document.querySelector('body');
const reqResMessageNeg = document.querySelector('.response-to-request-neg');
const backdrp = document.querySelector('.backdrop');

const getUserName = window.localStorage.getItem('username');
const split = getUserName.split('');
const username = split[0].toUpperCase() + split.slice(1).join('');
const email = window.localStorage.getItem('email');
owner.textContent = username;
mobileOwner.textContent = username;
owner.setAttribute('title', `${email}`);
mobileOwner.setAttribute('title', `${email}`);

const acceptRequest = (self) => {
  body.style.cursor = 'progress';
  const actionTag = self.parentNode.parentNode.parentNode.children[0].children[1];
  const req = JSON.parse(self.getAttribute('req-data'));
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-type', 'application/json');
  headers.append('x-access-token', `${window.localStorage.token}`);
  window.fetch(`${baseUrl}/users/rides/${req.rideid}/requests/${req.requestid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      action: `Request ${self.textContent}ed`
    })
  }).then(res => res.json())
    .then((response) => {
      body.style.cursor = 'default';
      if (!response.success) {
        reqResMessageNeg.textContent = response.message;
        backdrp.classList.add('openBackdrop');
        reqResMessageNeg.classList.add('open-response-message-neg');
        setTimeout(() => {
          reqResMessageNeg.classList.remove('open-response-message-neg');
          backdrp.classList.remove('openBackdrop');
        }, 5000);
        return false;
      }
      actionTag.innerHTML = '<div id="loading-btn"></div>';
      setTimeout(() => {
        actionTag.innerHTML = `<div>${response.message}</div>`;
        actionTag.style.color = 'green';
      }, 3000);
    });
};

const rejectRequest = (self) => {
  if (window.confirm('Are You sure you want to reject this ride')) { // eslint-disable-line no-alert
    body.style.cursor = 'progress';
    const actionTag = self.parentNode.parentNode.parentNode.children[0].children[1];
    const req = JSON.parse(self.getAttribute('req-data'));
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');
    headers.append('x-access-token', `${window.localStorage.token}`);
    window.fetch(`${baseUrl}/users/rides/${req.rideid}/requests/${req.requestid}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        action: `Request ${self.textContent}ed`
      })
    }).then(res => res.json())
      .then((response) => {
        body.style.cursor = 'default';
        if (!response.success) {
          reqResMessageNeg.textContent = response.message;
          backdrp.classList.add('openBackdrop');
          reqResMessageNeg.classList.add('open-response-message-neg');
          setTimeout(() => {
            reqResMessageNeg.classList.remove('open-response-message-neg');
            backdrp.classList.remove('openBackdrop');
          }, 5000);
          return false;
        }
        actionTag.innerHTML = '<div id="loading-btn"></div>';
        setTimeout(() => {
          actionTag.innerHTML = `<div>${response.message}</div>`;
          actionTag.style.color = 'red';
        }, 3000);
      });
  }
};

const loadRequest = () => {
  if (window.navigator.onLine === false) {
    window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
    return false;
  }
  body.style.cursor = 'progress';
  requestCard.innerHTML = '<div id="loading"></div>';
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-type', 'application/json');
  myHeaders.append('x-access-token', `${window.localStorage.token}`);
  fetch(`${baseUrl}/user/passengers/requests`, {
    method: 'GET',
    headers: myHeaders
  }).then(res => res.json())
    .then((result) => {
      body.style.cursor = 'default';
      if (!result.found) {
        requestCard.innerHTML = `<h4>${result.message}</h4>`;
        return false;
      }
      const passengerReq = result.requests.map(req => (
        `<div class="card request-card-container p-3">
            <div class="head flex-row justify-content-sb">
              <p class="passenger-name text-capitalize">Passenger &rarr; ${req.passenger}</p>
              <p class="">${req.action}</p>
            </div>
            <hr>
            <div class="location">
              <p class="departure">
                <i class="fas fa-map-marker-alt"></i>
                <a class="text-capitalize"> Departure: ${req.departure} -- ${req.time} ${req.date}</a>
              </p>
              <p class="Destination text-danger">
                <i class="fas fa-map-marker-alt"></i>
                <a class="text-capitalize">Destination: ${req.destination}</a>
              </p>
              <p class="passenger-msg">Message &rarr; ${req.message}</p>
              <div class="action flex-row justify-content-sb">
                <a onClick=acceptRequest(this) req-data='${JSON.stringify(req)}' class="btn text-success">Accept</a>
                <a onClick=rejectRequest(this) req-data='${JSON.stringify(req)}' class="btn text-danger">Reject</a>
              </div>
            </div>
          </div>
          `
      ));
      requestCard.innerHTML = passengerReq;
    });
};


window.onload = loadRequest;
