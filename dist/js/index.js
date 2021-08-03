// LINKS
const nav_link = document.querySelectorAll('.nav-link');

// LOGIN
const form = document.querySelector('form');
const username = document.getElementById('username');
const username_error = document.getElementById('username-error');
const password = document.getElementById('password');
const password_error = document.getElementById('password-error');

window.onload = () => {
  // LINKS
  if (window.localStorage.getItem('user') !== null) {
    nav_link[nav_link.length - 1].innerHTML = "<i class=\"bi bi-person-fill\"></i> Profile";
    nav_link[nav_link.length - 1].setAttribute('href', 'profile.html');
  }
  else {
    nav_link[nav_link.length - 1].innerHTML = "Register";
    nav_link[nav_link.length - 1].setAttribute('href', 'register.html');
  }

  // LOGIN
  form.addEventListener('submit', (e) => {
    if (window.localStorage.getItem(username.value) === null) {
      e.preventDefault();
      username_error.innerHTML = "<i class=\"bi bi-exclamation-circle\"></i> No user with that username.";
    }
    else if (JSON.parse(window.localStorage.getItem(username.value)).password !== password.value) {
      e.preventDefault();
      password_error.innerHTML = "<i class=\"bi bi-exclamation-circle\"></i> Wrong password";
    }
    else {
      window.localStorage.setItem('user', window.localStorage.getItem(username.value));
    }
  });
}