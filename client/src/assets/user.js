/* eslint-env browser */
const url = 'http://ridemyway-danieladek.herokuapp.com/api/v1/auth/login';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('.error');
const sucessLogin = document.querySelector('.success-login');
const button = document.querySelector('#login-form button');

const User = {
  /**
   * @returns {*} BOOLEAN
   * @param {*} e
   */
  loginUser(e) {
    e.preventDefault();
    if (email.value.trim() === '' || password.value.trim() === '') {
      error.textContent = 'Please Enter Your Email And Password';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }
    button.style.cursor = 'progress';
    setTimeout(() => {
      button.style.cursor = 'pointer';
    }, 5000);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
      .then(res => res.json())
      .then((user) => {
        if (!user.success) {
          error.textContent = user.errors || user.message;
          setTimeout(() => {
            error.textContent = null;
          }, 5000);
        } else {
          setTimeout(() => {
            sucessLogin.textContent = user.message;
          }, 2000);
          window.localStorage.setItem('token', user.token);
          window.location.replace('user-dashboard.html');
        }
      });
  }
};

button.addEventListener('click', User.loginUser);
