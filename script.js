const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.querySelector('.progress');
const bar = document.querySelector('.bar');
const timeTxt = document.getElementById('time');
const vol = document.getElementById('vol');

playBtn.onclick = () => {
  if(audio.paused){ audio.play(); playBtn.style.background='#d400ff'; }
  else { audio.pause(); playBtn.style.background='#7a00ff'; }
};

audio.ontimeupdate = () => {
  const pct = (audio.currentTime / audio.duration) * 100;
  bar.style.width = pct + '%';
  timeTxt.textContent = format(audio.currentTime);
};

progress.onclick = e => {
  const x = e.offsetX / progress.clientWidth;
  audio.currentTime = x * audio.duration;
};

vol.oninput = () => audio.volume = vol.value;

function format(t){
  const m = Math.floor(t/60);
  const s = Math.floor(t%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

// CONFETTI
const c = document.getElementById('confetti');
const ctx = c.getContext('2d');
let pieces = [];

function resize(){ c.width = window.innerWidth; c.height = window.innerHeight; }
resize();
window.onresize = resize;

for(let i=0;i<200;i++){
  pieces.push({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    s:Math.random()*3+1,
    v:Math.random()*2+0.5,
    c:`hsl(${Math.random()*360},100%,50%)`
  });
}

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  pieces.forEach(p=>{
    ctx.fillStyle=p.c;
    ctx.fillRect(p.x,p.y,p.s,p.s*2);
    p.y+=p.v;
    if(p.y>c.height) p.y=-10;
  });
  requestAnimationFrame(draw);
}

draw();
