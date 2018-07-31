/* eslint-env browser */
const baseUrl = 'https://ridemyway-danieladek.herokuapp.com/api/v1';
const body = document.querySelector('body');
const password = document.querySelector('#newPassword');
const confirmPass = document.querySelector('#confirmPassword');
const resetPasswordBtn = document.querySelector('.reset-password-btn');
const error = document.querySelector('.error');
const success = document.querySelector('.success-message');
const showPass = document.querySelector('.show-password');
const splitUrl = document.URL.split('?')[1];
const passToken = splitUrl.split('=')[1];

showPass.addEventListener('mouseover', () => {
  password.setAttribute('type', 'text');
  confirmPass.setAttribute('type', 'text');
});

showPass.addEventListener('mouseout', () => {
  password.setAttribute('type', 'password');
  confirmPass.setAttribute('type', 'password');
});

const user = {
  resetPassword(event) {
    event.preventDefault();
    if (window.navigator.onLine === false) {
      window.alert('Your Internet Connection is down'); // eslint-disable-line no-alert
      return false;
    }
    if (password.value.trim() === ''
        || confirmPass.value.trim() === '') {
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
    error.innerHTML = '<div id="loading"></div>';
    body.style.cursor = 'progress';
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-type', 'application/json');
    fetch(`${baseUrl}/user/reset-password?token=${passToken}`, {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({
        password: password.value.trim()
      })
    }).then(res => res.json())
      .then((newPasword) => {
        body.style.cursor = 'default';
        if (!newPasword.success) {
          error.textContent = newPasword.errors || newPasword.message;
          setTimeout(() => {
            error.textContent = null;
          }, 5000);
        } else {
          error.textContent = 'Please Wait!....';
          setTimeout(() => {
            error.textContent = null;
          }, 2000);
          setTimeout(() => {
            success.textContent = `${newPasword.message}`;
          }, 2000);
          setTimeout(() => {
            success.textContent = null;
          }, 5000);
          setTimeout(() => {
            window.location.replace('login.html');
          }, 3900);
        }
      });
  }
};

resetPasswordBtn.addEventListener('click', user.resetPassword);
