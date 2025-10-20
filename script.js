 // Intro overlay
const introOverlay = document.getElementById('introOverlay');
const startBtn = document.getElementById('startBtn');
const siteContent = document.getElementById('siteContent');
startBtn.addEventListener('click', ()=> {
  introOverlay.style.opacity = '0';
  introOverlay.style.pointerEvents = 'none';
  setTimeout(()=> {
    introOverlay.style.display = 'none';
    siteContent.setAttribute('aria-hidden','false');
    showTab('introTab'); 
  }, 420);
});

// Tabs
const tabs = {
  introTab: document.getElementById('introTab'),
  accentTab: document.getElementById('accentTab'),
  martynTab: document.getElementById('martynTab'),
  conclTab: document.getElementById('conclTab')
};
const navButtons = Array.from(document.querySelectorAll('.nav-btn[data-to]'));
function clearActiveNavButtons(){ navButtons.forEach(b=> b.classList.remove('active')); }
function showTab(id){
  Object.entries(tabs).forEach(([key, panel])=>{
    if(key === id){ panel.classList.add('show'); panel.scrollIntoView({behavior:'smooth', block:'center'});}
    else panel.classList.remove('show');
  });
  clearActiveNavButtons();
  const btn = document.querySelector(`.nav-btn[data-to="${id}"]`);
  if(btn) btn.classList.add('active');
}
navButtons.forEach(btn=>btn.addEventListener('click', ()=>showTab(btn.getAttribute('data-to'))));
Object.values(tabs).forEach(p=>p.classList.remove('show'));

// Typewriter restart
const typeIntro = document.getElementById('typeIntro');
function restartTyping(){
  if(!typeIntro) return;
  typeIntro.style.animation='none';
  void typeIntro.offsetWidth;
  typeIntro.style.animation='typing 4s steps(40,end) forwards, blink .9s step-end infinite';
}
const introObserver = new MutationObserver((mutations)=>{
  for(const m of mutations){
    if(m.attributeName==='class' && m.target.classList.contains('show')) restartTyping();
  }
});
introObserver.observe(document.getElementById('introTab'), { attributes: true });

// Stress example
const stressEl = document.getElementById('stressExample');
let stressToggle=false;
if(stressEl){
  stressEl.addEventListener('click', ()=> {
    stressToggle = !stressToggle;
    if(stressToggle) stressEl.innerHTML = '<span style="opacity:.6">за</span><span style="text-decoration:underline; color: #ffd100">́мок</span>';
    else stressEl.innerHTML = '<span style="text-decoration:underline; color: #ffd100">замо́</span><span style="opacity:.6">к</span>';
    stressEl.classList.add('stress-anim');
    setTimeout(()=> stressEl.classList.remove('stress-anim'), 1100);
  });
}

// Quote animation
const quoteBox = document.getElementById('quoteBox');
const animateQuoteBtn = document.getElementById('animateQuoteBtn');
if(animateQuoteBtn && quoteBox) animateQuoteBtn.addEventListener('click', ()=> {
  quoteBox.classList.add('animate');
  setTimeout(()=> quoteBox.classList.remove('animate'), 900);
});

// Conclusion animation
const showConclBtn = document.getElementById('showConclBtn');
const conclItems = Array.from(document.querySelectorAll('#conclList .concl-item'));
if(showConclBtn) showConclBtn.addEventListener('click', ()=> {
  conclItems.forEach((it, idx)=> { setTimeout(()=> it.classList.add('show'), idx*180); });
});

// SoundCloud player
const iframe = document.getElementById('sc-iframe');
let widget = null;
if(window.SC && iframe) widget = SC.Widget(iframe);
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const progressBar = progress.querySelector('i');
const timeEl = document.getElementById('time');
const bars = Array.from(document.querySelectorAll('.spectrum .bar'));

