const table = document.getElementById("table");
const jumper = document.createElement("div");

window.score = 0
let curTopPosition = 0;
let isGameOver = false;
let isStanding = false;
let tick = 0;
let jumpBuffer = 0;
let isFalling = false;
let lastMove = 0;
const fallSpeed = 13;
let prevBottom = 0;
let moveLeft = false;
let moveRight = false;
let fall = true;
let prevTop = 0;

const platformSpawnMin = 1000;
const platformSpawnMax = 2800;
let platforms = [];

const killZone = document.getElementById("death")
const height = table.offsetHeight - 5;
killZone.style.top = height + "px";

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
    const y = -30;

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
    newPlatform(positionLeft - width, positionTop - 150);
    newPlatform(positionLeft - width, positionTop - 350);
    newPlatform(positionLeft - width, positionTop - 550);

    isStanding = false;
    isFalling = false;
}

function getDown() {
    if (isGameOver) return;
    if (isStanding) return;

    prevBottom = jumper.offsetTop + jumper.offsetHeight;

    isFalling = true;

    curTopPosition = parseInt(jumper.style.top);
    curTopPosition += fallSpeed;
    jumper.style.top = curTopPosition + "px";
    moveDown();
}

function updateMovement() {
    let left = parseInt(jumper.style.left);

    if (moveLeft) {
        left -= 3;
        if (left < 0) left = 0;
    }

    if (moveRight) {
        left += 3;
        const max = table.offsetWidth - jumper.offsetWidth;
        if (left > max) left = max;
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

    Falling = false;
    jumper.style.top = curTopPosition + "px";
    isStanding = false;
    jumpBuffer = 0;

    prevBottom = jumper.offsetTop + jumper.offsetHeight;
}

function isColliding(jumper, platform) {
    const jLeft = jumper.offsetLeft;
    const jRight = jumper.offsetLeft + jumper.offsetWidth;
    const jBottom = jumper.offsetTop + jumper.offsetHeight;

    const pLeft = platform.offsetLeft;
    const pRight = platform.offsetLeft + platform.offsetWidth;
    const pTop = platform.offsetTop;

    const horizontalHit =
        jRight > pLeft + 2 &&
        jLeft < pRight - 2;

    const crossedFromAbove =
        prevBottom <= pTop &&
        jBottom >= pTop;

    return horizontalHit && crossedFromAbove;
}

function colisionCheck() {
    let foundPlatform = false;

    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];

        if (
            isFalling &&
            isColliding(jumper, platform)
        ) {
            foundPlatform = true;
            isStanding = true;
            isFalling = false;

            const pTop = platform.offsetTop;
            curTopPosition = pTop - jumper.offsetHeight;
            jumper.style.top = curTopPosition + "px";

            jump();
            break;
        } else if (isColliding(jumper, killZone)) {
            window.location.href = "end.html";
            localStorage.setItem("score", score);
            window.location.href = "end.html";
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
    lastMove = 4;

    for (let i = platforms.length - 1; i >= 0; i--) {
        const platform = platforms[i];

        let top = parseInt(platform.style.top);
        top += lastMove;

        platform.style.top = top + "px";

        if (top > table.offsetHeight + 500) {
            platform.remove();
            platforms.splice(i, 1);
        }
    }
}


newJumper();
startPlatformSpawn();
document.addEventListener("keydown", (e) => {
    if (e.code === "KeyA") moveLeft = true;
    if (e.code === "KeyD") moveRight = true;
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyA") moveLeft = false;
    if (e.code === "KeyD") moveRight = false;
});

setInterval(() => {
    tick++;

    const currentTop = jumper.getBoundingClientRect().top;
    const delta = currentTop - prevTop;

    if (delta > 0.5) {
        Falling = true;
        jumper.style.backgroundImage = 'url("pictures/player_jump_down.png")';
    } else if (delta < -0.5) {
        Falling = false;
        jumper.style.backgroundImage = 'url("pictures/player_jump_up.png")';
    }

    prevTop = currentTop;

    updateMovement();

    if (tick % 5 === 0) {
        getDown();
    }
    if (tick % 100 === 0) {
        score++;
    }

    colisionCheck();
}, 10);