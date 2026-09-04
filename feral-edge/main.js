/* ============ VARG-IX // Feral Edge - motor ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const { gsap } = window;

  /* ---------- synthesized horror SFX (Web Audio, no files) ---------- */
  const AudioFX = (function () {
    const AC = window.AudioContext || window.webkitAudioContext;
    let ctx = null, master = null, amb = null, on = false, lastClaw = 0;
    const noise = (sec) => { const n = ctx.sampleRate * sec, b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; };
    function ambient() {
      if (amb) return;
      amb = ctx.createGain(); amb.gain.value = 0; amb.connect(master);
      [55, 58.4, 41].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 210;
        const g = ctx.createGain(); g.gain.value = i === 2 ? 0.06 : 0.03;
        o.connect(lp); lp.connect(g); g.connect(amb); o.start();
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05 + i * 0.03; const lg = ctx.createGain(); lg.gain.value = 28; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
      });
      const src = ctx.createBufferSource(); src.buffer = noise(4); src.loop = true;
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320; bp.Q.value = 0.6;
      const ng = ctx.createGain(); ng.gain.value = 0.05; src.connect(bp); bp.connect(ng); ng.connect(amb); src.start();
      const wl = ctx.createOscillator(); wl.frequency.value = 0.08; const wg = ctx.createGain(); wg.gain.value = 170; wl.connect(wg); wg.connect(bp.frequency); wl.start();
      amb.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.6);
    }
    function claw() {
      if (!on || !ctx) return; const t = ctx.currentTime; if (t - lastClaw < 0.12) return; lastClaw = t;
      const src = ctx.createBufferSource(); src.buffer = noise(0.4);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 6;
      bp.frequency.setValueAtTime(6200, t); bp.frequency.exponentialRampToValueAtTime(1300, t + 0.18);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      src.connect(bp); bp.connect(g); g.connect(master); src.start(t); src.stop(t + 0.26);
      [2400, 3100, 3700].forEach((f, i) => { const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f; const gg = ctx.createGain(); const tt = t + i * 0.045; gg.gain.setValueAtTime(0.0001, tt); gg.gain.exponentialRampToValueAtTime(0.15, tt + 0.005); gg.gain.exponentialRampToValueAtTime(0.0001, tt + 0.16); o.connect(gg); gg.connect(master); o.start(tt); o.stop(tt + 0.18); });
    }
    function scream() {
      if (!on || !ctx) return; const t = ctx.currentTime, dur = 1.5;
      const sh = ctx.createWaveShaper(); const c = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; c[i] = Math.tanh(x * 3); } sh.curve = c;
      const out = ctx.createGain(); out.gain.setValueAtTime(0.0001, t); out.gain.exponentialRampToValueAtTime(0.55, t + 0.12); out.gain.setValueAtTime(0.55, t + dur * 0.5); out.gain.exponentialRampToValueAtTime(0.0001, t + dur); sh.connect(out); out.connect(master);
      [220, 227, 110].forEach((f) => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.setValueAtTime(f * 1.4, t); o.frequency.exponentialRampToValueAtTime(f * 0.65, t + dur); const vib = ctx.createOscillator(); vib.frequency.value = 15; const vg = ctx.createGain(); vg.gain.value = f * 0.05; vib.connect(vg); vg.connect(o.frequency); vib.start(t); vib.stop(t + dur); const g = ctx.createGain(); g.gain.value = 0.24; o.connect(g); g.connect(sh); o.start(t); o.stop(t + dur); });
      const src = ctx.createBufferSource(); src.buffer = noise(dur); const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = 2; const ng = ctx.createGain(); ng.gain.value = 0.22; src.connect(bp); bp.connect(ng); ng.connect(sh); src.start(t); src.stop(t + dur);
    }
    function toggle(btn) {
      if (!AC) return false;
      if (!ctx) { ctx = new AC(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); }
      on = !on;
      if (on) { ctx.resume(); ambient(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.4); }
      else { master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3); }
      if (btn) { btn.classList.toggle('is-on', on); btn.setAttribute('aria-pressed', String(on)); const tx = btn.querySelector('.sound__txt'); if (tx) tx.textContent = on ? 'SFX ON' : 'SFX OFF'; }
      return on;
    }
    return { toggle, claw, scream, get on() { return on; } };
  })();
  const soundBtn = document.querySelector('[data-sound]');
  if (soundBtn) soundBtn.addEventListener('click', () => AudioFX.toggle(soundBtn));

  /* ---------- reveal scanner (cursor-follow lens over the whole body) ---------- */
  const hero = document.querySelector('[data-hero]');
  const inner = document.querySelector('.hero__inner');
  const feral = document.querySelector('.hero__img--feral');
  let locked = false;

  if (hero && feral && inner) {
    const reticle = document.querySelector('.reticle');
    const reticleTag = document.querySelector('[data-reticle]');
    const spots = [...document.querySelectorAll('.spot')];
    const LABELS = { mask: 'MASK', core: 'DRIVE', shell: 'SHELL', edge: 'CLAWS' };
    let moved = false;
    const setLens = (cx, cy) => {
      const r = inner.getBoundingClientRect();
      const px = cx - r.left, py = cy - r.top;
      feral.style.setProperty('--mx', (px / r.width * 100).toFixed(1) + '%');
      feral.style.setProperty('--my', (py / r.height * 100).toFixed(1) + '%');
      if (reticle) { reticle.style.left = px + 'px'; reticle.style.top = py + 'px'; }
      if (reticleTag) {
        let best = null, bd = 1e9;
        for (const s of spots) { const b = s.getBoundingClientRect(); const dx = cx - (b.left + b.width / 2), dy = cy - (b.top + b.height / 2); const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = s; } }
        reticleTag.textContent = (best && bd < 24000) ? ('SCAN · ' + (LABELS[best.dataset.spot] || '')) : 'SCANNING';
      }
    };
    if (fine) {
      hero.addEventListener('mouseenter', () => { if (!locked) { hero.classList.add('is-reveal'); AudioFX.claw(); } });
      hero.addEventListener('mouseleave', () => hero.classList.remove('is-reveal'));
      hero.addEventListener('mousemove', (e) => setLens(e.clientX, e.clientY));
    } else {
      // touch: drag a finger to scan (reveal under it); a plain tap locks the full reveal
      hero.addEventListener('touchstart', () => { moved = false; }, { passive: true });
      hero.addEventListener('touchmove', (e) => {
        moved = true; if (locked) return;
        if (!hero.classList.contains('is-reveal')) { hero.classList.add('is-reveal'); AudioFX.claw(); }
        const t = e.touches[0]; setLens(t.clientX, t.clientY);
      }, { passive: true });
      hero.addEventListener('touchend', () => { if (!locked) hero.classList.remove('is-reveal'); });
    }
    hero.addEventListener('click', () => {
      if (moved) { moved = false; return; }               // ignore the click that ends a drag-scan
      locked = !locked; hero.classList.toggle('is-locked', locked); hero.classList.remove('is-reveal');
      if (locked) AudioFX.scream();
    });
  }

  /* ---------- part hotspots: light the matching spec + show the card ---------- */
  document.querySelectorAll('.spot').forEach((spot) => {
    const spec = document.querySelector('.spec[data-spec="' + spot.dataset.spec + '"]');
    const on = () => { if (spec) spec.classList.add('is-lit'); if (spot.dataset.spot === 'edge') AudioFX.claw(); };
    const off = () => spec && spec.classList.remove('is-lit');
    spot.addEventListener('mouseenter', on);
    spot.addEventListener('mouseleave', off);
    spot.addEventListener('focus', on);
    spot.addEventListener('blur', off);
    // tap (mobile) toggles the part card open; also stops the figure lock
    spot.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasOpen = spot.classList.contains('is-open');
      document.querySelectorAll('.spot.is-open').forEach((s) => s.classList.remove('is-open'));
      document.querySelectorAll('.spec.is-lit').forEach((s) => s.classList.remove('is-lit'));
      if (!wasOpen) { spot.classList.add('is-open'); on(); }
    });
  });

  /* ---------- mouse parallax (figure + glow) ---------- */
  if (!reduce && fine) {
    const glow = document.querySelector('.glow');
    const layers = document.querySelectorAll('[data-parallax]');
    window.addEventListener('mousemove', (e) => {
      const rx = (e.clientX / innerWidth - 0.5);
      const ry = (e.clientY / innerHeight - 0.5);
      gsap.to(layers, { x: rx * 26, y: ry * 18, duration: 1, ease: 'power2.out' });
      if (glow) gsap.to(glow, { x: rx * -40, y: ry * -26, duration: 1.2, ease: 'power2.out' });
    });
  }

  /* ---------- entrance ---------- */
  if (!reduce && gsap) {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.bar', { y: -20, opacity: 0, duration: .7 })
      .from('.glow', { scale: .6, opacity: 0, duration: 1.4, ease: 'power2.out' }, '-=.4')
      .from('.hero', { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=1.1')
      .from('.kicker', { y: 16, opacity: 0, duration: .7 }, '-=.7')
      .from('.title__l', { yPercent: 115, opacity: 0, duration: 1, stagger: .12 }, '-=.5')
      .from('.sub, .tools, .hint', { y: 18, opacity: 0, duration: .8, stagger: .1 }, '-=.6')
      .from('.specs__head, .spec', { x: 24, opacity: 0, duration: .7, stagger: .08 }, '-=.9')
      .from('.card', { y: 24, opacity: 0, duration: .8 }, '-=.7');
  }

  /* ---------- counter tick ---------- */
  const cnt = document.querySelector('[data-counter]');
  if (cnt && !reduce && gsap) {
    const o = { v: 1 };
    gsap.to(o, { v: 8, duration: 1.6, delay: .6, ease: 'power2.out',
      onUpdate: () => { cnt.textContent = String(Math.round(o.v)).padStart(2, '0'); } });
  }

  /* ---------- tool buttons: scan / lock unmask / zoom ---------- */
  const [btnScan, btnCompare, btnExpand] = document.querySelectorAll('.tools .round');
  if (btnScan && hero) btnScan.addEventListener('click', () => {
    hero.classList.remove('is-scan'); void hero.offsetWidth; hero.classList.add('is-scan');
    setTimeout(() => hero.classList.remove('is-scan'), 800);
  });
  if (btnCompare && hero) btnCompare.addEventListener('click', () => {
    locked = !locked; btnCompare.classList.toggle('is-on', locked);
    hero.classList.toggle('is-locked', locked); hero.classList.remove('is-reveal');
  });
  if (btnExpand && inner) {
    let zoomed = false;
    btnExpand.addEventListener('click', () => {
      zoomed = !zoomed; btnExpand.classList.toggle('is-on', zoomed);
      gsap.to(inner, { scale: zoomed ? 1.2 : 1, duration: .6, ease: 'power3.out', transformOrigin: '50% 42%' });
    });
  }

  /* ---------- reserve button feedback ---------- */
  const reserve = document.querySelector('.card__cta');
  if (reserve) reserve.addEventListener('click', () => {
    if (reserve.dataset.done) return;
    reserve.dataset.done = '1';
    reserve.innerHTML = 'Reserved ✓';
    reserve.style.filter = 'saturate(.55) brightness(1.05)';
  });

  /* ---------- ambient embers ---------- */
  (function embers() {
    if (reduce) return;
    const canvas = document.querySelector('.embers');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, parts = [], raf = 0, running = true;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(r.width * dpr));
      H = canvas.height = Math.max(1, Math.round(r.height * dpr));
    }
    function seed() {
      const n = Math.round(Math.min(52, (W / dpr) / 26));
      parts = Array.from({ length: n }, () => spawn(true));
    }
    function spawn(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + Math.random() * 40 * dpr,
        r: (0.6 + Math.random() * 2.1) * dpr,
        vy: (0.15 + Math.random() * 0.5) * dpr,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        a: 0.12 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
      };
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      const hot = hero && (hero.classList.contains('is-reveal') || hero.classList.contains('is-locked'));
      for (const p of parts) {
        p.y -= p.vy; p.x += p.vx; p.tw += 0.05;
        if (p.y < -10 * dpr) Object.assign(p, spawn(false));
        const flick = 0.7 + Math.sin(p.tw) * 0.3;
        const col = hot ? '255,90,70' : '255,150,60';
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + col + ',' + (p.a * flick).toFixed(3) + ')';
        ctx.shadowBlur = 8 * dpr; ctx.shadowColor = 'rgba(' + col + ',.6)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    size(); seed(); frame();
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); size(); seed(); if (running) frame(); });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) frame(); else cancelAnimationFrame(raf);
    });
  })();

  /* ---------- dossier scroll reveals ---------- */
  if (gsap && window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
    // gauges fill when scrolled into view (works with reduced motion too)
    gsap.utils.toArray('.gauge').forEach((g) =>
      window.ScrollTrigger.create({ trigger: g, start: 'top 90%', once: true, onEnter: () => g.classList.add('is-in') }));
    if (!reduce) {
      gsap.from('.dossier__tag, .dossier__title, .dossier__lead',
        { y: 24, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.dossier__head', start: 'top 82%' } });
      gsap.utils.toArray('[data-rise]').forEach((el) =>
        gsap.from(el, { y: 36, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } }));
      gsap.from('.schem__img', { opacity: 0, filter: 'blur(14px)', duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.schem', start: 'top 80%' } });
      gsap.utils.toArray('[data-anno]').forEach((el, i) =>
        gsap.from(el, { opacity: 0, scale: .6, duration: .55, delay: i * .1, ease: 'back.out(1.7)', transformOrigin: 'left center', scrollTrigger: { trigger: '.schem', start: 'top 68%' } }));
    }
  }

  /* ---------- containment terminal (typewriter) ---------- */
  const out = document.querySelector('[data-log]');
  if (out) {
    const LOG = [
      ['> boot: ORSK containment shell v9.1', ''],
      ['> linking specimen VARG-IX ......... ok', 'ok'],
      ['> shell integrity ................. 71%', ''],
      ['> reflex sync ..................... 96%', ''],
      ['> WARNING: aggression spike detected', 'bad'],
      ['> blood loss ..................... rising', 'bad'],
      ['> regen rate ..................... MAX', 'ok'],
      ['> shell fracture detected ... sealing', 'bad'],
      ['> containment field .............. STABLE', ''],
      ['> note: do not disengage the shell.', ''],
    ];
    const cursor = document.createElement('span'); cursor.className = 'termlog__cur';
    let started = false;
    const dumpAll = () => {
      out.textContent = '';
      LOG.forEach(([t, c]) => { const s = document.createElement('span'); if (c) s.className = c; s.textContent = t + '\n'; out.appendChild(s); });
      out.appendChild(cursor);
    };
    const run = () => {
      if (started) return; started = true;
      if (reduce) { dumpAll(); return; }
      let li = 0;
      const nextLine = () => {
        if (li >= LOG.length) { out.appendChild(cursor); return; }
        const [t, c] = LOG[li]; const span = document.createElement('span'); if (c) span.className = c; out.appendChild(span);
        let ci = 0;
        const type = () => {
          span.textContent = t.slice(0, ci);
          out.appendChild(cursor);
          if (ci <= t.length) { ci++; setTimeout(type, 14 + Math.random() * 22); }
          else { span.textContent = t + '\n'; li++; setTimeout(nextLine, 240); }
        };
        type();
      };
      nextLine();
    };
    if (window.ScrollTrigger) window.ScrollTrigger.create({ trigger: '.termlog', start: 'top 85%', once: true, onEnter: run });
    else run();
  }
})();
