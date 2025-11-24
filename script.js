// Генерация конфетти
const confetti = document.getElementById("confetti");
const pieces = 150;

for (let i = 0; i < pieces; i++) {
  const conf = document.createElement("div");
  conf.classList.add("confetti-piece");

  const hue = Math.floor(Math.random() * 360);
  const left = Math.random() * 100;
  const duration = 3 + Math.random() * 5;
  const rotate = Math.random() * 360 + "deg";

  conf.style.setProperty("--hue", hue);
  conf.style.left = left + "vw";
  conf.style.setProperty("--duration", duration + "s");
  conf.style.setProperty("--rotation", rotate);

  confetti.appendChild(conf);
}
