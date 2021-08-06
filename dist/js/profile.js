const username = document.getElementById('username');
const first_name = document.getElementById('first-name');
const last_name = document.getElementById('last-name');
const email = document.getElementById('email');
const recent_games_table = document.getElementById('recent-games');
const highscore_table = document.getElementById('highscore');

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
  const games = user.games;
  for (const game of games) {
    const date = game.time.split("@")[0];
    const time = game.time.split("@")[1];
    recent_games_table.innerHTML += `<tr>
      <td scope="row">${date}</td>
      <td>${time}</td>
      <td>${game.score}</td>
    </tr>`;
  }

  games.sort(function (a, b) {
    return b.score - a.score;
  });

  let highscore = games[0];
  const date = highscore.time.split("@")[0];
  const time = highscore.time.split("@")[1];
  highscore_table.innerHTML = `<tr>
    <td scope="row">${date}</td>
    <td>${time}</td>
    <td class="fw-bold">${highscore.score}</td>
  </tr>`; 
} 