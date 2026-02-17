const starsCanvas = document.getElementById("stars");
const fwCanvas = document.getElementById("fireworks");
const starsCtx = starsCanvas.getContext("2d");
const fwCtx = fwCanvas.getContext("2d");

starsCanvas.width = fwCanvas.width = window.innerWidth;
starsCanvas.height = fwCanvas.height = window.innerHeight;

/* Звезды */
let stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        r: Math.random() * 1.5
    });
}

function drawStars() {
    starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
    starsCtx.fillStyle = "white";
    stars.forEach(s=>{
        starsCtx.beginPath();
        starsCtx.arc(s.x,s.y,s.r,0,Math.PI*2);
        starsCtx.fill();
    });
    requestAnimationFrame(drawStars);
}
drawStars();

/* Лёгкий авто-салют */
function autoFirework(){
    let x = Math.random()*fwCanvas.width;
    let y = Math.random()*fwCanvas.height/2;
    let particles = [];

    for(let i=0;i<25;i++){
        particles.push({
            x:x,
            y:y,
            dx:(Math.random()-0.5)*4,
            dy:(Math.random()-0.5)*4,
            alpha:1
        });
    }

    function animate(){
        fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
        particles.forEach(p=>{
            fwCtx.fillStyle=`rgba(255,215,0,${p.alpha})`;
            fwCtx.beginPath();
            fwCtx.arc(p.x,p.y,2,0,Math.PI*2);
            fwCtx.fill();
            p.x+=p.dx;
            p.y+=p.dy;
            p.alpha-=0.03;
        });
        particles=particles.filter(p=>p.alpha>0);
        if(particles.length>0) requestAnimationFrame(animate);
    }
    animate();
}

setInterval(autoFirework, 4000); // редкий салют

function startSite(){
    document.getElementById("intro").remove();
    document.getElementById("content").style.display="block";
}

function togglePlay(btn){
    const video = btn.parentElement.querySelector("video");
    if(video.paused){
        video.play();
        btn.innerText="⏸";
    } else {
        video.pause();
        btn.innerText="▶";
    }
}