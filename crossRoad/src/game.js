const screen = document.getElementById("screen");

const ChickenWidth = 30;
const ChickenHeight = 30;

const step = 30;
const speed = 5;

const ScreenWidth = 500;
const CarWidth = 60;

let chickenX = 250;
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


function createCar(y, dir) {
  const car = document.createElement("div");
  car.classList.add("car");

  car.style.position = "absolute";
  car.style.width = "60px";
  car.style.height = "30px";

  let x;
  if (dir == 1) {
    x = -CarWidth;
  } else {
    x = ScreenWidth;
  }

  const newCar = {
    element: car,
    x: x,
    y: y,
    dir: dir,
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

function moveX() {
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].dir == 1) {
      cars[i].x += 1;
    } else if(cars[i].dir == 2){
      cars[i].x -= 1;
    }
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
createCar(chickenY - 4 * ChickenHeight, Math.floor(Math.random() * 2) + 1);

setInterval(function () {
  const lastCar = cars[cars.length - 1];
  if (cars.length < 30) {
    const dir = Math.floor(Math.random() * 2) + 1;
    const height = Math.floor(Math.random() * 5) + 2;
    createCar(lastCar.y - height * ChickenHeight, dir);
  }
}, 100);

setInterval(function () {
  moveX();
  reDraw()
},10);