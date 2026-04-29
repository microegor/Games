function link() {
    window.location.href = "game.html";
}

document.getElementById("button").addEventListener("click", link)

const score = localStorage.getItem("score");

document.getElementById("score").textContent = score + " sec";