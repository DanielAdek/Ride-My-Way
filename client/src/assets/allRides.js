/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const cardContainer = document.querySelector('.cards-container');
const moreRideDetails = document.querySelector('.modal');
const backdrp = document.querySelector('.backdrop-modal');

// let rideId;
const object = {
  displayRideModal(rideId) {
    console.log('clicked');
    let rideModal;
    fetch(`${baseUrl}/rides/${rideId}`, { method: 'GET' })
      .then(res => res.json())
      .then((response) => {
        moreRideDetails.classList.add('openModal');
        backdrp.classList.add('openBackdrop');
        rideModal = response.ride.map((rideDetails) => {
          return `<div class="card card-sm modal-card-container">
              <div class="card-content p-1">
                  <span class="font-md close-modal text-danger span" title="Close">X</span>
                  <h2 class="driver-name">${rideDetails.driver}</h2>
                  <h4 class="departure">
                      <i class="fas fa-map-marker-alt"></i>
                      Departure:  ${rideDetails.departure} -- ${rideDetails.time} ${rideDetails.date}
                  </h4>
                  <h4 class="Destination">
                      <i class="fas fa-map-marker-alt"></i>
                      Destination: ${rideDetails.destination}
                  </h4>
                  <h4 class="seat">${rideDetails.seats} Passengers More</h4>
                  <textarea class="p-4 block-xl" name="msg" id="passenger-msg" cols="20" placeholder="What will you like to tell your driver?" rows="5"></textarea>
                  <br>
                  <a href="" class="btn block-xl btn-success font-md request-ride close-modal">Request Ride</a>
              </div>
          </div>`;
        });
        moreRideDetails.innerHTML = rideModal;
      });
    return rideModal;
  },

  loadData() {
    cardContainer.innerHTML = 'Loading....';
    fetch(`${baseUrl}/rides`, {
      method: 'GET'
    }).then(res => res.json())
      .then((rides) => {
        const allRides = rides.availableRides.map(ride => (
          `<div class="card card-all-rides flex-row p-3 mb-3 mr-3 ml-3 mr-3 mt-3">
            <div class="card-content">
                <h3 class="driver-name">Driver: ${ride.driver}</h3>
                <p class="departure">
                    <i class="fas fa-map-marker-alt"></i>
                    Departure: ${ride.departure} -- ${ride.time} ${ride.date}
                </p>
                <p class="Destination">
                    <i class="fas fa-map-marker-alt"></i>
                    Destination: ${ride.destination}
                </p>
                <button onClick="${this.displayRideModal.bind(this, ride.rideid)}" class="view-details">View More Detail</button>
            </div>
        </div>`
        ));
        cardContainer.innerHTML = allRides;
        allRides.forEach((element) => {
          console.log(element);
          // const btn = document.querySelector('view-details');
          // btn.addEventListener('click', () => {
          //   console.log(this);
          // });
        });
      });
  }
};

object.loadData();
