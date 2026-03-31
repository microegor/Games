const bird = {
    top: 400,
    el: document.getElementById("bird"),
};

const table = document.getElementById("table");

const change = 0;

function jump(e) {
    if (e.code == "Space") {
        // const sizeMatch =  /(\d+)px/.exec(bird.style.top)[1];
        // let size = parseInt(sizeMatch, 10)
        bird.top -= 200

        render();
    }
}

function render() {
    bird.el.style.top = bird.top;
}

function getDown() {
    if (bird.top < table.offsetHeight) {
        bird.top += 20;
        render();
    } else {
        window.location.href = "end.html";
    }


}

setInterval(getDown, 50)

render();

document.addEventListener("keyup", jump)

