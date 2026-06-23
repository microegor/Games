import { ChickenWidth, ChickenHeight, speed } from "./config.js";
import { state } from "./state.js";
export let chickenElement: HTMLElement;

export function createChicken(screen: HTMLElement) {
  chickenElement = document.createElement("div");
  chickenElement.classList.add("chicken");

  chickenElement.style.position = "absolute";
  chickenElement.style.width = ChickenWidth + "px";
  chickenElement.style.height = ChickenHeight + "px";
  chickenElement.style.backgroundImage = `url("../cross-road/pictures/chicken.png")`;

  screen.appendChild(chickenElement);
}

export function drawChicken() {
  chickenElement.style.left = state.chickenX + "px";
  chickenElement.style.top = state.chickenY + "px";
}

export function moveToTarget() {
  if (!state.isMoving) return;

  if (state.chickenX < state.targetX) {
    chickenElement.style.transform = "rotate(90deg)"

    state.chickenX += speed;
  }

  if (state.chickenX > state.targetX) {
    chickenElement.style.transform = "rotate(270deg)"

    state.chickenX -= speed;
  }

  if (Math.abs(state.chickenX - state.targetX) < speed) {
    state.chickenX = state.targetX;
  }

  drawChicken();

  if (state.chickenX === state.targetX) {
    state.isMoving = false;
    return;
  }

  requestAnimationFrame(moveToTarget);
}