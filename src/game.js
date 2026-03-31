const bird = {
    top: 400,
    el: document.getElementById("bird"),
};

function jump(e) {
    if (e.code == "Space") {
        // const sizeMatch =  /(\d+)px/.exec(bird.style.top)[1];
        // let size = parseInt(sizeMatch, 10)
        bird.top -= 1;
        render();
    }
    console.log("not space")
}

function render() {
    bird.el.style.top = bird.top;
}

render();

document.addEventListener("keydown", jump)