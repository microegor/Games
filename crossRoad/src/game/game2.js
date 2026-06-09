import { ChickenHeight } from "./config.js";
import { state } from "./state.js";

import { createChicken, drawChicken } from "./chicken.js";

import {
  initCars,
  createCar,
  moveCarsX,
  redrawCars,
  removeCarsOutsideScreen,
  getRandomCarDirection,
  getRandomCarSpeed,
  getRandomCarDistance,
} from "./cars.js";

import { checkCollisions } from "./collision.js";
import { initControls } from "./controls.js";

const screen = document.getElementById("screen");

createChicken(screen);
drawChicken();

initCars(screen);

createCar(
  state.chickenY - 4 * ChickenHeight,
  getRandomCarDirection(),
  getRandomCarSpeed()
);

initControls();

setInterval(function () {
  if (state.cars.length === 0) return;

  const lastCar = state.cars[state.cars.length - 1];

  if (state.cars.length < 30) {
    const dir = getRandomCarDirection();
    const height = getRandomCarDistance();
    const speed = getRandomCarSpeed();

    createCar(lastCar.y - height * ChickenHeight, dir, speed);
  }
}, 100);

setInterval(function () {
  if (state.gameOver) return;

  moveCarsX();
  checkCollisions();
  removeCarsOutsideScreen();
  redrawCars();
}, 10);