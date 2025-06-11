let form = document.getElementById("playerForm");
let game = document.getElementById("game");
let lights = [1,2,3,4,5].map(i => document.getElementById("l" + i));
let msg = document.getElementById("msg");
let ranking = document.getElementById("ranking");
let retryBtn = document.getElementById("retryBtn");
let beep = document.getElementById("beep");

let startTime, ready = false, jump = false;

form.addEventListener("submit", function(e) {
    e.preventDefault();
    form.style.display = "none";
    game.style.display = "block";
    startSequence();
});

retryBtn.addEventListener("click", () => {
    retryBtn.style.display = "none";
    msg.textContent = "Preparado...";
    startSequence();
});

function startSequence() {
    lights.forEach(l => l.classList.remove("on"));
    msg.textContent = "Preparado...";
    ready = false;
    jump = false;

    lights.forEach((light, i) => {
        setTimeout(() => {
            light.classList.add("on");
            beep.currentTime = 0;
            beep.play();
        }, i * 1000);
    });

    let randomDelay = Math.floor(Math.random() * 3000) + 2000;
    setTimeout(() => {
        lights.forEach(l => l.classList.remove("on"));
        msg.textContent = "¡YA!";
        startTime = new Date().getTime();
        ready = true;
    }, 5000 + randomDelay);
}

document.getElementById("clickArea").addEventListener("click", () => {
    if (jump || !form.style.display === "none") return;

    if (!ready) {
        msg.textContent = "⛔ ¡Jump Start!";
        retryBtn.style.display = "inline-block";
        jump = true;
        return;
    }

    let reactionTime = new Date().getTime() - startTime;
    msg.textContent = `⏱️ Tiempo de reacción: ${reactionTime} ms`;
    ready = false;
    retryBtn.style.display = "inline-block";

    const name = document.getElementById("playerName").value;
    const email = document.getElementById("playerEmail").value;

    // Enviar al backend o Google Sheets (reemplaza URL con tu webhook de Sheets)
    fetch("https://script.google.com/macros/s/TU_SCRIPT_ID/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reactionTime })
    });

    // Mostrar en frontend (simulado)
    const item = document.createElement("li");
    item.textContent = `${name}: ${reactionTime} ms`;
    ranking.appendChild(item);
});
