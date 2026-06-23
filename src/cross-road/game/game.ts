import { ChickenHeight, RoadHeight } from "./config.js";
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
  setCarSize,
  getRandomCarIndex,
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

function getElement(id: string): HTMLElement {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Element with id="${id}" not found`);
  }

  return element;
}

const screen = getElement("screen");
const scoreElement = getElement("score");

const gameOverScreen = getElement("game-over-screen");
const finalScoreElement = getElement("final-score");
const restartButton = getElement("restart-button");

let gameOverShown = false;

createChicken(screen);
drawChicken();

initCars(screen);
initRivers(screen);

createCar(
  state.chickenY - 4 * ChickenHeight,
  getRandomCarDirection(),
  getRandomCarSpeed(),
  getRandomCarIndex(),
);

createRiver(
  state.chickenY - 8 * ChickenHeight,
  getRandomRiverDirection(),
  getRandomRiverSpeed()
);

restartButton.addEventListener("click", function () {
  location.reload();
});

state.lastLaneY = state.chickenY - 8 * ChickenHeight;

initControls();

function showGameOverScreen() {
  finalScoreElement.textContent = "Score: " + state.score;
  gameOverScreen.classList.add("show");
}

setInterval(function () {
  if (state.gameOver) return;

  if (state.cars.length + state.rivers.length >= 30) return;

  const isRiver = Math.random() < 0.25;

  const laneHeight = isRiver ? ChickenHeight : RoadHeight;

  const gap = getRandomCarDistance() * ChickenHeight;

  const y = state.lastLaneY - laneHeight - gap;

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
      getRandomCarSpeed(),
      getRandomCarIndex(),
    );
  }

  state.lastLaneY = y;
}, 100);

setInterval(function () {
  if (state.gameOver) {
    if (!gameOverShown) {
      showGameOverScreen();
      gameOverShown = true;
    }

    return;
  }

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