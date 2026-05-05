const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
function drawPlayButton() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.ellipse(50, 50, 50, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#2196f3";
    ctx.fill();
     ctx.fillText("Play", 50, 50);
}

drawPlayButton();

canvas.addEventListener("click", function (event) {

    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const dx = mouseX - 100;
    const dy = mouseY - 100;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= 60) {
        alert("Play!");
    }
});