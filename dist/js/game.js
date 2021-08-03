// LINKS
const nav_link = document.querySelectorAll('.nav-link');

// CONSTANTS
const TARGET_BACKGROUND = "bg-danger";
const TARGET_TEXT = "<p class=\"text-white\"></p>";
const positions = document.querySelectorAll('.col');
const scoreHTML = document.getElementById("score");
const play_btn = document.getElementById('play-btn');

let interval = undefined;
let score = 0;

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

  // COLS
  positions.forEach(position => position.setAttribute('onclick', 'clickTarget(this)'));
}

function start(btn) {
  score = 0;
  refreshScore(score);
  btn.setAttribute("onclick", "stop(this)");
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-danger");
  btn.innerHTML = "Stop";
  interval = setInterval(chooseTargetPosition, 2000);

  if (loggedIn()) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    user.scores.push({
      score: undefined, 
      time: getTime()
    });
    saveUser(user);
  }
}

function stop(btn) {
  btn.setAttribute("onclick", "start(this)");
  btn.classList.remove("btn-danger");
  btn.classList.add("btn-primary");
  btn.innerHTML = "Start";
  clearInterval(interval);
  saveScore();
}

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

function clickTarget(col) {
  if (col.classList.contains('target')) {
    score++;
    refreshScore(score);
    col.classList.remove('target');
    col.classList.remove(TARGET_BACKGROUND);
  }
  else {
    stop(play_btn);
  }
}

function showTarget(i) {
  positions[i].classList.add('target');
  positions[i].classList.add(TARGET_BACKGROUND);
}

function removeTarget(i) {
  positions[i].classList.remove('target');
  positions[i].classList.remove(TARGET_BACKGROUND);
}

function saveScore() {
  if (loggedIn()) {
    let user = JSON.parse(window.localStorage.getItem('user'));

    user.scores[user.scores.length-1].score = score;
    saveUser(user);
  }
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

function saveUser(user) {
  window.localStorage.setItem(user.username, JSON.stringify(user));
  window.localStorage.setItem('user', JSON.stringify(user));
}

function loggedIn() {
  return window.localStorage.getItem('user') !== null;
}