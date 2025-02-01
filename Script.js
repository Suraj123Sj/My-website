document.addEventListener("DOMContentLoaded", function () {
    let timeLeft = 10;
    let timerElement = document.getElementById("timer");
    let timeText = document.getElementById("time-left");
    let progressBar = document.getElementById("progress-bar");
    let totalLength = 565.48;
    let beepSound = document.getElementById("beep-sound");
    let successSound = document.getElementById("success-sound");

    function updateTimer() {
        if (timeLeft > 0) {
            timerElement.textContent = timeLeft;
            timeText.textContent = timeLeft;
            progressBar.style.strokeDashoffset = totalLength * (timeLeft / 10);
            
            beepSound.play();
            timerElement.classList.add("shrink");
            setTimeout(() => { 
                timerElement.classList.remove("shrink"); 
            }, 500);

            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            successSound.play();
            launchConfetti();
            setTimeout(() => { window.location.href = "about.html"; }, 2000);
        }
    }

    updateTimer();
});

/* Confetti Effect */
function launchConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confetti = [];
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 2,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}
