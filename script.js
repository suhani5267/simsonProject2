// script.js

let gameSeq = [];
let userSeq = [];

let colors = ["yellow", "red", "green", "blue"];
let level = 0;
let started = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * colors.length);
  let randColor = colors[randIdx];
  let randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);

  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <br>${level} <br>Press Any Key to Restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "#f0f0f0";
    }, 200);
    resetGame();
  }
}

function btnClick() {
  let btn = this;
  userFlash(btn);

  let color = btn.id;
  userSeq.push(color);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
  btn.addEventListener("click", btnClick);
});

function resetGame() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
}
