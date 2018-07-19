/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('.error');
const sucessLogin = document.querySelector('.success-login');
const button = document.querySelector('#login-form button');
const body = document.querySelector('body');


const User = {
  /**
   * @returns {*} BOOLEAN
   * @param {*} e
   */
  loginUser(e) {
    e.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
      return false;
    }
    if (email.value.trim() === '' || password.value.trim() === '') {
      error.textContent = 'Please Enter Your Email And Password';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }
    body.style.cursor = 'progress';
    error.textContent = 'Loading.....';
    setTimeout(() => {
      button.style.cursor = 'pointer';
    }, 5000);
    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim()
      })
    })
      .then(res => res.json())
      .then((user) => {
        body.style.cursor = 'default';
        if (!user.success) {
          error.textContent = user.errors || user.message;
          setTimeout(() => {
            error.textContent = null;
          }, 5000);
        } else {
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            error.textContent = null;
          }, 2000);
          setTimeout(() => {
            sucessLogin.textContent = `Welcome Back ${user.result.username}`;
          }, 2000);
          setTimeout(() => {
            sucessLogin.textContent = null;
          }, 4000);
          window.localStorage.setItem('token', user.result.token);
          window.localStorage.setItem('username', user.result.username);
          window.localStorage.setItem('email', user.result.email);
          setTimeout(() => {
            window.location.replace('create-ride.html');
          }, 3900);
        }
      }).catch((err) => {
        error.textContent = `There was a problem with the server ${err.message}`;
        setTimeout(() => {
          error.textContent = null;
        }, 5000);
      });
  },
};

button.addEventListener('click', User.loginUser);
