/* ===== SOUNDCLOUD ===== */

const scWidget = document.createElement('iframe');

scWidget.id = 'sc-widget';

scWidget.allow = 'autoplay';

scWidget.style.display = 'none';

scWidget.src =
'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/ivoxxxygen/home&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false';

document.body.appendChild(scWidget);

const widget = SC.Widget(scWidget);

let isPlaying = false;

function toggleMusic(){

  const btn =
    document.getElementById('playBtn');

  if(isPlaying){
    widget.pause();
    btn.textContent = '▶';
  }else{
    widget.play();
    btn.textContent = '⏸';
  }

  isPlaying = !isPlaying;
}

/* ===== SCROLL ===== */

function scrollToContent(){

  window.scrollTo({
    top:window.innerHeight,
    behavior:'smooth'
  });

  launchFireworks();
}

/* ===== INDICATOR ===== */

window.addEventListener('scroll',()=>{

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight
    - window.innerHeight;

  const scrollPercent =
    (scrollTop / docHeight) * 100;

  document.getElementById(
    'scrollIndicator'
  ).style.width = scrollPercent + '%';
});

/* ===== OBSERVER ===== */

const observer =
new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }

  });

},{threshold:.1});

document.querySelectorAll(
'.photo-card, .text-block'
).forEach(el=>observer.observe(el));

/* ===== PARTICLES ===== */

const particlesCanvas =
document.getElementById('particles');

const pCtx =
particlesCanvas.getContext('2d');

function resizeParticles(){
  particlesCanvas.width = innerWidth;
  particlesCanvas.height = innerHeight;
}

resizeParticles();

addEventListener('resize',resizeParticles);

const particles = [];

for(let i=0;i<50;i++){

  particles.push({

    x:Math.random()*innerWidth,
    y:Math.random()*innerHeight,

    size:Math.random()*2+1,

    speedX:(Math.random()-.5)*.5,
    speedY:(Math.random()-.5)*.5,

    opacity:Math.random()*.5+.2
  });
}

function animateParticles(){

  pCtx.clearRect(
    0,
    0,
    particlesCanvas.width,
    particlesCanvas.height
  );

  particles.forEach(p=>{

    p.x += p.speedX;
    p.y += p.speedY;

    if(p.x < 0) p.x = innerWidth;
    if(p.x > innerWidth) p.x = 0;

    if(p.y < 0) p.y = innerHeight;
    if(p.y > innerHeight) p.y = 0;

    pCtx.beginPath();

    pCtx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI*2
    );

    pCtx.fillStyle =
      `rgba(255,0,0,${p.opacity})`;

    pCtx.fill();
  });

  requestAnimationFrame(
    animateParticles
  );
}

animateParticles();

/* ===== FIREWORKS ===== */

const fwCanvas =
document.getElementById('fireworks');

const fwCtx =
fwCanvas.getContext('2d');

function resizeFireworks(){
  fwCanvas.width = innerWidth;
  fwCanvas.height = innerHeight;
}

resizeFireworks();

addEventListener('resize',resizeFireworks);

const fwParticles = [];

function launchFireworks(){

  for(let i=0;i<5;i++){

    setTimeout(()=>{

      createFirework(
        Math.random()*innerWidth,
        Math.random()*innerHeight*.5
      );

    },i*250);
  }
}

function createFirework(x,y){

  const colors = [
    '#ff0000',
    '#8b0000',
    '#3b0000',
    '#1a1a1a',
    '#550000',
    '#ffffff'
  ];

  const color =
    colors[Math.floor(Math.random()*colors.length)];

  for(let i=0;i<80;i++){

    const angle =
      (Math.PI*2/80)*i;

    const speed =
      Math.random()*6+2;

    fwParticles.push({

      x,
      y,

      vx:Math.cos(angle)*speed,
      vy:Math.sin(angle)*speed,

      life:100,

      color,

      size:Math.random()*3+1
    });
  }
}

function animateFireworks(){

  fwCtx.clearRect(
    0,
    0,
    fwCanvas.width,
    fwCanvas.height
  );

  for(let i=fwParticles.length-1;i>=0;i--){

    const p = fwParticles[i];

    p.x += p.vx;
    p.y += p.vy;

    p.vy += .05;

    p.life--;

    const alpha = p.life/100;

    const r =
      parseInt(p.color.slice(1,3),16);

    const g =
      parseInt(p.color.slice(3,5),16);

    const b =
      parseInt(p.color.slice(5,7),16);

    fwCtx.beginPath();

    fwCtx.arc(
      p.x,
      p.y,
      p.size,
      0,
      Math.PI*2
    );

    fwCtx.fillStyle =
      `rgba(${r},${g},${b},${alpha})`;

    fwCtx.fill();

    if(p.life<=0){
      fwParticles.splice(i,1);
    }
  }

  requestAnimationFrame(
    animateFireworks
  );
}

animateFireworks();

document.addEventListener('click',(e)=>{

  createFirework(
    e.clientX,
    e.clientY
  );
});
