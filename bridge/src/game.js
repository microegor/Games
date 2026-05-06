let phase = "waiting";
let lastTimestamp; 

let heroX; 
let heroY;
let sceneOffset;

let platforms = [];
let sticks = [];

let score = 0;


const canvas = document.getElementById("game");


const ctx = canvas.getContext("2d");


const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");


resetGame();


function resetGame() {
  phase = "waiting";
  lastTimestamp = undefined;

  platforms = [{ x: 50, w: 50 }];
  generatePlatform();
  generatePlatform();
  generatePlatform();
  generatePlatform();

  heroX = platforms[0].x + platforms[0].w - 30; 
  heroY = 0;

  sceneOffset = 0;

  sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];

  score = 0;

  restartButton.style.display = "none"; 
  scoreElement.innerText = score; 

  draw();
}

function draw() {
  
}

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;
  const minimumWidth = 20;
  const maximumWidth = 100;

  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;

  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));
  const w =
    minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

  platforms.push({ x, w });
}

window.addEventListener("mousedown", function (event) {

});

window.addEventListener("mouseup", function (event) {
  
});

function animate(timestamp) {
  
}