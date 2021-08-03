const username = document.getElementById('username');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const email = document.getElementById('email');

window.onload = () => {
  if (window.localStorage.getItem('user') !== null) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    username.innerHTML = user.username;
    first_name.innerHTML = user.first_name;
    last_name.innerHTML = user.last_name;
    email.innerHTML = user.email;
  }
  else {
    window.location.href = "profile-error.html";
  }
}