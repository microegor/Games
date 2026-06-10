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

import {
  initRivers,
  createRiver,
  moveLogsX,
  redrawRivers,
  removeRiversOutsideScreen,
  getRandomRiverDirection,
  getRandomRiverSpeed,
} from "./rivers.js";

import { checkCollisions, checkRiverCollisions } from "./collision.js";
import { initControls } from "./controls.js";

const screen = document.getElementById("screen");
const scoreElement = document.getElementById("score");

createChicken(screen);
drawChicken();

initCars(screen);
initRivers(screen);

createCar(
  state.chickenY - 4 * ChickenHeight,
  getRandomCarDirection(),
  getRandomCarSpeed()
);

createRiver(
  state.chickenY - 8 * ChickenHeight,
  getRandomRiverDirection(),
  getRandomRiverSpeed()
);

state.lastLaneY = state.chickenY - 8 * ChickenHeight;

initControls();

setInterval(function () {
  if (state.gameOver) return;

  if (state.cars.length + state.rivers.length >= 30) return;

  const height = getRandomCarDistance();
  const y = state.lastLaneY - height * ChickenHeight;

  const isRiver = Math.random() < 0.25;

  if (isRiver) {
    createRiver(
      y,
      getRandomRiverDirection(),
      getRandomRiverSpeed()
    );
  } else {
    createCar(
      y,
      getRandomCarDirection(),
      getRandomCarSpeed()
    );
  }

  state.lastLaneY = y;
}, 100);

setInterval(function () {
  if (state.gameOver) return;

  scoreElement.textContent = "Score: " + state.score;

  moveCarsX();
  moveLogsX();

  checkCollisions();
  checkRiverCollisions();

  removeCarsOutsideScreen();
  removeRiversOutsideScreen();

  redrawCars();
  redrawRivers();
}, 10);