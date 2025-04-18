

let gameSeq = [];
let userSeq = [];
let ClickSound = new Audio("/sound/sound.mp3");
let wrongSound = new Audio("/sound/wrongSound.mp3");
let startSound = new Audio("/sound/game-start.mp3");
let flashDuration = 250;
let colors = ["yellow", "red", "green", "blue"];
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

let started = false;

let h2 = document.querySelector("h2");
let startBtn = document.querySelector("#start");
console.log(startBtn)


startBtn.addEventListener("click", () => {
    if (started == false) {
        started = true;
        StartSound();
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
    let difficulty = document.querySelector("#difficulty").value;
    switch (difficulty) {
        case "easy":
            flashDuration = 400;
            break;
        case "medium":
            flashDuration = 250;
            break;
        case "hard":
            flashDuration = 100;
            break;
    
        default:
            flashDuration = 250;
            break;
    }

  gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    let btnId = btn.getAttribute("id");
   
  setTimeout(() => {
    btn.classList.remove("flash");
  }, flashDuration);
}

function userFlash(btn) {
    btn.classList.add("userflash");
     PlaySound()
  setTimeout(() => {
    btn.classList.remove("userflash");
  },flashDuration);
}

function checkAns(index) {
  if (userSeq[index] === gameSeq[index]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
      playWrong()
      if (level > highScore) {
          highScore = level;
          localStorage.setItem("highScore",highScore)
      }
       
    h2.innerHTML = `Game Over! Your score was <br>${level} <br> <br>High Score :${highScore}</br>Press Any Key to Restart.`;
   
  
    resetGame();
  }
}

function btnClick() {
  let btn = this;
  

    let color = btn.getAttribute("id");
    userFlash(btn);
    PlaySound(color)
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

function PlaySound() {
    ClickSound.currentTime = 0;
    ClickSound.play();
}
function playWrong() {
    wrongSound.currentTime = 0;
    wrongSound.play();
}

function StartSound() {
    startSound.currentTime = 0;
    startSound.play();
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
}
