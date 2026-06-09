import {
  ChickenWidth,
  ChickenHeight,
  CarWidth,
  CarHeight,
} from "./config.js";

import { state } from "./state.js";

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