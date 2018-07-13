/* eslint-env browser */
const getMobileNav = document.querySelector('.mobile-nav');
const overlayBkdrop = document.querySelector('.backdrop');
const addRideBtn = document.querySelector('#create-ride');
const addRideForm = document.querySelector('.add-ride-form');
const startLocation = document.querySelector('#departure');
const stopLocation = document.querySelector('#destination');
const timeInput = document.querySelector('#time');
const dateInput = document.querySelector('#date');
const addRideBtnNxt = document.querySelector('.next-btn');
const addRideBtnPrev = document.querySelector('.previous-btn');
const errorMessage = document.querySelector('.error');
const nextForm = document.querySelector('.second');
const firstForm = document.querySelector('.first');

const rides = {
  /**
    * nextButton()
    * @param {*} event
    * @returns {*} function
    */
  nextButton(event) {
    event.preventDefault();
    if (startLocation.value.trim() === ''
       || stopLocation.value.trim() === ''
       || timeInput.value.trim() === ''
       || dateInput.value.trim() === '') {
      errorMessage.textContent = 'Please fill all (*) fields';
      setTimeout(() => {
        errorMessage.textContent = null;
      }, 4000);
    } else {
      nextForm.style.display = 'flex';
      firstForm.style.display = 'none';
    }
  },
  /**
     * prevButton()
     * @param {*} event
     * @returns {*} function
     */

  prevButton(event) {
    event.preventDefault();
    nextForm.style.display = 'none';
    firstForm.style.display = 'flex';
  },
  /**
    * createRideModalForm()
    * @returns {*} function
    */
  createRideModalForm() {
    getMobileNav.classList.remove('open');
    addRideForm.classList.add('modal-create-ride-form');
  },

  /**
    * closeCreateRideModalForm()
    * @returns {*} function
    */
  closeCreateRideForm() {
    addRideForm.classList.remove('modal-create-ride-form');
  }
};


addRideBtn.addEventListener('click', rides.createRideModalForm);
addRideBtnNxt.addEventListener('click', rides.nextButton);
addRideBtnPrev.addEventListener('click', rides.prevButton);
overlayBkdrop.addEventListener('click', rides.closeCreateRideForm);
