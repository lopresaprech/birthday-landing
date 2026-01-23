/* ---------- MUSIC ---------- */
const iframe = document.getElementById('sc-player');
const widget = SC.Widget(iframe);
const musicBtn = document.getElementById('musicBtn');

let playing = false;

musicBtn.onclick = () => {
  if (!playing) {
    widget.play();
    musicBtn.textContent = '⏸';
  } else {
    widget.pause();
    musicBtn.textContent = '▶';
  }
  playing = !playing;
};

/* ---------- MAGIC OVERLAY ---------- */
const canvas = document.getElementById('fx');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener('resize', resize);

let active = false;
const particles = [];

document.getElementById('fxToggle').onclick = () => {
  active = !active;
};

function spawn() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 40,
    size: Math.random() * 12 + 8,
    speed: Math.random() * 0.7 + 0.4,
    alpha: Math.random() * 0.5 + 0.3,
    drift: (Math.random() - 0.5) * 0.6
  };
}

function drawHeart(x, y, s, a) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 20, s / 20);
  ctx.globalAlpha = a;
  ctx.fillStyle = '#c77dff';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
  ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (active) {
    if (particles.length < 90) particles.push(spawn());

    particles.forEach((p, i) => {
      drawHeart(p.x, p.y, p.size, p.alpha);
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -50) particles.splice(i, 1);
    });
  }

  requestAnimationFrame(animate);
}

animate();
