/* [공용] 네비 스크롤스파이 + 스크롤 페이드인 — 반드시 마지막 로드 */
/* ================================================================
   15. 내비게이션 스크롤스파이
================================================================ */
(function(){
  const ids=[...document.querySelectorAll('section[id]')].map(s=>s.id);
  const links={};
  document.querySelectorAll('nav a[href^="#"]').forEach(a=>links[a.getAttribute('href').slice(1)]=a);
  function spy(){
    let cur=null;
    for(const id of ids){
      const el=document.getElementById(id);
      if(el&&el.getBoundingClientRect().top<=110)cur=id;
    }
    Object.values(links).forEach(a=>a.classList.remove('cur'));
    if(cur&&links[cur])links[cur].classList.add('cur');
  }
  window.addEventListener('scroll',spy,{passive:true});
  spy();
})();

/* ================================================================
   19. 스크롤 진입 페이드인
================================================================ */
(function(){
  if(!('IntersectionObserver' in window))return;
  const els=document.querySelectorAll('.wrap section > div, .wrap section > table');
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}
  }),{threshold:.05});
  els.forEach(el=>{el.classList.add('fade-el');io.observe(el);});
})();

