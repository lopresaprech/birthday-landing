// Ждём, пока всё загрузится
window.addEventListener("load", function () {
  const iframe = document.getElementById("sc-player");
  const playBtn = document.getElementById("play-btn");
  const customPlayer = document.getElementById("custom-player");
  const progressInner = customPlayer.querySelector(".progress-inner");

  if (!iframe || !playBtn || !customPlayer || !progressInner || typeof SC === "undefined") {
    // Если что-то не подгрузилось, просто выходим
    return;
  }

  // Инициализация виджета SoundCloud
  const widget = SC.Widget(iframe);
  let isPlaying = false;

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      playBtn.classList.add("playing");
      customPlayer.classList.add("playing");
      // Перезапустить "фейковый" прогресс
      progressInner.style.animation = "none";
      void progressInner.offsetWidth; // перезапуск анимации
      progressInner.style.animation = "";
      progressInner.style.animationPlayState = "running";
    } else {
      playBtn.classList.remove("playing");
      customPlayer.classList.remove("playing");
      // Остановить прогресс
      progressInner.style.animationPlayState = "paused";
    }
  }

  // Клик по кастомной кнопке
  playBtn.addEventListener("click", () => {
    if (!isPlaying) {
      widget.play();
    } else {
      widget.pause();
    }
  });

  // События SoundCloud
  widget.bind(SC.Widget.Events.PLAY, function () {
    setPlayingState(true);
  });

  widget.bind(SC.Widget.Events.PAUSE, function () {
    setPlayingState(false);
  });

  widget.bind(SC.Widget.Events.FINISH, function () {
    setPlayingState(false);
    // Вернуть прогресс к началу
    progressInner.style.animation = "none";
    void progressInner.offsetWidth;
    progressInner.style.animation = "";
    progressInner.style.animationPlayState = "paused";
  });
});


