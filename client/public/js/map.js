const divElement = document.querySelector('#map');

function initMap() {

  // map center
  const unilag = {
    lat: 6.5193,
    lng: 3.3993
  };

  // map options
  const options = {
    zoom: 6,
    center: unilag
  };

  // new map
  const map = new google.maps.Map(divElement, options);

  // map marker
  const marker = new google.maps.Marker({
    position: unilag,
    map
  });
}
