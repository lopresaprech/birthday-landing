// КАСТОМНЫЙ ПЛЕЕР ДЛЯ SOUNDCLOUD

const playPauseBtn = document.getElementById("playPauseBtn");
const progressEl = document.getElementById("progress");
const timeLabel = document.getElementById("timeLabel");
const heroCard = document.getElementById("heroCard");

const iframe = document.getElementById("scWidget");
const widget = SC.Widget(iframe);

let isPlaying = false;
let durationMs = 0;

// формат времени mm:ss
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

// когда виджет готов
widget.bind(SC.Widget.Events.READY, function () {
    widget.getDuration(function (dur) {
        durationMs = dur || 0;
        timeLabel.textContent = `0:00 / ${durationMs ? formatTime(durationMs) : "0:00"}`;
    });
});

// обновление прогресса
widget.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
    if (durationMs === 0 && e.duration) {
        durationMs = e.duration;
    }

    const current = e.currentPosition || 0;
    const rel = e.relativePosition || (durationMs ? current / durationMs : 0);

    progressEl.style.width = `${rel * 100}%`;
    const left = formatTime(current);
    const total = durationMs ? formatTime(durationMs) : "0:00";
    timeLabel.textContent = `${left} / ${total}`;
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
