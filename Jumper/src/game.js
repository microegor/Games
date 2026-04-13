const table = document.getElementById("table");

function newJumper() {
    
    const jumper = document.createElement("div");
    jumper.classList.add("jumper");

    let height = 30;
    let width = 20;

    let positionLeft = table.offsetWidth / 2 - (width / 2);
    let positionTop = table.offsetHeight - (table.offsetHeight / 4) + (height / 2);


    jumper.style.height = height + "px";
    jumper.style.width = width + "px";
    jumper.style.left = positionLeft + "px";
    jumper.style.top = positionTop + "px";

    table.appendChild(jumper);
}

newJumper();