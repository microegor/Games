const screen = document.getElementById("screen");

const ChickenWidth = 30;
const ChickenHeight = 30;

function newChiken(){
    const chiken = document.createElement("div");
    chiken.classList.add("chiken");
    chiken.style.width = ChickenWidth + "px";
    chiken.style.height = ChickenHeight + "px";
    chiken.style.top =  + "px";
    
    screen.appendChilde(chiken);
}

newChiken();