import {
  ScreenWidth,
  ScreenHeight,
  ChickenHeight,
  CarWidth,
  CarHeight,
  RoadHeight,
} from "./config.js";

import { moveRiversYUp, redrawRivers } from "./rivers.js";
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
  road.style.height = RoadHeight + "px";

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

    roadY: y,

    y: y + RoadHeight / 2 - CarHeight / 2,

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
    const car = state.cars[i];

    car.element.style.left = car.x + "px";
    car.element.style.top = car.y + "px";

    car.road.style.left = "0px";
    car.road.style.top = car.roadY + "px";

    car.line.style.left = "0px";
    car.line.style.top = car.roadY + RoadHeight / 2 - 2.5 + "px";
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
      state.cars[i].roadY += move;
    }

    moveRiversYUp(move);

    state.lastLaneY += move;
    moved += move;

    redrawCars();
    redrawRivers();

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
    state.cars[i].roadY -= ChickenHeight;
  }
}

export function removeCarsOutsideScreen() {
  for (let i = state.cars.length - 1; i >= 0; i--) {
    const car = state.cars[i];

    if (car.roadY > ScreenHeight) {
      car.element.remove();
      car.road.remove();
      car.line.remove();

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