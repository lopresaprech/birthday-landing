/* === Мерцающие звезды === */
const starsContainer = document.querySelector('.stars-background');

for(let i=0;i<100;i++){
  const star = document.createElement('div');
  star.className='star';
  star.style.left=Math.random()*window.innerWidth+'px';
  star.style.top=Math.random()*window.innerHeight+'px';
  star.style.width=Math.random()*2+1+'px';
  star.style.height=star.style.width;
  star.style.animationDuration=(Math.random()*3+2)+'s';
  starsContainer.appendChild(star);
}

/* === Сердечки как конфетти === */
function launchHearts(){
  for(let i=0;i<60;i++){
    createHeart();
  }
}

function createHeart(){
  const heart = document.createElement('div');
  heart.innerHTML='❤️';
  heart.style.position='fixed';
  heart.style.left=Math.random()*window.innerWidth+'px';
  heart.style.top='-50px';
  heart.style.fontSize=(Math.random()*30+20)+'px';
  heart.style.opacity=Math.random();
  heart.style.transition='all 3s ease-out';
  document.body.appendChild(heart);
  setTimeout(()=>{
    heart.style.top=window.innerHeight+50+'px';
    heart.style.opacity=0;
    heart.style.transform='rotate('+Math.random()*360+'deg)';
  },50);
  setTimeout(()=>heart.remove(),3000);
}

/* === Автовоспроизведение плеера === */
const iframe = document.querySelector('.soundcloud-player');
iframe.onload = () => {
  const msg = JSON.stringify({ method: 'play' });
  iframe.contentWindow.postMessage(msg, '*');
};
