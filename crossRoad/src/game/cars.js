import {
  ScreenWidth,
  ScreenHeight,
  ChickenHeight,
  RoadHeight,
  carScale,
} from "./config.js";


import { moveRiversYUp, redrawRivers } from "./rivers.js";
import { state } from "./state.js";

let screen;

export function initCars(screenElement) {
  screen = screenElement;
}

const carLib = [
  {
    img: "car_01.png",
    width: 163,
    height: 98,
  },
  {
    img: "car_02.png",
    width: 195,
    height: 87,
  },
  {
    img: "car_03.png",
    width: 253,
    height: 87,
  },
  {
    img: "car_04.png",
    width: 211,
    height: 98,
  },
  {
    img: "car_05.png",
    width: 216,
    height: 100,
  },
  {
    img: "car_06.png",
    width: 100,
    height: 65,
  },
  {
    img: "car_07.png",
    width: 110,
    height: 65,
  },
  {
    img: "car_08.png",
    width: 119,
    height: 67,
  },
  {
    img: "car_09.png",
    width: 85,
    height: 63,
  },
  {
    img: "car_10.png",
    width: 143,
    height: 75,
  },
  {
    img: "car_11.png",
    width: 80,
    height: 63,
  },
  {
    img: "car_12.png",
    width: 98,
    height: 62,
  },
  {
    img: "car_13.png",
    width: 127,
    height: 70,
  },
  {
    img: "car_14.png",
    width: 137,
    height: 75,
  },
  {
    img: "car_15.png",
    width: 94,
    height: 66,
  },
  {
    img: "car_16.png",
    width: 122,
    height: 66,
  },
];

export function createCar(y, dir, speed, index) {
  const carInfo = carLib[index];
  const carWidth = carInfo.width * carScale;
  const carHeight = carInfo.height * carScale;

  const car = document.createElement("div");
  const road = document.createElement("div");
  const line = document.createElement("div");

  car.classList.add("car");
  road.classList.add("road");
  line.classList.add("line");

  car.style.width = carWidth + "px";
  car.style.height = carHeight + "px";
  car.style.backgroundImage = `url("../crossRoad/pictures/${carInfo.img}")`;
  if (dir === 1) {
    car.style.transform = "rotate(180deg)";
  } else {
    car.style.transform = "rotate(0deg)";
  }

  road.style.width = "100%";
  road.style.height = RoadHeight + "px";

  line.style.height = "5px";
  line.style.width = "100%";

  let x;

  if (dir === 1) {
    x = -carWidth;
  } else {
    x = ScreenWidth;
  }

  const newCar = {
    element: car,
    road: road,
    line: line,
    x: x,
    index: index,

    roadY: y,

    y: y + RoadHeight / 2 - carHeight / 2,

    width: carWidth,
    height: carHeight,

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
        setCarSize(car, getRandomCarIndex());

        car.x = -car.width;
        car.speed = getRandomCarSpeed();
      }
    } else if (car.dir === 2) {
      car.x -= car.speed;

      if (car.x <= -car.width) {
        setCarSize(car, getRandomCarIndex());

        car.x = ScreenWidth;
        car.speed = getRandomCarSpeed();
      }
    }
  }

  redrawCars();
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

export function getRandomCarIndex() {
  return Math.floor(Math.random() * 16);
}

export function setCarSize(car, index) {
  const carInfo = carLib[index];

  const carWidth = carInfo.width * carScale;
  const carHeight = carInfo.height * carScale;

  car.index = index;
  car.width = carWidth;
  car.height = carHeight;

  car.element.style.width = carWidth + "px";
  car.element.style.height = carHeight + "px";
  car.element.style.backgroundImage = `url("../crossRoad/pictures/${carInfo.img}")`;

  car.y = car.roadY + RoadHeight / 2 - carHeight / 2;
}