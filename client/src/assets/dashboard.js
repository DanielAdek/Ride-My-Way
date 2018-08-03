/* eslint-env browser */
const baseUrl = 'https://ridemyway-danieladek.herokuapp.com/api/v1';
const owner = document.querySelector('.username');
const requestBtn = document.querySelector('#history-btn-requests');
const ridesBtn = document.querySelector('#history-btn-rides');
const historyHeading = document.querySelector('#history-heading');
const offerd = document.querySelector('.offerd-rides');
const rideTaken = document.querySelector('.ride-taken');
const historyTable = document.querySelector('.history-table');
const mobileViewOwner = document.querySelector('.usernameMobile');

const getUserName = window.localStorage.getItem('username');
const split = getUserName.split('');
const username = split[0].toUpperCase() + split.slice(1).join('');
const email = window.localStorage.getItem('email');
owner.textContent = username;
mobileViewOwner.textContent = username;
owner.setAttribute('title', `${email}`);
mobileViewOwner.setAttribute('title', `${email}`);

offerd.innerHTML = 'Loading Data...<div id="loading-btn"></div>';
rideTaken.innerHTML = 'Loading Data...<div id="loading-btn"></div>';

const showHistory = {
  data() {
    return {
      getRidesCount() {
        const xheaders = new Headers();
        xheaders.append('Accept', 'application/json');
        xheaders.append('Content-type', 'application/json');
        xheaders.append('x-access-token', `${window.localStorage.getItem('token')}`);
        window.fetch(`${baseUrl}/user/rides`, {
          method: 'GET',
          headers: xheaders
        })
          .then(res => res.json())
          .then((ride) => {
            offerd.innerHTML = `Ride Offered ${ride.count}`;
          });
      },
      getRequestCount() {
        const xheaders = new Headers();
        xheaders.append('Accept', 'application/json');
        xheaders.append('Content-type', 'application/json');
        xheaders.append('x-access-token', `${window.localStorage.getItem('token')}`);
        window.fetch(`${baseUrl}/user/requests`, {
          method: 'GET',
          headers: xheaders
        })
          .then(res => res.json())
          .then((ride) => {
            rideTaken.innerHTML = `Ride Taken ${ride.count}`;
          });
      }
    };
  },
  rideOffered() {
    historyTable.style.cursor = 'progress';
    historyTable.innerHTML = '<h3>Loading..... <div id="loading"></div></h3>';
    historyTable.style.display = 'flex';
    historyTable.style.justifyContent = 'center';
    historyTable.style.padding = '20px';
    historyTable.style.marginTop = '20px';
    const xheaders = new Headers();
    xheaders.append('Accept', 'application/json');
    xheaders.append('Content-type', 'application/json');
    xheaders.append('x-access-token', `${window.localStorage.getItem('token')}`);
    window.fetch(`${baseUrl}/user/rides`, {
      method: 'GET',
      headers: xheaders
    })
      .then(res => res.json())
      .then((data) => {
        historyHeading.textContent = 'History Of Rides Given';
        if (!data.found) {
          historyTable.style.display = 'flex';
          historyTable.style.justifyContent = 'center';
          historyTable.style.padding = '20px';
          historyTable.style.cursor = 'default';
          historyTable.innerHTML = data.message;
          return false;
        }
        historyTable.style.display = 'table';
        historyTable.style.marginTop = '0';
        historyTable.style.cursor = 'default';
        // USING MAP TO CREATE TABLE ROWS
        const tableRows = data.availableRides.map(val => (
          `<tr>
              <td class="text-blue">
                <i class="fas fa-map-marker-alt text-success"></i>
                  ${val.departure}
              </td>
              <td class="text-blue">
                <i class="fas fa-map-marker-alt text-danger"></i>
                  ${val.destination}
              </td>
              <td>
                <i class="fas fa-clock"></i>
                  ${val.time}
              </td>
              <td>
                <i class="fas fa-calendar-alt"></i>
                  ${val.date}
              </td>
              <td>
                <i class="fas fa-dollar-sign"></i>
                  ${val.cost}
              </td>
          </tr>`
        ));
        historyTable.innerHTML = tableRows;
      });
  },
  offerTaken() {
    historyTable.style.cursor = 'progress';
    historyTable.innerHTML = '<h3>Loading..... <div id="loading"></div></h3>';
    historyTable.style.display = 'flex';
    historyTable.style.justifyContent = 'center';
    historyTable.style.padding = '20px';
    historyTable.style.marginTop = '20px';

    // FIND ALL REQUESTS
    const xheaders = new Headers();
    xheaders.append('Accept', 'application/json');
    xheaders.append('Content-type', 'application/json');
    xheaders.append('x-access-token', `${window.localStorage.getItem('token')}`);
    window.fetch(`${baseUrl}/user/requests`, { method: 'GET', headers: xheaders })
      .then(res => res.json())
      .then((data) => {
        historyHeading.textContent = 'History of Rides Taken';
        if (!data.found) {
          historyTable.style.display = 'flex';
          historyTable.style.justifyContent = 'center';
          historyTable.style.padding = '20px';
          historyTable.style.marginTop = '20px';
          historyTable.style.cursor = 'default';
          historyTable.innerHTML = `No record found! because ${data.message}`;
          return false;
        }
        historyTable.style.display = 'table';
        historyTable.style.marginTop = '0';
        historyTable.style.cursor = 'default';
        const tableRows = data.requests.map(val => (
          `<tr>
              <td class="text-blue">
                <i class="fas fa-map-marker-alt text-success"></i>
                  ${val.departure}
              </td>
              <td class="text-blue">
                <i class="fas fa-map-marker-alt text-danger"></i>
                  ${val.destination}
              </td>
              <td>
                <i class="fas fa-clock"></i>
                  ${val.time}
              </td>
              <td>
                <i class="fas fa-calendar-alt"></i>
                  ${val.date}
              </td>
              <td>
                <i class="fas fa-dollar-sign"></i>
                  ${val.cost}
              </td>
          </tr>`
        ));
        historyTable.innerHTML = tableRows;
      }).catch(() => {
        historyTable.textContent = 'There was a problem with the connection';
        setTimeout(() => {
          historyTable.textContent = null;
        }, 7000);
      });
  },
};

ridesBtn.addEventListener('click', showHistory.rideOffered);
requestBtn.addEventListener('click', showHistory.offerTaken);

showHistory.data().getRidesCount();
showHistory.data().getRequestCount();
