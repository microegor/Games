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

let cars = [];

const chiken = document.createElement("div");
screen.appendChild(chiken);
function createChiken() {
  chiken.classList.add("chiken");

  chiken.style.width = ChickenWidth + "px";
  chiken.style.height = ChickenHeight + "px";

}

function drawChicken() {
  chiken.style.left = chickenX + "px";
  chiken.style.top = chickenY + "px";
}


function createCar(y) {
  const car = document.createElement("div");
  car.classList.add("car");

  car.style.position = "absolute";
  car.style.width = "60px";
  car.style.height = "30px";

  const newCar = {
    element: car,
    x: -60,
    y: y,
  };

  screen.appendChild(car);
  cars.push(newCar);
  reDraw()
}

function reDraw() {
  for (let i = 0; i < cars.length; i++) {
    cars[i].element.style.left = cars[i].x + "px";
    cars[i].element.style.top = cars[i].y + "px";
  }
}

function moveMapYUP() {
  for (let i = 0; i < cars.length; i++) {
    cars[i].y += ChickenHeight;
  }
}

function moveMapYDown() {
  for (let i = 0; i < cars.length; i++) {
    cars[i].y -= ChickenHeight;
  }
}

function moveToTarget() {
  if (!isMoving) return;
  
  if (chickenX < targetX) {
    chickenX += speed;
  }
  
  if (chickenX > targetX) {
    chickenX -= speed;
  }
  
  if (Math.abs(chickenX - targetX) < speed) {
    chickenX = targetX;
  }
  
  drawChicken();
  
  if (chickenX === targetX) {
    isMoving = false;
    return;
  }
  
  requestAnimationFrame(moveToTarget);
}

function removeFirstCar() {
  const firstCar = cars.shift();
  
  if (firstCar) {
    firstCar.element.remove();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.repeat) return;
  reDraw()
  if (isMoving) return;
  
  if (event.key === "ArrowRight") {
    targetX = chickenX + step;
  }
  
  if (event.key === "ArrowLeft") {
    targetX = chickenX - step;
  }
  // Реализация движения карты
  if (event.key === "ArrowUp") {
    moveMapYUP();
  }

  if (event.key === "ArrowDown") {
    moveMapYDown();
  }

  isMoving = true;
  moveToTarget();
});

createChiken();
drawChicken();
createCar(chickenY - 4 * ChickenHeight);

setInterval(function () {
  const lastCar = cars[cars.length - 1];
  if(cars.length < 30){
    createCar(lastCar.y - 2 * ChickenHeight);
  }
}, 100);