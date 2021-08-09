const highscores = document.querySelector('tbody');

window.onload = () => {
  // LINKS
  const navItems = document.querySelectorAll('.nav-item');
  let lastNavItem = navItems[navItems.length - 1];
  if (loggedIn()) {
    loadNavbarProfile(lastNavItem);
  }
  else {
    lastNavItem.innerHTML = "<a class=\"nav-link\" href=\"register.html\">Register</a>";
  }

  let counter = 1;
  for (const player of sortPlayers(getPlayers())) {
    highscores.innerHTML += `<tr class="${counter == 1 ? "table-success" : 
                                         (counter == 2 ? "table-warning" : 
                                         (counter == 3 ? "table-secondary" :
                                         ""))}">
      <th scope="row">${counter++}</th>
      <td class="text-center">${player.username}</td>
      <td class="text-center">${getHighscore(player).time}</td>
      <td class="text-end">${getHighscore(player).score}</td>
    </tr>`
  }
}

function getPlayers() {
  let players = [];
  for (let i = 0; i < localStorage.length; i++) {     
    let key = localStorage.key(i);
    if (key === 'user') {
      continue;
    }
    else {
      players.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  return players;
}

function sortPlayers(players) {
  return getPlayers().sort(function (a, b) {
    return getHighscore(b).score - getHighscore(a).score;
  });
}

function getHighscore(player) {
  let games = player.games;
  let sortedGames = games.sort(function (a, b) {
    return b.score - a.score;
  });

  return sortedGames[0];
}