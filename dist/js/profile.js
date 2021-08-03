const username = document.getElementById('username');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const email = document.getElementById('email');
const table = document.getElementById('recent-games');

window.onload = () => {
  if (window.localStorage.getItem('user') !== null) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    username.innerHTML = user.username;
    first_name.innerHTML = user.first_name;
    last_name.innerHTML = user.last_name;
    email.innerHTML = user.email;
    loadScores();
  }
  else {
    window.location.href = "profile-error.html";
  }
}

function logout() {
  window.localStorage.removeItem('user');
  window.location.href = "index.html";
}

function loadScores() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const scores = user.scores;
  for (const score of scores) {
    const date = score.time.split("@")[0];
    const time = score.time.split("@")[1];
    table.innerHTML += `<tr>
      <td scope="row">${date}</td>
      <td>${time}</td>
      <td>${score.score}</td>
    </tr>`
  }
} 