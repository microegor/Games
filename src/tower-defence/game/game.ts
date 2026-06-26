import { getElementById } from "../../core/utils.js";
import { Mob } from "./mobs.js";
import { Road } from "./road.js";

export class Game {
    private screen: HTMLElement;
    private mobs: Mob[] = [];

    private waveIndex = 0;
    private mobsInWave = 0;
    private spawnedInWave = 0;

    private spawnTimer = 0;
    private timeBetweenMobs = 1;
    private timeBetweenWaves = 12;

    private isWaitingNextWave = false;

    private lastTime = 0;
    private animationId = 0;
    private isRunning = false;

    private road = new Road(
        [
            { x: 0, y: 100 },
            { x: 250, y: 100 },
            { x: 250, y: 250 },
            { x: 500, y: 250 },
            { x: 500, y: 120 },
            { x: 750, y: 120 },
            { x: 750, y: 350 },
            { x: 1000, y: 350 },
            { x: 1000, y: 200 },
            { x: 1150, y: 200 },
            { x: 1150, y: 500 },
            { x: 1000, y: 500 },
            { x: 1000, y: 700 },
            { x: 800, y: 700 },
            { x: 800, y: 500 },
            { x: 0, y: 500 },
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
        this.updateSpawner(deltaTime);

        for (const mob of this.mobs) {
            mob.update(deltaTime);
        }
    }

    private addMob(mob: Mob) {
        this.mobs.push(mob);
        this.screen.appendChild(mob.element);
    }

    private createMob() {
        const mobTypes = [
            {
                width: 40,
                height: 40,
                speed: 70,
            },
            {
                width: 30,
                height: 30,
                speed: 90,
            },
            {
                width: 50,
                height: 50,
                speed: 50,
            },
        ];

        const randomType =
            mobTypes[Math.floor(Math.random() * mobTypes.length)];

        const lanes = [-18, -9, 0, 9, 18];
        const randomLane = lanes[Math.floor(Math.random() * lanes.length)];

        this.addMob(
            new Mob({
                width: randomType.width,
                height: randomType.height,
                speed: randomType.speed,
                path: this.road.points,
                laneOffset: randomLane,
            })
        );
    }

    private startNextWave() {
        this.waveIndex++;

        this.mobsInWave = 1 + this.waveIndex * 2;
        this.spawnedInWave = 0;

        this.spawnTimer = 0;
        this.isWaitingNextWave = false;

        console.log("Wave:", this.waveIndex);
    }

    private updateSpawner(deltaTime: number) {
        this.spawnTimer += deltaTime;

        if (this.isWaitingNextWave) {
            if (this.spawnTimer >= this.timeBetweenWaves) {
                this.startNextWave();
            }

            return;
        }

        if (this.spawnedInWave >= this.mobsInWave) {
            this.isWaitingNextWave = true;
            this.spawnTimer = 0;
            return;
        }

        if (this.spawnTimer >= this.timeBetweenMobs) {
            this.createMob();
            this.spawnedInWave++;
            this.spawnTimer = 0;
        }
    }

    public start() {
        if (this.isRunning) {
            return;
        }

        this.road.render(this.screen);

        this.startNextWave();

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