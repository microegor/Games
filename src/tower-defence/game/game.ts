import { getElementById } from "../../core/utils.js";
import { Mob } from "./mobs.js";

export class Game {
    private screen: HTMLElement;
    private mobs: Mob[] = [];

    private lastTime = 0;
    private animationId = 0;
    private isRunning = false;

    constructor(screen: HTMLElement) {
        this.screen = screen;
    }

    private tick = (time: number) => {
        if (!this.isRunning) {
            return;
        }

        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.update(deltaTime);

        this.animationId = requestAnimationFrame(this.tick);
    };

    private update(deltaTime: number) {
        for (const mob of this.mobs) {
            mob.update(deltaTime);
        }
    }

    private addMob(mob: Mob) {
        this.mobs.push(mob);
        this.screen.appendChild(mob.element);
    }

    private createMobs() {
        this.addMob(
            new Mob({
                width: 80,
                height: 40,
                speed: 50,
                x: 0,
                y: 100,
                moveX: 0,
                moveY: 1,
            })
        );

        this.addMob(
            new Mob({
                width: 80,
                height: 40,
                speed: 150,
                x: 500,
                y: 200,
                moveX: -1,
                moveY: 0,
            })
        );

        this.addMob(
            new Mob({
                width: 80,
                height: 40,
                speed: 70,
                x: 300,
                y: 0,
                moveX: 0,
                moveY: 1,
            })
        );

        this.addMob(
            new Mob({
                width: 80,
                height: 40,
                speed: 120,
                x: 300,
                y: 400,
                moveX: 0,
                moveY: -1,
            })
        );
    }

    public start() {
        if (this.isRunning) {
            return;
        }

        this.createMobs();

        this.isRunning = true;
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(this.tick);
    }

    public stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }
}

const screen = getElementById("screen");
const game = new Game(screen);

game.start();