import { getElementById } from "../../core/utils.js";
import { Mob } from "./mobs.js";
import { Road } from "./road.js";

export class Game {
    private screen: HTMLElement;
    private mobs: Mob[] = [];

    private lastTime = 0;
    private animationId = 0;
    private isRunning = false;

    private road = new Road(
        [
            { x: 0, y: 100 },
            { x: 300, y: 100 },
            { x: 300, y: 300 },
            { x: 600, y: 300 },
        ],
        80
    );

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
                width: 40,
                height: 40,
                speed: 80,
                path: this.road.points,
            })
        );

        this.addMob(
            new Mob({
                width: 30,
                height: 30,
                speed: 120,
                path: this.road.points,
            })
        );

        this.addMob(
            new Mob({
                width: 50,
                height: 50,
                speed: 60,
                path: this.road.points,
            })
        );
    }

    public start() {
        if (this.isRunning) {
            return;
        }

        this.road.render(this.screen);
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