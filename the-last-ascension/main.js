/* ============ The Last Ascension — Living Storyboard · motor ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- shots ---------- */
  const CAM = {
    drone: '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M5 5l3 3M19 5l-3 3M5 19l3-3M19 19l-3-3M3 5h4M17 5h4M3 19h4M17 19h4"/></svg>',
    close: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/></svg>',
    wide: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="1"/><path d="M7 7v10M17 7v10"/></svg>',
    impact: '<svg viewBox="0 0 24 24" stroke-linecap="round"><path d="M12 2l2 6 6-2-4 5 4 5-6-2-2 6-2-6-6 2 4-5-4-5 6 2z"/></svg>',
  };
  const SHOTS = [
    { no: '01', img: 'shot-1.jpg', cam: 'drone', t: { en: 'The Silence', pt: 'O Silêncio' }, l: { en: 'The world is silent. Only the sword remains.', pt: 'O mundo está em silêncio. Somente a espada permanece.' }, m: { en: 'Drone / slow travelling', pt: 'Drone / travelling lento' }, lens: '24mm', dur: '4s' },
    { no: '02', img: 'shot-2.jpg', cam: 'close', t: { en: 'The Awakening', pt: 'O Despertar' }, l: { en: 'The sword awakens. Ancient energy runs through the metal.', pt: 'A espada desperta. Energia antiga percorre o metal.' }, m: { en: 'Close-up', pt: 'Close up' }, lens: '85mm', dur: '3s' },
    { no: '03', img: 'shot-3.jpg', cam: 'wide', t: { en: 'The Light', pt: 'A Luz' }, l: { en: 'The celestial light chooses it. Destiny reveals itself.', pt: 'A luz celestial a escolhe. O destino se revela.' }, m: { en: 'Wide', pt: 'Plano aberto' }, lens: '24mm', dur: '3s' },
    { no: '06', img: 'shot-4.jpg', cam: 'impact', feature: true, t: { en: 'The Choice', pt: 'A Escolha' }, l: { en: 'He grips his destiny. The sword answers. Nothing will be the same.', pt: 'Ele segura o destino. A espada responde. Nada será como antes.' }, m: { en: 'Impact / slow-motion', pt: 'Impacto / slow motion' }, lens: '35mm', dur: '5s' },
    { no: '08', img: 'shot-5.jpg', cam: 'close', t: { en: 'The Warrior', pt: 'O Guerreiro' }, l: { en: 'He is no longer the same. His gaze carries promises.', pt: 'Ele não é mais o mesmo. O olhar carrega promessas.' }, m: { en: 'Close-up', pt: 'Close up' }, lens: '85mm', dur: '3s' },
    { no: '09', img: 'shot-6.jpg', cam: 'wide', t: { en: 'The Transformation', pt: 'A Transformação' }, l: { en: 'The sword lights the world. The darkness recedes.', pt: 'A espada ilumina o mundo. A escuridão recua.' }, m: { en: 'Wide', pt: 'Plano aberto' }, lens: '24mm', dur: '4s' },
    { no: '10', img: 'shot-7.jpg', cam: 'wide', t: { en: 'The Army', pt: 'O Exército' }, l: { en: 'He is not alone. An army follows him.', pt: 'Ele não está sozinho. Um exército o segue.' }, m: { en: 'Wide', pt: 'Plano geral' }, lens: '24mm', dur: '4s' },
    { no: '12', img: 'shot-8.jpg', cam: 'close', t: { en: 'The Cycle', pt: 'O Ciclo' }, l: { en: 'The cycle begins again. The legend remains.', pt: 'O ciclo recomeça. A lenda permanece.' }, m: { en: 'Close', pt: 'Plano fechado' }, lens: '85mm', dur: '3s' },
  ];

  /* ---------- i18n (estático) ---------- */
  const I18N = {
    sbLabel: { en: 'Storyboard', pt: 'Storyboard' },
    logline: { en: 'A forgotten hero. A lost sword. A world about to be rewritten.', pt: 'Um herói esquecido. Uma espada perdida. Um mundo à beira de ser reescrito.' },
    conceptLabel: { en: 'Visual Concept', pt: 'Conceito Visual' },
    paletteLabel: { en: 'Color Palette', pt: 'Paleta de Cores' },
    notesTag: { en: "Director's Notes", pt: 'Notas do Diretor' },
    nTone: { en: 'Tone', pt: 'Tom' }, nToneV: { en: 'Epic, cinematic, inspiring', pt: 'Épico, cinematográfico, inspirador' },
    nPalette: { en: 'Palette', pt: 'Paleta' }, nPaletteV: { en: 'Black, gray, deep red, gold (light)', pt: 'Preto, cinza, vermelho profundo, dourado (luz)' },
    nMotif: { en: 'Motifs', pt: 'Motivos' }, nMotifV: { en: 'Choice, sacrifice, purpose, leadership', pt: 'Escolha, sacrifício, propósito, liderança' },
    nRhythm: { en: 'Rhythm', pt: 'Ritmo' }, nRhythmV: { en: 'Slow → intense → cathartic → reflective', pt: 'Lento → intenso → catártico → reflexivo' },
    nRef: { en: 'Visual reference', pt: 'Inspiração visual' }, nRefV: { en: 'Riot Games cinematics, Blur Studio, “Arcane”', pt: 'Riot Games cinematics, Blur Studio, “Arcane”' },
    nHi: { en: 'Highlight', pt: 'Destaque' }, nHiV: { en: 'Shot 06 — the moment that breaks the frame', pt: 'Shot 06 — o momento que rompe a moldura' },
    langTag: { en: 'Camera & Language References', pt: 'Referências de Câmera e Linguagem' },
    closing: { en: 'Journey. Choice. Destiny.<br/><em>The rest is history.</em>', pt: 'Jornada. Escolha. Destino.<br/><em>O resto é história.</em>' },
    annotScreen: { en: 'The scene that leaves the screen', pt: 'A cena que sai da tela' },
    annotFrame: { en: 'Elements break past the frame', pt: 'Elementos ultrapassam a moldura' },
  };
  const CAMLANG = [
    { i: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><path d="M8 12h8"/></svg>', en: 'Travelling', pt: 'Travelling' },
    { i: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>', en: 'Backlight', pt: 'Contra Luz' },
    { i: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', en: 'Slow Motion', pt: 'Slow Motion' },
    { i: '<svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="4"/><circle cx="17" cy="12" r="2.5" opacity=".5"/></svg>', en: 'Depth of Field', pt: 'Depth of Field' },
    { i: '<svg viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="1"/><path d="M14 4l6 4M16 20l4-3"/></svg>', en: 'Break the Frame', pt: 'Break the Frame' },
    { i: '<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="1"/><circle cx="16" cy="6" r="1"/><circle cx="12" cy="13" r="1"/><circle cx="18" cy="15" r="1"/><circle cx="6" cy="17" r="1"/></svg>', en: 'Particles', pt: 'Partículas' },
    { i: '<svg viewBox="0 0 24 24"><path d="M9 3h6l4 18H5z"/><path d="M10 9h4M9 14h6"/></svg>', en: 'Volumetric Light', pt: 'Luz Volumétrica' },
  ];

  let LANG = 'en';
  try { const s = sessionStorage.getItem('tla-lang'); if (s === 'pt' || s === 'en') LANG = s; } catch (e) {}

  /* ---------- render shots ---------- */
  const board = document.querySelector('[data-shots]');
  SHOTS.forEach((s) => {
    const el = document.createElement('article');
    el.className = 'shot-card' + (s.feature ? ' shot-card--feature' : '');
    el.dataset.shot = s.no;
    const featureExtra = s.feature ? `
      <div class="break-frame"></div>
      <div class="break-burst"></div>
      <span class="frame-annot frame-annot--tr" data-annot="screen"></span>
      <span class="frame-annot frame-annot--br" data-annot="frame"></span>` : '';
    el.innerHTML = `
      <div class="shot-card__media">
        <img src="assets/${s.img}" alt="" loading="lazy" />
        <div class="shot-card__head"><span class="shot-card__no">${s.no}</span><span class="shot-card__title" data-t></span></div>
        ${featureExtra}
      </div>
      <div class="shot-card__body">
        <p class="shot-card__line" data-l></p>
        <div class="shot-card__cam">${CAM[s.cam] || ''}<b data-m></b><span class="dot">·</span><span data-i18n-lens>Lens</span> ${s.lens}<span class="dot">·</span><span data-i18n-dur>Dur</span> ${s.dur}</div>
      </div>`;
    board.appendChild(el);
  });

  /* ---------- render camera language ---------- */
  const icons = document.querySelector('[data-icons]');
  CAMLANG.forEach((c) => {
    const el = document.createElement('div');
    el.className = 'lang-item';
    el.innerHTML = `${c.i}<span data-cl>${c[LANG]}</span>`;
    el._data = c;
    icons.appendChild(el);
  });

  /* ---------- apply language ---------- */
  function applyLang(l) {
    LANG = l;
    document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : 'en');
    document.querySelectorAll('[data-i18n]').forEach((el) => { const k = el.dataset.i18n; if (I18N[k]) el.innerHTML = I18N[k][l]; });
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((s) => s.classList.toggle('is-active', s.dataset.lang === l));
    document.querySelectorAll('.shot-card').forEach((card, i) => {
      const s = SHOTS[i];
      card.querySelector('[data-t]').textContent = s.t[l];
      card.querySelector('[data-l]').textContent = s.l[l];
      card.querySelector('[data-m]').textContent = s.m[l];
      card.querySelectorAll('[data-i18n-lens]').forEach((e) => e.textContent = l === 'pt' ? 'Lente' : 'Lens');
      card.querySelectorAll('[data-i18n-dur]').forEach((e) => e.textContent = l === 'pt' ? 'Duração' : 'Dur');
      const scr = card.querySelector('[data-annot="screen"]'), frm = card.querySelector('[data-annot="frame"]');
      if (scr) scr.innerHTML = '← ' + I18N.annotScreen[l];
      if (frm) frm.innerHTML = I18N.annotFrame[l] + ' →';
    });
    document.querySelectorAll('.lang-item [data-cl]').forEach((e) => { e.textContent = e.parentNode._data[l]; });
  }
  applyLang(LANG);
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => { const nl = LANG === 'pt' ? 'en' : 'pt'; try { sessionStorage.setItem('tla-lang', nl); } catch (e) {} applyLang(nl); });

  /* ---------- Lenis + ScrollTrigger ---------- */
  if (!reduce && window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.09 });
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  }
  gsap.to('[data-progress]', { width: '100%', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  /* ---------- reveals ---------- */
  gsap.from('.title, .title__sub, .logline', { opacity: 0, y: 30, duration: 1, stagger: .12, ease: 'power3.out' });
  gsap.utils.toArray('.shot-card').forEach((c) => {
    gsap.to(c, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%' } });
  });
  gsap.utils.toArray('.notes__list li').forEach((li) => gsap.from(li, { opacity: 0, x: -20, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: li, start: 'top 92%' } }));
  gsap.utils.toArray('.lang-item').forEach((it, i) => gsap.to(it, { opacity: 1, y: 0, duration: .7, delay: i * .06, ease: 'power3.out', scrollTrigger: { trigger: '.lang__icons', start: 'top 85%' } }));
  gsap.from('.closing', { opacity: 0, y: 30, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.closing', start: 'top 90%' } });

  /* ---------- Shot 06 — BREAK THE FRAME ---------- */
  const feature = document.querySelector('.shot-card--feature');
  if (feature && !reduce) {
    const frame = feature.querySelector('.break-frame');
    const burst = feature.querySelector('.break-burst');
    const img = feature.querySelector('.shot-card__media img');
    gsap.set(frame, { transformOrigin: '50% 50%' });
    gsap.timeline({ scrollTrigger: { trigger: feature, start: 'top 80%', end: 'bottom 25%', scrub: 0.6 } })
      .fromTo(frame, { scale: 1, opacity: 1 }, { scale: 1.45, opacity: 0, ease: 'power2.in' }, 0)
      .fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none' }, 0)
      .fromTo(burst, { opacity: 0 }, { opacity: 1, ease: 'power1.in' }, 0)
      .to(burst, { opacity: 0, ease: 'power1.out' }, 0.5)
      .to('.frame-annot', { opacity: 1, duration: 0.3 }, 0.15);
  } else if (feature) {
    gsap.set(feature.querySelector('.break-frame'), { opacity: 0 });
    gsap.set(feature.querySelectorAll('.frame-annot'), { opacity: 1 });
  }

  /* ---------- cursor ---------- */
  (function cursor() {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const ring = document.querySelector('.cursor'), dot = document.querySelector('.cursor__dot');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; gsap.set(dot, { x: mx, y: my }); });
    gsap.ticker.add(() => { rx += (mx - rx) * .18; ry += (my - ry) * .18; gsap.set(ring, { x: rx, y: ry }); });
    document.querySelectorAll('a,button,.shot-card,.lang-item').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
  })();

  window.addEventListener('load', () => window.ScrollTrigger.refresh());
})();
