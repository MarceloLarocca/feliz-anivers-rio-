(() => {
  'use strict';
  const root = document.getElementById('livia-birthday');
  if (!root) return;
  const find = id => root.querySelector('#' + id);
  const opening = find('opening');
  const celebration = find('celebration');
  const enter = find('enter');
  const envelope = find('open-letter');
  const letter = find('letter');
  const wrap = find('mail-wrap');
  const wishButton = find('make-wish');
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isPreview = root.hasAttribute('data-preview');
  const sessionKey = 'livia-birthday-october5-night-v4';
  let entering = false;
  let letterBusy = false;
  let petalCleanup;

  function remember(value) {
    if (isPreview) return;
    try { value ? sessionStorage.setItem(sessionKey, 'yes') : sessionStorage.removeItem(sessionKey); } catch (_) { /* The page also works with storage disabled. */ }
  }
  function petals() {
    if (reduced()) return;
    const layer = find('petals');
    clearTimeout(petalCleanup);
    layer.replaceChildren();
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.background = ['#9e7ab7','#9767b9','#e0d1eb'][i % 3];
      p.style.left = (Math.random() * 92) + '%';
      p.style.opacity = String(.25 + Math.random() * .4);
      p.style.animationDuration = (3 + Math.random() * 2) + 's';
      p.style.animationDelay = (Math.random() * .7) + 's';
      layer.appendChild(p);
    }
    petalCleanup = setTimeout(() => layer.replaceChildren(), 6000);
  }
  function showPage(animate) {
    opening.hidden = true;
    opening.classList.remove('leaving');
    celebration.hidden = false;
    celebration.classList.toggle('arriving', animate && !reduced());
    entering = false;
    enter.disabled = false;
    if (animate) {
      find('birthday-title').focus({ preventScroll: true });
      root.scrollIntoView({ block: 'start', behavior: 'instant' });
      // The short crossing ball is the opening celebration.
    }
  }
  enter.addEventListener('click', () => {
    if (entering) return;
    entering = true;
    enter.disabled = true;
    remember(true);
    opening.classList.add('leaving');
    if (!reduced()) {
      const flight = find('transition-ball');
      flight.hidden = false;
      setTimeout(() => { flight.hidden = true; }, 1000);
    }
    showPage(true);
  });
  find('replay').addEventListener('click', () => {
    remember(false);
    celebration.hidden = true;
    opening.hidden = false;
    opening.classList.remove('leaving');
    find('petals').replaceChildren();
    find('transition-ball').hidden = true;
    root.scrollIntoView({ block: 'start', behavior: 'instant' });
    enter.focus({ preventScroll: true });
  });
  envelope.addEventListener('click', () => {
    if (letterBusy) return;
    letterBusy = true;
    envelope.disabled = true;
    envelope.setAttribute('aria-expanded', 'true');
    wrap.classList.add('is-opening');
    setTimeout(() => {
      envelope.hidden = true;
      letter.hidden = false;
      letterBusy = false;
      find('dear-livia').focus({ preventScroll: true });
    }, reduced() ? 0 : 430);
  });
  find('close-letter').addEventListener('click', () => {
    letter.classList.add('folding');
    setTimeout(() => {
    letter.hidden = true;
    letter.classList.remove('folding');
    wrap.classList.remove('is-opening');
    envelope.hidden = false;
    envelope.disabled = false;
    envelope.setAttribute('aria-expanded', 'false');
    envelope.focus({ preventScroll: true });
    find('letter-section').scrollIntoView({ block: 'start', behavior: reduced() ? 'instant' : 'smooth' });
    }, reduced() ? 0 : 220);
  });
  wishButton.addEventListener('click', () => {
    find('wish-message').textContent = 'Que este novo ciclo traga lindas surpresas para você. Que venham muitos sonhos realizados e motivos para comemorar! ♡';
    wishButton.setAttribute('aria-expanded', 'true');
    wishButton.textContent = 'Pedido feito ♡';
    if (!reduced()) {
      const court = find('serve-court');
      court.classList.remove('serving');
      void court.offsetWidth;
      court.classList.add('serving');
    }
  });

  const candleButton = find('candle-toggle');
  let candleOut = false;
  candleButton.addEventListener('click', () => {
    candleOut = !candleOut;
    find('candle-scene').classList.toggle('is-out', candleOut);
    find('candle-scene').setAttribute('aria-label', candleOut ? 'Vela apagada sobre um pequeno bolo' : 'Vela acesa sobre um pequeno bolo');
    candleButton.setAttribute('aria-pressed', String(candleOut));
    candleButton.textContent = candleOut ? 'Acender de novo ✧' : 'Apagar a vela ✧';
    find('candle-message').textContent = candleOut ? 'Que esse desejo encontre um caminho para acontecer. ♡' : '';
  });
  const celebrate = find('celebrate');
  const fireworks = find('fireworks');
  let fireworksCleanup;
  celebrate.addEventListener('click', () => {
    clearTimeout(fireworksCleanup);
    fireworks.replaceChildren();
    find('celebrate-message').textContent = 'Feliz aniversário, Livia! Que venham momentos inesquecíveis.';
    celebrate.textContent = 'Celebrar mais uma vez ✦';
    find('finale').classList.add('celebrated');
    if (reduced()) return;
    const positions = [[18,27],[78,20],[48,12],[85,65]];
    const colors = ['#c9a3ff','#eee0ff','#fffaf3','#d2b477'];
    positions.forEach(([x,y],burst) => {
      for(let i=0;i<16;i++){
        const spark=document.createElement('span');
        const angle=(i/16)*Math.PI*2;
        const radius=40+Math.random()*48;
        spark.className='firework-spark';
        spark.style.left=x+'%';spark.style.top=y+'%';
        spark.style.setProperty('--dx',Math.cos(angle)*radius+'px');
        spark.style.setProperty('--dy',Math.sin(angle)*radius+'px');
        spark.style.background=colors[i%colors.length];
        spark.style.animationDelay=burst*.35+'s';
        fireworks.appendChild(spark);
      }
    });
    fireworksCleanup=setTimeout(()=>fireworks.replaceChildren(),3200);
  });

  try { if (!isPreview && sessionStorage.getItem(sessionKey) === 'yes') showPage(false); } catch (_) { /* Keep the introduction usable. */ }
})();
