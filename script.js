// === ЗВЕЗДНОЕ НЕБО ===
const starfield = document.getElementById("starfield");
const starCtx = starfield.getContext("2d");
let stars = [];
function resizeStars() {
  starfield.width = window.innerWidth;
  starfield.height = window.innerHeight;
  stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * starfield.width,
    y: Math.random() * starfield.height,
    r: Math.random() * 2,
    d: Math.random() * 0.5
  }));
}
resizeStars();
window.addEventListener("resize", resizeStars);
function drawStars() {
  starCtx.clearRect(0, 0, starfield.width, starfield.height);
  starCtx.fillStyle = "white";
  stars.forEach(s => {
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fill();
    s.y += s.d;
    if (s.y > starfield.height) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// === САЛЮТ ===
const miniCanvas = document.getElementById("miniCanvas");
const mCtx = miniCanvas.getContext("2d");
miniCanvas.width = window.innerWidth;
miniCanvas.height = window.innerHeight;
let particles = [];
function launchFirework() {
  const x = Math.random() * miniCanvas.width;
  const y = Math.random() * miniCanvas.height / 2;
  for (let i = 0; i < 100; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      life: 100,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }
}
function drawParticles() {
  mCtx.clearRect(0, 0, miniCanvas.width, miniCanvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.life--;
    mCtx.fillStyle = p.color;
    mCtx.fillRect(p.x, p.y, 2, 2);
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// === МОДАЛ ФОТО ===
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
document.querySelectorAll(".photo img").forEach(ph => {
  ph.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = ph.src;
  });
});
modal.addEventListener("click", () => modal.classList.remove("active"));

// === HEARTS ===
let heartsEnabled = false;
function spawnHearts() {
  if (!heartsEnabled) return;
  const heart = document.createElement("div");
  heart.textContent = "❤️";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  heart.style.fontSize = "20px";
  heart.style.transition = "all 4s linear";
  document.body.appendChild(heart);
  setTimeout(() => { heart.style.top = "-10vh"; heart.style.opacity = 0; }, 100);
  setTimeout(() => heart.remove(), 4000);
  setTimeout(spawnHearts, 500);
}

// === AUDIO BAR ===
const scIframe = document.getElementById("scPlayer");
const widget = SC.Widget(scIframe);
const audioToggle = document.getElementById("audioToggle");
const audioProgress = document.getElementById("audioProgress");
let playing = false;
audioToggle.onclick = () => {
  if (playing) { widget.pause(); audioToggle.textContent = "▶"; }
  else { widget.play(); audioToggle.textContent = "⏸"; }
  playing = !playing;
};
widget.bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
  audioProgress.style.width = (e.relativePosition * 100) + "%";
});

// === BUTTONS ===
function addBtnHandler(id, handler) {
  const btn = document.getElementById(id);
  if (!btn) return;
  ["click","touchstart"].forEach(ev => btn.addEventListener(ev, handler));
}
addBtnHandler("launchFireBtn", () => launchFirework());
addBtnHandler("toggleHeartsBtn", () => {
  heartsEnabled = !heartsEnabled;
  if (heartsEnabled) spawnHearts();
});
