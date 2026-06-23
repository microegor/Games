import { getElementById } from "../core/utils.js";
function link() {
    window.location.href = "game.html";
}
getElementById("button").addEventListener("click", link);
const score = localStorage.getItem("score");
getElementById("score").textContent = score + " sec";
//# sourceMappingURL=end.js.map