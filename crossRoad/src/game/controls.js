import { step } from "./config.js";
import { state } from "./state.js";

import { moveToTarget } from "./chicken.js";
import { moveMapYUp, moveMapYDown, redrawCars } from "./cars.js";

export function initControls() {
  document.addEventListener("keydown", function (event) {
    if (event.repeat) return;

    if (state.gameOver) return;

    if (event.key === "ArrowRight") {
      if (state.isMoving) return;

      state.targetX = state.chickenX + step;
      state.isMoving = true;
      moveToTarget();
    }

    if (event.key === "ArrowLeft") {
      if (state.isMoving) return;

      state.targetX = state.chickenX - step;
      state.isMoving = true;
      moveToTarget();
    }

    if (event.key === "ArrowUp") {
      moveMapYUp();
      redrawCars();
      state.score++;
    }
  });
}