import {
  ScreenWidth,
  ScreenHeight,
  ChickenHeight,
  LogWidth,
  LogHeight,
} from "./config.js";

import { state } from "./state.js";

let screen: HTMLElement;

export function initRivers(screenElement: HTMLElement): void {
  screen = screenElement;
}

export interface  River {
 river: HTMLDivElement;
 log: HTMLDivElement;
 x: number;
 y: number;
 dir: number;
 speed: number;
}

export function createRiver(y: number, dir: number, speed: number): void {
  const river = document.createElement("div");
  const log = document.createElement("div");

  river.classList.add("river");
  log.classList.add("log");

  river.style.width = "100%";
  river.style.height = ChickenHeight + "px";

  log.style.width = LogWidth + "px";
  log.style.height = LogHeight + "px";
  const random = Math.floor(Math.random() * 10);
  if (random < 8) {
    log.style.backgroundImage = `url("../cross-road/pictures/tree.png")`;
  } else {
    log.style.backgroundImage = `url("../cross-road/pictures/crocodile.png")`;
  }

  let x;

  if (dir === 1) {
    x = -LogWidth;
  } else {
    x = ScreenWidth;
  }
  if (dir === 1) {
    log.style.transform = "rotate(180deg)";
  } else {
    log.style.transform = "rotate(0deg)";
  }

  
  const newRiver: River = {
    river: river,
    log: log,
    x: x,
    y: y,
    dir: dir,
    speed: speed,
  };

  screen.appendChild(river);
  screen.appendChild(log);

  state.rivers.push(newRiver);

  redrawRivers();
}

export function redrawRivers() {
  for (let i = 0; i < state.rivers.length; i++) {
    const river = state.rivers[i];

    river.river.style.left = "0px";
    river.river.style.top = river.y + "px";

    river.log.style.left = river.x + "px";
    river.log.style.top = river.y + ChickenHeight / 2 - LogHeight / 2 + "px";
  }
}

export function moveLogsX() {
  for (let i = 0; i < state.rivers.length; i++) {
    const river = state.rivers[i];
    const log = river.log;

    if (river.dir === 1) {
      river.x += river.speed;

      if (river.x >= ScreenWidth) {
        river.x = -LogWidth;
        river.speed = getRandomRiverSpeed();
        const random = Math.floor(Math.random() * 10);
        if (random < 8) {
          log.style.backgroundImage = `url("../cross-road/pictures/tree.png")`;
        } else {
          log.style.backgroundImage = `url("../cross-road/pictures/crocodile.png")`;
        }
      }
    } else {
      river.x -= river.speed;

      if (river.x <= -LogWidth) {
        river.x = ScreenWidth;
        river.speed = getRandomRiverSpeed();
        const random = Math.floor(Math.random() * 10);
        if (random < 8) {
          log.style.backgroundImage = `url("../cross-road/pictures/tree.png")`;
        } else {
          log.style.backgroundImage = `url("../cross-road/pictures/crocodile.png")`;
        }
      }
    }
  }
}

export function moveRiversYUp(amount: number): void {
  for (let i = 0; i < state.rivers.length; i++) {
    state.rivers[i].y += amount;
  }
}

export function removeRiversOutsideScreen() {
  for (let i = state.rivers.length - 1; i >= 0; i--) {
    if (state.rivers[i].y > ScreenHeight) {
      state.rivers[i].river.remove();
      state.rivers[i].log.remove();
      state.rivers.splice(i, 1);
    }
  }
}

export function getRandomRiverDirection() {
  return Math.floor(Math.random() * 2) + 1;
}

export function getRandomRiverSpeed() {
  return Math.floor(Math.random() * 2) + 1;
}