// === ЗВЁЗДЫ ===
const starsCanvas = document.getElementById('stars');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resizeStars();
window.addEventListener('resize', resizeStars);

function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 2,
      d: Math.random() * 0.5 + 0.2,
    });
  }
}
createStars();

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach((s) => {
    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starsCtx.fillStyle = 'white';
    starsCtx.fill();
    s.y += s.d;
    if (s.y > starsCanvas.height) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// === СЕРДЕЧКИ ===
const heartsCanvas = document.getElementById("hearts");
const heartsCtx = heartsCanvas.getContext("2d");
let hearts = [];

function resizeHearts() {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
resizeHearts();
window.addEventListener("resize", resizeHearts);

function launchHearts() {
  for (let i = 0; i < 40; i++) {
    hearts.push({
      x: Math.random() * heartsCanvas.width,
      y: heartsCanvas.height + 20,
      size: Math.random() * 15 + 10,
      speed: Math.random() * 1.5 + 0.5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    });
  }
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.bezierCurveTo(size / 2, -size, size, 0, 0, size);
  ctx.bezierCurveTo(-size, 0, -size / 2, -size, 0, -size / 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawHearts() {
  heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach((h, i) => {
    drawHeart(heartsCtx, h.x, h.y, h.size, h.color);
    h.y -= h.speed;
    if (h.y < -20) hearts.splice(i, 1);
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();
