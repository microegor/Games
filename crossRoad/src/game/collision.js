import { state } from "./state.js";
import {
  ChickenWidth,
  ChickenHeight,
  CarWidth,
  CarHeight,
  LogWidth,
  LogHeight,
  ScreenWidth,
} from "./config.js";
import { drawChicken } from "./chicken.js";

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function isChickenCollidingWithCar(car) {
  const chicken = {
    x: state.chickenX,
    y: state.chickenY,
    width: ChickenWidth,
    height: ChickenHeight,
  };

  const carBox = {
    x: car.x,
    y: car.y,
    width: CarWidth,
    height: CarHeight,
  };

  return isColliding(chicken, carBox);
}

export function checkCollisions() {
  for (let i = 0; i < state.cars.length; i++) {
    if (isChickenCollidingWithCar(state.cars[i])) {
      state.gameOver = true;
      console.log("GAME OVER");
      return;
    }
  }
}

export function checkRiverCollisions() {
  if (state.isMapMoving) return;

  for (let i = 0; i < state.rivers.length; i++) {
    const river = state.rivers[i];

    const chickenCenterX = state.chickenX + ChickenWidth / 2;
    const chickenCenterY = state.chickenY + ChickenHeight / 2;

    const riverTop = river.y;
    const riverBottom = river.y + ChickenHeight;

    const isOnRiver =
      chickenCenterY > riverTop &&
      chickenCenterY < riverBottom;

    if (!isOnRiver) continue;

    const logLeft = river.x;
    const logRight = river.x + LogWidth;

    const isOnLog =
      chickenCenterX > logLeft &&
      chickenCenterX < logRight;

    if (isOnLog) {
      if (river.dir === 1) {
        state.chickenX += river.speed;
      } else {
        state.chickenX -= river.speed;
      }

      drawChicken();

      if (state.chickenX < 0 || state.chickenX + ChickenWidth > ScreenWidth) {
        state.gameOver = true;
        alert("Game Over! Бревно унесло тебя");
      }

      return;
    }

    state.gameOver = true;
    alert("Game Over! Ты упал в реку");
    return;
  }
}