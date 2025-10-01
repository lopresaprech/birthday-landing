// === Фон со звёздами ===
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  stars.forEach(s => {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  });
  ctx.fill();
  moveStars();
}

function moveStars() {
  stars.forEach(s => {
    s.y += 0.3;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawStars, 40);

// === Галерея (увеличение фото) ===
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
document.querySelectorAll(".photo img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});
modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// === Сердечки ===
const heartsBtn = document.getElementById("toggleHeartsBtn");
let heartsActive = false;
let heartsInterval;

heartsBtn.addEventListener("click", () => {
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

// === Салют (без fireworks.js) ===
const launchBtn = document.getElementById("launchFireBtn");
const fireCanvas = document.getElementById("miniCanvas");
fireCanvas.width = window.innerWidth;
fireCanvas.height = 300;
const fCtx = fireCanvas.getContext("2d");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function drawParticle(p) {
  fCtx.beginPath();
  fCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  fCtx.fillStyle = p.color;
  fCtx.fill();
}

function launchFireworks() {
  let particles = [];
  let colors = ["red", "orange", "yellow", "white", "pink", "cyan"];
  let interval = setInterval(() => {
    fCtx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);

    if (particles.length < 100) {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: fireCanvas.width/2,
          y: fireCanvas.height,
          r: random(2,5),
          color: colors[Math.floor(random(0, colors.length))],
          vx: random(-3,3),
          vy: random(-8,-3),
          life: 60
        });
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.life--;
      drawParticle(p);
    });

    particles = particles.filter(p => p.life > 0);
  }, 30);

  setTimeout(() => clearInterval(interval), 5000);
}

launchBtn.addEventListener("click", launchFireworks);

// === Аудио управление ===
window.addEventListener("load", () => {
  const iframe = document.getElementById("scPlayer");
  if (!iframe) return;

  const widget = SC.Widget(iframe);
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

