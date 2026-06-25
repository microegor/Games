import type { Point } from "./road.js";

interface MobConstructorParams {
    width: number;
    height: number;
    speed: number;
    path: Point[];
}

export class Mob {
    public element: HTMLElement;

    private x: number;
    private y: number;

    private width: number;
    private height: number;

    private speed: number;
    private path: Point[];

    private targetIndex = 1;

    constructor(params: MobConstructorParams) {
        const element = document.createElement("div");

        element.classList.add("mob");

        element.style.width = params.width + "px";
        element.style.height = params.height + "px";

        this.element = element;

        this.width = params.width;
        this.height = params.height;
        this.speed = params.speed;
        this.path = params.path;

        this.x = params.path[0].x;
        this.y = params.path[0].y;

        this.render();
    }

    public update(deltaTime: number) {
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

    private render() {
        this.element.style.left = this.x - this.width / 2 + "px";
        this.element.style.top = this.y - this.height / 2 + "px";
    }
}