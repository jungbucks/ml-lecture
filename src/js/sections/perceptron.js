/* ================================================================
   4. 퍼셉트론 애니메이션
================================================================ */
const P_FWD_SEQ=[["nx1","nx2","nx3"],["e1","e2","e3","w1","w2","w3"],["nsum","eb","nb"],["e4"],["nact"],["e5"],["nout"]];
const P_FWD_MSG=["① 입력값 x₁, x₂, xₙ이 들어옵니다.","② 각 입력에 가중치 w를 곱합니다. (wx)","③ Σ에서 모두 합산하고, 편향 b를 더합니다. → Σ(wx)+b","④ 가중합이 활성화 함수로 전달됩니다.","⑤ 계단함수(step): 0보다 크면 1, 아니면 0!","⑥ 최종 결과가 출력으로 전달됩니다.","✅ 순전파 완료! y = wx + b → 활성화 함수 → 출력"];
const P_BWD_SEQ=[["nout","errlab"],["e5"],["nact"],["e4"],["nsum","eb","nb"],["e1","e2","e3","w1","w2","w3"],[]];
const P_BWD_MSG=["① 출력에서 오차(정답 − 예측)를 계산합니다.","② 오차가 뒤에서 앞으로 전달되기 시작!","③ 활성화 함수를 거꾸로 통과합니다.","④ 합산 단계로 거슬러 올라갑니다.","⑤ 편향(b)을 수정합니다.","⑥ 각 가중치(w)를 오차가 줄어드는 방향으로 수정!","✅ 역전파 완료! 가중치·편향이 업데이트되었습니다."];
let pTimer=[];

function clearPerceptron(){
  pTimer.forEach(t=>clearTimeout(t));pTimer=[];
  document.querySelectorAll('#psvg .node,#psvg .edge').forEach(el=>el.classList.remove('hot','err'));
  document.querySelectorAll('#psvg .wlab').forEach(el=>el.classList.remove('upd'));
  document.getElementById('errlab').setAttribute('opacity','0');
}
function resetPerceptron(){
  clearPerceptron();
  document.getElementById('pstatus').textContent='버튼을 눌러 데이터의 흐름을 관찰하세요.';
  document.getElementById('btnFwd').disabled=false;
  document.getElementById('btnBwd').disabled=false;
}
function playSeq(seq,msgs,cls,done){
  clearPerceptron();
  document.getElementById('btnFwd').disabled=true;
  document.getElementById('btnBwd').disabled=true;
  seq.forEach((ids,step)=>{
    pTimer.push(setTimeout(()=>{
      ids.forEach(id=>{
        const el=document.getElementById(id);
        if(!el)return;
        if(id==='errlab'){el.setAttribute('opacity','1');return;}
        if(el.classList.contains('wlab')){el.classList.add(cls==='err'?'upd':'hot');return;}
        el.classList.add(cls);
      });
      document.getElementById('pstatus').textContent=msgs[step];
      if(step===seq.length-1){
        pTimer.push(setTimeout(()=>{
          document.getElementById('btnFwd').disabled=false;
          document.getElementById('btnBwd').disabled=false;
        },400));
      }
    },step*900));
  });
}
function runForward(){playSeq(P_FWD_SEQ,P_FWD_MSG,'hot');}
function runBackward(){playSeq(P_BWD_SEQ,P_BWD_MSG,'err');}

/* ---- ANN 3-4-2 구조 그림 ---- */
(function(){
  const svg=document.getElementById('annsvg');
  const L=[{x:60,n:3,c:'#e8863a'},{x:210,n:4,c:'#8a4fd3'},{x:360,n:2,c:'#3a7de8'}];
  const pos=L.map(l=>{
    const ys=[];const gap=180/(l.n+1);
    for(let i=1;i<=l.n;i++)ys.push(20+gap*i);
    return ys;
  });
  let html='';
  for(let a=0;a<2;a++){
    pos[a].forEach(y1=>pos[a+1].forEach(y2=>{
      html+=`<line x1="${L[a].x}" y1="${y1}" x2="${L[a+1].x}" y2="${y2}" stroke="#d9cdb8" stroke-width="1.2"/>`;
    }));
  }
  L.forEach((l,i)=>{
    pos[i].forEach(y=>{html+=`<circle cx="${l.x}" cy="${y}" r="14" fill="#fbd9a8" stroke="#d98a3d" stroke-width="2.5"/>`;});
  });
  html+=`<text x="60" y="212" text-anchor="middle" font-size="12" fill="#c96a1f" font-weight="700">Input (3)</text>`;
  html+=`<text x="210" y="212" text-anchor="middle" font-size="12" fill="#6c35b0" font-weight="700">Hidden (4)</text>`;
  html+=`<text x="360" y="212" text-anchor="middle" font-size="12" fill="#2560c4" font-weight="700">Output (2)</text>`;
  svg.innerHTML=html;
})();

