/* =========================
⚡ script.js
========================= */

/* PARTICLES */

const particles =
document.querySelector('.particles');

for(let i=0;i<120;i++){

const span =
document.createElement('span');

span.style.left =
Math.random()*100 + '%';

span.style.animationDuration =
(5 + Math.random()*12) + 's';

particles.appendChild(span);
}

/* TELEPORT */

function scrollToCasino(){

const casino =
document.querySelector('#casino');

if(casino){

casino.scrollIntoView({
behavior:'smooth',
block:'start'
});

}
}
/* SLOT */

const symbols = [
'💜',
'👑',
'🍋',
'💎',
'7️⃣',
'⭐',
'🎂',
'🥂'
];

function spin(){

const slots = [
document.getElementById('slot1'),
document.getElementById('slot2'),
document.getElementById('slot3')
];

const result =
document.getElementById('result');

const jackpot =
Math.random() < 0.75;

let finalSymbols = [];

if(jackpot){

const lucky =
symbols[Math.floor(Math.random()*symbols.length)];

finalSymbols = [lucky,lucky,lucky];

}else{

finalSymbols = [

symbols[Math.floor(Math.random()*symbols.length)],
symbols[Math.floor(Math.random()*symbols.length)],
symbols[Math.floor(Math.random()*symbols.length)]
];
}

let spins = 0;

const interval = setInterval(()=>{

slots.forEach(slot=>{

slot.innerHTML =
symbols[Math.floor(Math.random()*symbols.length)];
});

spins++;

if(spins > 18){

clearInterval(interval);

slots[0].innerHTML = finalSymbols[0];
slots[1].innerHTML = finalSymbols[1];
slots[2].innerHTML = finalSymbols[2];

if(jackpot){

const symbol =
finalSymbols[0];

if(symbol === '7️⃣'){

result.innerHTML =
'💥 JACKPOT ACTIVATED 💥';
}

else if(symbol === '💎'){

result.innerHTML =
'💎 MONEY ENERGY MAX 💎';
}

else if(symbol === '👑'){

result.innerHTML =
'👑 QUEEN OF THE YEAR 👑';
}

else{

result.innerHTML =
'✨ ULTRA LUCK ACTIVATED ✨';
}

}else{

result.innerHTML =
'💜 ВСЕЛЕННАЯ НА ТВОЕЙ СТОРОНЕ 💜';
}
}

},90);
}

/* PAGES */

function changePage(type){

const page =
document.getElementById('pageContent');

if(type === 'study'){

page.innerHTML = `
<h2>📚 УЧЁБА И РАЗВИТИЕ</h2>

<p>
Пусть всё получается легко 💜<br><br>

Новые возможности,
успех,
мотивация
и endless growth 🚀
</p>
`;
}

if(type === 'work'){

page.innerHTML = `
<h2>💼 РАБОТА И КАРЬЕРА</h2>

<p>
Карьерного роста,
кайфовой работы,
огромных денег
и минимум стресса 😎
</p>
`;
}

if(type === 'family'){

page.innerHTML = `
<h2>👨‍👩‍👧 СЕМЬЯ И ЛЮБОВЬ</h2>

<p>
Зная твое предпочтения,
пусть хотябы будет интерес к этому,
желаю счастья💜
</p>
`;
}
}
/* =========================
🎵 SOUNDCLOUD
========================= */

const iframe =
document.getElementById('sc-player');

const widget =
SC.Widget(iframe);

const progressBar =
document.querySelector('.progress-bar');

const playBtn =
document.getElementById('playBtn');

const disc =
document.querySelector('.disc');

let isPlaying = false;

/* READY */

widget.bind(
SC.Widget.Events.READY,
function(){

widget.play();

isPlaying = true;

playBtn.innerHTML = '⏸';

disc.style.animationPlayState = 'running';

startProgress();
});

/* PROGRESS FIX */

function startProgress(){

setInterval(()=>{

widget.getPosition((position)=>{

widget.getDuration((duration)=>{

if(duration > 0){

const percent =
(position / duration) * 100;

progressBar.style.width =
percent + '%';
}

});
});

},200);
}

/* PLAY */

widget.bind(
SC.Widget.Events.PLAY,
function(){

isPlaying = true;

playBtn.innerHTML = '⏸';

disc.style.animationPlayState = 'running';
});

/* PAUSE */

widget.bind(
SC.Widget.Events.PAUSE,
function(){

isPlaying = false;

playBtn.innerHTML = '▶';

disc.style.animationPlayState = 'paused';
});

/* FINISH */

widget.bind(
SC.Widget.Events.FINISH,
function(){

playBtn.innerHTML = '▶';

isPlaying = false;

progressBar.style.width = '0%';

disc.style.animationPlayState = 'paused';
});

/* BUTTON */

playBtn.addEventListener('click',()=>{

if(isPlaying){

widget.pause();

}else{

widget.play();
}
});
const casinoBtn =
document.getElementById('casinoBtn');

casinoBtn.addEventListener('click',()=>{

document
.getElementById('casino')
.scrollIntoView({

behavior:'smooth'
});

});
