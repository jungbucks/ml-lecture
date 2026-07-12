/* ================================================================
   17. 의사 결정 트리 스무고개 (예시 트리)
================================================================ */
const DTREE={q:"날개가 있나요?",yes:{q:"날 수 있나요?",yes:{leaf:"매 🦅"},no:{leaf:"펭귄 🐧"}},no:{q:"지느러미가 있나요?",yes:{leaf:"돌고래 🐬"},no:{leaf:"곰 🐻"}}};
let dtNode=DTREE,dtTrail=[];
function dtRender(){
  const q=document.getElementById('dtQ'),btns=document.getElementById('dtBtns'),path=document.getElementById('dtPath');
  path.textContent=dtTrail.length?('내려온 가지: '+dtTrail.join(' → ')):'';
  if(dtNode.leaf){
    q.innerHTML='🎉 분류 결과: <b>'+dtNode.leaf+'</b> — 질문(가지)을 따라 내려와 분류 완료! 이것이 의사 결정 트리의 원리예요.';
    btns.innerHTML='<button class="act neutral" onclick="dtReset()">↺ 처음부터 다시</button>';
    return;
  }
  q.innerHTML='❓ <b>'+dtNode.q+'</b>';
  btns.innerHTML='<button class="act fwd" onclick="dtAnswer(true)">예</button><button class="act bwd" onclick="dtAnswer(false)">아니오</button>';
}
function dtAnswer(y){dtTrail.push(dtNode.q.replace('?','')+'('+(y?'예':'아니오')+')');dtNode=y?dtNode.yes:dtNode.no;dtRender();}
function dtReset(){dtNode=DTREE;dtTrail=[];dtRender();}
dtRender();

