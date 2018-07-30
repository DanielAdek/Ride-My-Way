/* eslint-env browser */
const baseUrl = 'http://ridemyway-danieladek.herokuapp.com/api/v1';
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const fullName = document.querySelector('#fullname');
const confirmPass = document.querySelector('#confirm-password');
const username = document.querySelector('#username');
const signupBtn = document.querySelector('.sign-up-button');
const error = document.querySelector('.error');
const body = document.querySelector('body');
const reqResMessage = document.querySelector('.response-message');
const backdrp = document.querySelector('.backdrop');

const userAccount = {
  signupUser(event) {
    event.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('It Seems Your computer is in offline mode'); // eslint-disable-line no-alert
      return false;
    }
    if (fullName.value.trim() === ''
        || username.value.trim() === ''
        || password.value.trim() === ''
        || confirmPass.value.trim() === ''
        || email.value.trim() === '') {
      error.textContent = 'Please complete this form';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }

    if (password.value.trim() !== confirmPass.value.trim()) {
      error.textContent = 'Your password and confirm password does not match';
      setTimeout(() => {
        error.textContent = null;
      }, 3000);
      return false;
    }
    error.innerHTML = 'Loading..... <div id="loading"></div>';
    body.style.cursor = 'progress';
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-type', 'application/json');
    fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        fullName: fullName.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
      })
    }).then(res => res.json())
      .then((newUser) => {
        body.style.cursor = 'default';
        if (!newUser.success) {
          error.textContent = newUser.errors || newUser.message;
          setTimeout(() => {
            error.textContent = null;
          }, 5000);
        } else {
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            error.textContent = null;
          }, 2000);
          setTimeout(() => {
            reqResMessage.textContent = `${newUser.message}fully Created!. 
          Welcome ${username.value}`;
            reqResMessage.classList.add('open-response-message');
            backdrp.classList.add('openBackdrop');
          }, 2000);
          setTimeout(() => {
            reqResMessage.classList.remove('open-response-message');
            backdrp.classList.remove('openBackdrop');
          }, 5000);
          window.localStorage.setItem('token', newUser.user.token);
          window.localStorage.setItem('username', newUser.user.username);
          window.localStorage.setItem('email', newUser.user.email);
          setTimeout(() => {
            window.location.replace('create-ride.html');
          }, 4999);
        }
      });
  }
};

signupBtn.addEventListener('click', userAccount.signupUser);
