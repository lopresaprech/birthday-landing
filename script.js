// Звездный фон
const starsCanvas = document.getElementById('stars');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resizeStarsCanvas();
window.addEventListener('resize', resizeStarsCanvas);

function createStars() {
  stars = [];
  for(let i=0; i<200; i++){
    stars.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: Math.random()*2,
      d: Math.random()*1
    });
  }
}
createStars();

function drawStars() {
  starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
  stars.forEach(s => {
    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    starsCtx.fillStyle = 'white';
    starsCtx.fill();
    s.y += s.d;
    if(s.y > starsCanvas.height) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Сердечки
const heartsCanvas = document.getElementById("hearts");
const heartsCtx = heartsCanvas.getContext("2d");
let hearts = [];

function resizeHeartsCanvas() {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
resizeHeartsCanvas();
window.addEventListener("resize", resizeHeartsCanvas);

function launchHearts() {
  for(let i=0; i<50; i++){
    hearts.push({
      x: Math.random()*heartsCanvas.width,
      y: Math.random()*heartsCanvas.height - heartsCanvas.height,
      r: Math.random()*8+4,
      d: Math.random()*2+1,
      color: 'pink',
      tilt: Math.random()*10-10
    });
  }
}

function drawHearts() {
  heartsCtx.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
  hearts.forEach(h => {
    heartsCtx.beginPath();
    heartsCtx.moveTo(h.x, h.y);
    heartsCtx.arc(h.x, h.y, h.r, 0, Math.PI*2);
    heartsCtx.fillStyle = h.color;
    heartsCtx.fill();
    h.y += h.d;
    h.x += Math.sin(h.tilt/10);
    if(h.y>heartsCanvas.height){
      h.y = 0 - h.r;
      h.x = Math.random()*heartsCanvas.width;
    }
  });
  requestAnimationFrame(drawHearts);
}
drawHearts();


