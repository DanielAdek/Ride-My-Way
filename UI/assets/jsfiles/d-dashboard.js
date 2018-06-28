const getBackdrop = document.querySelector('.backdrop');
const getMobileNav = document.querySelector('.mobile-nav');
const addRideBtn = document.querySelector('#create-ride');
const addRideForm = document.querySelector('.add-ride-form');
const startLocationInput = document.querySelector('#from');
const stopLocationInput = document.querySelector('#to');
const timeInput = document.querySelector('#time');
const dateInput = document.querySelector('#date');

addRideBtn.addEventListener('click', createRideModalForm);

function createRideModalForm() {
    getMobileNav.classList.remove('open');
    addRideForm.classList.add('modal-create-ride-form');
    startLocationInput.classList.add('width-1');
    stopLocationInput.classList.add('width-1');
    timeInput.classList.add('width-2');
    dateInput.classList.add('width-2');
}
