// CONSTANTS
const TARGET_BACKGROUND = "bg-danger";
const TARGET_TEXT = "<p class=\"text-white\"></p>";



const positions = document.querySelectorAll('.col');
let interval = undefined;
let score = 0;
const scoreHTML = document.getElementById("score");



window.onload = () => {

}

function showTarget(i) {
  positions[i].innerHTML = targetHTML;
  positions[i].setAttribute("onclick", "addScore(this)");
  positions[i].classList.add(TARGET_BACKGROUND);
}

function removeTarget(i) {
  positions[i].innerHTML = "";
  positions[i].removeAttribute("onclick");
  positions[i].classList.remove(TARGET_BACKGROUND);
}

function start(btn) {
  btn.setAttribute("onclick", "stop(this)");
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-danger");
  btn.innerHTML = "Stop";
  interval = setInterval(chooseTargetPosition, 2000);
}

function stop(btn) {
  btn.setAttribute("onclick", "start(this)");
  btn.classList.remove("btn-danger");
  btn.classList.add("btn-primary");
  btn.innerHTML = "Start";
  clearInterval(interval);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // max not included
}

function chooseTargetPosition() {
  let i = getRndInteger(0, positions.length);
  showTarget(i);
  setTimeout(removeTarget, 1800, i);
}

function addScore(col) {
  score++;
  scoreHTML.innerHTML = score.toString();
  col.innerHTML = "";
  col.removeAttribute("onclick");
  col.classList.remove(TARGET_BACKGROUND);
}