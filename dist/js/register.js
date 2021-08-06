const form = document.querySelector('form');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const username = document.getElementById('username');
const username_match = document.getElementById('username-match');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const confirm_password_match = document.getElementById('confirm-password-match');
const submit_btn = document.getElementById('submit-btn');

window.onload = () => {
  username.addEventListener('blur', checkUsername);
  username.addEventListener('focus', () => { username_match.innerHTML = ""; });

  confirm_password.addEventListener('blur', checkPassword);
  confirm_password.addEventListener('focus', () => { confirm_password_match.innerHTML = ""; });

  password.addEventListener('blur', checkPassword);
  password.addEventListener('focus', () => { confirm_password_match.innerHTML = ""; });

  // Form validation
  form.addEventListener("submit", (e) => {
    if (password.value !== confirm_password.value) {
      e.preventDefault();
    }
    else if (window.localStorage.getItem(username.value) !== null || username.value === "user") {
      e.preventDefault();
    }
    else {
      let user = {
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
        games: []
      }
      window.localStorage.setItem(user.username, JSON.stringify(user)); 
    }
  });
}

function checkPassword() {
  if (password.value !== confirm_password.value) {
    confirm_password_match.innerHTML = "<i class=\"bi bi-exclamation-circle\"></i> Password does not match.";
  }
  else {
    confirm_password_match.innerHTML = "";
  }
}

function checkUsername() {
  if (window.localStorage.getItem(username.value) !== null || username.value === "user") {
    username_match.innerHTML = "<i class=\"bi bi-exclamation-circle\"></i> Username is already used.";
  }
  else {
    username_match.innerHTML = ""; 
  } 
}