/* ============ Brian Laureano - Portfolio · "3D creator" clone ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- projetos (link ao vivo real; sem embed) ---------- */
  const GH='https://github.com/BrianLaureano/brianlaureano.github.io/tree/main/';
  const PROJECTS = [
    { n:'01', cat:{en:'Data · Real-time Ops',pt:'Dados · Operação em Tempo Real'}, name:{en:'Real-time Operations Panel',pt:'Painel Operacional em Tempo Real'},
      live:'', shot:'assets/shots/painel.jpg',
      blurb:{en:'A web app operators used to track events live. Built end to end: daily .xlsx ingestion, category-based alert logic, KPIs comparing results vs. historical average, real-time sync and an admin panel with audit and export. Structured a historical base of 75k+ records from 130 weekly sheets (2.5 years of data). Works offline (PWA).',
             pt:'App web que operadores usavam para acompanhar eventos ao vivo. Construído de ponta a ponta: ingestão de planilhas .xlsx diárias, lógica de alertas por categoria, KPIs comparando resultado vs. média histórica, sincronização em tempo real e painel admin com auditoria e exportação. Estruturei uma base histórica de +75 mil registros a partir de 130 planilhas semanais (2,5 anos de dados). Funciona offline (PWA).'},
      tags:['JavaScript','Firebase','SheetJS','PWA'] },
    { n:'02', cat:{en:'Data · Analytics Dashboard',pt:'Dados · Dashboard de Analytics'}, name:{en:'Nebula Analytics Dashboard',pt:'Dashboard de Analytics'},
      live:'https://brianlaureano.github.io/dashboard-nebula/', repo:GH+'dashboard-nebula',
      shot:'assets/shots/dashboard.jpg',
      blurb:{en:'A dark-themed interactive analytics dashboard with live charts, KPIs and forecasting across multiple views. Every metric recalculates on its own as new data comes in, processed right in the browser.',
             pt:'Dashboard de analytics interativo (tema dark) com gráficos ao vivo, KPIs e previsão em várias visões. Cada métrica se recalcula sozinha conforme novos dados chegam, com processamento no próprio navegador.'},
      tags:['JavaScript','Chart.js','KPIs','Analytics'] },
    { n:'03', cat:{en:'Data · Internal Tool / CRM',pt:'Dados · Ferramenta Interna / CRM'}, name:{en:'Helm — Admin & CRM Panel',pt:'Helm — Painel Admin & CRM'},
      live:'https://brianlaureano.github.io/admin-helm/', repo:GH+'admin-helm',
      shot:'assets/shots/admin-helm.jpg',
      blurb:{en:'An internal admin/CRM panel: records management, roles, filters, tables and a clean data-dense UI — the kind of internal software a team actually runs the operation on.',
             pt:'Painel admin/CRM interno: gestão de registros, permissões, filtros, tabelas e uma UI limpa e densa em dados — o tipo de software interno em que um time realmente toca a operação.'},
      tags:['JavaScript','CRM','Tables','Roles'] },
    { n:'04', cat:{en:'Editorial · Café',pt:'Editorial · Cafeteria'}, name:{en:'Café Aurora',pt:'Café Aurora'},
      live:'https://brianlaureano.github.io/cafe-aurora/', repo:GH+'cafe-aurora',
      shot:'assets/shots/cafe-aurora.jpg',
      blurb:{en:'A warm editorial site for a specialty coffee house. Real photography, a filterable menu, and motion that feels alive.',
             pt:'Um site editorial e acolhedor para uma cafeteria especial. Fotografia real, menu filtrável e movimento que parece vivo.'},
      tags:['Next.js','Editorial','Photography','Menu'] },
    { n:'05', cat:{en:'Luxury · Real Estate',pt:'Luxo · Imobiliária'}, name:{en:'Zenith Realty',pt:'Zenith Realty'},
      live:'https://brianlaureano.github.io/zenith/', repo:GH+'zenith',
      shot:'assets/shots/zenith.jpg',
      blurb:{en:'A luxury real-estate brand with scroll-driven scenes and property cards built to pull you in.',
             pt:'Uma marca imobiliária de luxo com cenas guiadas por scroll e cards de imóvel feitos pra te puxar pra dentro.'},
      tags:['Next.js','Luxury','GSAP','Scroll'] },
    { n:'06', cat:{en:'E-commerce · Store',pt:'E-commerce · Loja'}, name:{en:'Lumen Store',pt:'Lumen Store'},
      live:'https://brianlaureano.github.io/shop-lumen/', repo:GH+'shop-lumen',
      shot:'assets/shots/shop-lumen.jpg',
      blurb:{en:'A modern e-commerce storefront: product grid, cart flow and a checkout-ready layout with crisp, conversion-focused UI.',
             pt:'Uma loja e-commerce moderna: grade de produtos, fluxo de carrinho e layout pronto pra checkout, com UI nítida e focada em conversão.'},
      tags:['JavaScript','E-commerce','Cart','UI'] },
    { n:'07', cat:{en:'SaaS · Landing Page',pt:'SaaS · Landing Page'}, name:{en:'Flowbase',pt:'Flowbase'},
      live:'https://brianlaureano.github.io/landing-flowbase/', repo:GH+'landing-flowbase',
      shot:'assets/shots/landing-flowbase.jpg',
      blurb:{en:'A conversion-focused SaaS product landing page: clear value prop, feature sections, pricing and strong calls to action with real scroll motion.',
             pt:'Landing page de produto SaaS focada em conversão: proposta de valor clara, seções de features, pricing e CTAs fortes com motion de scroll de verdade.'},
      tags:['Landing','SaaS','Conversion','GSAP'] },
    { n:'08', cat:{en:'Concept · Character',pt:'Conceito · Personagem'}, name:{en:'Feral Edge',pt:'Feral Edge'},
      live:'https://brianlaureano.github.io/feral-edge/', repo:GH+'feral-edge',
      shot:'assets/shots/feral-edge.jpg',
      blurb:{en:'A cinematic character concept: a cursor-follow scanner x-rays the operative under his shell, with synth sound and a lab-dossier blueprint on scroll.',
             pt:'Um conceito de personagem cinematográfico: um scanner que segue o cursor faz raio-x do operativo sob a casca, com som sintetizado e um blueprint de dossiê ao rolar.'},
      tags:['GSAP','Web Audio','Interactive','Concept'] },
  ];

  /* ---------- serviços 01-05 ---------- */
  const SERVICES = [
    { n:'01', t:{en:'Custom Dashboards & BI',pt:'Dashboards & BI Sob Medida'},
      d:{en:'Real-time dashboards and internal tools with live charts, KPIs, roles and secure data. The software that actually runs the operation.',
         pt:'Dashboards em tempo real e ferramentas internas com gráficos ao vivo, KPIs, permissões e dados seguros. O software que realmente toca a operação.'} },
    { n:'02', t:{en:'Spreadsheets → Web Apps',pt:'Planilhas → Web Apps'},
      d:{en:'Your data is trapped in Sheets. I turn those tabs and formulas into a fast, secure web app your whole team enjoys using.',
         pt:'Seus dados estão presos em planilhas. Eu transformo aquelas abas e fórmulas num app web rápido e seguro que o time inteiro gosta de usar.'} },
    { n:'03', t:{en:'Data Automation',pt:'Automação de Dados'},
      d:{en:'Manual, repetitive reporting turned into automated pipelines: daily file ingestion, validation and KPIs that recalculate on their own.',
         pt:'Relatórios manuais e repetitivos viram pipelines automáticos: ingestão diária de arquivos, validação e KPIs que se recalculam sozinhos.'} },
    { n:'04', t:{en:'Web Design & Landing Pages',pt:'Web Design & Landing Pages'},
      d:{en:'Clean, modern, conversion-focused pages with real scroll-driven motion, built with Next.js, GSAP and Lenis.',
         pt:'Páginas limpas, modernas e focadas em conversão, com motion de verdade guiado por scroll, feitas com Next.js, GSAP e Lenis.'} },
    { n:'05', t:{en:'Motion & Brand',pt:'Motion & Marca'},
      d:{en:'Cinematic front-end, brand systems and micro-interactions that give a product a memorable, unmistakable presence.',
         pt:'Front-end cinematográfico, sistemas de marca e micro-interações que dão ao produto uma presença memorável e inconfundível.'} },
  ];

  /* ---------- i18n ---------- */
  const I18N = {
    navAbout:{en:'About',pt:'Sobre'}, navServices:{en:'Services',pt:'Serviços'},
    navProjects:{en:'Projects',pt:'Projetos'}, navContact:{en:'Contact',pt:'Contato'},
    cta:{en:'Contact me',pt:'Fale comigo'}, scroll:{en:'Scroll',pt:'Role'},
    heroTag:{en:'A DATA & INTERNAL-TOOLS DEVELOPER<br>TURNING RAW DATA INTO<br>DECISIONS THE TEAM CAN USE',
             pt:'DESENVOLVEDOR DE DADOS E<br>FERRAMENTAS INTERNAS QUE TRANSFORMAM<br>DADO BRUTO EM DECISÃO'},
    aboutText:{en:"I build data tools end to end: real-time dashboards, process automation and internal apps — from the data model to the interface the team uses every day. I work with SQL, Power BI, JavaScript and Firebase, always turning raw data into decisions. Background in Administration, plus an MBA in progress — business sense with hands-on code.",
               pt:'Construo ferramentas de dados de ponta a ponta: dashboards em tempo real, automação de processos e apps internos — do modelo de dados à interface que a equipe usa todo dia. Trabalho com SQL, Power BI, JavaScript e Firebase, sempre transformando dado bruto em decisão. Formado em Administração, com MBA em andamento — visão de negócio com mão na massa técnica.'},
    svcTitle:{en:'SERVICES',pt:'SERVIÇOS'},
    stat1:{en:'Records processed',pt:'Registros processados'},
    stat2:{en:'Projects shipped',pt:'Projetos entregues'},
    stat3:{en:'Design + code, one person',pt:'Design + código, uma pessoa'},
    stat4:{en:'Reply time',pt:'Tempo de resposta'},
    contactEyebrow:{en:'Open to CLT/PJ roles · Data & Internal Tools · Sorocaba & remote',pt:'Aberto a vagas CLT/PJ · Dados & Ferramentas Internas · Sorocaba e remoto'},
    contactNote:{en:'Got a project in mind? I design the story and write the code, start to finish, on my own.',
                 pt:'Tem um projeto em mente? Eu desenho a história e escrevo o código, do início ao fim, sozinho.'},
    footer:{en:'Designed & coded, one person.',pt:'Desenhado & codado, uma pessoa só.'},
    live:{en:'Live project ↗',pt:'Ver ao vivo ↗'}, soon:{en:'Coming soon',pt:'Em breve'},
    code:{en:'Code ↗',pt:'Código ↗'}, caseLabel:{en:'Case study',pt:'Estudo de caso'},
    explore:{en:'Hover to tour · click to open',pt:'Passe o mouse pra explorar · clique pra abrir'},
  };
  let LANG=(navigator.language||'').toLowerCase().startsWith('pt')?'pt':'en';
  try{const s=sessionStorage.getItem('bl-lang'); if(s==='pt'||s==='en')LANG=s;}catch(e){}
  const t=(k)=>I18N[k]?I18N[k][LANG]:k;

  /* ---------- render: services ---------- */
  const svcWrap=document.querySelector('[data-services]');
  if(svcWrap){
    SERVICES.forEach(s=>{
      const li=document.createElement('li');
      li.className='svc-item';
      li.innerHTML=`<span class="svc-item__n">${s.n}</span>
        <div class="svc-item__b"><h3 data-stitle>${s.t[LANG]}</h3><p data-sdesc>${s.d[LANG]}</p></div>`;
      li._data=s; svcWrap.appendChild(li);
    });
  }

  /* ---------- render: projects ---------- */
  const projWrap=document.querySelector('[data-projects]');
  if(projWrap){
    const pname=(p)=> typeof p.name==='string' ? p.name : (p.name[LANG]||p.name.en);
    PROJECTS.forEach(p=>{
      const hasLive=!!p.live;
      const nm=pname(p);
      const host=(p.live||'').replace(/^https?:\/\//,'').replace(/\/$/,'');
      const art=document.createElement('article');
      art.className='proj';
      art.innerHTML=`
        <div class="proj__info">
          <span class="proj__n">${p.n}</span>
          <span class="proj__cat" data-pcat>${p.cat[LANG]}</span>
          <h3 class="proj__name" data-pname>${nm}</h3>
          <p class="proj__blurb" data-pblurb>${p.blurb[LANG]}</p>
          <div class="proj__tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div>
          <div class="proj__ctas">
            ${hasLive
              ? `<a class="proj__cta" href="${p.live}" target="_blank" rel="noopener" data-plive>${t('live')}</a>`
              : `<span class="proj__cta is-soon" data-psoon>${t('caseLabel')}</span>`}
            ${p.repo?`<a class="proj__cta proj__cta--ghost" href="${p.repo}" target="_blank" rel="noopener" data-pcode>${t('code')}</a>`:''}
          </div>
        </div>
        <div class="proj__frame" ${hasLive?`data-frame data-src="${p.live}"`:''}>
          <div class="proj__bar" aria-hidden="true"><i></i><i></i><i></i><span>${host||'coming soon'}</span></div>
          <div class="proj__viewport">
            <div class="proj__scaler"><iframe title="${nm}" loading="lazy" tabindex="-1" sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>
            <img class="proj__poster" src="${p.shot}" alt="${nm}" loading="lazy" onerror="this.style.display='none'"/>
            ${hasLive?`<a class="proj__cue" href="${p.live}" target="_blank" rel="noopener"><span class="proj__spin"></span><b data-pcue>${t('explore')}</b></a>`:''}
          </div>
        </div>`;
      art._data=p; projWrap.appendChild(art);
    });
  }

  /* ---------- live project previews (scaled iframe + hover tour) ---------- */
  (function previews(){
    const DESIGN_W=1440, DESIGN_H=2400;
    const frames=[...document.querySelectorAll('[data-frame]')];
    if(!frames.length) return;
    function scale(f){
      const vp=f.querySelector('.proj__viewport'), sc=f.querySelector('.proj__scaler');
      const w=vp.clientWidth, s=w/DESIGN_W;
      sc.style.width=DESIGN_W+'px'; sc.style.height=DESIGN_H+'px'; sc.style.transform='translateY(0) scale('+s+')';
      f._s=s; f._scaledH=DESIGN_H*s; f._vpH=vp.clientHeight;
    }
    const scaleAll=()=>frames.forEach(scale); scaleAll();
    window.addEventListener('resize',scaleAll);
    const canLive=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if(!canLive) return;                         // touch: keep posters (saves data); CTA opens live
    frames.forEach(f=>{
      const sc=f.querySelector('.proj__scaler'), ifr=f.querySelector('iframe');
      let raf=0, t0=0; const dur=9000;
      function step(ts){
        if(!t0)t0=ts; const el=ts-t0;
        const travel=Math.max(0,(f._scaledH||0)-(f._vpH||0));
        const ph=(el%(dur*2))/dur; const k=ph<=1?ph:2-ph;
        sc.style.transform='translateY('+(-k*travel)+'px) scale('+f._s+')';
        raf=requestAnimationFrame(step);
      }
      f.addEventListener('mouseenter',()=>{
        if(!f._loaded){ f._loaded=1; ifr.addEventListener('load',()=>{ f.classList.add('is-live'); scale(f); }); ifr.src=f.dataset.src; }
        if(reduce)return; t0=0; cancelAnimationFrame(raf); raf=requestAnimationFrame(step);
      });
      f.addEventListener('mouseleave',()=>{ cancelAnimationFrame(raf); sc.style.transform='translateY(0) scale('+f._s+')'; });
      f.addEventListener('click',()=>{ if(f.dataset.src) window.open(f.dataset.src,'_blank','noopener'); });
    });
  })();

  /* ---------- lang apply ---------- */
  function applyLang(l){
    LANG=l;
    document.documentElement.setAttribute('lang', l==='pt'?'pt-BR':'en');
    document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n; if(I18N[k])el.innerHTML=I18N[k][l];});
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(s=>s.classList.toggle('is-active', s.dataset.lang===l));
    document.querySelectorAll('.svc-item').forEach(li=>{if(li._data){li.querySelector('[data-stitle]').textContent=li._data.t[l]; li.querySelector('[data-sdesc]').textContent=li._data.d[l];}});
    document.querySelectorAll('.proj').forEach(a=>{if(a._data){a.querySelector('[data-pcat]').textContent=a._data.cat[l]; const nmEl=a.querySelector('[data-pname]'); if(nmEl)nmEl.textContent=(typeof a._data.name==='string'?a._data.name:(a._data.name[l]||a._data.name.en)); const bl=a.querySelector('[data-pblurb]'); if(bl)bl.textContent=a._data.blurb[l]; const lv=a.querySelector('[data-plive]'); if(lv)lv.textContent=t('live'); const sn=a.querySelector('[data-psoon]'); if(sn)sn.textContent=t('caseLabel'); const cd=a.querySelector('[data-pcode]'); if(cd)cd.textContent=t('code'); const cu=a.querySelector('[data-pcue]'); if(cu)cu.textContent=t('explore');}});
  }
  applyLang(LANG);
  const langBtn=document.querySelector('.lang-toggle');
  if(langBtn)langBtn.addEventListener('click',()=>{const nl=LANG==='pt'?'en':'pt'; try{sessionStorage.setItem('bl-lang',nl);}catch(e){} applyLang(nl);});

  /* ---------- Lenis + ScrollTrigger ---------- */
  if(!reduce && window.Lenis){
    const lenis=new window.Lenis({lerp:.09});
    lenis.on('scroll', window.ScrollTrigger.update);
    gsap.ticker.add(tm=>lenis.raf(tm*1000)); gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{
      const id=a.getAttribute('href'); if(id.length>1){ev.preventDefault(); lenis.scrollTo(id,{offset:-10});}
    }));
  }

  gsap.to('[data-progress]',{width:'100%',ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});

  /* ---------- reveals ---------- */
  document.querySelectorAll('[data-reveal]').forEach(line=>{
    const inner=document.createElement('span'); inner.style.display='inline-block'; inner.innerHTML=line.innerHTML;
    line.innerHTML=''; line.appendChild(inner);
    gsap.set(inner,{yPercent:118});
    gsap.to(inner,{yPercent:0,ease:'power4.out',duration:1.1,scrollTrigger:{trigger:line,start:'top 92%'}});
  });
  gsap.utils.toArray('.proj').forEach(el=>window.ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:()=>el.classList.add('is-in')}));
  gsap.utils.toArray('.about__title, .projects__title, .contact__title, .stat, .svc-item, .about__text, .about__cta, .contact__eyebrow, .contact__note, .contact__mail, .contact__socials').forEach(el=>
    gsap.from(el,{opacity:0,y:28,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));

  /* ---------- hero: signature entrance ---------- */
  if(!reduce){
    const tl=gsap.timeline({defaults:{ease:'power4.out'}});
    tl.from('.topnav__links a, .topnav__home, .lang-toggle',{y:-14,opacity:0,duration:.7,stagger:.05})
      .from('.hero__title .hero__ln1, .hero__title .hero__ln2',{yPercent:120,opacity:0,duration:1.1,stagger:.12},'-=.3')
      .from('.hero__avatar',{scale:.82,opacity:0,duration:1.2,ease:'power3.out'},'-=.9')
      .from('.aura--hero',{scale:.6,opacity:0,duration:1.4,ease:'power2.out'},'<')
      .from('.hero__gem',{scale:0,rotate:-40,opacity:0,duration:.9,ease:'back.out(1.7)'},'-=1')
      .from('.hero__tag,.hero__cta',{y:20,opacity:0,duration:.9,stagger:.12},'-=.7');

    const av=document.querySelector('[data-tilt]');
    if(av && window.matchMedia('(hover:hover)').matches){
      window.addEventListener('mousemove',e=>{
        const rx=(e.clientX/innerWidth-.5), ry=(e.clientY/innerHeight-.5);
        gsap.to(av,{x:rx*30,rotationY:rx*10,rotationX:-ry*8,duration:.9,ease:'power2.out',transformPerspective:800});
      });
    }
    gsap.to('.hero__avatar',{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.4}});
  }

  /* ---------- nav: scrollspy + condensed on scroll ---------- */
  (function nav(){
    const topnav=document.querySelector('.topnav');
    const links=[...document.querySelectorAll('.topnav__links a')];
    const map=new Map(links.map(a=>[a.getAttribute('href').slice(1),a]));
    window.ScrollTrigger.create({start:'top -80',end:'max',onUpdate:self=>topnav.classList.toggle('is-scrolled',self.scroll()>80)});
    ['about','services','projects','contact'].forEach(id=>{
      const sec=document.getElementById(id); if(!sec)return;
      window.ScrollTrigger.create({trigger:sec,start:'top 55%',end:'bottom 55%',
        onToggle:self=>{if(self.isActive){links.forEach(l=>l.classList.remove('is-active')); const a=map.get(id); if(a)a.classList.add('is-active');}}});
    });
  })();

  /* ---------- magnetic CTAs ---------- */
  if(!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.querySelectorAll('.pill--cta').forEach(btn=>{
      btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();
        gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.35,y:(e.clientY-r.top-r.height/2)*.5,duration:.4,ease:'power2.out'});});
      btn.addEventListener('mouseleave',()=>gsap.to(btn,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}));
    });
    /* live-frame cursor-tilt (just the preview, not the text) */
    document.querySelectorAll('.proj__frame').forEach(card=>{
      card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
        const rx=(e.clientY-r.top-r.height/2)/r.height, ry=(e.clientX-r.left-r.width/2)/r.width;
        gsap.to(card,{rotationX:-rx*3.5,rotationY:ry*4.5,duration:.5,ease:'power2.out',transformPerspective:1400,transformOrigin:'center'});});
      card.addEventListener('mouseleave',()=>gsap.to(card,{rotationX:0,rotationY:0,duration:.7,ease:'power3.out'}));
    });
  }

  /* ---------- count-up (stats) ---------- */
  gsap.utils.toArray('[data-count]').forEach((el)=>{
    const end=parseFloat(el.dataset.count), suf=el.dataset.suffix||'', o={v:0};
    gsap.to(o,{v:end, duration:1.8, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 92%', once:true},
      onUpdate:()=>{el.textContent=Math.round(o.v)+suf;}});
  });

  /* ---------- floating props ---------- */
  if(!reduce)gsap.utils.toArray('[data-float]').forEach((el,i)=>{
    gsap.to(el,{y:'+=14',rotation:'+=3',duration:2.4+i*.35,ease:'sine.inOut',yoyo:true,repeat:-1,delay:i*.25});
  });

  window.addEventListener('load',()=>window.ScrollTrigger.refresh());
})();
