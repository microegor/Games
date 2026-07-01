import { getElementById } from "../../core/utils.js";
import { Mob } from "./mobs.js";
import { Road } from "./road.js";
import { Tower } from "./tower.js";

export class Game {
    private screen: HTMLElement;
    private mobs: Mob[] = [];

    private isPlacingTower = false;
    private towers: Tower[] = [];

    private playerHp = 20;
    private hpElement: HTMLElement;

    private mouseX = 0;
    private mouseY = 0;
    private towerPreview: HTMLElement | null = null;

    private towerSize = 50;
    private minDistanceBetweenTowers = 60;

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
            { x: -20, y: 500 },
        ],
        80
    );

    constructor(screen: HTMLElement) {
        this.screen = screen;

        this.hpElement = document.createElement("div");
        this.hpElement.className = "player-hp";
        this.hpElement.textContent = `HP: ${this.playerHp}`;

        this.screen.appendChild(this.hpElement);
    }

    private takeDamage(damage: number) {
        this.playerHp -= damage;

        if (this.playerHp < 0) {
            this.playerHp = 0;
        }

        this.hpElement.textContent = `HP: ${this.playerHp}`;

        if (this.playerHp <= 0) {
            console.log("Game over");
            this.stop();
        }
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

        for (const tower of this.towers) {
            tower.update(deltaTime, this.mobs);
        }

        this.mobs = this.mobs.filter((mob) => {
            if (mob.isDead) {
                mob.element.remove();
                return false;
            }

            if (mob.hasReachedEnd) {
                this.takeDamage(1);
                mob.element.remove();
                return false;
            }

            return true;
        });
    }

    private enableTowerPlacement() {
        const buildButton = getElementById("build-tower");

        buildButton.addEventListener("click", () => {
            this.isPlacingTower = true;
            buildButton.classList.add("active");

            this.createTowerPreview();

            console.log("Выбери место для башни");
        });

        this.screen.addEventListener("mousemove", (event) => {
            if (!this.isPlacingTower || !this.towerPreview) {
                return;
            }

            const rect = this.screen.getBoundingClientRect();

            this.mouseX = event.clientX - rect.left;
            this.mouseY = event.clientY - rect.top;

            this.towerPreview.style.left = `${this.mouseX}px`;
            this.towerPreview.style.top = `${this.mouseY}px`;

            if (this.canPlaceTower(this.mouseX, this.mouseY)) {
                this.towerPreview.classList.remove("blocked");
            } else {
                this.towerPreview.classList.add("blocked");
            }
        });

        this.screen.addEventListener("click", () => {
            if (!this.isPlacingTower) {
                return;
            }

            if (!this.canPlaceTower(this.mouseX, this.mouseY)) {
                console.log("Сюда нельзя поставить башню");
                return;
            }

            this.placeTower(this.mouseX, this.mouseY);

            this.removeTowerPreview();

            this.isPlacingTower = false;
            buildButton.classList.remove("active");
        });
    }

    private createTowerPreview() {
        this.removeTowerPreview();

        this.towerPreview = document.createElement("div");
        this.towerPreview.className = "tower tower-preview";

        this.screen.appendChild(this.towerPreview);
    }

    private removeTowerPreview() {
        if (!this.towerPreview) {
            return;
        }

        this.towerPreview.remove();
        this.towerPreview = null;
    }

    private placeTower(x: number, y: number) {
        const tower = new Tower({
            x,
            y,
            size: this.towerSize,
            range: 150,
            damage: 10,
            fireRate: 1,
        });

        this.towers.push(tower);
        this.screen.appendChild(tower.element);
    }

    private canPlaceTower(x: number, y: number) {
        if (this.isOutsideScreen(x, y)) {
            return false;
        }

        if (this.isPointOnRoad(x, y)) {
            return false;
        }

        if (this.isPointOnTower(x, y)) {
            return false;
        }

        return true;
    }

    private isOutsideScreen(x: number, y: number) {
        const towerRadius = this.towerSize / 2;

        return (
            x - towerRadius < 0 ||
            y - towerRadius < 0 ||
            x + towerRadius > this.screen.clientWidth ||
            y + towerRadius > this.screen.clientHeight
        );
    }

    private isPointOnTower(x: number, y: number) {
        for (const tower of this.towers) {
            const distance = tower.getDistanceTo(x, y);

            if (distance < this.minDistanceBetweenTowers) {
                return true;
            }
        }

        return false;
    }

    private isPointOnRoad(x: number, y: number) {
        const roadRadius = this.road.width / 2;
        const towerRadius = this.towerSize / 2;

        const minDistanceToRoad = roadRadius + towerRadius;

        const points = this.road.points;

        for (let i = 0; i < points.length - 1; i++) {
            const start = points[i];
            const end = points[i + 1];

            const distance = this.distanceToSegment(
                x,
                y,
                start.x,
                start.y,
                end.x,
                end.y
            );

            if (distance < minDistanceToRoad) {
                return true;
            }
        }

        return false;
    }

    private distanceToSegment(
        px: number,
        py: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) {
        const dx = x2 - x1;
        const dy = y2 - y1;

        if (dx === 0 && dy === 0) {
            return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
        }

        const t = Math.max(
            0,
            Math.min(
                1,
                ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)
            )
        );

        const closestX = x1 + t * dx;
        const closestY = y1 + t * dy;

        return Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
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
                hp: 50,
            },
            {
                width: 30,
                height: 30,
                speed: 90,
                hp: 30,
            },
            {
                width: 50,
                height: 50,
                speed: 50,
                hp: 100,
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
                hp: randomType.hp,
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

        this.enableTowerPlacement();

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