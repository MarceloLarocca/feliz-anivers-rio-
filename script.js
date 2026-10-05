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
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const effectsChoice = find('enable-effects');
  find('motion-choice').hidden = !motionQuery.matches;
  let serveFrame = 0, fireFrame = 0;
  const effectsAllowed = () => !reduced() || effectsChoice.checked;
  const stopEffects = () => {
    cancelAnimationFrame(serveFrame); cancelAnimationFrame(fireFrame);
    find('fireworks').replaceChildren();
    const ball = root.querySelector('.serve-ball');
    ball.style.transform = '';
  };
  effectsChoice.addEventListener('change', () => {
    if (!effectsAllowed()) stopEffects();
  });
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', () => {
    find('motion-choice').hidden = !motionQuery.matches;
    if (!effectsAllowed()) stopEffects();
  });
  function revealEffect(element) {
    const rect = element.getBoundingClientRect();
    if (rect.top < 15 || rect.bottom > window.innerHeight - 15) {
      element.scrollIntoView({block:'center',behavior:'instant'});
    }
  }
  function serve() {
    const court = find('serve-court');
    const ball = root.querySelector('.serve-ball');
    cancelAnimationFrame(serveFrame);
    court.classList.remove('serving');
    ball.style.transform = '';
    if (!effectsAllowed()) return;
    revealEffect(court);
    const distance = Math.max(0, court.clientWidth * .74);
    let started;
    function step(now) {
      if (started === undefined) started = now;
      const progress = Math.min(1, (now - started) / 1250);
      const height = Math.sin(progress * Math.PI) * 115;
      ball.style.transform = 'translate3d(' + (distance * progress) + 'px,' + (-height) + 'px,0) rotate(' + (progress * 320) + 'deg)';
      if (progress < 1) serveFrame = requestAnimationFrame(step);
    }
    serveFrame = requestAnimationFrame(step);
  }

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
    stopEffects();
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
    serve();
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
  celebrate.addEventListener('click', () => {
    cancelAnimationFrame(fireFrame);
    fireworks.replaceChildren();
    find('celebrate-message').textContent = 'Feliz aniversário, Livia! Que venham momentos inesquecíveis.';
    celebrate.textContent = 'Celebrar mais uma vez ✦';
    find('finale').classList.add('celebrated');
    if (!effectsAllowed()) return;
    revealEffect(celebrate);
    const width = fireworks.clientWidth;
    const height = fireworks.clientHeight;
    const buttonBox = celebrate.getBoundingClientRect();
    const layerBox = fireworks.getBoundingClientRect();
    const centerY = Math.max(70, Math.min(height - 70, buttonBox.top - layerBox.top - 40));
    const particles = [];
    const colors = ['#c9a3ff','#eee0ff','#fffaf3','#d2b477'];
    for (let burst = 0; burst < 3; burst++) {
      const x = width * [.22,.78,.5][burst];
      const y = Math.max(55,centerY - (burst === 2 ? 60 : 0));
      for (let i = 0; i < 18; i++) {
        const spark = document.createElement('span');
        spark.className = 'mobile-spark';
        spark.style.left = x + 'px'; spark.style.top = y + 'px';
        spark.style.background = colors[i % 4];
        spark.style.color = colors[i % 4];
        fireworks.appendChild(spark);
        particles.push({element:spark,angle:i*Math.PI*2/18,radius:Math.min(width*.24,95)*(0.7+Math.random()*.3),delay:burst*280});
      }
    }
    let started;
    function step(now) {
      if (started === undefined) started = now;
      const elapsed = now - started;
      for (const p of particles) {
        const progress = (elapsed - p.delay) / 1550;
        if (progress < 0 || progress > 1) {p.element.style.opacity = '0';continue;}
        const travel = 1 - Math.pow(1-progress,2);
        p.element.style.transform = 'translate3d(' + (Math.cos(p.angle)*p.radius*travel) + 'px,' + (Math.sin(p.angle)*p.radius*travel+22*progress*progress) + 'px,0)';
        p.element.style.opacity = String(Math.min(1,progress*10)*(1-progress));
      }
      if (elapsed < 2250) fireFrame = requestAnimationFrame(step);
      else fireworks.replaceChildren();
    }
    fireFrame = requestAnimationFrame(step);
  });

  try { if (!isPreview && sessionStorage.getItem(sessionKey) === 'yes') showPage(false); } catch (_) { /* Keep the introduction usable. */ }
})();
