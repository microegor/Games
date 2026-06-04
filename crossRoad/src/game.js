const screen = document.getElementById("screen");

const ChickenWidth = 30;
const ChickenHeight = 30;

const step = 30;      
const speed = 5;      

let chickenX = 300;
let chickenY = 400;

let targetX = chickenX;
let targetY = chickenY;

let isMoving = false;

const chiken = document.createElement("div");
screen.appendChild(chiken);
function createChiken(){
    chiken.classList.add("chiken");
    
    chiken.style.width = ChickenWidth + "px";
    chiken.style.height = ChickenHeight + "px";
    
}

function drawChicken() {
  chiken.style.left = chickenX + "px";
  chiken.style.top = chickenY + "px";
}

function createCar(){
    const car = document.createElement("div");
    car.classList.add("car")
}

function moveToTarget() {
  if (!isMoving) return;

  if (chickenX < targetX) {
    chickenX += speed;
  }

  if (chickenX > targetX) {
    chickenX -= speed;
  }

  if (chickenY < targetY) {
    chickenY += speed;
  }

  if (chickenY > targetY) {
    chickenY -= speed;
  }

  if (Math.abs(chickenX - targetX) < speed) {
    chickenX = targetX;
  }

  if (Math.abs(chickenY - targetY) < speed) {
    chickenY = targetY;
  }

  drawChicken();

  if (chickenX === targetX && chickenY === targetY) {
    isMoving = false;
    return;
  }

  requestAnimationFrame(moveToTarget);
}

document.addEventListener("keydown", function(event) {
     if (event.repeat) return; 
  if (isMoving) return;

  if (event.key === "ArrowRight") {
    targetX = chickenX + step;
  }

  if (event.key === "ArrowLeft") {
    targetX = chickenX - step;
  }
  // Реализация движения карты
  if (event.key === "ArrowUp") {
  }

  if (event.key === "ArrowDown") {
  }

  isMoving = true;
  moveToTarget();
});

createChiken();
drawChicken();