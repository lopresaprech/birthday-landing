// Ждём, пока всё загрузится
window.addEventListener("load", function () {
  const iframe = document.getElementById("sc-player");
  const playBtn = document.getElementById("play-btn");
  const customPlayer = document.getElementById("custom-player");
  const progressInner = customPlayer.querySelector(".progress-inner");

  if (!iframe || !playBtn || !customPlayer || !progressInner || typeof SC === "undefined") {
    return;
  }

  // простая проверка мобилки
  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  const widget = SC.Widget(iframe);
  let isPlaying = false;

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      playBtn.classList.add("playing");
      customPlayer.classList.add("playing");
      // перезапуск "фейкового" прогресса
      progressInner.style.animation = "none";
      void progressInner.offsetWidth;
      progressInner.style.animation = "";
      progressInner.style.animationPlayState = "running";
    } else {
      playBtn.classList.remove("playing");
      customPlayer.classList.remove("playing");
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

  // Автоплей на десктопе (на мобилках браузеры блокируют звук без клика)
  widget.bind(SC.Widget.Events.READY, function () {
    if (!isMobile()) {
      widget.play(); // если браузер разрешит — трек сам стартанёт
    }
  });

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

