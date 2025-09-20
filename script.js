// === ЗВЕЗДНОЕ НЕБО ===
const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");
let stars = [];
function resizeStars(){
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  stars = Array.from({length:200},()=>({
    x:Math.random()*starCanvas.width,
    y:Math.random()*starCanvas.height,
    r:Math.random()*2,
    d:Math.random()*0.5
  }));
}
resizeStars();
window.addEventListener("resize",resizeStars);
function drawStars(){
  starCtx.clearRect(0,0,starCanvas.width,starCanvas.height);
  starCtx.fillStyle="white";
  stars.forEach(s=>{
    starCtx.beginPath();
    starCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
    starCtx.fill();
    s.y+=s.d;
    if(s.y>starCanvas.height) s.y=0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// === ФОТОГАЛЕРЕЯ + МОДАЛ ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".photo img").forEach(ph => {
  ph.addEventListener("click", () => {
    lightbox.style.display = "block"; // показываем окно
    lightboxImg.src = ph.src; // вставляем выбранное фото
  });
});

// Закрытие при клике на фон или крестик
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.classList.contains("close")) {
    lightbox.style.display = "none";
  }
});


// === САЛЮТЫ / ЧАСТИЦЫ ===
const miniCanvas=document.getElementById("miniCanvas");
const mCtx=miniCanvas.getContext("2d");
miniCanvas.width=window.innerWidth;
miniCanvas.height=window.innerHeight;
let particles=[];
function launchFirework(){
  const x=Math.random()*miniCanvas.width;
  const y=Math.random()*miniCanvas.height/2;
  for(let i=0;i<100;i++){
    particles.push({
      x,y,
      vx:(Math.random()-0.5)*5,
      vy:(Math.random()-0.5)*5,
      life:100,
      color:`hsl(${Math.random()*360},100%,50%)`
    });
  }
}
document.getElementById("launchFireBtn").onclick=launchFirework;
function drawParticles(){
  mCtx.clearRect(0,0,miniCanvas.width,miniCanvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.life--;
    mCtx.fillStyle=p.color;
    mCtx.fillRect(p.x,p.y,2,2);
    if(p.life<=0) particles.splice(i,1);
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// === PHOTO FLY ===
window.__photoFly=function(){
  document.querySelectorAll(".photo").forEach((ph,i)=>{
    ph.style.transition="transform 1s ease";
    ph.style.transform=`translateY(-${100+Math.random()*200}px) rotate(${(Math.random()-0.5)*60}deg)`;
    setTimeout(()=>{ ph.style.transform="translateY(0) rotate(0)"; },1500);
  });
};
document.getElementById("photoFlyBtn").onclick=()=>window.__photoFly();

// === HEARTS ===
let heartsEnabled=false;
const hearts=[];
document.getElementById("toggleHeartsBtn").onclick=()=>{
  heartsEnabled=!heartsEnabled;
  if(heartsEnabled) spawnHearts();
};
function spawnHearts(){
  if(!heartsEnabled) return;
  const heart=document.createElement("div");
  heart.textContent="❤️";
  heart.style.position="fixed";
  heart.style.left=Math.random()*100+"vw";
  heart.style.top="100vh";
  heart.style.fontSize="20px";
  heart.style.transition="all 4s linear";
  document.body.appendChild(heart);
  setTimeout(()=>{
    heart.style.top="-10vh";
    heart.style.opacity=0;
  });
  setTimeout(()=>heart.remove(),4000);
  setTimeout(spawnHearts,500);
}

// === AUDIO BAR ===
const scIframe=document.getElementById("scPlayer");
const widget=SC.Widget(scIframe);
const audioToggle=document.getElementById("audioToggle");
const audioProgress=document.getElementById("audioProgress");
let playing=false;
audioToggle.onclick=()=>{
  if(playing){ widget.pause(); audioToggle.textContent="▶"; }
  else { widget.play(); audioToggle.textContent="⏸"; }
  playing=!playing;
};
widget.bind(SC.Widget.Events.PLAY_PROGRESS,(e)=>{
  audioProgress.style.width=(e.relativePosition*100)+"%";
});



