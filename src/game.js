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

const table = document.getElementById("table");

const maxTop = table.offsetHeight - bird.el.offsetHeight;

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
        render();
    }
}

function createPipe() {
    if (!isGameOver) return;

    const minHeight = 200;
    const maxHeight = table.offsetHeight - pipeGap - 200;

    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    const bottomHeight = table.offsetHeight - topHeight - pipeGap;

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe", "top-pipe");
    topPipe.style.width = pipeWidth + "px";
    topPipe.style.height = topHeight + "px";
    topPipe.style.left = table.offsetWidth + "px";
    topPipe.style.top = "0px";

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe", "bottom-pipe");
    bottomPipe.style.width = pipeWidth + "px";
    bottomPipe.style.height = bottomHeight + "px";
    bottomPipe.style.left = table.offsetWidth + "px";
    bottomPipe.style.bottom = "0px";

    table.appendChild(topPipe);
    table.appendChild(bottomPipe);

    pipes.push({
        left: table.offsetWidth,
        topHeight,
        bottomHeight,
        topEl: topPipe,
        bottomEl: bottomPipe,
    });
}

function render() {
    bird.el.style.top = bird.top + "px";
}

function getDown() {
    if (bird.top < maxTop) {
        bird.top += 20;
    } else {
        bird.top = maxTop;
        isGameOver = false;
    }
    for (let i = pipes.length - 1; i >= 0; i--)
        {
            if(isColliding(bird.el,pipes[i].bottomEl)||isColliding(bird.el,pipes[i].topEl))
                {
                    isGameOver = false;
                }

        }
    render();
}

function pipeMove() {
        if (!isGameOver) return;

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].left -= pipeSpeed;

            pipes[i].topEl.style.left = pipes[i].left + "px";
            pipes[i].bottomEl.style.left = pipes[i].left + "px";
        }
    }


setInterval(getDown, 50)
setInterval(createPipe, 1000);
setInterval(pipeMove, 1);

render();

document.addEventListener("keyup", jump)

