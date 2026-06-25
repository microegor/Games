interface MobConstructorParams {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    moveX: number;
    moveY: number;
}

export class Mob {
    public element: HTMLElement;

    private x: number;
    private y: number;

    private width: number;
    private height: number;

    private speed: number;
    private moveX: number;
    private moveY: number;

    constructor(params: MobConstructorParams) {
        const element = document.createElement("div");

        element.classList.add("mob");

        element.style.position = "absolute";
        element.style.width = params.width + "px";
        element.style.height = params.height + "px";
        element.style.left = params.x + "px";
        element.style.top = params.y + "px";

        this.element = element;

        this.x = params.x;
        this.y = params.y;

        this.width = params.width;
        this.height = params.height;

        this.speed = params.speed;
        this.moveX = params.moveX;
        this.moveY = params.moveY;
    }

    public update(deltaTime: number) {
        this.x += this.moveX * this.speed * deltaTime;
        this.y += this.moveY * this.speed * deltaTime;

        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}