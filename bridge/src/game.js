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

const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;

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
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.save();

  ctx.translate(-sceneOffset, 0);

  drawPlatforms();
  drawHero();
  drawSticks();

  ctx.restore();
}

function drawPlatforms() {
  platforms.forEach(({ x, w }) => {
    ctx.fillStyle = "black";
    ctx.fillRect(x, canvasHeight - platformHeight, w, platformHeight);
  });
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

function drawHero() {
  const heroWidth = 20;
  const heroHeight = 30;

  ctx.fillStyle = "red";
  ctx.fillRect(
    heroX,
    heroY + canvasHeight - platformHeight - heroHeight,
    heroWidth,
    heroHeight
  );
}

function drawSticks() {
  sticks.forEach((stick) => {
    ctx.save();

    ctx.translate(stick.x, canvasHeight - platformHeight);
    ctx.rotate((Math.PI / 180) * stick.rotation);

    // Draw stick
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -stick.length);
    ctx.stroke();

    // Restore transformations
    ctx.restore();
  });
}

window.addEventListener("mousedown", function (event) {

});

window.addEventListener("mouseup", function (event) {

});

function animate(timestamp) {

}