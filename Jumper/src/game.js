const table = document.getElementById("table");
const jumper = document.createElement("div");

let curTopPosition = 0;
let isGameOver = false;
let isStanding = false;
const fallSpeed = 20;

let platforms = [];

function newPlatform(x, y) {
    const platform = document.createElement("div");
    platform.classList.add("platform");

    platform.style.left = x + "px";
    platform.style.top = y + "px";

    table.appendChild(platform);
    platforms.push(platform);
}

function newJumper() {
    jumper.classList.add("jumper");

    let height = 30;
    let width = 20;

    let positionLeft = table.offsetWidth / 2 - width / 2;
    let positionTop = table.offsetHeight - table.offsetHeight / 4;

    jumper.style.height = height + "px";
    jumper.style.width = width + "px";
    jumper.style.left = positionLeft + "px";
    jumper.style.top = positionTop + "px";

    table.appendChild(jumper);

    newPlatform(positionLeft - width, positionTop + height);
}

function getDown() {
    if (isGameOver) return;

    if(isStanding == false){
        curTopPosition = parseInt(jumper.style.top);
        curTopPosition += fallSpeed;
        jumper.style.top = curTopPosition + "px";
    }

    for (let i = 0; i < platforms.length; i++) {
        if (isColliding(jumper, platforms[i])) {
            isStanding = true;
            jumper.style.transition = "none";
            curTopPosition = platforms[i].offsetTop - jumper.offsetHeight;
            jumper.style.top = curTopPosition + "px";
            jumper.offsetHeight;
            jumper.style.transition = "top 0.5s ease";
            break;
        }
    }
}

function jump(e) {
    if (!isGameOver && e.code === "Space" && isStanding) {
        curTopPosition = parseInt(jumper.style.top);
        curTopPosition -= 500;

        if (curTopPosition < 0) {
            curTopPosition = 0;
        }

        jumper.style.top = curTopPosition + "px";
        isStanding = false;
    }
}

function isColliding(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    return !(
        rect1.right <= rect2.left ||
        rect1.left >= rect2.right ||
        rect1.bottom <= rect2.top ||
        rect1.top >= rect2.bottom
    );
}

function colisionCheck(){
    for (let i = 0; i < platforms.length; i++) {
        if (isColliding(jumper, platforms[i])) {
            isStanding = true;
            jumper.style.transition = "none";
            curTopPosition = platforms[i].offsetTop - jumper.offsetHeight;
            jumper.style.top = curTopPosition + "px";
            jumper.offsetHeight;
            jumper.style.transition = "top 0.5s ease";
            break;
        }
    }
}

newJumper();
document.addEventListener("keydown", jump);
setInterval(getDown, 50);
setInterval(colisionCheck, 1);