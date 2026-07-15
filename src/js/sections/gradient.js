/* 경사 하강법 체험존 (⑤) — 공이 손실 골짜기를 내려간다.
   수학: 위치 u∈[-1,1], 손실=u², 기울기=2u → u_new = u − lr·2u = u(1−2·lr)
   lr 0.05→천천히 수렴, 0.3→빠르게 수렴, 1.05→계수 |1−2.1|>1 이라 발산. */
let gdKey='good', gdU=-0.9, gdSteps=0, gdFlown=false;
const gdCX=200, gdHalf=170, gdBaseY=190, gdAmp=150;
function gdCurveY(u){ return gdBaseY - gdAmp*u*u; }
(function gdDrawCurve(){
  const pts=[];
  for(let u=-1.06;u<=1.061;u+=0.04) pts.push((gdCX+u*gdHalf).toFixed(1)+','+gdCurveY(u).toFixed(1));
  document.getElementById('gdCurve').setAttribute('points',pts.join(' '));
})();
function gdRender(){
  const st=GD_LRS[gdKey];
  const ball=document.getElementById('gdBall');
  const uDraw=Math.max(-1.06,Math.min(1.06,gdU));
  ball.setAttribute('cx',gdCX+uDraw*gdHalf);
  ball.setAttribute('cy',gdCurveY(uDraw)-9);
  const loss=(gdU*gdU).toFixed(3);
  const info=document.getElementById('gdInfo');
  if(gdFlown){
    info.innerHTML=`💥 <b>공이 골짜기 밖으로 날아갔어요!</b> (${gdSteps}걸음 만에 발산) — 학습률이 너무 크면 손실이 줄기는커녕 폭발합니다. 학습률을 줄여 다시 굴려 보세요.`;
    info.style.background='#fdecec';
  }else{
    info.innerHTML=`👟 걸음 수 <b>${gdSteps}</b> · 현재 손실(Loss) <b>${loss}</b> ${Math.abs(gdU)<0.02?'— 🎉 최저점 도착! 학습 완료':''}<br>${st.desc}`;
    info.style.background='var(--rl-bg)';
  }
}
function gdTrailDot(){
  const g=document.getElementById('gdTrail');
  const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
  const uDraw=Math.max(-1.06,Math.min(1.06,gdU));
  c.setAttribute('cx',gdCX+uDraw*gdHalf); c.setAttribute('cy',gdCurveY(uDraw)-9);
  c.setAttribute('r',4); c.setAttribute('fill','#2ab3a6'); c.setAttribute('opacity','.35');
  g.appendChild(c);
}
function gdPick(k,btn){
  gdKey=k;
  document.querySelectorAll('#gdBtns button').forEach(b=>b.className='act neutral');
  btn.className='act fwd';
  gdReset();
}
function gdReset(){
  gdU=-0.9; gdSteps=0; gdFlown=false;
  document.getElementById('gdTrail').innerHTML='';
  gdRender();
}
function gdStep(){
  if(gdFlown) return;
  gdTrailDot();
  gdU=gdU*(1-2*GD_LRS[gdKey].lr);
  gdSteps++;
  if(Math.abs(gdU)>1.5) gdFlown=true;
  gdRender();
}
gdReset();
