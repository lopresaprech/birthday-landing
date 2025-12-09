const btn = document.getElementById('playPauseBtn');
const bar = document.getElementById('progress');
const card = document.getElementById('heroCard');
const widget = SC.Widget(document.getElementById('scWidget'));

let playing = false;
let duration = 0;

widget.bind(SC.Widget.Events.READY, () => {
    widget.getDuration(d => duration = d || 0);
});

btn.addEventListener('click', () => {
    playing ? widget.pause() : widget.play();
});

widget.bind(SC.Widget.Events.PLAY, () => {
    playing = true;
    btn.textContent = '❚❚';
    card.classList.add('playing');
});

widget.bind(SC.Widget.Events.PAUSE, () => {
    playing = false;
    btn.textContent = '▶';
    card.classList.remove('playing');
});

widget.bind(SC.Widget.Events.FINISH, () => {
    playing = false;
    bar.style.width = '0%';
    btn.textContent = '▶';
    card.classList.remove('playing');
});

widget.bind(SC.Widget.Events.PLAY_PROGRESS, e => {
    if (!duration) return;
    const percent = (e.currentPosition / duration) * 100;
    bar.style.width = percent + '%';
});
