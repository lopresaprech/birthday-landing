// SoundCloud
const iframe = document.getElementById('scPlayer');
const widget = SC.Widget(iframe);
const playBtn = document.getElementById('playBtn');

let playing = false;

playBtn.addEventListener('click', () => {
  if (!playing) {
    widget.play();
    playBtn.textContent = 'PAUSE';
    playBtn.classList.add('playing');
  } else {
    widget.pause();
    playBtn.textContent = 'PLAY';
    playBtn.classList.remove('playing');
  }
  playing = !playing;
});

// Confetti
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confetti = [];
let confettiActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfetti() {
  confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
}

function drawConfetti() {
  if (!confettiActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(p => {
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  requestAnimationFrame(drawConfetti);
}

document.getElementById('confettiBtn').addEventListener('click', () => {
  confettiActive = true;
  createConfetti();
  drawConfetti();

  setTimeout(() => {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 6000);
});
