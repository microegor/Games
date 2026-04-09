//Bird stats
const bird = {
    top: 400,
    el: document.getElementById("bird"),
};

//Pipe stats
const pipeWidth = 60;
const pipeGap = 170;
const pipes = [];
const pipeSpeed = 1;

const pipeCapWidth = 90;
const pipeCapHeight = 30;

const table = document.getElementById("table");

const maxTop = table.offsetHeight - bird.el.offsetHeight;
let angle = 0;

const change = 0;

let isGameOver = true;

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

function jump(e) {
    if (isGameOver && e.code == "Space") {
        bird.top -= 200;
        bird.el.style.transform = `rotate(${angle}deg)`
        angle -= 100
        if (angle < -85) {
            angle = -85
        }
        render();
    }
}

function createPipe() {
    if (!isGameOver) return;

    const minHeight = 200;
    const maxHeight = table.offsetHeight - pipeGap - 200;

    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    const bottomHeight = table.offsetHeight - topHeight - pipeGap;

    const pipeLeft = table.offsetWidth;
    const capLeft = pipeLeft - (pipeCapWidth - pipeWidth) / 2;

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe", "top-pipe");
    topPipe.style.width = pipeWidth + "px";
    topPipe.style.height = topHeight + "px";
    topPipe.style.left = pipeLeft + "px";
    topPipe.style.top = "0px";

    const topCap = document.createElement("div");
    topCap.classList.add("pipe-cap", "top-cap");
    topCap.style.width = pipeCapWidth + "px";
    topCap.style.height = pipeCapHeight + "px";
    topCap.style.left = capLeft + "px";
    topCap.style.top = (topHeight - pipeCapHeight) + "px";

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe", "bottom-pipe");
    bottomPipe.style.width = pipeWidth + "px";
    bottomPipe.style.height = bottomHeight + "px";
    bottomPipe.style.left = pipeLeft + "px";
    bottomPipe.style.bottom = "0px";

    const bottomCap = document.createElement("div");
    bottomCap.classList.add("pipe-cap", "bottom-cap");
    bottomCap.style.width = pipeCapWidth + "px";
    bottomCap.style.height = pipeCapHeight + "px";
    bottomCap.style.left = capLeft + "px";
    bottomCap.style.bottom = (bottomHeight - pipeCapHeight) + "px";

    table.appendChild(topPipe);
    table.appendChild(topCap);
    table.appendChild(bottomPipe);
    table.appendChild(bottomCap);

    pipes.push({
        left: pipeLeft,
        topHeight,
        bottomHeight,
        topEl: topPipe,
        topCapEl: topCap,
        bottomEl: bottomPipe,
        bottomCapEl: bottomCap,
    });
}

function render() {
    bird.el.style.top = bird.top + "px";
}

function getDown() {
    bird.el.style.transform = `rotate(${angle}deg)`;
    if (bird.top < maxTop) {
        bird.top += 20;
        if (angle < 75) {
            angle += 9
            bird.el.style.transform = `rotate(${angle}deg)`;
        }
    } else {
        bird.top = maxTop;
        isGameOver = false;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        if (
            isColliding(bird.el, pipes[i].bottomEl) ||
            isColliding(bird.el, pipes[i].topEl) ||
            isColliding(bird.el, pipes[i].topCapEl) ||
            isColliding(bird.el, pipes[i].bottomCapEl)
        ) {
            isGameOver = false;
        }
    }

    render();
}

function pipeMove() {
    if (!isGameOver) return;

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].left -= pipeSpeed;

        const capLeft = pipes[i].left - (pipeCapWidth - pipeWidth) / 2;

        pipes[i].topEl.style.left = pipes[i].left + "px";
        pipes[i].bottomEl.style.left = pipes[i].left + "px";
        pipes[i].topCapEl.style.left = capLeft + "px";
        pipes[i].bottomCapEl.style.left = capLeft + "px";
    }
}

setInterval(getDown, 50)
setInterval(createPipe, 1500);
setInterval(pipeMove, 1);

render();

document.addEventListener("keyup", jump)