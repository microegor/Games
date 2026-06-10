import {
  ScreenWidth,
  ScreenHeight,
  ChickenHeight,
  CarWidth,
  CarHeight,
} from "./config.js";

import { state } from "./state.js";

let screen;

export function initCars(screenElement) {
  screen = screenElement;
}

export function createCar(y, dir, speed) {
  const car = document.createElement("div");
  const road = document.createElement("div");
  const line = document.createElement("div");

  car.classList.add("car");
  road.classList.add("road");
  line.classList.add("line");

  car.style.width = CarWidth + "px";
  car.style.height = CarHeight + "px";

  road.style.width = "100%";
  road.style.height = CarHeight + 10 + "px";

  line.style.height = "5px";
  line.style.width = "100%";

  let x;

  if (dir === 1) {
    x = -CarWidth;
  } else {
    x = ScreenWidth;
  }

  const newCar = {
    element: car,
    road: road,
    line: line,
    x: x,
    y: y,
    dir: dir,
    speed: speed,
  };

  screen.appendChild(road);
  screen.appendChild(line);
  screen.appendChild(car);

  state.cars.push(newCar);

  redrawCars();
}

export function redrawCars() {
  for (let i = 0; i < state.cars.length; i++) {
    state.cars[i].element.style.left = state.cars[i].x + "px";
    state.cars[i].element.style.top = state.cars[i].y + "px";
    state.cars[i].road.style.top = state.cars[i].y - 5 + "px";
    state.cars[i].line.style.top = state.cars[i].y + 13 + "px";
  }
}

export function moveCarsX() {
  for (let i = 0; i < state.cars.length; i++) {
    const car = state.cars[i];

    if (car.dir === 1) {
      car.x += car.speed;

      if (car.x >= ScreenWidth) {
        car.x = -CarWidth;
        car.speed = getRandomCarSpeed();
      }
    } else if (car.dir === 2) {
      car.x -= car.speed;

      if (car.x <= -CarWidth) {
        car.x = ScreenWidth;
        car.speed = getRandomCarSpeed();
      }
    }
  }
}

export function moveMapYUp() {
  if (state.isMapMoving) return;

  state.isMapMoving = true;

  const targetMove = ChickenHeight * 0.7;
  let moved = 0;
  const mapSpeed = 4;

  function animate() {
    const move = Math.min(mapSpeed, targetMove - moved);

    for (let i = 0; i < state.cars.length; i++) {
      state.cars[i].y += move;
    }

    moved += move;

    redrawCars();

    if (moved < targetMove) {
      requestAnimationFrame(animate);
    } else {
      state.isMapMoving = false;
    }
  }

  requestAnimationFrame(animate);
}

export function moveMapYDown() {
  for (let i = 0; i < state.cars.length; i++) {
    state.cars[i].y -= ChickenHeight;
  }
}

export function removeCarsOutsideScreen() {
  for (let i = state.cars.length - 1; i >= 0; i--) {
    if (state.cars[i].y > ScreenHeight) {
      state.cars[i].element.remove();
      state.cars.splice(i, 1);
    }
  }
}

export function getRandomCarDirection() {
  return Math.floor(Math.random() * 2) + 1;
}

export function getRandomCarSpeed() {
  return Math.floor(Math.random() * 3) + 1;
}

export function getRandomCarDistance() {
  return Math.floor(Math.random() * 5) + 1;
}