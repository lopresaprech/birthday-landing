// Переключение экранов
function goTo(player) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + player).classList.add('active');

  if (player === 'iluha') {
    startIluhaMusic();
  }
  if (player === 'vanya') {
    startVanyaMusic();
  }
}

function goBack() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-choose').classList.add('active');
  stopAllMusic();
  // Сброс результатов
  resetResult('vanya');
  resetResult('iluha');
}

// ── МУЗЫКА ──────────────────────────────────────────────────
// Музыка через iframe SoundCloud (embed API)
let iluhaWidget = null;
let vanyaWidget = null;

function buildSCEmbed(url, id) {
  const iframe = document.createElement('iframe');
  iframe.id = id;
  iframe.allow = 'autoplay';
  iframe.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url) +
    '&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false&buying=false&sharing=false&download=false';
  iframe.style.cssText = 'position:fixed;bottom:-200px;left:-200px;width:1px;height:1px;opacity:0;pointer-events:none;';
  document.body.appendChild(iframe);
  return iframe;
}

function startIluhaMusic() {
  if (!document.getElementById('sc-iluha')) {
    buildSCEmbed('https://soundcloud.com/rusyarapscene/dead-blonde-bankomat', 'sc-iluha');
  } else {
    const w = SC.Widget(document.getElementById('sc-iluha'));
    w.play();
  }
}

function startVanyaMusic() {
  if (!document.getElementById('sc-vanya')) {
    buildSCEmbed('https://soundcloud.com/newlightchildsss/sei-chas-1', 'sc-vanya');
  } else {
    const w = SC.Widget(document.getElementById('sc-vanya'));
    w.play();
  }
}

function stopAllMusic() {
  ['sc-iluha', 'sc-vanya'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      try {
        const w = SC.Widget(el);
        w.pause();
      } catch(e) {}
    }
  });
}

// ── ОТВЕТЫ ВАНИ ─────────────────────────────────────────────
function answerVanya(choice) {
  const box = document.getElementById('vanya-result');
  box.classList.remove('hidden', 'yes-result', 'no-result');

  if (choice === 'yes') {
    box.classList.add('yes-result');
    box.innerHTML = `
      <div style="font-size:22px;margin-bottom:8px">💪 ВОТ ЭТО ВАНЯ!</div>
      Мажор 2026 ждёт тебя. Засядем, сделаем всех — как NAVI в финале.<br>
      <a class="dc-link" href="https://discord.gg/" target="_blank">🎮 Зайди в DC · DS: blyadtakay123</a>
    `;
  } else {
    box.classList.add('no-result');
    box.innerHTML = `
      <div style="font-size:20px;margin-bottom:8px">🤡 Значит, дела важнее?</div>
      Ваня, ты уже <b>третий раз</b> кинул нас ради "другого дела"...<br>
      Мы начали подозревать, что твоё "дело" — это Minecraft соло в 3 ночи.<br>
      <span style="font-size:13px;color:rgba(255,150,150,0.7);margin-top:8px;display:block">
        P.S. Монеси тоже так говорил — и потом весь вечер жалел 💀
      </span>
    `;
  }
}

// ── ОТВЕТЫ ИЛЮХИ ────────────────────────────────────────────
let iluhaLocked = false;

function answerIluha(choice) {
  if (iluhaLocked) return;

  const box = document.getElementById('iluha-result');
  box.classList.remove('hidden', 'yes-result', 'no-result');

  if (choice === 'yes') {
    iluhaLocked = true;
    // Скрыть кнопки навсегда
    document.getElementById('iluha-btns').style.display = 'none';

    box.classList.add('yes-result');
    box.innerHTML = `
      <div style="font-size:22px;margin-bottom:8px">🔥 ИЛЮХА В ДЕЛЕ!</div>
      Назад дороги нет — ты уже нажал, братан 😈<br>
      Монеси отказывался — и потом сидел смотрел как мы рейтинг набиваем.<br>
      Не повторяй его путь. Ждём тебя в DC:<br>
      <a class="dc-link" href="https://discord.gg/" target="_blank">🎮 Зайди в DC · DS: blyadtakay123</a>
      <div style="margin-top:10px;font-size:13px;color:rgba(180,255,200,0.6)">
        P.S. Нажал — значит дал слово. Это закон.
      </div>
    `;
  } else {
    box.classList.add('no-result');
    box.innerHTML = `
      <div style="font-size:20px;margin-bottom:8px">😐 Нет, значит нет...</div>
      Окей, Илюха. Просто знай — Монеси тоже говорил "нет".<br>
      Теперь у него <b>скин AWP Азимов</b> за 0 рублей и вечный позор 💀<br>
      <span style="font-size:13px;color:rgba(255,130,130,0.65);display:block;margin-top:8px">
        Ещё можешь передумать... кнопка "Да" всё ещё тебя любит 👆
      </span>
    `;
  }
}

function resetResult(player) {
  const box = document.getElementById(player + '-result');
  if (box) {
    box.classList.add('hidden');
    box.innerHTML = '';
    box.classList.remove('yes-result', 'no-result');
  }
  if (player === 'iluha') {
    iluhaLocked = false;
    const btns = document.getElementById('iluha-btns');
    if (btns) btns.style.display = 'flex';
  }
}
