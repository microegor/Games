import { Mob } from "./mobs.js";

export interface TowerOptions {
    x: number;
    y: number;
    size: number;
    range?: number;
    damage?: number;
    fireRate?: number;
}

export class Tower {
    public element: HTMLElement;

    public x: number;
    public y: number;

    public size: number;
    public range: number;
    public damage: number;
    public fireRate: number;

    private attackTimer = 0;
    private rangeElement: HTMLElement;

    constructor(options: TowerOptions) {
        this.x = options.x;
        this.y = options.y;

        this.size = options.size;
        this.range = options.range ?? 150;
        this.damage = options.damage ?? 10;
        this.fireRate = options.fireRate ?? 1;

        this.element = document.createElement("div");
        this.element.className = "tower";

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;

        this.rangeElement = document.createElement("div");
        this.rangeElement.className = "tower-range";

        this.rangeElement.style.width = `${this.range * 2}px`;
        this.rangeElement.style.height = `${this.range * 2}px`;

        this.element.appendChild(this.rangeElement);
    }

    public update(deltaTime: number, mobs: Mob[]) {
        this.attackTimer += deltaTime;

        const target = this.findTarget(mobs);

        if (!target) {
            return;
        }

        if (this.attackTimer >= this.fireRate) {
            this.attackTimer = 0;
            this.attack(target);
        }
    }

    private findTarget(mobs: Mob[]) {
        for (const mob of mobs) {
            const distance = this.getDistanceToMob(mob);

            if (distance <= this.range) {
                return mob;
            }
        }

        return null;
    }

    private getDistanceToMob(mob: Mob) {
        const dx = this.x - mob.x;
        const dy = this.y - mob.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    private attack(mob: Mob) {
        mob.takeDamage(this.damage);

        console.log("Tower attacks mob. Mob HP:", mob.hp);
    }

    public getDistanceTo(x: number, y: number) {
        const dx = this.x - x;
        const dy = this.y - y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    public remove() {
        this.element.remove();
    }
}