/* eslint-env browser */
/** eslint env-browser */
const divElement = document.querySelector('#map');
/**
 * initMap()
 * @returns {object} BOOLEAN
 */
function initMap() {
  // map center
  const unilag = {
    lat: 6.5244,
    lng: 3.3792
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
