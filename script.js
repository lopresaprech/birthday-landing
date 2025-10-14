// ----------------- ЗВЁЗДЫ -----------------
const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");
let stars = [];

function resizeStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resizeStars();
window.addEventListener("resize", resizeStars);

function createStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 2 + 1,
      d: Math.random() * 0.05 + 0.01
    });
  }
}
createStars();

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(s => {
    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starsCtx.fillStyle = "white";
    starsCtx.fill();
    s.y += s.d;
    if (s.y > starsCanvas.height) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ----------------- СЕРДЕЧКИ -----------------
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
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: Math.random() * heartsCanvas.width,
      y: heartsCanvas.height + Math.random() * 50,
      r: Math.random() * 10 + 5,
      speed: Math.random() * 2 + 1,
      color: `hsl(${Math.random()*360}, 100%, 70%)`
    });
  }
}

function drawHearts() {
  heartsCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach((h, index) => {
    heartsCtx.beginPath();
    heartsCtx.moveTo(h.x, h.y);
    heartsCtx.bezierCurveTo(h.x - h.r/2, h.y - h.r/2, h.x - h.r, h.y + h.r/3, h.x, h.y + h.r);
    heartsCtx.bezierCurveTo(h.x + h.r, h.y + h.r/3, h.x + h.r/2, h.y - h.r/2, h.x, h.y);
    heartsCtx.fillStyle = h.color;
    heartsCtx.fill();
    h.y -= h.speed;
    if (h.y + h.r < 0) hearts.splice(index, 1);
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();
