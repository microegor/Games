const table = document.getElementById("table");
const jumper = document.createElement("div");

let curTopPosition = 0;
let isGameOver = false;
let isStanding = false;
let tick = 0;
let jumpBuffer = 0;
let isFalling = false;
let lastMove = 0;
const fallSpeed = 20;


const platformSpawnMin = 800;
const platformSpawnMax = 1500;
let platforms = [];

function newPlatform(x, y) {
    const platform = document.createElement("div");
    platform.classList.add("platform");

    platform.style.left = x + "px";
    platform.style.top = y + "px";

    table.appendChild(platform);
    platforms.push(platform);
}

function spawnPlatformAtTop() {
    const maxX = table.offsetWidth - 60;
    const x = Math.floor(Math.random() * (maxX + 1));
    const y = 0;

    newPlatform(x, y);
}

function getRandomSpawnDelay() {
    return Math.floor(
        Math.random() * (platformSpawnMax - platformSpawnMin + 1)
    ) + platformSpawnMin;
}

function startPlatformSpawn() {
    function spawnLoop() {
        if (isGameOver) return;

        spawnPlatformAtTop();

        const nextDelay = getRandomSpawnDelay();
        setTimeout(spawnLoop, nextDelay);
    }

    spawnLoop();
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
    newPlatform(positionLeft - 100, positionTop - 250);
}

function getDown() {
    if (isGameOver) return;
    if (isStanding) return;

    isFalling = true;
    curTopPosition = parseInt(jumper.style.top);
    curTopPosition += fallSpeed;
    jumper.style.top = curTopPosition + "px";
    moveDown();
}

function moveSide(e) {
    if (e.repeat) return;
    let left = parseInt(jumper.style.left);

    if (e.code === "KeyA") {
        if (left > 0) {
            left -= 20;
        } else {
            left = 0;
        }
    } else if (e.code === "KeyD") {
        if (left < table.offsetWidth - jumper.offsetWidth) {
            left += 20;
        } else {
            left = table.offsetWidth - jumper.offsetWidth;
        }
    }

    jumper.style.left = left + "px";
}

function jump() {
    isFalling = false;

    curTopPosition = parseInt(jumper.style.top);
    curTopPosition -= 500;

    if (curTopPosition < 0) {
        curTopPosition = 0;
    }

    jumper.style.top = curTopPosition + "px";
    isStanding = false;
    jumpBuffer = 0;
}

function isColliding(jumper, platform) {
    const jLeft = jumper.offsetLeft;
    const jRight = jumper.offsetLeft + jumper.offsetWidth;
    const jBottom = jumper.offsetTop + jumper.offsetHeight;

    const pLeft = platform.offsetLeft;
    const pRight = platform.offsetLeft + platform.offsetWidth;
    const pTop = platform.offsetTop;

    const collision = (
        jRight > pLeft &&
        jLeft < pRight &&
        jBottom >= pTop &&
        jBottom <= pTop + 5
    );

    if (collision) {
        for (let i = 0; i < platforms.length; i++) {
            let top = parseInt(platforms[i].style.top);
            top -= lastMove;
            platforms[i].style.top = top + "px";
        }
    }

    return collision;
}

function colisionCheck() {
    let foundPlatform = false;

    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];

        const jBottom = jumper.offsetTop + jumper.offsetHeight;
        const pTop = platform.offsetTop;

        if (
            isFalling &&
            isColliding(jumper, platform) &&
            jBottom >= pTop &&
            jBottom <= pTop + fallSpeed
        ) {
            foundPlatform = true;
            isStanding = true;
            isFalling = false;

            const newTop = pTop - jumper.offsetHeight;
            curTopPosition = newTop;
            jumper.style.top = curTopPosition + "px";

            jump(); // прыжок ПОСЛЕ фиксации на платформе

            break;
        }
    }

    if (!foundPlatform) {
        isStanding = false;

        if (jumpBuffer > 0) {
            jumpBuffer--;
        }
    }
}

function moveDown() {
    lastMove = fallSpeed - 10;

    for (let i = platforms.length - 1; i >= 0; i--) {
        const platform = platforms[i];

        let top = parseInt(platform.style.top);
        top += lastMove;

        platform.style.top = top + "px";

        if (top > table.offsetHeight) {
            platform.remove();
            platforms.splice(i, 1);
        }
    }
}


newJumper();
startPlatformSpawn();
document.addEventListener("keydown", moveSide);

setInterval(() => {
    tick++;

    if (tick % 5 === 0) {
        getDown();
    }

    colisionCheck();
}, 10);