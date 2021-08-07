// LINKS
const nav_link = document.querySelectorAll('.nav-link');

// LOGIN
const form = document.querySelector('form');
const username = document.getElementById('username');
const username_error = document.getElementById('username-error');
const password = document.getElementById('password');
const password_error = document.getElementById('password-error');

const loginContainer = document.getElementById('login-container');
const heroContainer = document.getElementById('hero-container');
const hero = document.getElementById('hero');

window.onload = () => {
  // LINKS
  if (loggedIn()) {
    nav_link[nav_link.length - 1].innerHTML = "<i class=\"bi bi-person-fill\"></i> Profile";
    nav_link[nav_link.length - 1].setAttribute('href', 'profile.html');

    // Disable login if already logged in and show play-button
    loginContainer.classList.add('d-none');
    heroContainer.classList.add('justify-content-center');
    hero.classList.remove('col-lg-7');
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

function loggedIn() {
 return  window.localStorage.getItem('user') !== null;
}


// function test() {
//   for (let i = 0; i < localStorage.length; i++) {     
//     let key = localStorage.key(i);
//     let user = JSON.parse(localStorage.getItem(key));
//     let data = user.scores;
//     user.games = data;
//     user.scores = undefined;
//     localStorage.setItem(key, JSON.stringify(user));
//   }
// }