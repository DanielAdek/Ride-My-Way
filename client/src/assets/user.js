/* eslint-env browser */
const baseUrl = 'https://ridemyway-danieladek.herokuapp.com/api/v1';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('.error');
const button = document.querySelector('#login-form button');
const body = document.querySelector('body');
const reqResMessage = document.querySelector('.response-message');
const backdrp = document.querySelector('.backdrop-modal');
const showPass = document.querySelector('.show-password');

showPass.addEventListener('mouseover', () => {
  password.setAttribute('type', 'text');
});

showPass.addEventListener('mouseout', () => {
  password.setAttribute('type', 'password');
});

const User = {
  /**
   * @returns {*} BOOLEAN
   * @param {*} e
   */
  loginUser(e) {
    e.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('Your Internet Connection is down'); // eslint-disable-line no-alert
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
    error.innerHTML = '<div>LOADING<br /><div id="loading"></div></div>';
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
            reqResMessage.textContent = `Welcome Back ${user.result.username}`;
            reqResMessage.classList.add('open-response-message');
            backdrp.classList.add('openBackdrop');
          }, 2000);
          setTimeout(() => {
            reqResMessage.classList.remove('open-response-message');
            backdrp.classList.remove('openBackdrop');
          }, 5000);
          window.localStorage.setItem('token', user.result.token);
          window.localStorage.setItem('username', user.result.username);
          window.localStorage.setItem('email', user.result.email);
          setTimeout(() => {
            window.location.replace('create-ride.html');
          }, 4999);
        }
      }).catch(() => {
        error.textContent = 'There was a problem with the connection';
        setTimeout(() => {
          error.textContent = null;
        }, 6000);
      });
  },
};

button.addEventListener('click', User.loginUser);
