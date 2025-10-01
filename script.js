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

// === Салют ===
const launchBtn = document.getElementById("launchFireBtn");
launchBtn.addEventListener("click", () => {
  alert("💥 Салют запускается! (можно подключить fireworks.js для эффекта)");
});

// === Аудио управление ===
const audioToggle = document.getElementById("audioToggle");
const audioProgress = document.getElementById("audioProgress");
const iframe = document.getElementById("scPlayer");
const widget = SC.Widget(iframe);

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
  let percent = (e.currentPosition / e.duration) * 100;
  audioProgress.style.width = percent + "%";
});


