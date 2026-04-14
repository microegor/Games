const table = document.getElementById("table");
const jumper = document.createElement("div");

let curTopPosition = 0;
let isGameOver = false;
let isStanding = false;
let tick = 0;
let jumpBuffer = 0;
let isFalling = false;
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

function jump(e) {
    if (e.repeat) return;

    if (!isGameOver && e.code === "Space" && (isStanding || jumpBuffer > 0)) {
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
}

function isColliding(jumper, platform) {
    const jLeft = jumper.offsetLeft;
    const jRight = jumper.offsetLeft + jumper.offsetWidth;
    const jBottom = jumper.offsetTop + jumper.offsetHeight;

    const pLeft = platform.offsetLeft;
    const pRight = platform.offsetLeft + platform.offsetWidth;
    const pTop = platform.offsetTop;

    return (
        jRight > pLeft &&
        jLeft < pRight &&
        jBottom >= pTop &&
        jBottom <= pTop + fallSpeed
    );
}

function colisionCheck() {
    let foundPlatform = false;

    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];

        const jBottom = jumper.offsetTop + jumper.offsetHeight;
        const pTop = platform.offsetTop;

        // 👇 добавили проверку падения сверху
        if (
            isFalling &&
            isColliding(jumper, platform) &&
            jBottom >= pTop &&
            jBottom <= pTop + fallSpeed
        ) {
            foundPlatform = true;
            isStanding = true;
            isFalling = false;
            jumpBuffer = 3;

            const newTop = pTop - jumper.offsetHeight;

            if (parseInt(jumper.style.top) !== newTop) {
                jumper.style.transition = "left 0.5s ease";
                curTopPosition = newTop;
                jumper.style.top = curTopPosition + "px";
                jumper.offsetHeight;

                setTimeout(() => {
                    jumper.style.transition = "top 0.5s ease, left 0.5s ease";
                }, 0);
            }

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
    for (let i = platforms.length - 1; i >= 0; i--) {
        const platform = platforms[i];

        let top = parseInt(platform.style.top);
        top += 15;

        platform.style.top = top + "px";
        const delitTop = table.offsetHeight + 500;
        // удалить платформу если ушла вниз
        if (top > delitTop) {
            platform.remove();
            platforms.splice(i, 1);
        }
    }
}


newJumper();
startPlatformSpawn();
document.addEventListener("keydown", jump);
document.addEventListener("keydown", moveSide);
setInterval(() => {
    tick++;

    if (tick % 5 === 0) {
        getDown();
    }
    
    colisionCheck();
}, 10);