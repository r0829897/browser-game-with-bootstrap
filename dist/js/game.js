// LINKS
const nav_link = document.querySelectorAll('.nav-link');

// CONSTANTS
const TARGET_BACKGROUND = "bg-success";
const TARGET_TEXT = "<p class=\"text-white\"></p>";
const scoreHTML = document.getElementById("score");
const gameboard = document.getElementById('gameboard');
const startScreen = document.getElementById('start-screen');
const navBar = document.querySelector('nav');
const playAgainBtn = document.getElementById('play-again-btn');

let positions = document.querySelectorAll('.col');
let interval = undefined;
let score = undefined;

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

  
  // COLS
  positions.forEach(position => position.setAttribute('onclick', 'clickTarget(this)'));
}

function play() {
  gameboard.classList.remove('d-none');
  startScreen.classList.add('d-none');
  navBar.classList.add('d-none');
  start();
}

function start() {
  // change positions for resizing possibility
  positions = Array.from(positions).filter(position =>
    !(position.classList.contains('d-none') || position.parentNode.classList.contains('d-none'))
  );

  score = 0;
  refreshScore(score);
  interval = setInterval(chooseTargetPosition, 2000);

  if (loggedIn()) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    user.games.push({
      score: 0, 
      time: getTime()
    });
    saveUser(user);
  }
}

function restartGame() {
  positions.forEach(position => position.classList.remove('bg-danger'));
  start();
  playAgainBtn.classList.add('d-none');
}

function stop() {
  playAgainBtn.classList.remove('d-none');
  saveScore();
}

function clickTarget(col) {
  if (col.classList.contains('target')) {
    score++;
    refreshScore(score);
    col.classList.remove('target');
    col.classList.remove(TARGET_BACKGROUND);
  }
  else {
    clearInterval(interval);
    col.classList.add('bg-danger');
    setTimeout(stop, 2000);
  }
}

function leave() {
  gameboard.classList.add('d-none');
  startScreen.classList.remove('d-none');
  
  // if still playing
  if (playAgainBtn.classList.contains('d-none')) {
    clearInterval(interval);
    saveScore();
  }
}

// Save functions
function saveScore() {
  if (loggedIn()) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    user.games[user.games.length-1].score = score;
    saveUser(user);
  }
}

function saveUser(user) {
  window.localStorage.setItem(user.username, JSON.stringify(user));
  window.localStorage.setItem('user', JSON.stringify(user));
}

// Help functions

function refreshScore(score) {
  scoreHTML.innerHTML = score.toString();
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // max not included
}

function chooseTargetPosition() {
  let i = getRndInteger(0, positions.length);
  showTarget(i);
  setTimeout(removeTarget, 1800, i);
}

function showTarget(i) {
  positions[i].classList.add('target');
  positions[i].classList.add(TARGET_BACKGROUND);
}

function removeTarget(i) {
  positions[i].classList.remove('target');
  positions[i].classList.remove(TARGET_BACKGROUND);
}

function getTime() {
  let currentdate = new Date(); 
  let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "@"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime;
}

function loggedIn() {
  return window.localStorage.getItem('user') !== null;
}