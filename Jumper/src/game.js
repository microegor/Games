const table = document.getElementById("table");
const jumper = document.createElement("div");

let curTopPosition = 0;
let isGameOver = true;
const fallSpeed = 20;

function newJumper() {
    jumper.classList.add("jumper");

    let height = 30;
    let width = 20;

    let positionLeft = table.offsetWidth / 2 - (width / 2);
    let positionTop = table.offsetHeight - (table.offsetHeight / 4);

    jumper.style.height = height + "px";
    jumper.style.width = width + "px";
    jumper.style.left = positionLeft + "px";
    jumper.style.top = positionTop + "px";

    table.appendChild(jumper);
}

function getDown() {
    if (isGameOver) {
        curTopPosition = parseInt(jumper.style.top);
        curTopPosition += fallSpeed; 
        jumper.style.top = curTopPosition + "px";
    }
}

function jump(e){
    if (isGameOver && e.code == "Space") {
        curTopPosition = parseInt(jumper.style.top);
        curTopPosition -= 500;
        jumper.style.top = curTopPosition + "px";
    }
}

function isColliding(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

newJumper();
document.addEventListener("keyup",jump);
setInterval(getDown, 50);