let isPlaying=false, duration=0, progressTimer=null, animTimer=null;
function formatTime(ms){
  if(!ms || !isFinite(ms)) return '0:00';
  const s = Math.floor(ms/1000);
  const m = Math.floor(s/60);
  const r = (s%60).toString().padStart(2,'0');
  return `${m}:${r}`;
}
function setPlayingUI(play){
  isPlaying=play;
  if(play){ playBtn.classList.add('playing'); playBtn.innerText='⏸'; if(!animTimer) startSpectrum();}
  else{ playBtn.classList.remove('playing'); playBtn.innerText='▶'; }
}
function togglePlay(){
  if(!widget) return;
  widget.isPaused(function(paused){ if(paused) widget.play(); else widget.pause(); });
}
if(playBtn) playBtn.addEventListener('click', togglePlay);
const coverEl=document.querySelector('.cover'); if(coverEl) coverEl.addEventListener('click', togglePlay);

progress.addEventListener('click',(e)=>{
  if(!widget || !duration) return;
  const rect=progress.getBoundingClientRect();
  const x=e.clientX-rect.left;
  const pct=Math.max(0,Math.min(1,x/rect.width));
  const pos=Math.floor(duration*pct);
  widget.seekTo(pos);
  progressBar.style.width=(pct*100)+'%';
});

function startSpectrum(){
  if(animTimer) cancelAnimationFrame(animTimer);
  const seed=Math.random()*1000;
  function frame(){
    const t=Date.now();
    const baseIntensity=isPlaying?1:0.25;
    bars.forEach((b,i)=>{
      const noise=(Math.sin((t/300)+i*0.6+seed)+1)/2;
      const heightPct=6+Math.round(noise*80*baseIntensity);
      b.style.height=heightPct+'%';
      b.style.background=`linear-gradient(180deg, rgba(138,92,255,0.95), rgba(255,209,0,0.85))`;
    });
    animTimer=requestAnimationFrame(frame);
  }
  frame();
}
function stopSpectrum(){ if(animTimer) cancelAnimationFrame(animTimer); animTimer=null; bars.forEach(b=>b.style.height='6%'); }
function startProgress(){
  if(progressTimer) clearInterval(progressTimer);
  progressTimer=setInterval(()=>{ if(!widget) return; widget.getPosition(pos=>{ const pct=duration?(pos/duration)*100:0; progressBar.style.width=pct+'%'; timeEl.innerText=formatTime(pos); }); }, 250);
}
function stopProgress(){ if(progressTimer) clearInterval(progressTimer); progressTimer=null; }

if(widget){
  widget.bind(SC.Widget.Events.READY, function(){
    widget.getDuration(dur=>{ duration=dur||0; });
    (async function tryAutoplay(attempts=2){
      try{ widget.play(); setTimeout(()=> widget.isPaused(paused=>{ if(!paused){ setPlayingUI(true); startProgress(); } else{ setPlayingUI(false); startSpectrum(); } }),700);}
      catch(e){ if(attempts>0) setTimeout(()=>tryAutoplay(attempts-1),800); else startSpectrum(); }
    })();
  });
  widget.bind(SC.Widget.Events.PLAY, function(){ widget.getDuration(dur=>{ duration=dur||duration; }); setPlayingUI(true); startProgress(); });
  widget.bind(SC.Widget.Events.PAUSE, function(){ setPlayingUI(false); stopProgress(); });
  widget.bind(SC.Widget.Events.FINISH, function(){ widget.seekTo(0); widget.play(); });
}else startSpectrum();

// Keyboard navigation
document.addEventListener('keydown', e=>{
  const focused=document.activeElement;
  if(['ArrowLeft','ArrowRight'].includes(e.key)){
    const idx=navButtons.indexOf(focused);
    if(idx!==-1){
      const next=e.key==='ArrowRight'?(idx+1)%navButtons.length:(idx-1+navButtons.length)%navButtons.length;
      navButtons[next].focus(); navButtons[next].click();
    }
  }
});
