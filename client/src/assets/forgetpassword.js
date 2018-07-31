/* eslint-env browser */
const baseUrl = 'https://ridemyway-danieladek.herokuapp.com/api/v1';
const body = document.querySelector('body');
const email = document.querySelector('#email');
const sendTokenBtn = document.querySelector('.send-token-btn');
const error = document.querySelector('.error');
const sucess = document.querySelector('.success-sent');

const user = {
  forgetPassword(event) {
    event.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
      return false;
    }
    if (email.value.trim() === '') {
      error.textContent = 'Please complete this form';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }
    error.innerHTML = '<div id="loading"></div>';
    body.style.cursor = 'progress';
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-type', 'application/json');
    fetch(`${baseUrl}/user/forgot-password`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        email: email.value.trim()
      })
    }).then(res => res.json())
      .then((data) => {
        body.style.cursor = 'default';
        if (!data.success) {
          error.textContent = data.errors || data.message;
          setTimeout(() => {
            error.textContent = null;
          }, 5000);
        } else {
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            error.textContent = null;
          }, 2000);
          setTimeout(() => {
            sucess.innerHTML = `${data.message}`;
          }, 2000);
          setTimeout(() => {
            sucess.innerHTML = null;
          }, 7000);
          setTimeout(() => {
            window.location.replace('resetPassword.html');
          }, 6900);
        }
      });
  }
};

sendTokenBtn.addEventListener('click', user.forgetPassword);

