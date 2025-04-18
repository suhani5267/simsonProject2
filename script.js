// script.js

let gameSeq = [];
let userSeq = [];

let colors = ["yellow", "red", "green", "blue"];
let level = 0;
let started = false;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#start");
console.log(startBtn)


startBtn.addEventListener("click", () => {
    if (started == false) {
        started = true;
        levelUp();
    }
})
function levelUp() {
 
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * colors.length);
  let randColor = colors[randIdx];
    let randBtn = document.getElementById(randColor);
    
    gameSeq.push(randColor);
    console.log(gameSeq)

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
   
   
    resetGame();
  }
}

function btnClick() {
  let btn = this;
  

    let color = btn.getAttribute("id");
    userFlash(btn);
    userSeq.push(color);
    console.log(userSeq)

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
console.log(allBtns)

for (let btn of allBtns) {
    btn.addEventListener("click", btnClick);
    console.log(btn)
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
}
