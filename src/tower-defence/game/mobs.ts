import type { Point } from "./road.js";

interface MobConstructorParams {
    width: number;
    height: number;
    speed: number;
    hp: number;
    path: Point[];
    laneOffset?: number;
}

export class Mob {
    public element: HTMLElement;

    public x = 0;
    public y = 0;

    public hp: number;
    public maxHp: number;
    public isDead = false;

    private width: number;
    private height: number;

    private speed: number;
    private path: Point[];

    private targetIndex = 1;

    private hpBar: HTMLElement;
    private hpFill: HTMLElement;

    constructor(params: MobConstructorParams) {
        const element = document.createElement("div");
        element.classList.add("mob");

        element.style.width = params.width + "px";
        element.style.height = params.height + "px";

        this.element = element;

        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;

        this.hp = params.hp;
        this.maxHp = params.hp;

        this.hpBar = document.createElement("div");
        this.hpBar.className = "mob-hp-bar";

        this.hpFill = document.createElement("div");
        this.hpFill.className = "mob-hp-fill";

        this.hpBar.appendChild(this.hpFill);
        this.element.appendChild(this.hpBar);

        const laneOffset = params.laneOffset ?? 0;

        this.path = this.createLanePath(params.path, laneOffset);

        this.x = this.path[0].x;
        this.y = this.path[0].y;

        this.render();
    }

    public update(deltaTime: number) {
        if (this.isDead) {
            return;
        }

        if (this.targetIndex >= this.path.length) {
            return;
        }

        const target = this.path[this.targetIndex];

        const dx = target.x - this.x;
        const dy = target.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) {
            this.targetIndex++;
            return;
        }

        const moveDistance = this.speed * deltaTime;

        if (moveDistance >= distance) {
            this.x = target.x;
            this.y = target.y;
            this.targetIndex++;
        } else {
            this.x += (dx / distance) * moveDistance;
            this.y += (dy / distance) * moveDistance;
        }

        this.render();
    }

    public takeDamage(damage: number) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }

        this.updateHpBar();
    }

    private updateHpBar() {
        const percent = this.hp / this.maxHp;
        this.hpFill.style.width = `${percent * 100}%`;
    }

    private die() {
        this.isDead = true;
        this.element.remove();
    }

    private createLanePath(path: Point[], laneOffset: number): Point[] {
        if (path.length < 2 || laneOffset === 0) {
            return path.map((point) => ({ ...point }));
        }

        const offsetSegments = [];

        for (let i = 0; i < path.length - 1; i++) {
            const start = path[i];
            const end = path[i + 1];

            const dx = end.x - start.x;
            const dy = end.y - start.y;

            const length = Math.sqrt(dx * dx + dy * dy);

            const normalX = -dy / length;
            const normalY = dx / length;

            offsetSegments.push({
                start: {
                    x: start.x + normalX * laneOffset,
                    y: start.y + normalY * laneOffset,
                },
                end: {
                    x: end.x + normalX * laneOffset,
                    y: end.y + normalY * laneOffset,
                },
            });
        }

        const result: Point[] = [];

        result.push(offsetSegments[0].start);

        for (let i = 1; i < path.length - 1; i++) {
            const previous = offsetSegments[i - 1];
            const next = offsetSegments[i];

            result.push(
                this.getLinesIntersection(
                    previous.start,
                    previous.end,
                    next.start,
                    next.end
                )
            );
        }

        result.push(offsetSegments[offsetSegments.length - 1].end);

        return result;
    }

    private getLinesIntersection(
        a1: Point,
        a2: Point,
        b1: Point,
        b2: Point
    ): Point {
        const aDx = a2.x - a1.x;
        const aDy = a2.y - a1.y;

        const bDx = b2.x - b1.x;
        const bDy = b2.y - b1.y;

        const denominator = aDx * bDy - aDy * bDx;

        if (denominator === 0) {
            return {
                x: a2.x,
                y: a2.y,
            };
        }

        const t =
            ((b1.x - a1.x) * bDy - (b1.y - a1.y) * bDx) /
            denominator;

        return {
            x: a1.x + t * aDx,
            y: a1.y + t * aDy,
        };
    }

    private render() {
        this.element.style.left = this.x - this.width / 2 + "px";
        this.element.style.top = this.y - this.height / 2 + "px";
    }
}