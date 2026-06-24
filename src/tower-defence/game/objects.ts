import { getElementById } from "../../core/utils.js";

export interface Mob {
    element: HTMLElement;
    speed: number;
    width: number;
    height: number;
    left: number;
    top: number;
    moveX: number;
    moveY: number;
}

export const screen = getElementById("screen");

export let mobs: Mob[] = [];