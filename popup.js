// naming
const timerValue = document.querySelector(".containValue");
const containValueval = document.querySelector(".containValueval");
const setCustom = document.querySelector(".setCustom");
const custom = document.querySelector("#custom");
const value = document.querySelector(".value");
const changeDefault = document.querySelector(".changeDefault");
const defaultVal = document.getElementById("default");
const Heading = document.querySelector(".Heading");

let timerValDefault, myVar2, myVar, time, temp, highest, color;
count = 0;

if (localStorage.getItem("default")) {
  timerValDefault = localStorage.getItem("default");
} else {
  localStorage.setItem("default", 25);
  timerValDefault = 25;
}
containValueval.textContent = timerValDefault;

//set highest focus time
highest = localStorage.getItem("highest") ? localStorage.getItem("highest") : 0;
value.textContent = highest + " min.";

// // consistent state
// if (localStorage.getItem("test1") != null) {
// containValueval.textContent = localStorage.getItem("test1");
// runtimer(localStorage.getItem("test1"));
// }
//  find highest
function findHighest(time) {
  const initial = localStorage.getItem("highest")
    ? localStorage.getItem("highest")
    : 0;
  highest = initial > time ? initial : time;
  localStorage.setItem("highest", highest);
  containValueval.textContent = highest;
  value.textContent = highest + " min.";
}

function removeTimers() {
  clearTimeout(myVar);
  clearInterval(myVar2);
  containValueval.classList.remove("running");
  timerValDefault = localStorage.getItem("default");
  containValueval.textContent = timerValDefault;
  count = 0;
  Heading.textContent = "Default Timer";
  // localStorage.removeItem("test1");
}

function timeoutFunc() {
  console.log("timer finished");
  const audio = new Audio("./audio_file.mp3");
  audio.play();
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function myfunc() {
  time -= 1;
  count++;
  // localStorage.setItem("test1", time);
  if (time <= 0) {
    time = parseInt(localStorage.getItem("default"));
    containValueval.textContent = time;
    findHighest(temp);
    removeTimers();
  }
  containValueval.textContent = time;
  document.body.style.backgroundImage = `linear-gradient(102.1deg, ${color} ${Math.round(
    (count / temp) * 100
  )}%,white ${100 - Math.round((count / temp) * 100)}%)`;
  console.log(Math.round((temp / count) * 100));
}
//   runtimer
function runtimer(checkTime = 0) {
  // if (checkTime != 0) {
  //   time = localStorage.getItem("test1");
  // } else {
  //   time = parseInt(containValueval.textContent);
  // }
  color = getRandomColor();
  time = parseInt(containValueval.textContent);
  temp = time;
  myVar = setTimeout(timeoutFunc, time * 1000);
  myVar2 = setInterval(myfunc, 1000);
}

// set timer
timerValue.addEventListener("click", function (e) {
  e.target.classList.toggle("running");
  if (e.target.classList.contains("running")) {
    runtimer();
  } else {
    removeTimers();
  }
});

// set custom timer
setCustom.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.querySelector("#custom"));
  const val = e.target.querySelector("#custom").value;
  containValueval.textContent = val;
  custom.value = "";
  Heading.textContent = "Custom Timer";
});

// default timer
changeDefault.addEventListener("submit", (e) => {
  e.preventDefault();
  timerValDefault = e.target.querySelector("#default").value;
  localStorage.setItem("default", timerValDefault);
  defaultVal.value = "";
  containValueval.textContent = timerValDefault;
  Heading.textContent = "Default Timer";
  removeTimers();
});
