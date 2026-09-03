/* ============ SERAPH / MYTHOS — motor de motion ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- i18n PT/EN (default EN, igual portfólio) ---------- */
  const I18N = {
    nav1: { pt: 'O Verbo', en: 'The Word' },
    nav2: { pt: 'O Códice', en: 'The Codex' },
    nav3: { pt: 'O Chamado', en: 'The Calling' },
    cta: { pt: 'Invocar ↗', en: 'Summon ↗' },
    eyebrow: { pt: '<span>Livro I</span> — E a lâmina foi dada a quem não temesse a noite', en: '<span>Book I</span> — And the blade was given to those who feared not the night' },
    sub: { pt: 'No princípio era a Luz — e a Treva jurou apagá-la.', en: 'In the beginning there was Light — and the Darkness swore to snuff it out.' },
    ch1h: { pt: 'O Bem', en: 'The Good' },
    ch1p: { pt: 'E desceu dos altos céus o Guardião; abriu as asas sobre o mundo e ergueu a lâmina — e o abismo recuou diante de seu nome.', en: 'And from the high heavens the Guardian descended; he spread his wings over the world and raised the blade — and the abyss recoiled before his name.' },
    ch2h: { pt: 'O Mal', en: 'The Evil' },
    ch2p: { pt: 'Mas das cinzas do orgulho ergueu-se o Caído, com fogo nas fendas da carne, jurando apagar toda aurora que ousasse nascer.', en: 'But from the ashes of pride the Fallen arose, fire in the fissures of his flesh, swearing to snuff out every dawn that dared to rise.' },
    ch3h: { pt: 'O Confronto', en: 'The Reckoning' },
    ch3p: { pt: 'Então o céu se partiu ao meio. Duas forças, uma só lâmina — e onde o aço beijou o aço, decidiu-se a sorte de tudo quanto respira.', en: 'Then the heavens were split in twain. Two powers, a single blade — and where steel kissed steel, the fate of all that breathes was sealed.' },
    manLabel: { pt: '<span>Gênesis · 01</span> — O Verbo', en: '<span>Genesis · 01</span> — The Word' },
    manStmt: { pt: 'No princípio, o caos. Então demos forma à <em>luz</em>, voz ao movimento e nome àquilo que ainda não existia — e vimos que era <em>bom</em>.', en: 'In the beginning, the void. Then we gave form to <em>light</em>, voice to motion, and a name to that which did not yet exist — and we saw that it was <em>good</em>.' },
    manFoot: { pt: 'Não moldamos imagens. Moldamos aquilo que os olhos hão de lembrar quando toda luz se apagar.', en: 'We do not shape images. We shape what the eyes shall remember when all light has gone out.' },
    workH: { pt: 'O Códice', en: 'The Codex' },
    workCount: { pt: 'Três provações · MMXXVI', en: 'Three trials · MMXXVI' },
    o1h: { pt: 'A Vigília', en: 'The Vigil' }, o1e: { pt: 'Ajoelhou-se, antes do fim do mundo', en: 'He knelt, before the end of the world' },
    o2h: { pt: 'A Queda', en: 'The Fall' }, o2e: { pt: 'Quis tocar o sol, e ardeu', en: 'He reached for the sun, and burned' },
    o3h: { pt: 'O Juízo', en: 'The Judgment' }, o3e: { pt: 'Aço contra aço, alma contra alma', en: 'Steel against steel, soul against soul' },
    cineLine: { pt: 'E A TREVA<br/>NÃO A VENCEU.', en: 'YET THE DARKNESS<br/>OVERCAME IT NOT.' },
    statsLabel: { pt: '<span>O Testemunho</span> — aquilo que ficou escrito', en: '<span>The Testament</span> — that which was written' },
    stat1: { pt: 'Almas forjadas em edição limitada', en: 'Souls forged in limited edition' },
    stat2: { pt: 'Olhos que testemunharam a luz', en: 'Eyes that witnessed the light' },
    stat3: { pt: 'Batalhas travadas desde a primeira aurora', en: 'Battles waged since the first dawn' },
    sidesLabel: { pt: '<span>O Juramento</span> — e a ti, a quem servirás?', en: '<span>The Oath</span> — and thou, whom shalt thou serve?' },
    luzKick: { pt: 'Ordem · Aurora', en: 'Order · Dawn' }, luzName: { pt: 'LUZ', en: 'LIGHT' },
    luzDesc: { pt: 'Guardar a última aurora. Erguer a lâmina, ainda que sozinho, contra toda a noite.', en: 'Guard the last dawn. Raise the blade, though alone, against all the night.' },
    trevaKick: { pt: 'Caos · Cinzas', en: 'Chaos · Ashes' }, trevaName: { pt: 'TREVA', en: 'DARK' },
    trevaDesc: { pt: 'Queimar o mundo velho — e, sobre as cinzas, escrever o teu próprio nome.', en: 'Burn the old world — and upon its ashes, write thine own name.' },
    sidesHint: { pt: 'Teu juramento reescreve o mundo.', en: 'Thy oath rewrites the world.' },
    hintLuz: { pt: 'Juraste à Luz. Que a aurora te guarde.', en: 'Thou hast sworn to the Light. May the dawn keep thee.' },
    hintTreva: { pt: 'Juraste à Treva. Que o mundo arda contigo.', en: 'Thou hast sworn to the Dark. May the world burn with thee.' },
    contactLabel: { pt: '<span>O Chamado · 05</span>', en: '<span>The Calling · 05</span>' },
    contactTitle: { pt: 'Tens uma guerra a travar?', en: 'Hast thou a war to wage?' },
    footer: { pt: 'Forjado em luz e sombra.', en: 'Forged in light and shadow.' },
    sound: { pt: 'Som', en: 'Sound' },
    scroll: { pt: 'Role', en: 'Scroll' },
  };
  let LANG = 'en';
  try { const s = sessionStorage.getItem('seraph-lang'); if (s === 'pt' || s === 'en') LANG = s; } catch (e) {}
  window.__hintChosen = (side) => (side === 'luz' ? I18N.hintLuz[LANG] : I18N.hintTreva[LANG]);
  function applyLang(l) {
    LANG = l; window.__lang = l;
    document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : 'en');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.dataset.i18n; if (I18N[k] && I18N[k][l] != null) el.innerHTML = I18N[k][l];
    });
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((s) => s.classList.toggle('is-active', s.dataset.lang === l));
    const side = document.documentElement.dataset.side, hint = document.querySelector('.sides__hint');
    if (side && hint) hint.innerHTML = window.__hintChosen(side);
  }
  applyLang(LANG);
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    const nl = LANG === 'pt' ? 'en' : 'pt';
    try { sessionStorage.setItem('seraph-lang', nl); } catch (e) {}
    applyLang(nl);
  });

  /* ---------- flash do juramento (efeito ao escolher lado) ---------- */
  window.__worldFlash = function (side) {
    const f = document.querySelector('.world-flash'); if (!f) return;
    f.style.background = side === 'luz'
      ? 'radial-gradient(circle at 50% 45%, rgba(255,248,224,.95), rgba(231,200,119,.5) 45%, transparent 75%)'
      : 'radial-gradient(circle at 50% 55%, rgba(226,84,47,.95), rgba(120,20,15,.55) 45%, transparent 75%)';
    gsap.killTweensOf(f);
    gsap.fromTo(f, { opacity: 0 }, { opacity: 0.9, duration: 0.12, ease: 'power2.out',
      onComplete: () => gsap.to(f, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }) });
    if (!reduce) gsap.fromTo('main', { x: -7 }, { x: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
  };

  /* ---------- split de texto por caractere (sem plugin premium) ---------- */
  function splitChars(el) {
    const nodes = [...el.childNodes];
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    el.innerHTML = '';
    nodes.forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'BR') { el.appendChild(document.createElement('br')); return; }
      [...(node.textContent || '')].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? ' ' : ch;
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
      });
    });
    return el.querySelectorAll('.char');
  }

  /* ---------- Lenis (scroll suave) casado com ScrollTrigger ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // âncoras usam o Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: -40 }); }
      });
    });
  }

  /* ---------- vídeos de fundo: boomerang (frente+ré) = loop nativo perfeito ---------- */
  (function bgVideos() {
    document.querySelectorAll('.bg[data-video]').forEach((box) => {
      const src = box.dataset.video, poster = box.dataset.poster;
      if (poster) box.style.backgroundImage = `url('${poster}')`;
      box.style.backgroundSize = 'cover'; box.style.backgroundPosition = 'center';
      if (!src || reduce) return; // reduced-motion: fica no still
      const v = document.createElement('video');
      v.className = 'bg__v'; v.src = src; v.muted = true; v.loop = true;
      v.playsInline = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('loop', '');
      v.style.opacity = '1';
      box.appendChild(v);
      v.addEventListener('loadeddata', () => v.play().catch(() => {}), { once: true });
    });
  })();

  /* ---------- abertura cinematográfica (fade from black + letterbox) ---------- */
  const veil = document.querySelector('.intro-veil');
  const barsIn = gsap.timeline();
  if (reduce) {
    gsap.set(veil, { autoAlpha: 0 });
  } else {
    barsIn.set('.cinebar', { height: '12vh' })
      .to(veil, { autoAlpha: 0, duration: 1.1, ease: 'power2.inOut' }, 0.2)
      .to('.cinebar', { height: 0, duration: 1.2, ease: 'power3.inOut' }, 0.6);
  }

  /* ---------- brasas / poeira flutuante (canvas) ---------- */
  (function embers() {
    const canvas = document.querySelector('.embers');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, parts = [];
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const host = canvas.parentElement || canvas;
      const rw = host.clientWidth || window.innerWidth;
      const rh = host.clientHeight || window.innerHeight;
      w = canvas.width = rw * dpr; h = canvas.height = rh * dpr;
      const need = Math.min(120, Math.floor((rw * rh) / 14000));
      if (parts.length < need) while (parts.length < need) parts.push(spawn());
    }
    function spawn() {
      return {
        x: Math.random() * w, y: h + Math.random() * h * 0.3,
        r: (Math.random() * 1.6 + 0.4) * dpr,
        vy: -(Math.random() * 0.35 + 0.12) * dpr,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        life: Math.random(), tw: Math.random() * 0.04 + 0.01,
        gold: Math.random() > 0.35,
      };
    }
    size();
    window.addEventListener('load', size);
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.life += p.tw;
        const a = (0.4 + Math.sin(p.life) * 0.35) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(231,200,119,${a})` : `rgba(255,240,214,${a * 0.7})`;
        ctx.shadowBlur = 8 * dpr; ctx.shadowColor = 'rgba(231,200,119,.8)';
        ctx.fill();
        if (p.y < -10 || p.x < -10 || p.x > w + 10) Object.assign(p, spawn(), { y: h + 10 });
      }
      raf = requestAnimationFrame(frame);
    }
    let raf = requestAnimationFrame(frame);
    window.addEventListener('resize', size);
  })();

  /* ---------- barra de progresso ---------- */
  const bar = document.querySelector('[data-progress]');
  if (bar) {
    gsap.to(bar, {
      width: '100%', ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  }

  /* ---------- ATO I: hero pinned com narrativa ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    // título entra por letra
    const titleEl = document.querySelector('.hero__title');
    const titleChars = splitChars(document.querySelector('.hero__title .display'));
    gsap.set(titleChars, { yPercent: 130, opacity: 0, rotateX: -40 });
    gsap.to(titleChars, {
      yPercent: 0, opacity: 1, rotateX: 0, ease: 'power4.out', duration: 1.3,
      stagger: 0.08, delay: 1.2,
      onStart: () => titleEl.classList.add('is-in'),
    });
    gsap.from('.hero .eyebrow', { opacity: 0, y: 20, duration: 1, delay: 1.0 });
    gsap.from('.hero__sub', { opacity: 0, y: 20, duration: 1, delay: 2.0 });

    const bgBem = document.querySelector('.bg--bem');
    const bgMal = document.querySelector('.bg--mal');
    const bgFim = document.querySelector('.bg--fim');
    const chapters = gsap.utils.toArray('.chapter');
    const rays = document.querySelector('.stage__rays');
    const grade = document.querySelector('.stage__grade');
    const burst = document.querySelector('.clash-burst');

    // timeline mestre presa ao scroll do hero (scrub = segue o dedo)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero, start: 'top top', end: 'bottom bottom',
        scrub: 1, pin: '.hero__pin', anticipatePin: 1,
      },
    });

    // capítulo I — O BEM
    tl.fromTo(bgBem, { scale: 1.12 }, { scale: 1.02, ease: 'none', duration: 0.34 }, 0)
      .to(chapters[0], { opacity: 1, duration: 0.15 }, 0.02)
      .to(chapters[0], { opacity: 0, y: -30, duration: 0.1 }, 0.3)
      // capítulo II — O MAL (crossfade bem → mal)
      .to(bgBem, { opacity: 0, duration: 0.15 }, 0.32)
      .fromTo(bgMal, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1.02, duration: 0.18 }, 0.32)
      .fromTo(chapters[1], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.15 }, 0.37)
      .to(chapters[1], { opacity: 0, y: -30, duration: 0.1 }, 0.62)
      // grade de cor: dourado (Bem) → crimson frio (Mal)
      .to(grade, { backgroundColor: 'rgba(143,33,25,0.5)', duration: 0.2 }, 0.34)
      // capítulo III — O CONFRONTO (crossfade mal → fim) + BURST de impacto
      .to(bgMal, { opacity: 0, duration: 0.15 }, 0.64)
      .fromTo(bgFim, { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1.0, duration: 0.22 }, 0.63)
      .fromTo(rays, { opacity: 0.25 }, { opacity: 0.7, duration: 0.2 }, 0.64)
      .to(grade, { backgroundColor: 'rgba(233,226,210,0.28)', duration: 0.18 }, 0.64)
      .fromTo(burst, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.63)   // clarão no impacto
      .to(burst, { opacity: 0, duration: 0.14 }, 0.68)
      .fromTo(chapters[2], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.15 }, 0.72)
      // título some cedo pra liberar a cena
      .to('.hero__title', { opacity: 0, y: -40, duration: 0.15 }, 0.28)
      .to('.scroll-hint', { opacity: 0, duration: 0.1 }, 0.05);

    // parallax leve das camadas
    gsap.utils.toArray('[data-depth]').forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      gsap.to(layer, {
        yPercent: -depth * 100, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
  }

  /* ---------- ATO II: manifesto — reveal linha a linha ---------- */
  const statement = document.querySelector('[data-lines]');
  if (statement) {
    // envolve em .line > span pra máscara de subida
    const html = statement.innerHTML;
    const words = html.split(' ');
    // reveal simples por palavra com máscara
    statement.innerHTML = '<span class="line"><span>' + words.join(' ') + '</span></span>';
    gsap.from(statement.querySelector('.line > span'), {
      yPercent: 110, opacity: 0, ease: 'power4.out', duration: 1.2,
      scrollTrigger: { trigger: statement, start: 'top 80%' },
    });
    gsap.from('.manifesto__foot', {
      opacity: 0, y: 30, duration: 1,
      scrollTrigger: { trigger: '.manifesto__foot', start: 'top 90%' },
    });
  }

  /* ---------- ATO III: cards das obras ---------- */
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.to(card, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: (i % 2) * 0.08,
      scrollTrigger: { trigger: card, start: 'top 88%' },
    });
  });

  /* ---------- ATO IV: cinematográfico — zoom out no pin ---------- */
  const cine = document.querySelector('.cinematic');
  if (cine) {
    gsap.to('.cinematic__img', {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: cine, start: 'top top', end: 'bottom bottom', scrub: true, pin: '.cinematic__pin' },
    });
    const cineChars = splitChars(document.querySelector('.cinematic__line'));
    gsap.from(cineChars, {
      opacity: 0, yPercent: 60, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: cine, start: 'top 40%' },
    });
  }

  /* ---------- STATS: count-up ---------- */
  gsap.utils.toArray('.stat__num').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
    });
  });

  /* ---------- contato ---------- */
  const ctitle = document.querySelector('.contact__title');
  if (ctitle) {
    const cchars = splitChars(ctitle);
    gsap.from(cchars, {
      opacity: 0, yPercent: 100, stagger: 0.03, ease: 'power3.out',
      scrollTrigger: { trigger: ctitle, start: 'top 85%' },
    });
  }

  /* ---------- cursor customizado (imersão) ---------- */
  (function cursor() {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const ring = document.querySelector('.cursor');
    const dot = document.querySelector('.cursor__dot');
    if (!ring || !dot) return;
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.set(dot, { x: mx, y: my });
    });
    gsap.ticker.add(() => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      gsap.set(ring, { x: rx, y: ry });
    });
    document.querySelectorAll('a, button, [data-tilt], .big-cta, .header-cta').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
  })();

  /* ---------- tilt 3D nos cards (splash Riot) ---------- */
  if (!reduce) gsap.utils.toArray('[data-tilt]').forEach((card) => {
    const img = card.querySelector('img');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 900, duration: 0.5, ease: 'power2.out' });
      if (img) gsap.to(img, { x: px * 18, y: py * 18, duration: 0.6, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });
      if (img) gsap.to(img, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
    });
  });

  /* ---------- ESCOLHA UM LADO — troca o mundo + retune do som ---------- */
  (function sides() {
    const btns = document.querySelectorAll('.side');
    const hint = document.querySelector('.sides__hint');
    if (!btns.length) return;
    function apply(side, announce) {
      document.documentElement.dataset.side = side;
      btns.forEach((b) => b.classList.toggle('is-active', b.dataset.side === side));
      try { sessionStorage.setItem('seraph-side', side); } catch (e) {}
      if (window.__seraphSetSide) window.__seraphSetSide(side);
      if (hint && window.__hintChosen) hint.innerHTML = window.__hintChosen(side);
      if (announce && window.__worldFlash) window.__worldFlash(side);
    }
    let saved = null; try { saved = sessionStorage.getItem('seraph-side'); } catch (e) {}
    if (saved) apply(saved, false);
    btns.forEach((b) => b.addEventListener('click', () => apply(b.dataset.side, true)));
  })();

  /* ---------- ambiência épica procedural (Web Audio) ---------- */
  (function ambient() {
    const btn = document.querySelector('.sound-toggle');
    if (!btn) return;
    let ctx, master, filt, shg, playing = false, built = false;
    function build() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp); comp.connect(ctx.destination);
      filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 420; filt.Q.value = 5; filt.connect(master);
      // drone grave em camadas (A1/E2/A2/E3)
      [55, 82.4, 110, 164.8].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = i < 2 ? 'sawtooth' : 'sine';
        o.frequency.value = f; o.detune.value = (i - 1.5) * 6;
        const g = ctx.createGain(); g.gain.value = i < 2 ? 0.14 : 0.07;
        o.connect(g); g.connect(filt); o.start();
      });
      // LFO lento move o filtro (respiração)
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.06;
      const lg = ctx.createGain(); lg.gain.value = 160; lfo.connect(lg); lg.connect(filt.frequency); lfo.start();
      // shimmer sacro no agudo
      const sh = ctx.createOscillator(); sh.type = 'triangle'; sh.frequency.value = 880;
      shg = ctx.createGain(); shg.gain.value = 0.014; sh.connect(shg); shg.connect(master); sh.start();
      window.__seraphSetSide = function (side) {
        if (!ctx) return; const t = ctx.currentTime;
        if (side === 'treva') { filt.frequency.setTargetAtTime(240, t, 1.5); shg.gain.setTargetAtTime(0.004, t, 1.5); }
        else if (side === 'luz') { filt.frequency.setTargetAtTime(700, t, 1.5); shg.gain.setTargetAtTime(0.028, t, 1.5); }
        else { filt.frequency.setTargetAtTime(420, t, 1.5); shg.gain.setTargetAtTime(0.014, t, 1.5); }
      };
      built = true; return true;
    }
    btn.addEventListener('click', () => {
      if (!built && !build()) return;
      if (ctx.state === 'suspended') ctx.resume();
      playing = !playing;
      master.gain.setTargetAtTime(playing ? 0.3 : 0.0, ctx.currentTime, playing ? 1.4 : 0.5);
      btn.classList.toggle('is-on', playing);
      btn.setAttribute('aria-pressed', String(playing));
      if (playing && window.__seraphSetSide) window.__seraphSetSide(document.documentElement.dataset.side || '');
    });
  })();

  /* ---------- LIGHTBOX das obras (O Códice) — clicar abre a obra emoldurada ---------- */
  (function lightbox() {
    const lb = document.querySelector('.lightbox');
    if (!lb) return;
    const cards = [...document.querySelectorAll('.work-card')];
    if (!cards.length) return;
    const obras = cards.map((c) => ({
      img: c.querySelector('img').getAttribute('src'),
      num: (c.querySelector('.work-card__idx') || {}).textContent || '',
      title: () => c.querySelector('h3').textContent,
      desc: () => c.querySelector('em').textContent,
    }));
    const imgEl = lb.querySelector('.lb-img'), numEl = lb.querySelector('.lb-num'),
      titleEl = lb.querySelector('.lb-title'), descEl = lb.querySelector('.lb-desc');
    let idx = 0, open = false;
    function render() {
      const o = obras[idx];
      imgEl.src = o.img; imgEl.alt = o.title();
      numEl.textContent = (o.num ? o.num.trim() + ' · ' : '') + (idx + 1) + '/' + obras.length;
      titleEl.textContent = o.title();
      descEl.textContent = o.desc();
      if (!reduce) gsap.fromTo(imgEl, { opacity: 0.35, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
    }
    function openLb(i) { idx = i; render(); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); open = true; if (lenis) lenis.stop(); }
    function closeLb() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); open = false; if (lenis) lenis.start(); }
    function go(d) { idx = (idx + d + obras.length) % obras.length; render(); }
    cards.forEach((c, i) => c.addEventListener('click', (e) => { e.preventDefault(); openLb(i); }));
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); go(-1); });
    lb.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); go(1); });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) closeLb(); });
    window.addEventListener('keydown', (e) => {
      if (!open) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    });
  })();

  // refresh após imagens carregarem (evita pin com altura errada)
  window.addEventListener('load', () => window.ScrollTrigger.refresh());
})();
