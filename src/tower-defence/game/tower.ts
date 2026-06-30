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
    }

    public update(deltaTime: number) {
        this.attackTimer += deltaTime;

        if (this.attackTimer >= this.fireRate) {
            this.attackTimer = 0;

            // Здесь позже можно будет добавить атаку по мобам
            console.log("Tower attacks");
        }
    }

    public isPointInside(x: number, y: number) {
        const dx = this.x - x;
        const dy = this.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < this.size / 2;
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