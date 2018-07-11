const email = document.querySelector('#email');
const password = document.querySelector('#password');
const url = 'http://ridemyway-danieladek.herokuapp.com/api/v1/auth/login';
const error = document.querySelector('.error');
const button = document.querySelector('#login-form button');

button.addEventListener('click', (e) => {
  e.preventDefault();
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
      if (user.sucess === true) {
        console.log(user);
      }
      error.textContent = user.errors || user.message;
      console.log(user);
    });
});

