// КАСТОМНЫЙ ПЛЕЕР ДЛЯ SOUNDCLOUD

const playPauseBtn = document.getElementById("playPauseBtn");
const progressEl = document.getElementById("progress");
const timeLabel = document.getElementById("timeLabel");
const heroCard = document.getElementById("heroCard");

const iframe = document.getElementById("scWidget");
const widget = SC.Widget(iframe);

let isPlaying = false;
let durationMs = null;

// формат времени mm:ss
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

// начальное состояние времени
timeLabel.textContent = "0:00 / —:—";

// когда виджет готов
widget.bind(SC.Widget.Events.READY, () => {
    widget.getDuration(dur => {
        if (dur && dur > 0) {
            durationMs = dur;
            timeLabel.textContent = `0:00 / ${formatTime(durationMs)}`;
        }
    });
});

// обновление прогресса
widget.bind(SC.Widget.Events.PLAY_PROGRESS, e => {
    if (!durationMs && e.duration) {
        durationMs = e.duration;
        timeLabel.textContent = `0:00 / ${formatTime(durationMs)}`;
    }

    if (!durationMs) return;

    const current = e.currentPosition;
    const progress = current / durationMs;

    progressEl.style.width = `${progress * 100}%`;
    timeLabel.textContent = `${formatTime(current)} / ${formatTime(durationMs)}`;
});


// обработка Play / Pause
playPauseBtn.addEventListener("click", () => {
    if (!isPlaying) {
        widget.play();
        isPlaying = true;
        playPauseBtn.textContent = "❚❚";
        heroCard.classList.add("playing");
    } else {
        widget.pause();
        isPlaying = false;
        playPauseBtn.textContent = "▶";
        heroCard.classList.remove("playing");
    }
});

// если трек закончился — вернуть кнопку в старт
widget.bind(SC.Widget.Events.FINISH, function () {
    isPlaying = false;
    playPauseBtn.textContent = "▶";
    heroCard.classList.remove("playing");
    progressEl.style.width = "0%";
    timeLabel.textContent = `0:00 / ${durationMs ? formatTime(durationMs) : "0:00"}`;
});

