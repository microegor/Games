import { mobs, screen } from "./objects.js";
import type { Mob } from "./objects.js";

export function createMob(
    width: number,
    height: number,
    speed: number,
    x: number,
    y: number,
    moveX: number,
    moveY: number
) {
    const nMob = document.createElement("div");

    nMob.classList.add("mob");

    nMob.style.position = "absolute";
    nMob.style.width = width + "px";
    nMob.style.height = height + "px";
    nMob.style.left = x + "px";
    nMob.style.top = y + "px";

    const mob: Mob = {
        element: nMob,
        speed,
        width,
        height,
        left: x,
        top: y,
        moveX,
        moveY,
    };

    mobs.push(mob);
    screen.appendChild(nMob);
}

let lastTime = 0;

export function moveMobs(time: number = 0) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    for (const mob of mobs) {
        mob.left += mob.moveX * mob.speed * deltaTime;
        mob.top += mob.moveY * mob.speed * deltaTime;

        mob.element.style.left = mob.left + "px";
        mob.element.style.top = mob.top + "px";
    }

    requestAnimationFrame(moveMobs);
}