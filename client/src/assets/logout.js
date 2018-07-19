/* eslint-env browser */
const logout = document.querySelector('#logout');
const mobileLogoutBtn = document.querySelector('#logoutMobile');

const user = {
  /**
   * @returns {*} function
   */
  logoutUser() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('email');
    window.location.replace('index.html');
  }
};

logout.addEventListener('click', user.logoutUser);
mobileLogoutBtn.addEventListener('click', user.logoutUser);
