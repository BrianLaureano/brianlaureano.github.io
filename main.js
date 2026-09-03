/* ============ Brian Laureano — Portfolio · "3D creator" clone ============ */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  /* ---------- projetos (link ao vivo real; sem embed) ---------- */
  const PROJECTS = [
    { n:'01', cat:{en:'Editorial · Café',pt:'Editorial · Cafeteria'}, name:'Café Aurora',
      live:'https://brianlaureano.github.io/cafe-aurora/',
      shot:'assets/shots/cafe-aurora.jpg',
      tags:['Next.js','Editorial','Photography','Menu'] },
    { n:'02', cat:{en:'Luxury · Real Estate',pt:'Luxo · Imobiliária'}, name:'Zenith Realty',
      live:'https://brianlaureano.github.io/zenith/',
      shot:'assets/shots/zenith.jpg',
      tags:['Next.js','Luxury','GSAP','Scroll'] },
  ];

  /* ---------- serviços 01–05 ---------- */
  const SERVICES = [
    { n:'01', t:{en:'Web Design',pt:'Web Design'},
      d:{en:'Clean, modern, conversion-focused websites with attention to layout, typography and user experience.',
         pt:'Sites limpos, modernos e focados em conversão, com atenção a layout, tipografia e experiência do usuário.'} },
    { n:'02', t:{en:'Animated Landing Pages',pt:'Landing Pages Animadas'},
      d:{en:'High-converting, scroll-driven pages with real motion — Next.js · GSAP · Lenis. Built to make visitors act, not just look.',
         pt:'Páginas que convertem, guiadas por scroll e com motion de verdade — Next.js · GSAP · Lenis. Feitas pra fazer o visitante agir, não só olhar.'} },
    { n:'03', t:{en:'Custom Dashboards',pt:'Dashboards Sob Medida'},
      d:{en:'Real-time dashboards and internal tools with live charts, KPIs, roles and secure data — the software that runs the operation.',
         pt:'Dashboards em tempo real e ferramentas internas com gráficos ao vivo, KPIs, permissões e dados seguros — o software que toca a operação.'} },
    { n:'04', t:{en:'Spreadsheets → Web Apps',pt:'Planilhas → Web Apps'},
      d:{en:'Your data is trapped in Sheets. I turn those tabs and formulas into a fast, secure web app your whole team enjoys using.',
         pt:'Seus dados estão presos em planilhas. Eu transformo aquelas abas e fórmulas num app web rápido e seguro que o time inteiro gosta de usar.'} },
    { n:'05', t:{en:'Motion & Brand',pt:'Motion & Marca'},
      d:{en:'Cinematic front-end, brand systems and micro-interactions that give a product a memorable, unmistakable presence.',
         pt:'Front-end cinematográfico, sistemas de marca e micro-interações que dão ao produto uma presença memorável e inconfundível.'} },
  ];

  /* ---------- i18n ---------- */
  const I18N = {
    navAbout:{en:'About',pt:'Sobre'}, navServices:{en:'Services',pt:'Serviços'},
    navProjects:{en:'Projects',pt:'Projetos'}, navContact:{en:'Contact',pt:'Contato'},
    cta:{en:'Contact me',pt:'Fale comigo'}, scroll:{en:'Scroll',pt:'Role'},
    heroTag:{en:'A CREATIVE DEVELOPER DRIVEN BY<br>CRAFTING STRIKING AND<br>UNFORGETTABLE PROJECTS',
             pt:'UM DESENVOLVEDOR CRIATIVO MOVIDO A<br>CRIAR PROJETOS MARCANTES E<br>INESQUECÍVEIS'},
    aboutText:{en:"With more than five years turning ideas into fast, cinematic websites, I focus on web design, dashboards and brand experiences — I truly enjoy working with businesses that want to stand out and present their best image. Let's build something incredible together.",
               pt:'Com mais de cinco anos transformando ideias em sites rápidos e cinematográficos, foco em web design, dashboards e experiências de marca — gosto de verdade de trabalhar com negócios que querem se destacar e mostrar sua melhor imagem. Vamos construir algo incrível juntos.'},
    svcTitle:{en:'SERVICES',pt:'SERVIÇOS'},
    stat1:{en:'Years crafting the web',pt:'Anos criando na web'},
    stat2:{en:'Projects shipped',pt:'Projetos entregues'},
    stat3:{en:'Design + code, one person',pt:'Design + código, uma pessoa'},
    stat4:{en:'Reply time',pt:'Tempo de resposta'},
    contactEyebrow:{en:'Available for freelance & contract',pt:'Disponível para freelance & contrato'},
    contactNote:{en:'Got a project in mind? I design the story and write the code — start to finish, one person.',
                 pt:'Tem um projeto em mente? Eu desenho a história e escrevo o código — do início ao fim, uma pessoa só.'},
    footer:{en:'Designed & coded, one person.',pt:'Desenhado & codado, uma pessoa só.'},
    live:{en:'Live project ↗',pt:'Ver ao vivo ↗'}, soon:{en:'Coming soon',pt:'Em breve'},
  };
  let LANG='en';
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
    PROJECTS.forEach(p=>{
      const hasLive=!!p.live;
      const art=document.createElement('article');
      art.className='proj';
      art.innerHTML=`
        <div class="proj__head">
          <span class="proj__n">${p.n}</span>
          <div class="proj__meta">
            <span class="proj__cat" data-pcat>${p.cat[LANG]}</span>
            <span class="proj__name">${p.name}</span>
          </div>
          <div class="proj__live">
            ${hasLive
              ? `<a class="pill--ghost" href="${p.live}" target="_blank" rel="noopener" data-plive>${t('live')}</a>`
              : `<span class="pill--ghost is-soon" data-psoon>${t('soon')}</span>`}
          </div>
        </div>
        <a class="proj__shot" ${hasLive?`href="${p.live}" target="_blank" rel="noopener"`:''}>
          <img src="${p.shot}" alt="${p.name}" loading="lazy"
             onerror="this.parentNode.classList.add('is-empty');this.parentNode.innerHTML='<div class=&quot;shot__ph&quot;><b>${p.name}</b></div>'"/>
        </a>
        <div class="proj__tags">${p.tags.map(x=>`<span>${x}</span>`).join('')}</div>`;
      art._data=p; projWrap.appendChild(art);
    });
  }

  /* ---------- lang apply ---------- */
  function applyLang(l){
    LANG=l;
    document.documentElement.setAttribute('lang', l==='pt'?'pt-BR':'en');
    document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n; if(I18N[k])el.innerHTML=I18N[k][l];});
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(s=>s.classList.toggle('is-active', s.dataset.lang===l));
    document.querySelectorAll('.svc-item').forEach(li=>{if(li._data){li.querySelector('[data-stitle]').textContent=li._data.t[l]; li.querySelector('[data-sdesc]').textContent=li._data.d[l];}});
    document.querySelectorAll('.proj').forEach(a=>{if(a._data){a.querySelector('[data-pcat]').textContent=a._data.cat[l]; const lv=a.querySelector('[data-plive]'); if(lv)lv.textContent=t('live'); const sn=a.querySelector('[data-psoon]'); if(sn)sn.textContent=t('soon');}});
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

  /* ---------- hero: avatar parallax + tag/cta in ---------- */
  if(!reduce){
    gsap.from('.hero__tag,.hero__cta',{opacity:0,y:20,duration:1,delay:.5,stagger:.12,ease:'power3.out'});
    const av=document.querySelector('[data-tilt]');
    if(av && window.matchMedia('(hover:hover)').matches){
      window.addEventListener('mousemove',e=>{
        const rx=(e.clientX/innerWidth-.5), ry=(e.clientY/innerHeight-.5);
        gsap.to(av,{x:rx*30,rotationY:rx*10,rotationX:-ry*8,duration:.9,ease:'power2.out',transformPerspective:800});
      });
    }
    gsap.to('.hero__avatar',{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.4}});
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

  /* ---------- cursor ---------- */
  (function cursor(){
    if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    const ring=document.querySelector('.cursor'), dot=document.querySelector('.cursor__dot');
    let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;gsap.set(dot,{x:mx,y:my});});
    gsap.ticker.add(()=>{rx+=(mx-rx)*.18;ry+=(my-ry)*.18;gsap.set(ring,{x:rx,y:ry});});
    document.querySelectorAll('a,button,.shot,.proj').forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add('is-hover'));
      el.addEventListener('mouseleave',()=>ring.classList.remove('is-hover'));
    });
  })();

  window.addEventListener('load',()=>window.ScrollTrigger.refresh());
})();
