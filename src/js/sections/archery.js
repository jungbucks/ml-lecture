/* 화살 좌표 생성 — 과녁 중심 (110,100) */
function ofArrows(kind){
  const pts=[];
  for(let i=0;i<7;i++){
    let r;
    if(kind==='wild')          r=26+Math.random()*66;   // 사방으로 빗나감
    else if(kind==='good')     r=3+Math.random()*15;    // 10점 근처
    else if(kind==='perfect')  r=Math.random()*4;       // 전부 정중앙
    else /* disaster */        r=82+Math.random()*24;   // 과녁 밖 관중석
    const a=Math.random()*Math.PI*2;
    const x=Math.min(212,Math.max(8,110+Math.cos(a)*r));
    const y=Math.min(192,Math.max(8,100+Math.sin(a)*r*0.88));
    pts.push({x,y,r});
  }
  return pts;
}
/* 링 반지름 → 점수 (10/9/7/5/3/0) */
function ofScore(r){return r<=7?10:r<=18?9:r<=34?7:r<=52?5:r<=70?3:0;}

function ofTargetSvg(pts,kind){
  const rings=[
    [70,'#f9fafb','#d9cdb8'],[52,'#bfdbfe','#93c5fd'],
    [34,'#fecaca','#fca5a5'],[18,'#fde68a','#fbbf24'],[7,'#f59e0b','#d97706'],
  ];
  let s=rings.map(([r,f,st])=>`<circle cx="110" cy="100" r="${r}" fill="${f}" stroke="${st}" stroke-width="1.5"/>`).join('');
  if(kind==='disaster'){
    s+=`<text x="16" y="22" font-size="15">👥</text><text x="192" y="22" font-size="15">👥</text>`+
       `<text x="16" y="192" font-size="15">👥</text><text x="192" y="192" font-size="15">👥</text>`+
       `<text x="110" y="16" text-anchor="middle" font-size="10" fill="#d64545" font-weight="700">⚠ 관중석 주의!</text>`;
  }
  s+=pts.map((p,i)=>
    `<g class="of-a" style="animation-delay:${i*90}ms">`+
      `<circle cx="${p.x}" cy="${p.y}" r="5" fill="#2c2620" stroke="#fff" stroke-width="1.8"/>`+
      `<circle cx="${p.x-1.5}" cy="${p.y-1.5}" r="1.2" fill="#fff" opacity=".8"/>`+
    `</g>`).join('');
  return s;
}

function ofScoreLine(pts){
  const avg=pts.reduce((s,p)=>s+ofScore(p.r),0)/pts.length;
  const face=avg>=8.5?'🏆':avg>=6?'🙂':avg>=2.5?'😅':'😱';
  return {avg,html:`평균 <span style="font-size:1.1rem">${avg.toFixed(1)}</span>점 ${face}`};
}

function ofUpdate(){
  const ep=parseInt(document.getElementById('ofEpoch').value,10);
  const st=OF_STATES[ep];
  document.getElementById('ofEpochV').textContent=OF_EPOCH_NAME[ep];
  const box=document.getElementById('ofDesc');
  box.style.background=st.bg;
  box.innerHTML=`<span class="of-badge" style="background:rgba(255,255,255,.75);color:${st.fg}">${st.label}</span><br>${st.desc}`;
  box.style.color='#2c2620';

  const tr=ofArrows(st.train), te=ofArrows(st.test);
  document.getElementById('ofTrainSvg').innerHTML=ofTargetSvg(tr,st.train);
  document.getElementById('ofTestSvg').innerHTML=ofTargetSvg(te,st.test);
  const trS=ofScoreLine(tr), teS=ofScoreLine(te);
  const trEl=document.getElementById('ofTrainScore'), teEl=document.getElementById('ofTestScore');
  trEl.innerHTML=trS.html+(st.train==='perfect'?' <span style="font-size:.8rem;color:var(--ok)">(전부 정중앙!)</span>':'');
  teEl.innerHTML=teS.html+(st.test==='disaster'?' <span style="font-size:.8rem;color:var(--bad)">(관중석으로…)</span>':'');
  trEl.style.color=trS.avg>=6?'var(--ens-deep)':'#7a6c58';
  teEl.style.color=teS.avg>=6?'var(--ens-deep)':(teS.avg<2.5?'var(--bad)':'#7a6c58');
}
ofUpdate();
