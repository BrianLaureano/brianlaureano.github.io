/* ============ Brian Laureano — Portfolio · motor ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- projetos (embed AO VIVO). liveUrl = URL publicada (deploy) ---------- */
  const PROJECTS = [
    { idx: '01', name: 'Nebula Analytics', year: '2026', url: 'http://localhost:5240', liveUrl: 'https://brianlaureano.github.io/dashboard-nebula/',
      tags: ['Dashboard', 'Charts', 'Real-time', 'Dark/Light'],
      desc: { en: 'A real-time SaaS analytics dashboard — animated KPIs, an interactive revenue chart with crosshair tooltip, traffic breakdown, live data table, and a dark/light theme.',
              pt: 'Um dashboard de analytics SaaS em tempo real — KPIs animados, gráfico de receita interativo com tooltip de mira, fontes de tráfego, tabela de dados ao vivo e tema claro/escuro.' } },
    { idx: '02', name: 'Helm CRM', year: '2026', url: 'http://localhost:5250', liveUrl: 'https://brianlaureano.github.io/admin-helm/',
      tags: ['Admin', 'CRM', 'Data table', 'CRUD'],
      desc: { en: 'A working admin / CRM panel — searchable, sortable customer table with filters, a slide-over to add & edit records, a live deal pipeline, and a dark/light theme.',
              pt: 'Um painel admin / CRM funcional — tabela de clientes com busca, ordenação e filtros, drawer pra adicionar e editar registros, pipeline de negócios ao vivo e tema claro/escuro.' } },
    { idx: '03', name: 'Flowbase', year: '2026', url: 'http://localhost:5260', liveUrl: 'https://brianlaureano.github.io/landing-flowbase/',
      tags: ['Landing', 'SaaS', 'Pricing', 'Motion'],
      desc: { en: 'A high-converting SaaS product landing — animated hero, feature bento, pricing with a monthly/yearly toggle, testimonials and an FAQ.',
              pt: 'Uma landing de produto SaaS que converte — hero animado, bento de features, pricing com alternância mensal/anual, depoimentos e FAQ.' } },
    { idx: '04', name: 'Lumen Store', year: '2026', url: 'http://localhost:5270', liveUrl: 'https://brianlaureano.github.io/shop-lumen/',
      tags: ['E-commerce', 'Cart', 'Quick-view', 'Filter'],
      desc: { en: 'A premium storefront — category filter, product quick-view, and a working cart with quantities, live totals and a free-shipping threshold.',
              pt: 'Uma vitrine premium — filtro por categoria, quick-view de produto e carrinho funcional com quantidades, totais ao vivo e frete grátis por valor.' } },
    { idx: '05', name: 'The Last Ascension', year: '2026', url: 'http://localhost:5210', liveUrl: 'https://brianlaureano.github.io/the-last-ascension/',
      tags: ['GSAP', 'Cinematic', 'AI Art', 'Storyboard'],
      desc: { en: 'A director’s storyboard brought to life — a Riot-style cinematic sequence with AI concept art and a shot that breaks the frame.',
              pt: 'Um storyboard de diretor ganhando vida — sequência cinematográfica estilo Riot, com concept art por IA e um plano que rompe a moldura.' } },
    { idx: '06', name: 'Café Aurora', year: '2026', url: 'http://localhost:3210', liveUrl: '',
      tags: ['Next.js', 'Editorial', 'Photography'],
      desc: { en: 'A warm editorial site for a specialty coffee house — real photography, generous type, appetite-first.',
              pt: 'Um site editorial e acolhedor para uma cafeteria especial — fotografia real, tipografia generosa, que dá fome.' } },
    { idx: '07', name: 'Planto.', year: '2026', url: 'http://localhost:3220', liveUrl: '',
      tags: ['Next.js', 'GSAP', 'Scroll'],
      desc: { en: 'A dark botanical storefront where the page grows as you scroll — GSAP timelines, Lenis smoothing.',
              pt: 'Uma loja botânica escura onde a página cresce conforme você rola — timelines GSAP, suavidade do Lenis.' } },
    { idx: '08', name: 'Zenith Realty', year: '2026', url: 'http://localhost:3230', liveUrl: '',
      tags: ['Next.js', 'Luxury', 'GSAP'],
      desc: { en: 'A luxury real-estate brand in bright light — scroll-driven scenes and a car that drives into the CTA.',
              pt: 'Uma marca imobiliária de luxo em plena luz — cenas guiadas por scroll e um carro que entra na chamada.' } },
    { idx: '09', name: 'SERAPH / Mythos', year: '2026', url: 'http://localhost:5178', liveUrl: '',
      tags: ['GSAP', 'Cinematic', 'AI Art', 'Interactive'],
      desc: { en: 'A cinematic myth of light vs. darkness — AI baroque art, living video, a scroll that tells a story.',
              pt: 'Um mito cinematográfico da luz contra a treva — arte barroca por IA, vídeo vivo, um scroll que narra.' } },
  ];

  /* ---------- i18n ---------- */
  const I18N = {
    navServices: { en: 'Services', pt: 'Serviços' }, navWork: { en: 'Work', pt: 'Projetos' },
    navProcess: { en: 'Process', pt: 'Processo' },
    navAbout: { en: 'About', pt: 'Sobre' }, navContact: { en: 'Contact', pt: 'Contato' },
    cta: { en: "Let's talk", pt: 'Conversar' },
    heroKicker: { en: "Hey, I'm Brian 👋 — Web Developer · Landing Pages & Dashboards", pt: 'Oi, sou o Brian 👋 — Desenvolvedor Web · Landing Pages & Dashboards' },
    /* services */
    svcLabel: { en: 'What I build', pt: 'O que eu construo' },
    svcTitle: { en: 'Two things, done properly: sites that convert and apps that run your business.', pt: 'Duas coisas, bem feitas: sites que convertem e apps que tocam o seu negócio.' },
    svcC1t: { en: 'Animated Landing Pages', pt: 'Landing Pages Animadas' },
    svcC1d: { en: 'High-converting, scroll-driven pages with real motion (Next.js · GSAP · Lenis). Fast, responsive, and built to make visitors act — not just look.', pt: 'Páginas que convertem, guiadas por scroll e com motion de verdade (Next.js · GSAP · Lenis). Rápidas, responsivas e feitas pra fazer o visitante agir — não só olhar.' },
    svcC1a: { en: 'Product & brand launches', pt: 'Lançamentos de produto & marca' }, svcC1b: { en: 'Scroll storytelling', pt: 'Narrativa por scroll' }, svcC1c: { en: '90+ PageSpeed', pt: '90+ no PageSpeed' },
    svcC2t: { en: 'Custom Dashboards', pt: 'Dashboards Sob Medida' },
    svcC2d: { en: 'Real-time dashboards and internal tools with live charts, KPIs, roles and secure data. The software that actually runs the operation.', pt: 'Dashboards em tempo real e ferramentas internas com gráficos ao vivo, KPIs, permissões e dados seguros. O software que realmente toca a operação.' },
    svcC2a: { en: 'Analytics & KPIs', pt: 'Analytics & KPIs' }, svcC2b: { en: 'Admin / CRM panels', pt: 'Painéis Admin / CRM' }, svcC2c: { en: 'Roles & live data', pt: 'Permissões & dados ao vivo' },
    svcC3t: { en: 'Spreadsheets → Web Apps', pt: 'Planilhas → Web Apps' },
    svcC3d: { en: 'You have the data trapped in Sheets. I turn those tabs and formulas into a fast, secure web app your whole team enjoys using.', pt: 'Seus dados estão presos em planilhas. Eu transformo aquelas abas e fórmulas num app web rápido e seguro que o time inteiro gosta de usar.' },
    svcC3a: { en: 'Google Sheets / Excel', pt: 'Google Sheets / Excel' }, svcC3b: { en: 'Firebase back end', pt: 'Back end em Firebase' }, svcC3c: { en: 'PWA / offline-ready', pt: 'PWA / funciona offline' },
    trust1: { en: 'Projects shipped', pt: 'Projetos entregues' }, trust2: { en: 'Full operations platform, live', pt: 'Plataforma de operação inteira, no ar' },
    trust3: { en: 'Reply time', pt: 'Tempo de resposta' }, trust4: { en: 'Design + code, one person', pt: 'Design + código, uma pessoa só' },
    /* process */
    procLabel: { en: 'How I work', pt: 'Como eu trabalho' },
    procTitle: { en: 'Simple, transparent, and low-risk for you.', pt: 'Simples, transparente e de baixo risco pra você.' },
    procNote: { en: "No jargon, no disappearing. You always know what's happening and what comes next.", pt: 'Sem jargão, sem sumiço. Você sempre sabe o que está acontecendo e o que vem a seguir.' },
    proc1t: { en: 'We talk', pt: 'A gente conversa' }, proc1d: { en: "A quick call or chat. You tell me the goal; I tell you honestly if I'm the right fit and how I'd approach it.", pt: 'Uma call ou chat rápido. Você conta o objetivo; eu digo com honestidade se sou a pessoa certa e como faria.' },
    proc2t: { en: 'Clear plan & quote', pt: 'Plano & orçamento claros' }, proc2d: { en: 'A fixed scope, timeline and price up front. No surprise invoices — you approve before I start.', pt: 'Escopo, prazo e preço fechados antes de começar. Sem fatura surpresa — você aprova antes de eu iniciar.' },
    proc3t: { en: 'Build with updates', pt: 'Construção com updates' }, proc3d: { en: "You get a live preview link and progress updates you don't have to chase. Feedback welcome at every step.", pt: 'Você recebe link de preview ao vivo e updates de progresso sem ter que cobrar. Feedback bem-vindo em cada etapa.' },
    proc4t: { en: 'Launch & support', pt: 'Lançamento & suporte' }, proc4d: { en: 'Tested on real devices, deployed, and I stay around after launch to make sure it runs smoothly.', pt: 'Testado em aparelhos reais, publicado, e eu continuo por perto depois do lançamento pra garantir que tudo rode liso.' },
    heroL1: { en: 'I build websites', pt: 'Eu crio sites' },
    heroL2: { en: 'that make people go <em>“whoa”.</em>', pt: 'que fazem as pessoas dizerem <em>“uau”.</em>' },
    heroSub: { en: 'Fast, playful, high-converting sites with real motion — and I turn boring spreadsheets into smart, living dashboards. Every project below is running <b>live</b>, right inside this page.',
               pt: 'Sites rápidos, divertidos e que convertem, com motion de verdade — e transformo planilhas chatas em dashboards inteligentes e vivos. Cada projeto abaixo está rodando <b>ao vivo</b>, dentro desta página.' },
    heroBtn1: { en: 'See the work', pt: 'Ver os projetos' }, heroBtn2: { en: 'Start a project ↗', pt: 'Começar um projeto ↗' },
    scroll: { en: 'Scroll', pt: 'Role' },
    superLabel: { en: 'The superpower', pt: 'O superpoder' },
    superTitle: { en: 'Your spreadsheet is a business trapped in a grid. I set it free.', pt: 'Sua planilha é um negócio preso numa grade. Eu liberto.' },
    superNote: { en: 'You already have the data. I turn those tabs, formulas and colored cells into a fast, beautiful web app your whole team actually enjoys using — live, secure, real-time.',
                 pt: 'Você já tem os dados. Eu transformo aquelas abas, fórmulas e células coloridas num app web rápido e bonito que o time inteiro gosta de usar — ao vivo, seguro, em tempo real.' },
    superBtn: { en: 'Turn my spreadsheet into an app ↗', pt: 'Transformar minha planilha em app ↗' },
    workLabel: { en: 'Selected work', pt: 'Projetos selecionados' },
    workTitle: { en: 'Real sites, running live. Not screenshots.', pt: 'Sites de verdade, rodando ao vivo. Não prints.' },
    workNote: { en: 'Scroll into one and it wakes up. Click to play with it, or open the full-screen experience. More projects landing soon. 🚀',
                pt: 'Role até um e ele acorda. Clique pra interagir, ou abra em tela cheia. Mais projetos chegando. 🚀' },
    workMore: { en: 'More projects coming soon — this is just the beginning.', pt: 'Mais projetos em breve — isto é só o começo.' },
    aboutLabel: { en: 'About', pt: 'Sobre' },
    aboutLead: { en: "I'm Brian — I make the web feel <em>alive</em>.", pt: 'Sou o Brian — faço a web parecer <em>viva</em>.' },
    aboutP1: { en: "Creative developer who lives where design meets engineering. I build fast, cinematic websites with real motion — and I'm obsessed with turning clunky spreadsheets and internal chaos into smart, delightful tools people love to open.",
               pt: 'Desenvolvedor criativo que vive onde o design encontra a engenharia. Construo sites rápidos e cinematográficos com motion de verdade — e sou obcecado por transformar planilhas travadas e caos interno em ferramentas inteligentes que as pessoas amam abrir.' },
    aboutP2: { en: "I've shipped an entire operations platform from scratch, plus the brand experiences you see above. I design the story and write the code. If you want work that makes people stop scrolling, let's talk.",
               pt: 'Já entreguei uma plataforma de operações inteira do zero, além das experiências de marca que você vê acima. Desenho a história e escrevo o código. Se você quer algo que faça as pessoas pararem de rolar, vamos conversar.' },
    svc1: { en: 'Design & Art Direction', pt: 'Design & Direção de Arte' }, svc2: { en: 'Cinematic Front-end', pt: 'Front-end Cinematográfico' },
    svc3: { en: 'Spreadsheets → Web Apps', pt: 'Planilhas → Web Apps' }, svc4: { en: 'Motion & Brand', pt: 'Motion & Marca' },
    contactLabel: { en: 'Contact', pt: 'Contato' },
    contactL1: { en: "Let's make something", pt: 'Vamos criar algo' }, contactL2: { en: '<em>bright</em> together.', pt: '<em>brilhante</em> juntos.' },
    avail: { en: 'Available for freelance & contract', pt: 'Disponível para freelance & contrato' },
    footer: { en: 'Made with care, coffee & motion.', pt: 'Feito com carinho, café & motion.' },
    liveBtn: { en: 'Open live ↗', pt: 'Abrir ao vivo ↗' },
    hint: { en: '▶ Click to interact', pt: '▶ Clique para interagir' },
    waking: { en: 'Waking the site…', pt: 'Acordando o site…' },
    soon: { en: 'Live demo coming soon', pt: 'Demo ao vivo em breve' },
    openLive: { en: '▶ Open the live site', pt: '▶ Abrir o site ao vivo' },
  };
  let LANG = 'en';
  try { const s = sessionStorage.getItem('bl-lang'); if (s === 'pt' || s === 'en') LANG = s; } catch (e) {}
  const t = (k) => (I18N[k] ? I18N[k][LANG] : k);
  function applyLang(l) {
    LANG = l;
    document.documentElement.setAttribute('lang', l === 'pt' ? 'pt-BR' : 'en');
    document.querySelectorAll('[data-i18n]').forEach((el) => { const k = el.dataset.i18n; if (I18N[k]) el.innerHTML = I18N[k][l]; });
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((s) => s.classList.toggle('is-active', s.dataset.lang === l));
    document.querySelectorAll('[data-pdesc]').forEach((el) => { el.textContent = PROJECTS[+el.dataset.pdesc].desc[l]; });
    document.querySelectorAll('[data-plive]').forEach((el) => { el.textContent = t('liveBtn'); });
    document.querySelectorAll('[data-popen]').forEach((el) => { el.textContent = t('openLive'); });
    document.querySelectorAll('[data-phint]').forEach((el) => { el.textContent = t('hint'); });
    document.querySelectorAll('[data-pwake]').forEach((el) => {
      const frame = el.closest('.frame');
      if (frame.classList.contains('is-loaded')) return;
      el.textContent = frame.dataset.src ? t('waking') : t('soon');
    });
  }

  /* ---------- planilha (grid decorativo) ---------- */
  const sheet = document.querySelector('[data-sheet]');
  if (sheet) {
    const head = ['Month', 'Rev', 'Cost', 'Users', 'Δ'];
    const rows = [
      ['Jan', '82', '31', '1.2k', '+8'], ['Feb', '90', '29', '1.4k', '+6'],
      ['Mar', '105', '33', '1.9k', '+11'], ['Apr', '121', '30', '2.3k', '+9'], ['May', '128', '28', '2.7k', '+14'],
    ];
    head.forEach((h) => { const c = document.createElement('i'); c.className = 'h'; c.textContent = h; sheet.appendChild(c); });
    rows.forEach((r) => r.forEach((v, i) => { const c = document.createElement('i'); if (i === 4) c.className = 'c'; c.textContent = v; sheet.appendChild(c); }));
  }

  /* ---------- render projetos ----------
     Em localhost o preview local (p.url) roda. Publicado, só o liveUrl real é
     embutido — nunca o localhost, que quebraria na tela do cliente. Sem URL
     utilizável, o card vira um poster elegante "em breve" (sem caixa quebrada). */
  const IS_LOCAL = ['localhost', '127.0.0.1', ''].includes(location.hostname) || location.protocol === 'file:';
  const wrap = document.querySelector('[data-projects]');
  PROJECTS.forEach((p, i) => {
    const embedSrc = IS_LOCAL ? (p.url || p.liveUrl) : p.liveUrl;   // o que vai no iframe
    const openUrl = p.liveUrl || (IS_LOCAL ? p.url : '');           // pra onde o botão leva
    const host = (openUrl || 'coming-soon').replace(/^https?:\/\//, '');
    const art = document.createElement('article');
    art.className = 'project' + (i % 2 ? ' project--flip' : '') + (embedSrc ? '' : ' project--soon');
    art.innerHTML = `
      <div class="frame" data-frame ${embedSrc ? `data-src="${embedSrc}"` : ''}>
        <div class="frame__bar"><div class="frame__dots"><i></i><i></i><i></i></div><div class="frame__url">${host}</div></div>
        <div class="frame__viewport">
          <div class="frame__scaler"><iframe title="${p.name}" loading="lazy" tabindex="-1"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe></div>
          <div class="frame__poster">
            ${embedSrc ? '<div class="frame__spinner"></div>' : ''}
            <b>${p.name}</b>
            <span data-pwake>${embedSrc ? t('waking') : t('soon')}</span>
            ${openUrl ? `<a class="frame__open" href="${openUrl}" target="_blank" rel="noopener" data-popen>${t('openLive')}</a>` : ''}
          </div>
          <div class="frame__catch"></div>
          <div class="frame__hint" data-phint>${t('hint')}</div>
        </div>
      </div>
      <div class="project__info">
        <span class="project__idx">${p.idx} · ${p.year}</span>
        <h3 class="project__name">${p.name}</h3>
        <p class="project__desc" data-pdesc="${i}">${p.desc[LANG]}</p>
        <div class="project__tags">${p.tags.map((x) => `<span>${x}</span>`).join('')}</div>
        ${openUrl ? `<div class="project__links"><a class="project__live" href="${openUrl}" target="_blank" rel="noopener" data-plive>${t('liveBtn')}</a></div>` : ''}
      </div>`;
    wrap.appendChild(art);
  });

  applyLang(LANG);
  const langBtn = document.querySelector('.lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => { const nl = LANG === 'pt' ? 'en' : 'pt'; try { sessionStorage.setItem('bl-lang', nl); } catch (e) {} applyLang(nl); });

  /* ---------- escala do iframe ---------- */
  const DESIGN_W = 1440;
  function scaleFrame(frame) {
    const vp = frame.querySelector('.frame__viewport'), scaler = frame.querySelector('.frame__scaler');
    const w = vp.clientWidth, h = vp.clientHeight, scale = w / DESIGN_W;
    scaler.style.width = DESIGN_W + 'px'; scaler.style.height = (h / scale) + 'px'; scaler.style.transform = `scale(${scale})`;
  }
  const frames = [...document.querySelectorAll('[data-frame]')];
  const scaleAll = () => frames.forEach(scaleFrame);
  window.addEventListener('resize', scaleAll); scaleAll();

  /* frame sem src (demo ainda não publicada) mostra o poster "em breve" e para o spinner */
  function markUnavailable(frame) {
    frame.classList.add('is-unavailable');
    const spin = frame.querySelector('.frame__spinner'); if (spin) spin.remove();
    const catcher = frame.querySelector('.frame__catch'); if (catcher) catcher.remove();
    const wake = frame.querySelector('[data-pwake]');
    if (wake) wake.textContent = frame.dataset.src ? t('openLive') : t('soon');
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting || e.target.dataset.loaded) return;
      const frame = e.target; frame.dataset.loaded = '1'; io.unobserve(frame);
      const src = frame.dataset.src;
      if (!src) { markUnavailable(frame); return; }            // nada pra embutir → poster "em breve"
      const iframe = frame.querySelector('iframe'), poster = frame.querySelector('.frame__poster');
      let done = false;
      const finish = () => { if (done) return; done = true; clearTimeout(timer);
        frame.classList.add('is-loaded'); setTimeout(() => poster.classList.add('is-hidden'), 300); scaleFrame(frame); };
      // se não carregar em 8s (URL fora do ar), não trava no spinner: cai pro "abrir ao vivo"
      const timer = setTimeout(() => { if (!done) { done = true; markUnavailable(frame); } }, 8000);
      iframe.addEventListener('load', finish);
      iframe.addEventListener('error', () => { if (!done) { done = true; clearTimeout(timer); markUnavailable(frame); } });
      iframe.src = src;
    });
  }, { rootMargin: '250px' });
  frames.forEach((f) => io.observe(f));

  document.querySelectorAll('.frame__catch').forEach((c) => c.addEventListener('click', () => {
    const frame = c.closest('.frame'); frame.classList.add('is-live'); frame.querySelector('iframe').removeAttribute('tabindex');
  }));

  /* ---------- Lenis + ScrollTrigger ---------- */
  if (!reduce && window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.09 });
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add((tm) => lenis.raf(tm * 1000)); gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href'); if (id.length > 1) { ev.preventDefault(); lenis.scrollTo(id, { offset: -20 }); }
    }));
  }

  gsap.to('[data-progress]', { width: '100%', ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  /* ---------- reveals ---------- */
  document.querySelectorAll('[data-reveal]').forEach((line) => {
    const inner = document.createElement('span'); inner.innerHTML = line.innerHTML; line.innerHTML = ''; line.appendChild(inner);
    gsap.set(inner, { yPercent: 118 });
    gsap.to(inner, { yPercent: 0, ease: 'power4.out', duration: 1.1, scrollTrigger: { trigger: line, start: 'top 94%' } });
  });
  gsap.utils.toArray('.hero__sub, .hero__meta, .eyebrow').forEach((el, i) => gsap.from(el, { opacity: 0, y: 22, duration: .9, delay: .25 + i * .1, ease: 'power3.out' }));
  gsap.utils.toArray('.frame').forEach((f) => gsap.to(f, { opacity: 1, y: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 86%' }, onComplete: () => scaleFrame(f) }));
  gsap.utils.toArray('.project__info > *, .about__text p, .about__list li, .work__note, .work__title, .super__title, .super__note, .about__lead, .services__title, .svc-card, .trust, .process__title, .process__note, .step').forEach((el) =>
    gsap.from(el, { opacity: 0, y: 22, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' } }));
  gsap.from('.about__photo', { opacity: 0, y: 40, scale: .96, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.about__photo', start: 'top 88%' } });

  /* ---------- superpower: barras + KPIs ---------- */
  const chart = document.querySelector('[data-chart]');
  if (chart) window.ScrollTrigger.create({ trigger: '.transform', start: 'top 75%', once: true, onEnter: () => chart.classList.add('is-in') });
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true }, onUpdate: () => { el.textContent = pre + Math.round(o.v) + suf; } });
  });

  /* ---------- badges/sticker flutuando ---------- */
  if (!reduce) gsap.utils.toArray('[data-float]').forEach((el, i) => {
    gsap.to(el, { y: '+=10', rotation: '+=1.5', duration: 2 + i * .3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * .2 });
  });

  /* ---------- cursor ---------- */
  (function cursor() {
    if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    const ring = document.querySelector('.cursor'), dot = document.querySelector('.cursor__dot');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; gsap.set(dot, { x: mx, y: my }); });
    gsap.ticker.add(() => { rx += (mx - rx) * .18; ry += (my - ry) * .18; gsap.set(ring, { x: rx, y: ry }); });
    document.querySelectorAll('a,button,.frame__catch').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
  })();

  window.addEventListener('load', () => { scaleAll(); window.ScrollTrigger.refresh(); });
})();
