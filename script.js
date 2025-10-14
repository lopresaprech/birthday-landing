const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let confetti = [];
let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

// Звездный фон
function launchStars(count = 150) {
  for (let i = 0; i < count; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`,
    });
  }
}
launchStars();

function launchHearts(count = 50) {
  for (let i = 0; i < count; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 3 + 2,
      color: "#ff0080",
      tilt: Math.random() * 0.5,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем звездочки
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
    ctx.fillStyle = c.color;
    ctx.fill();
  });

  // Рисуем сердечки
  hearts.forEach((h, i) => {
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.rotate(Math.sin(h.tilt));
    ctx.beginPath();
    ctx.moveTo(0, -h.size / 2);
    ctx.bezierCurveTo(h.size/2, -h.size, h.size, h.size/3, 0, h.size);
    ctx.bezierCurveTo(-h.size, h.size/3, -h.size/2, -h.size, 0, -h.size/2);
    ctx.fillStyle = h.color;
    ctx.fill();
    ctx.restore();

    h.y -= h.speed;
    if (h.y < -h.size) hearts.splice(i, 1);
  });

  requestAnimationFrame(draw);
}
draw();
