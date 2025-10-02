// === Фон со звёздами ===
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += 0.3;
    if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
  });
}

setInterval(drawStars, 40);

// === Модалка для фото ===
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});
modal.addEventListener("click", () => { modal.style.display = "none"; });

// === Сердечки ===
let heartsActive = false, heartsInterval;
document.getElementById("toggleHeartsBtn").addEventListener("click", () => {
  if (!heartsActive) {
    heartsActive = true;
    heartsInterval = setInterval(() => {
      let heart = document.createElement("div");
      heart.innerText = "❤️";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-20px";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heart.style.transition = "transform 4s linear, opacity 4s";
      document.body.appendChild(heart);
      setTimeout(() => {
        heart.style.transform = `translateY(${window.innerHeight + 50}px)`;
        heart.style.opacity = "0";
      }, 100);
      setTimeout(() => heart.remove(), 4000);
    }, 400);
  } else {
    heartsActive = false;
    clearInterval(heartsInterval);
  }
});

// === Салют ===
const fireCanvas = document.getElementById("miniCanvas");
const fctx = fireCanvas.getContext("2d");

function resizeFireCanvas() {
  fireCanvas.width = window.innerWidth;
  fireCanvas.height = window.innerHeight;
}
resizeFireCanvas();
window.addEventListener("resize", resizeFireCanvas);

let particles = [];

function createFirework(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
}

function drawFireworks() {
  fctx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);

  particles.forEach((p, i) => {
    fctx.fillStyle = p.color;
    fctx.globalAlpha = p.alpha;
    fctx.beginPath();
    fctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    fctx.fill();

    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.02;

    if (p.alpha <= 0) particles.splice(i, 1);
  });

  fctx.globalAlpha = 1;
  requestAnimationFrame(drawFireworks);
}

drawFireworks();

document.getElementById("launchFireBtn").addEventListener("click", () => {
  const x = Math.random() * fireCanvas.width;
  const y = Math.random() * fireCanvas.height / 2;
  createFirework(x, y);
});

// === Аудио управление ===
window.addEventListener("load", () => {
  const widget = SC.Widget(document.getElementById("scPlayer"));
  const audioToggle = document.getElementById("audioToggle");
  const audioProgress = document.getElementById("audioProgress");

  let playing = false;

  audioToggle.addEventListener("click", () => {
    if (!playing) {
      widget.play();
      audioToggle.textContent = "⏸";
      playing = true;
    } else {
      widget.pause();
      audioToggle.textContent = "▶";
      playing = false;
    }
  });

  widget.bind(SC.Widget.Events.PLAY_PROGRESS, e => {
    if (e.duration) {
      let percent = (e.currentPosition / e.duration) * 100;
      audioProgress.style.width = percent + "%";
    }
  });
});
