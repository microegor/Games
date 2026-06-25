export interface Point {
    x: number;
    y: number;
}

export class Road {
    public points: Point[];
    public width: number;

    constructor(points: Point[], width: number) {
        this.points = points;
        this.width = width;
    }

    public render(screen: HTMLElement) {
        for (let i = 0; i < this.points.length - 1; i++) {
            const start = this.points[i];
            const end = this.points[i + 1];

            const roadPart = document.createElement("div");

            roadPart.classList.add("road");

            if (start.x === end.x) {
                this.renderVerticalRoadPart(roadPart, start, end);
            } else if (start.y === end.y) {
                this.renderHorizontalRoadPart(roadPart, start, end);
            } else {
                console.warn("Road supports only horizontal and vertical parts.");
                continue;
            }

            screen.appendChild(roadPart);
        }
    }

    private renderHorizontalRoadPart(
        roadPart: HTMLElement,
        start: Point,
        end: Point
    ) {
        roadPart.style.width =
            Math.abs(end.x - start.x) + this.width + "px";

        roadPart.style.height = this.width + "px";

        roadPart.style.left =
            Math.min(start.x, end.x) - this.width / 2 + "px";

        roadPart.style.top =
            start.y - this.width / 2 + "px";
    }

    private renderVerticalRoadPart(
        roadPart: HTMLElement,
        start: Point,
        end: Point
    ) {
        roadPart.style.width = this.width + "px";

        roadPart.style.height =
            Math.abs(end.y - start.y) + this.width + "px";

        roadPart.style.left =
            start.x - this.width / 2 + "px";

        roadPart.style.top =
            Math.min(start.y, end.y) - this.width / 2 + "px";
    }
}